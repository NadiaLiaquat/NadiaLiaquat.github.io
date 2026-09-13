import React from 'react'
import { BadgeCheck, ShieldQuestion, ExternalLink } from 'lucide-react'
import { certifications } from '../data/certifications.js'
import SectionHeading from './ui/SectionHeading.jsx'
import CornerFrame from './ui/CornerFrame.jsx'
import Reveal from './ui/Reveal.jsx'
import PlatformBadges from './PlatformBadges.jsx'
import Publications from './Publications.jsx'

export function Certifications() {
  const hasCerts = certifications.length > 0

  return (
    <section id="credentials" className="relative scroll-mt-24 py-24">
      <div className="container-nx">
        <SectionHeading
          kicker="// CREDENTIALS"
          title="Security Credentials"
          description="Only credentials the portfolio owner actually holds are listed here."
        />

        {hasCerts ? (
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {certifications.map((cert, i) => (
              <Reveal key={cert.id} delay={(i % 3) * 70}>
                <CornerFrame label="CERT_NODE" accent="green" className="h-full rounded-xl">
                  <article className="glass card-hover flex h-full flex-col rounded-xl border border-white/10 p-5">
                    <div className="flex items-start justify-between">
                      <BadgeCheck size={20} className="text-green" />
                      <span className="mono text-[10px] tracking-[0.16em] text-muted">
                        {cert.year}
                      </span>
                    </div>
                    <h3 className="mt-4 text-base font-bold text-ink">{cert.name}</h3>
                    <p className="mono text-[11px] tracking-[0.1em] text-cyan">{cert.issuer}</p>

                    <dl className="mono mt-4 text-[10.5px] text-muted">
                      <dt className="tracking-[0.14em] text-muted/70">CREDENTIAL_ID</dt>
                      <dd className="mt-0.5 break-all text-ink">{cert.credentialId || '—'}</dd>
                    </dl>

                    {cert.verifyUrl && (
                      <a
                        href={cert.verifyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mono mt-auto inline-flex items-center gap-1.5 pt-5 text-[11px] tracking-[0.14em] text-green transition-colors hover:text-cyan"
                      >
                        VERIFY <ExternalLink size={12} />
                      </a>
                    )}
                  </article>
                </CornerFrame>
              </Reveal>
            ))}
          </div>
        ) : (
          <Reveal className="mt-12">
            <CornerFrame label="NO_DATA" accent="purple" className="rounded-xl">
              <div className="glass flex flex-col items-center gap-3 rounded-xl border border-white/10 px-6 py-14 text-center">
                <ShieldQuestion size={28} className="text-purple" />
                <p className="mono text-xs tracking-[0.16em] text-muted">
                  NO_CREDENTIALS_LISTED
                </p>
                <p className="max-w-md text-sm text-muted">
                  Certifications appear here once added to{' '}
                  <code className="mono text-cyan">src/data/certifications.js</code>. This section
                  stays empty rather than displaying unverified claims.
                </p>
              </div>
            </CornerFrame>
          </Reveal>
        )}

        <PlatformBadges />
        <Publications />
      </div>
    </section>
  )
}

export default Certifications
