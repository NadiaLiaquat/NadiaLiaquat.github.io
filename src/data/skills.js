/**
 * skills.js — capabilities grid shown in the IDENTITY section.
 * `level` (0-100) drives the small capability bar; set it to reflect your
 * own proficiency, or set `showLevels` to false in the component to hide bars.
 * `group` is used only for grouping/labels.
 */
export const skills = [
  { name: 'Threat Intelligence', group: 'Intel', level: 88, accent: 'cyan' },
  { name: 'Malware Analysis', group: 'Analysis', level: 84, accent: 'pink' },
  { name: 'Digital Forensics', group: 'Forensics', level: 80, accent: 'purple' },
  { name: 'Reverse Engineering', group: 'Analysis', level: 72, accent: 'pink' },
  { name: 'Python', group: 'Tooling', level: 86, accent: 'green' },
  { name: 'YARA', group: 'Detection', level: 82, accent: 'cyan' },
  { name: 'Sigma', group: 'Detection', level: 80, accent: 'cyan' },
  { name: 'Snort', group: 'Detection', level: 70, accent: 'green' },
  { name: 'Elasticsearch', group: 'Data', level: 78, accent: 'purple' },
  { name: 'JMESPath', group: 'Data', level: 76, accent: 'green' },
  { name: 'Linux', group: 'Systems', level: 85, accent: 'cyan' },
  { name: 'Wireshark', group: 'Network', level: 79, accent: 'purple' },
]

export default skills
