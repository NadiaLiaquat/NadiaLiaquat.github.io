import React from 'react'
import { skills } from '../data/skills.js'
import { accent } from '../lib/theme.js'
import { cn } from '../lib/cn.js'
import Reveal from './ui/Reveal.jsx'

/**
 * Skills — capabilities grid. Presentational only (no <section> wrapper); it is
 * composed inside the IDENTITY section by <About />.
 */
export function Skills({ showLevels = true }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {skills.map((skill, i) => {
        const a = accent(skill.accent)
        return (
          <Reveal
            key={skill.name}
            delay={(i % 3) * 60}
            className={cn(
              'glass card-hover group rounded-lg border border-white/10 p-3.5',
              a.borderHover,
            )}
          >
            <div className="flex items-start justify-between gap-2">
              <span className="text-[13px] font-semibold leading-tight text-ink">
                {skill.name}
              </span>
              <span className={cn('mt-0.5 h-1.5 w-1.5 flex-none rounded-full', a.dot)} />
            </div>
            <p className="mono mt-1 text-[9.5px] uppercase tracking-[0.16em] text-muted">
              {skill.group}
            </p>

            {showLevels && (
              <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-white/[0.06]">
                <span
                  className={cn('block h-full rounded-full transition-all duration-700', a.bar)}
                  style={{ width: `${skill.level}%` }}
                />
              </div>
            )}
          </Reveal>
        )
      })}
    </div>
  )
}

export default Skills
