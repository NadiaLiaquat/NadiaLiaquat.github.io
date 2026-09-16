/**
 * projects.js — DEPLOYMENTS section.
 * ---------------------------------------------------------------------------
 * Descriptions below are neutral placeholders describing an INTENDED design,
 * not verified functionality or results. Edit freely. `links` values may be
 * empty ('') to hide a button. `visualSeed` just varies the generated SVG art.
 */
export const projects = [
  {
    id: 'PROJECT_001',
    title: 'CyberVision',
    summary:
      'Malware classification concept that converts executables to image representations and explores CNN-based family prediction.',
    tags: ['Python', 'CNN', 'TensorFlow', 'Malware Analysis'],
    links: { repo: '', demo: '' },
    status: 'RESEARCH',
    visualSeed: 11,
  },
  {
    id: 'PROJECT_002',
    title: 'Threat Intelligence Pipeline',
    summary:
      'A runnable six-stage pipeline — collection, normalization, deduplication, enrichment, scoring, and dissemination — with JMESPath-based enrichment reshaping, 20 passing tests, and an optional Elasticsearch adapter.',
    tags: ['Python', 'JMESPath', 'Elasticsearch', 'Threat Intelligence', 'pytest'],
    links: { repo: 'https://github.com/NadiaLiaquat/threat-intel-pipeline', demo: '' },
    status: 'PROTOTYPE',
    visualSeed: 27,
  },
  {
    id: 'PROJECT_003',
    title: 'Malware Analysis Lab',
    summary:
      'Reproducible, isolated analysis environment with tooling, snapshots, and note templates for static and dynamic sample triage.',
    tags: ['Linux', 'Reverse Engineering', 'YARA', 'Automation'],
    links: { repo: '', demo: '' },
    status: 'ACTIVE',
    visualSeed: 43,
  },
  {
    id: 'PROJECT_004',
    title: 'Threat Intelligence Platform',
    summary:
      'Self-hosted TIP: automated collection from 4 live feeds (URLhaus, ThreatFox, MalwareBazaar, Feodo Tracker) across IP/URL/domain/MD5/SHA1/SHA256, Elasticsearch storage, a FastAPI backend, and a dashboard with a region-wise threat map. Docker Compose stack, no API keys required.',
    tags: ['Python', 'FastAPI', 'Elasticsearch', 'React', 'Docker', 'Threat Intelligence'],
    links: { repo: 'https://github.com/NadiaLiaquat/threat-intel-platform', demo: '' },
    status: 'PROTOTYPE',
    visualSeed: 58,
  },
  {
    id: 'PROJECT_005',
    title: 'Threat Hunting Toolkit',
    summary:
      'Collection of Sigma rules, notebooks, and query snippets structured around common adversary techniques for hypothesis-driven hunts.',
    tags: ['Sigma', 'Elasticsearch', 'Detection Engineering'],
    links: { repo: '', demo: '' },
    status: 'ACTIVE',
    visualSeed: 72,
  },
  {
    id: 'PROJECT_006',
    title: 'Digital Forensics Investigation Platform',
    summary:
      'Case-oriented workspace for organizing forensic artifacts, building timelines, and generating structured investigation reports.',
    tags: ['Python', 'Digital Forensics', 'Reporting'],
    links: { repo: '', demo: '' },
    status: 'RESEARCH',
    visualSeed: 90,
  },
]

export default projects
