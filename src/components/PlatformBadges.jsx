import React from 'react'
import { Flag, Box, Radar, Trophy, Target, ArrowUpRight } from 'lucide-react'
import { platforms } from '../data/platforms.js'
import Reveal from './ui/Reveal.jsx'
import { cn } from '../lib/cn.js'

const ICONS = { flag: Flag, box: Box, radar: Radar, trophy: Trophy, target: Target }
const ACCENTS = ['cyan', 'pink', 'purple', 'green']
const ACCENT_CLS = {
  cyan: { text: 'text-cyan', border: 'hover:border-cyan/55', glow: 'hover:shadow-neon-cyan' },
  pink: { text: 'text-pink', border: 'hover:border-pink/55', glow: 'hover:shadow-neon-pink' },
  purple: { text: 'text-purple', border: 'hover:border-purple/55', glow: 'hover:shadow-neon-purple' },
  green: { text: 'text-green', border: 'hover:border-green/55', glow: 'hover:shadow-neon-green' },
}

/**
 * PlatformBadges — small badge row for practice-platform profiles (TryHackMe,
 * Hack The Box, KC7, ...). Presentational only; content comes from
 * src/data/platforms.js. Renders nothing if the array is empty.
 */
export function PlatformBadges() {
  if (platforms.length === 0) return null

  return (
    <div className="mt-10">
      <Reveal className="mono mb-4 flex items-center gap-2 text-[11px] tracking-[0.18em] text-muted">
        <span className="h-px w-5 bg-purple/60" />
        PRACTICE_PLATFORMS
      </Reveal>

      <div className="flex flex-wrap gap-3">
        {platforms.map((p, i) => {
          const Icon = ICONS[p.icon] || Target
          const accent = ACCENT_CLS[ACCENTS[i % ACCENTS.length]]
          return (
            <Reveal key={p.id} delay={(i % 4) * 60}>
              <a
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  'group flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.02] px-4 py-3 transition-all duration-200',
                  accent.border,
                  accent.glow,
                )}
              >
                <Icon size={16} className={accent.text} />
                <span>
                  <span className="block text-sm font-semibold text-ink">{p.name}</span>
                  {p.stat && (
                    <span className="mono block text-[10px] tracking-[0.1em] text-muted">
                      {p.stat}
                    </span>
                  )}
                </span>
                <ArrowUpRight
                  size={14}
                  className="text-muted transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink"
                />
              </a>
            </Reveal>
          )
        })}
      </div>
    </div>
  )
}

export default PlatformBadges
