import React from 'react'
import { Github, Linkedin, Twitter, Mail } from 'lucide-react'
import { profile } from '../data/profile.js'
import SectionHeading from './ui/SectionHeading.jsx'
import CornerFrame from './ui/CornerFrame.jsx'
import Reveal from './ui/Reveal.jsx'
import Skills from './Skills.jsx'

const SOCIAL_ICONS = { github: Github, linkedin: Linkedin, twitter: Twitter }

export function About() {
  const socials = Object.entries(profile.socials).filter(([, url]) => url)

  return (
    <section id="identity" className="relative scroll-mt-24 py-24">
      <div className="container-nx">
        <SectionHeading kicker="// IDENTITY" title="Who am I?" />

        <div className="mt-12 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          {/* profile card */}
          <Reveal>
            <CornerFrame label="SEC_LEVEL_04" accent="cyan" className="h-full rounded-xl">
              <article className="glass-strong flex h-full flex-col rounded-xl p-6 sm:p-7">
                <div className="flex items-center gap-4">
                  <div
                    aria-hidden
                    className="grid h-14 w-14 place-items-center rounded-lg border border-cyan/30 bg-cyan/[0.06] text-lg font-bold text-cyan"
                  >
                    {profile.name
                      .split(' ')
                      .map((w) => w[0])
                      .slice(0, 2)
                      .join('')}
                  </div>
                  <div>
                    <p className="text-lg font-bold text-ink">{profile.name}</p>
                    <p className="mono text-[11px] tracking-[0.14em] text-cyan">
                      {profile.role.toUpperCase()}
                    </p>
                  </div>
                </div>

                <p className="mt-6 leading-relaxed text-muted">{profile.summary}</p>

                <dl className="mono mt-6 grid grid-cols-2 gap-3 text-[11px]">
                  <div>
                    <dt className="tracking-[0.14em] text-muted/70">LOCATION</dt>
                    <dd className="mt-1 text-ink">{profile.location}</dd>
                  </div>
                  <div>
                    <dt className="tracking-[0.14em] text-muted/70">AVAILABILITY</dt>
                    <dd className="mt-1 text-ink">{profile.availability}</dd>
                  </div>
                </dl>

                <div className="mt-auto flex flex-wrap gap-2 pt-7">
                  {socials.map(([key, url]) => {
                    const Icon = SOCIAL_ICONS[key] || Mail
                    return (
                      <a
                        key={key}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${profile.name} on ${key}`}
                        className="grid h-10 w-10 place-items-center rounded-md border border-white/10 text-muted transition-all hover:border-cyan/50 hover:text-cyan hover:shadow-neon-cyan"
                      >
                        <Icon size={16} />
                      </a>
                    )
                  })}
                  <a
                    href={`mailto:${profile.email}`}
                    aria-label={`Email ${profile.name}`}
                    className="grid h-10 w-10 place-items-center rounded-md border border-white/10 text-muted transition-all hover:border-pink/50 hover:text-pink hover:shadow-neon-pink"
                  >
                    <Mail size={16} />
                  </a>
                </div>
              </article>
            </CornerFrame>
          </Reveal>

          {/* skills */}
          <div>
            <Reveal className="mono mb-4 flex items-center gap-2 text-[11px] tracking-[0.18em] text-muted">
              <span className="h-px w-5 bg-pink/60" />
              CAPABILITY_MATRIX
            </Reveal>
            <Skills />
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
