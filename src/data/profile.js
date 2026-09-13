/**
 * profile.js — central identity data.
 * ---------------------------------------------------------------------------
 * Replace every value below with your real information. Nothing here is a
 * verified claim; treat all strings as placeholders until you edit them.
 * The UI never hardcodes these values — change them here only.
 */

export const profile = {
  // Personal logo / wordmark shown in the navbar & footer.
  codename: 'ROOT_SEEKER',
  logo: '< ROOT_SEEKER />',

  // Real name + role (used in <title>, hero, footer, structured data).
  name: 'Nadia Liaquat',
  role: 'Cybersecurity Analyst',
  roleAccent: 'ANALYST', // the word rendered in pink in the hero

  tagline: 'Threat Intelligence • Malware Analysis • Digital Forensics',

  summary:
    "I'm Nadia Liaquat, a cybersecurity analyst who turns raw security data into decisions that matter. Over the past two years I've worked across threat intelligence, digital forensics, and malware analysis — refining detection logic for an AI-powered SOC platform, supporting real forensic investigations, and reverse-engineering malware to understand exactly how it behaves. I'm drawn to the parts of security work most people skip past: the false positive that shouldn't be there, the artifact that tells the real story, the pattern hiding in the noise. If you're working on a hard security problem, I'd love to hear from you.",

  heroDescription:
    'I investigate threats, analyze malicious activity, and transform security data into actionable intelligence.',

  location: 'Lahore, Pakistan',
  availability: 'Open to select opportunities',

  // Contact — used by the contact section and footer.
  // email: 'you@example.com',
  email: 'nadialiaquat001@gmail.com',

  // Social links. Leave a value empty ('') to hide that icon.
  socials: {
    github: 'https://github.com/your-handle',
    linkedin: 'https://linkedin.com/in/nadia-liaquat',
    twitter: '',
  },

  // Small hero status cards. `accent` maps to a theme color key.
  statusCards: [
    { label: 'STATUS', value: 'ACTIVE', accent: 'green' },
    { label: 'THREAT_INTEL', value: 'ONLINE', accent: 'cyan' },
    { label: 'ANALYSIS', value: 'READY', accent: 'purple' },
    { label: 'UPTIME', value: '24/7', accent: 'pink' },
  ],

  // Interactive terminal lines (whoami-style). Purely cosmetic.
  terminal: [
    { cmd: 'whoami', out: 'cybersecurity_analyst' },
    { cmd: 'focus', out: 'threat_intelligence' },
    { cmd: 'tools', out: 'YARA | Sigma | Python | Elasticsearch | Linux' },
    { cmd: 'status', out: 'SYSTEM_OPERATIONAL' },
  ],
}

export default profile
