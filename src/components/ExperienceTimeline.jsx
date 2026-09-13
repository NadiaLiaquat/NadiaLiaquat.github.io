import React from 'react'
import { Briefcase, MapPin } from 'lucide-react'
import { experience } from '../data/experience.js'
import SectionHeading from './ui/SectionHeading.jsx'
import Reveal from './ui/Reveal.jsx'
import Tag from './ui/Tag.jsx'
import { cn } from '../lib/cn.js'

export function ExperienceTimeline() {
  return (
    <section id="operations" className="relative scroll-mt-24 py-24">
      <div className="container-nx">
        <SectionHeading
          kicker="// OPERATIONS"
          title="Professional Experience"
          description="A timeline of roles in threat intelligence, digital forensics, and malware analysis."
        />

        <ol className="relative mt-14 space-y-10 pl-8 sm:pl-10">
          {/* vertical connector */}
          <span
            aria-hidden
            className="absolute left-[7px] top-1 h-full w-px sm:left-[9px]"
            style={{
              background:
                'linear-gradient(180deg, rgba(0,245,255,0.6), rgba(138,43,226,0.35) 60%, transparent)',
            }}
          />

          {experience.map((job, i) => (
            <Reveal as="li" key={job.id} delay={i * 60} className="relative">
              {/* node */}
              <span
                aria-hidden
                className={cn(
                  'absolute -left-[calc(2rem-1px)] top-1.5 grid h-4 w-4 place-items-center rounded-full border sm:-left-[calc(2.5rem-1px)]',
                  'border-cyan/60 bg-bg shadow-neon-cyan',
                )}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-cyan" />
              </span>

              <article className="glass card-hover rounded-xl border border-white/10 p-5 sm:p-6">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  <span className="mono rounded border border-cyan/30 bg-cyan/[0.05] px-2 py-0.5 text-[10px] tracking-[0.14em] text-cyan">
                    {job.period}
                  </span>
                  <span className="mono inline-flex items-center gap-1 text-[10px] tracking-[0.14em] text-muted">
                    <Briefcase size={11} /> {job.type}
                  </span>
                  <span className="mono inline-flex items-center gap-1 text-[10px] tracking-[0.14em] text-muted">
                    <MapPin size={11} /> {job.location}
                  </span>
                </div>

                <h3 className="mt-3 text-lg font-bold text-ink">{job.title}</h3>
                <p className="mono text-xs tracking-[0.08em] text-pink">{job.company}</p>

                <p className="mt-3 leading-relaxed text-muted">{job.description}</p>

                {job.highlights?.length > 0 && (
                  <ul className="mt-3 space-y-1.5">
                    {job.highlights.map((point, idx) => (
                      <li key={idx} className="flex gap-2.5 text-sm leading-relaxed text-muted">
                        <span
                          aria-hidden
                          className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-cyan/70"
                        />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                )}

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {job.stack.map((tech) => (
                    <Tag key={tech}>{tech}</Tag>
                  ))}
                </div>
              </article>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}

export default ExperienceTimeline
