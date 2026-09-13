import React from 'react'
import { FileText, ExternalLink } from 'lucide-react'
import { publications } from '../data/publications.js'
import Reveal from './ui/Reveal.jsx'
import { cn } from '../lib/cn.js'

/**
 * Publications — peer-reviewed / published research list. Presentational
 * only (no <section> wrapper); composed inside // CREDENTIALS. Renders
 * nothing if the array is empty.
 */
export function Publications() {
  if (publications.length === 0) return null

  return (
    <div className="mt-10">
      <Reveal className="mono mb-4 flex items-center gap-2 text-[11px] tracking-[0.18em] text-muted">
        <span className="h-px w-5 bg-cyan/60" />
        PUBLICATIONS
      </Reveal>

      <div className="space-y-3">
        {publications.map((pub, i) => (
          <Reveal
            key={pub.id}
            delay={(i % 4) * 60}
            className="group rounded-lg border border-white/10 bg-white/[0.02] p-4 transition-all duration-200 hover:border-purple/45 hover:shadow-neon-purple sm:p-5"
          >
            <a href={pub.url} target="_blank" rel="noopener noreferrer" className="block">
              <div className="flex items-start gap-3">
                <FileText size={16} className="mt-0.5 flex-none text-purple" />
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                    <span className="mono rounded border border-purple/30 bg-purple/[0.06] px-2 py-0.5 text-[9.5px] uppercase tracking-[0.14em] text-purple">
                      {pub.type}
                    </span>
                    <span className="mono text-[10px] tracking-[0.12em] text-muted">
                      {pub.year}
                    </span>
                  </div>

                  <h3 className="mt-2 text-sm font-semibold leading-snug text-ink sm:text-base">
                    {pub.title}
                  </h3>
                  <p className="mono mt-1 text-[11px] text-muted">{pub.authors}</p>
                  <p className="mt-1 text-xs italic leading-relaxed text-muted/90">{pub.venue}</p>

                  <span
                    className={cn(
                      'mono mt-2 inline-flex items-center gap-1.5 text-[11px] tracking-[0.12em] text-cyan',
                    )}
                  >
                    READ_PAPER
                    <ExternalLink
                      size={11}
                      className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </span>
                </div>
              </div>
            </a>
          </Reveal>
        ))}
      </div>
    </div>
  )
}

export default Publications
