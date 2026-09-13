import React, { useMemo } from 'react'
import { useReducedMotion } from '../hooks/useReducedMotion.js'

/**
 * Background — fixed, non-interactive decorative layers behind all content:
 * grid lines, radial neon gradients, scanlines, faint noise, and a few
 * slow-floating particles. Kept deliberately low-contrast so text stays
 * readable. Particles are disabled under prefers-reduced-motion.
 */
const NOISE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E"

export function Background() {
  const reduced = useReducedMotion()

  const particles = useMemo(
    () =>
      Array.from({ length: 14 }, (_, i) => ({
        id: i,
        left: `${(i * 37) % 100}%`,
        top: `${(i * 53) % 100}%`,
        size: 1 + (i % 3),
        duration: `${9 + (i % 6) * 2}s`,
        delay: `${(i % 5) * -1.7}s`,
        color:
          i % 4 === 0
            ? 'rgba(0,245,255,0.5)'
            : i % 4 === 1
              ? 'rgba(255,43,214,0.45)'
              : i % 4 === 2
                ? 'rgba(138,43,226,0.5)'
                : 'rgba(57,255,136,0.4)',
      })),
    [],
  )

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-bg">
      {/* radial neon gradients */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(60rem 40rem at 12% -10%, rgba(0,245,255,0.10), transparent 60%),' +
            'radial-gradient(50rem 40rem at 100% 0%, rgba(138,43,226,0.12), transparent 55%),' +
            'radial-gradient(45rem 45rem at 60% 120%, rgba(255,43,214,0.08), transparent 60%)',
        }}
      />

      {/* grid */}
      <div className="grid-lines absolute inset-0 opacity-70" />

      {/* vignette to keep edges dark */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(120% 120% at 50% 40%, transparent 55%, rgba(5,5,9,0.85) 100%)',
        }}
      />

      {/* scanlines */}
      <div
        className="absolute inset-0 opacity-[0.05] mix-blend-overlay"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, rgba(255,255,255,0.9) 0px, rgba(255,255,255,0.9) 1px, transparent 1px, transparent 3px)',
        }}
      />

      {/* noise */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{ backgroundImage: `url("${NOISE}")`, backgroundSize: '140px 140px' }}
      />

      {/* particles */}
      {!reduced &&
        particles.map((p) => (
          <span
            key={p.id}
            className="absolute rounded-full animate-float-y"
            style={{
              left: p.left,
              top: p.top,
              width: p.size,
              height: p.size,
              background: p.color,
              boxShadow: `0 0 6px ${p.color}`,
              animationDuration: p.duration,
              animationDelay: p.delay,
            }}
          />
        ))}
    </div>
  )
}

export default Background
