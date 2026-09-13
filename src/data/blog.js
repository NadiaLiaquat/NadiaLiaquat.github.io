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
    readingTime: '7 min',
    author: 'ROOT_SEEKER',
    tags: ['Threat Intelligence', 'Process', 'IOCs'],
    excerpt:
      'A practical framework for turning raw feeds into prioritized, contextual intelligence that downstream teams can actually use.',
    visualSeed: 12,
    content: `## Why structure matters

Raw indicators are cheap. Context is expensive. A workflow exists to convert
high-volume, low-context data into a small number of decisions.

## The pipeline

- **Collection** — pull from feeds, sharing communities, and internal telemetry.
- **Normalization** — one schema, consistent indicator types, consistent timestamps.
- **Deduplication** — collapse repeats before they inflate metrics.
- **Enrichment** — reputation, first/last seen, related infrastructure.
- **Scoring** — confidence and severity, expressed as numbers you can filter on.
- **Dissemination** — push to detection, hunting, and IR in the format each expects.

## A minimal enrichment step

\`\`\`python
def enrich(indicator, sources):
    hits = [s.lookup(indicator.value) for s in sources]
    indicator.confidence = weighted_confidence(hits)
    indicator.context = merge_context(hits)
    return indicator
\`\`\`

## Measuring value

> If an intelligence product never changes a decision, it is documentation, not intelligence.

Track how often a product leads to a new detection, a closed hunt, or a scoped
incident. Those are the only metrics that matter.`,
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
