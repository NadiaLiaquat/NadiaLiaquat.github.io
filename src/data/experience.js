/**
 * experience.js — professional timeline (OPERATIONS section).
 * ---------------------------------------------------------------------------
 * Sourced from the portfolio owner's resume (Nadia_Liaquat_Resume_Final.pdf).
 * Keep this in sync with the resume — update both whenever one changes.
 * `highlights` renders as bullet points under the one-line `description`;
 * `stack` renders as technology tags.
 */
export const experience = [
  {
    id: 'op-01',
    period: 'JAN 2024 — PRESENT',
    title: 'Security Analyst',
    company: 'TechnoGenics SMC PVT LTD',
    type: 'Full-time',
    location: 'Lahore, Pakistan',
    description:
      'Contributing to StrikeReady, an AI-powered security operations platform, by improving threat intelligence logic, data enrichment pipelines, and detection accuracy for enterprise SOC customers.',
    highlights: [
      'Engineered and refined threat intelligence logic within StrikeReady to improve IOC fidelity, reducing false positives and increasing the precision of automated threat detection across customer environments.',
      'Developed and optimized JMESPath queries to automate threat intel data enrichment, streamlining ingestion of CTI feeds and improving analyst response efficiency.',
      'Improved threat intel collection and correlation logic to surface high-confidence indicators, enabling faster and more accurate threat hunting across integrated security data sources.',
      'Analyzed security logs, network traffic, and endpoint telemetry to validate intel quality and identify anomalous behavior and potential indicators of compromise.',
      "Supported incident response workflows and documented detection playbooks, contributing to continuous improvement of the platform's SOC automation capabilities.",
    ],
    stack: ['Threat Intelligence', 'JMESPath', 'SIEM', 'IOC Analysis', 'Security Operations'],
  },
  {
    id: 'op-02',
    period: 'SEP 2023 — OCT 2023',
    title: 'Cybersecurity Intern — Digital Forensics & Incident Response',
    company: 'Punjab Police Pakistan',
    type: 'Internship',
    location: 'Lahore, Pakistan',
    description:
      'Assisted senior investigators with digital forensic examinations of seized devices, using industry-standard forensic tools and methodologies.',
    highlights: [
      'Supported incident handling and criminology investigations, contributing to case documentation and chain-of-custody procedures.',
      'Gained hands-on exposure to law enforcement cybercrime workflows, evidence acquisition, and incident response procedures.',
    ],
    stack: ['Digital Forensics', 'Incident Response', 'Chain of Custody'],
  },
  {
    id: 'op-03',
    period: 'MAY 2022 — JAN 2023',
    title: 'Malware Analyst',
    company: 'Digital Forensics Research Service Center (DFRSC)',
    type: 'Full-time',
    location: 'Lahore, Pakistan',
    description:
      'Performed static and dynamic malware analysis on suspected malicious samples to identify behavioral patterns, persistence mechanisms, and network indicators.',
    highlights: [
      'Developed Python-based automated tools for malware scanning and data collection, increasing team productivity by 30%.',
      'Documented detailed malware analysis reports, including TTPs mapped to the MITRE ATT&CK framework.',
      'Conducted reverse engineering of binary samples using disassemblers and debuggers to uncover obfuscated malicious code logic.',
    ],
    stack: ['Malware Analysis', 'Python', 'Reverse Engineering', 'MITRE ATT&CK'],
  },
]

export default experience
