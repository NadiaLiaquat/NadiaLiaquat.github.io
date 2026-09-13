/**
 * certifications.js — CREDENTIALS section.
 * ---------------------------------------------------------------------------
 * IMPORTANT: This array is EMPTY by design. Do NOT list a certification here
 * unless you actually hold it. The UI shows an honest "no credentials listed"
 * state while this array is empty.
 *
 * To add one you genuinely hold, use this shape:
 *
 *   {
 *     id: 'cred-01',
 *     name: 'CompTIA Security+',
 *     issuer: 'CompTIA',
 *     year: '20XX',
 *     credentialId: 'REPLACE-WITH-REAL-ID',
 *     verifyUrl: 'https://verify.example.org/REPLACE',
 *   }
 *
 * Common examples you might add (only if earned): Security+, CEH, CHFI,
 * CPENT, GIAC (GCFA / GREM / GCTI), OSCP.
 *
 * `verifyUrl` may point to an external verification page OR to a local file
 * under `public/` (e.g. `/certificates/your-cert.pdf`) when the issuer has no
 * online verification portal — it opens in a new tab either way.
 */
export const certifications = [
  {
    id: 'cred-01',
    name: 'Introduction to Threat Hunting',
    issuer: 'Centri',
    year: '2026',
    credentialId: '119223106',
    verifyUrl: '/certificates/introduction-to-threat-hunting-centri.pdf',
  },
]

export default certifications
