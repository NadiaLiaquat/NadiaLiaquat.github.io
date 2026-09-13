import React from 'react'
import { profile } from '../data/profile.js'
import { accent } from '../lib/theme.js'
import { cn } from '../lib/cn.js'
import Reveal from './ui/Reveal.jsx'
import StatusDot from './ui/StatusDot.jsx'

/**
 * StatusPanel — the row of four small glass status cards under the hero.
 * Card definitions come from profile.statusCards.
 */
export function StatusPanel() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {profile.statusCards.map((card, i) => {
        const a = accent(card.accent)
        return (
          <Reveal
            key={card.label}
            delay={i * 70}
            className={cn(
              'glass card-hover rounded-lg border p-3.5',
              a.border,
            )}
          >
            <p className="mono text-[10px] tracking-[0.18em] text-muted">{card.label}</p>
            <div className="mt-2 flex items-center gap-2">
              <StatusDot accent={card.accent} />
              <span className={cn('mono text-sm font-semibold', a.text)}>{card.value}</span>
            </div>
          </Reveal>
        )
      })}
    </div>
  )
}

export default StatusPanel
