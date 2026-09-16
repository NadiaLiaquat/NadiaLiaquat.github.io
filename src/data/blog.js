/**
 * blog.js — DATA_LOGS / Intelligence Feed.
 * ---------------------------------------------------------------------------
 * These are SAMPLE articles written as generic educational notes. They make no
 * claims about you or about specific real-world incidents. Replace `content`
 * with your own writing. `content` is lightweight Markdown: `#`/`##`/`###`
 * headings, fenced ``` code blocks, `-` lists, `> ` quotes, `**bold**`,
 * `` `code` ``, and blank-line-separated paragraphs.
 *
 * Category filter buckets are derived from `category`. Keep categories within:
 *   Threat Intelligence | Malware | Digital Forensics | Threat Hunting |
 *   Research | CTF | Security Operations
 */

export const blogCategories = [
  { label: 'ALL', match: () => true },
  { label: 'THREAT INTEL', match: (c) => c === 'Threat Intelligence' },
  { label: 'FORENSICS', match: (c) => c === 'Digital Forensics' },
  { label: 'MALWARE', match: (c) => c === 'Malware' },
  { label: 'RESEARCH', match: (c) => c === 'Research' || c === 'CTF' },
]

export const posts = [
  {
    id: 'LOG_001',
    slug: 'structuring-a-threat-intel-workflow',
    title: 'Structuring a Threat Intelligence Workflow',
    date: '2026-08-14',
    category: 'Threat Intelligence',
    readingTime: '12 min',
    author: 'ROOT_SEEKER',
    tags: ['Threat Intelligence', 'Process', 'IOCs', 'JMESPath', 'Pipeline Design'],
    excerpt:
      'A practical framework for turning raw feeds into prioritized, contextual intelligence that downstream teams can actually use — the complete pipeline, stage by stage.',
    visualSeed: 12,
    content: `## Why structure matters

Raw indicators are cheap. Context is expensive. A CTI feed subscription gets
you volume; it does not get you decisions. Without a defined workflow, most
of what comes in either gets ignored (too much noise to triage manually) or
gets pushed downstream unfiltered (too much noise for the SOC to act on
either). A workflow exists to convert high-volume, low-context data into a
small number of high-confidence decisions someone can actually act on.

This isn't a new idea — it's the same shape as the intelligence cycle
analysts have used for decades, just implemented with code instead of paper
files.

## Where this fits: the intelligence cycle

Classic tradecraft describes intelligence work as a cycle, not a pipe with an
end: **Direction → Collection → Processing → Analysis → Dissemination →
Feedback**, and back to Direction. The technical pipeline below is that cycle
made concrete for a CTI/detection-engineering context — every stage maps onto
one of those phases, and the feedback stage is not optional. A pipeline
without feedback just produces the same noise forever, slightly faster.

## The complete pipeline

\`\`\`flow
Collection: feeds, OSINT, telemetry
-> Normalization: one schema, one clock
-> Deduplication: collapse repeats
-> Enrichment: reputation, context, verdicts
-> Scoring: confidence + severity
-> Dissemination: SIEM, EDR, hunts, IR
\`\`\`

Six stages, each with a distinct job and a distinct failure mode. Skipping
one doesn't make the pipeline faster — it just moves the failure downstream
to whoever consumes the output next.

## Collection

Collection means deciding, in advance, what you're pulling and why — not
just turning on every feed available. Reasonable sources fall into a few
buckets:

- **Commercial and open threat feeds** — structured indicator lists (STIX/TAXII,
  CSV, JSON), usually broad but shallow on context.
- **Sharing communities / ISACs** — sector-specific, often higher signal
  because members validate before sharing.
- **OSINT** — vendor writeups, sandbox reports, researcher disclosures — high
  context, but unstructured and needs parsing.
- **Internal telemetry** — your own logs, EDR alerts, and confirmed incidents.
  This is the only source that's guaranteed relevant to *your* environment.

The common failure here isn't under-collection, it's over-collection with no
plan: subscribing to every feed available and hoping normalization sorts it
out later. It won't — garbage volume just moves the bottleneck one stage
down.

## Normalization

Every source has its own shape. Normalization is the step where all of that
gets forced into one internal schema before anything else touches it —
consistent field names, consistent indicator typing (IP vs. domain vs. hash
vs. URL), and every timestamp converted to a single timezone (UTC, always).

A minimal normalized record looks something like:

\`\`\`json
{
  "indicator": "185.220.101.7",
  "type": "ipv4",
  "first_seen": "2026-07-02T14:11:00Z",
  "last_seen": "2026-08-11T03:44:00Z",
  "source": "feed_alpha",
  "raw_context": "TOR exit node, seen in C2 traffic"
}
\`\`\`

Skip this step and every stage after it has to special-case each source
individually — deduplication can't compare apples to apples, scoring can't
weigh sources consistently, and dissemination has to reformat data per
destination instead of once, centrally.

## Deduplication

The same indicator arrives from multiple feeds, multiple times, with slightly
different metadata. Left alone, this inflates every downstream metric — an
indicator seen once by three sources looks three times as "hot" as one seen
three times by a single source, which is a meaningfully different signal.

Exact-match deduplication (same indicator value, same type) is cheap and
should always run first. Near-duplicate detection matters more for
unstructured OSINT — the same campaign described in two writeups with
slightly different sample hashes or IOC formatting. A simple approach:
normalize the indicator string, then hash it; anything colliding gets merged
rather than duplicated, with source lists combined instead of overwritten.

## Enrichment

Enrichment is where an indicator stops being a bare string and becomes
something an analyst can make a decision from: reputation scores, passive
DNS history, WHOIS/registration data, sandbox detonation verdicts,
geolocation and ASN, and links to related infrastructure. This is also
usually the most expensive stage — external lookups cost time, API quota, or
both — so it should run *after* deduplication, never before.

\`\`\`python
def enrich(indicator, sources):
    hits = [s.lookup(indicator.value) for s in sources]
    indicator.confidence = weighted_confidence(hits)
    indicator.context = merge_context(hits)
    return indicator
\`\`\`

In practice, enrichment sources return wildly inconsistent JSON shapes, and
reshaping that into your normalized schema is most of the real engineering
effort here. [JMESPath](https://jmespath.org/) earns its keep at exactly this
step:

\`\`\`text
# Pull just what matters out of a bulky enrichment API response
results[?confidence >= \`70\`].{
  indicator: value,
  verdict: verdict,
  seen: last_seen
}
\`\`\`

\`\`\`text
# Flatten related infrastructure from a nested response into one flat list
results[].related_infrastructure[].ip | sort(@) | distinct(@)
\`\`\`

That second pattern — filter, project, flatten — covers most of what
enrichment normalization actually needs, and it's portable across whatever
language ends up calling the API.

## Scoring

Confidence and severity are two different questions and should never be
collapsed into one number. **Confidence** asks: *how sure are we this
indicator is genuinely malicious?* **Severity** asks: *if it is, how bad is
that for us specifically?* A low-confidence indicator tied to a critical
asset still deserves attention; a high-confidence indicator for
infrastructure you don't run doesn't.

A simple weighted scoring approach:

\`\`\`python
def score(indicator):
    confidence = (
        0.4 * indicator.source_reliability
        + 0.35 * indicator.corroboration_count
        + 0.25 * indicator.recency
    )
    severity = asset_criticality(indicator.related_assets)
    return confidence, severity
\`\`\`

The exact weights matter less than the discipline of keeping them separate
and documented — so when a score turns out wrong, you can tell whether the
confidence model or the severity model needs adjusting.

## Dissemination

The same intelligence product needs a different shape for every consumer:
SIEM rules want indicator lists formatted for correlation searches, EDR wants
block/allow lists, threat hunters want a hypothesis and a query, and incident
response wants a playbook entry, not a raw feed. Dissemination is a
translation layer, not a broadcast — pushing one unfiltered feed to every
downstream system is how alert fatigue starts.

## Closing the loop: feedback

This is the stage most pipelines skip, and it's the one that actually makes
the other five worth building. Every downstream outcome — a confirmed true
positive, a closed-as-false-positive, a hunt that found nothing — should feed
back into the pipeline: source reliability weights adjust, scoring thresholds
tune, and collection priorities shift toward what's actually producing
value. Without this, the pipeline is a straight line instead of a cycle, and
it never gets better on its own.

## Common pitfalls

- **Collecting without a plan.** More feeds isn't more intelligence; it's
  more normalization work for no added signal.
- **Enriching before deduplicating.** Paying the enrichment cost three times
  for one indicator is pure waste.
- **One score for both confidence and severity.** Conflating them makes both
  numbers meaningless.
- **No feedback loop.** The pipeline stays exactly as noisy in month twelve
  as it was in month one.
- **Dissemination as broadcast.** Sending the same raw output to every team
  guarantees most of it gets ignored.

## Measuring value

> If an intelligence product never changes a decision, it is documentation, not intelligence.

Track how often a product leads to a new detection, a closed hunt, or a
scoped incident — not raw indicator volume, which measures collection, not
value. A few metrics worth tracking over time: analyst time from alert to
verdict, the false-positive rate per source (which should trend down as
feedback tunes source weighting), and the percentage of disseminated
indicators that ever get referenced in an actual investigation. Those are
the numbers that tell you whether the pipeline is working, not just running.`,
  },
  {
    id: 'LOG_002',
    slug: 'triage-notes-static-analysis-first-pass',
    title: 'Triage Notes: The Static Analysis First Pass',
    date: '2026-07-30',
    category: 'Malware',
    readingTime: '6 min',
    author: 'ROOT_SEEKER',
    tags: ['Malware', 'Static Analysis', 'Triage'],
    excerpt:
      'A repeatable checklist for the first ten minutes with an unknown sample — before any sandbox detonation.',
    visualSeed: 34,
    content: `## Goal of the first pass

Decide quickly: is this worth deep analysis, and what environment do I need?

## Checklist

- File type and real format vs. claimed extension
- Hashes recorded (MD5 / SHA-1 / SHA-256) and logged to the case
- Compilation timestamp and linker version — plausible or forged?
- Imports and exports — networking, crypto, process injection primitives
- Strings — URLs, mutex names, registry paths, packer artifacts
- Section entropy — high entropy suggests packing or encryption

## Example: quick import review

\`\`\`text
VirtualAllocEx     -> possible remote allocation
WriteProcessMemory -> possible injection
CreateRemoteThread -> possible injection
WinHttpOpen        -> C2 candidate
\`\`\`

## Output

A one-paragraph verdict and a recommended next step: discard, deep static, or
isolated dynamic analysis. Keep the note in the case file, not in your head.`,
  },
  {
    id: 'LOG_003',
    slug: 'building-a-forensic-timeline',
    title: 'Building a Forensic Timeline You Can Defend',
    date: '2026-07-11',
    category: 'Digital Forensics',
    readingTime: '8 min',
    author: 'ROOT_SEEKER',
    tags: ['Digital Forensics', 'Timelines', 'Incident Response'],
    excerpt:
      'Timeline analysis is only useful if the methodology holds up to scrutiny. Notes on sources, ordering, and documentation.',
    visualSeed: 51,
    content: `## Sources feed the timeline

- Filesystem metadata (MACB timestamps)
- Event logs and their channels
- Registry last-write times
- Browser and application artifacts
- Network and authentication records where available

## Ordering pitfalls

Timestamps lie. Clock skew, timezone handling, and anti-forensic tampering all
distort ordering. Record the source timezone for every artifact and convert once,
consistently, to UTC.

## Documentation

\`\`\`text
[t0]  auth: interactive logon, account svc-backup
[t0+3m] file: dropper written to C:\\ProgramData
[t0+4m] proc: dropper spawns scripting host
[t0+9m] net: outbound to known-bad host
\`\`\`

## Defensibility

> Assume every step will be questioned. If you cannot cite the artifact and the
> tool that parsed it, it does not belong in the report.`,
  },
  {
    id: 'LOG_004',
    slug: 'hypothesis-driven-threat-hunting',
    title: 'Hypothesis-Driven Threat Hunting',
    date: '2026-06-22',
    category: 'Threat Hunting',
    readingTime: '6 min',
    author: 'ROOT_SEEKER',
    tags: ['Threat Hunting', 'Detection Engineering', 'Sigma'],
    excerpt:
      'A hunt without a hypothesis is just browsing logs. How to frame, scope, and close a hunt so it produces detections.',
    visualSeed: 66,
    content: `## Frame the hypothesis

Start from a technique, not a tool. Example: *"An adversary is using scheduled
tasks for persistence on our build servers."*

## Scope

- Data sources required
- Time window
- Host population
- What a positive result looks like

## Translate to a query

\`\`\`yaml
title: Suspicious Scheduled Task Creation
logsource:
  category: process_creation
  product: windows
detection:
  selection:
    Image|endswith: '\\schtasks.exe'
    CommandLine|contains: '/create'
  condition: selection
\`\`\`

## Close the loop

Every hunt ends in one of three outcomes: a new detection, a documented gap, or
a validated "clean." Anything else means the hunt is not finished.`,
  },
  {
    id: 'LOG_005',
    slug: 'jmespath-for-security-data',
    title: 'JMESPath for Security Data Wrangling',
    date: '2026-06-03',
    category: 'Research',
    readingTime: '5 min',
    author: 'ROOT_SEEKER',
    tags: ['JMESPath', 'JSON', 'Automation'],
    excerpt:
      'Security tooling speaks JSON. A short tour of JMESPath expressions that make feed and API responses workable.',
    visualSeed: 81,
    content: `## Why JMESPath

It is declarative, portable across languages, and built into common CLIs and SDKs.
For reshaping API responses it beats ad-hoc parsing.

## Useful patterns

Project selected fields from a list:

\`\`\`text
indicators[].{value: indicator, type: type, seen: last_seen}
\`\`\`

Filter by confidence:

\`\`\`text
indicators[?confidence >= \`80\`].indicator
\`\`\`

Flatten nested infrastructure:

\`\`\`text
results[].infrastructure[].ip | sort(@) | distinct(@)
\`\`\`

## Takeaway

Learn ten expressions well and most feed-normalization glue code disappears.`,
  },
  {
    id: 'LOG_006',
    slug: 'ctf-notes-reversing-a-simple-crackme',
    title: 'CTF Notes: Reversing a Simple Crackme',
    date: '2026-05-19',
    category: 'CTF',
    readingTime: '7 min',
    author: 'ROOT_SEEKER',
    tags: ['CTF', 'Reverse Engineering', 'Ghidra'],
    excerpt:
      'Walking a beginner-friendly reversing challenge to show a clean methodology: recon, control flow, constraint solving.',
    visualSeed: 95,
    content: `## Recon

Identify architecture, packing, and the win condition string. Static strings
usually point straight at the check function.

## Control flow

Locate the comparison that gates success. Rename functions and variables as you
understand them — future you will thank present you.

\`\`\`c
if (transform(input) == EXPECTED) {
    puts("Access granted");
}
\`\`\`

## Solving the constraint

If \`transform\` is reversible, invert it by hand. If not, model it and let a
solver do the work:

\`\`\`python
from z3 import *
s = Solver()
# ... express transform() over symbolic bytes ...
print(s.check(), s.model())
\`\`\`

## Lesson

The flag is a side effect. The methodology is the point.`,
  },
]

export default posts
