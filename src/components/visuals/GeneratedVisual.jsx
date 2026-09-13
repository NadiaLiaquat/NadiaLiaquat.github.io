import React, { useMemo } from 'react'
import { cn } from '../../lib/cn.js'

/**
 * GeneratedVisual — deterministic abstract "threat graph" artwork rendered as
 * inline SVG. No external images, so nothing can 404 and there is nothing to
 * lazy-load. `seed` varies the composition; `label` is the accessible name.
 *
 * variant: 'network' (node graph) | 'signal' (waveform) | 'grid' (data grid)
 */
function mulberry32(a) {
  return function () {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export function GeneratedVisual({
  seed = 1,
  variant = 'network',
  label = 'Abstract security data visualization',
  className,
}) {
  const model = useMemo(() => {
    const rnd = mulberry32(seed * 2654435761)
    const W = 400
    const H = 260

    if (variant === 'signal') {
      const rows = 3
      const paths = Array.from({ length: rows }, (_, r) => {
        const pts = []
        const steps = 26
        for (let i = 0; i <= steps; i++) {
          const x = (i / steps) * W
          const base = 60 + r * 70
          const y = base + Math.sin(i * (0.5 + rnd()) + r) * (10 + rnd() * 22)
          pts.push(`${x.toFixed(1)},${y.toFixed(1)}`)
        }
        return pts.join(' ')
      })
      return { W, H, variant, paths }
    }

    if (variant === 'grid') {
      const cells = []
      const cols = 12
      const rowsN = 8
      for (let y = 0; y < rowsN; y++)
        for (let x = 0; x < cols; x++)
          if (rnd() > 0.62)
            cells.push({ x: 10 + x * 32, y: 12 + y * 30, o: 0.15 + rnd() * 0.6 })
      return { W, H, variant, cells }
    }

    // network
    const count = 9
    const nodes = Array.from({ length: count }, () => ({
      x: 30 + rnd() * (W - 60),
      y: 26 + rnd() * (H - 52),
      r: 3 + rnd() * 5,
    }))
    const edges = []
    nodes.forEach((n, i) => {
      const links = 1 + Math.floor(rnd() * 2)
      for (let l = 0; l < links; l++) {
        const j = Math.floor(rnd() * count)
        if (j !== i) edges.push([i, j])
      }
    })
    return { W, H, variant, nodes, edges }
  }, [seed, variant])

  const gid = `gv-${variant}-${seed}`

  return (
    <svg
      role="img"
      aria-label={label}
      viewBox={`0 0 ${model.W} ${model.H}`}
      preserveAspectRatio="xMidYMid slice"
      className={cn('h-full w-full', className)}
    >
      <defs>
        <linearGradient id={`${gid}-bg`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0B0D14" />
          <stop offset="100%" stopColor="#06070d" />
        </linearGradient>
        <radialGradient id={`${gid}-glow`} cx="30%" cy="25%" r="75%">
          <stop offset="0%" stopColor="rgba(0,245,255,0.16)" />
          <stop offset="55%" stopColor="rgba(138,43,226,0.10)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0)" />
        </radialGradient>
      </defs>

      <rect width={model.W} height={model.H} fill={`url(#${gid}-bg)`} />
      <rect width={model.W} height={model.H} fill={`url(#${gid}-glow)`} />

      {/* faint grid */}
      <g stroke="rgba(255,255,255,0.05)" strokeWidth="1">
        {Array.from({ length: 9 }, (_, i) => (
          <line key={`v${i}`} x1={i * 50} y1="0" x2={i * 50} y2={model.H} />
        ))}
        {Array.from({ length: 6 }, (_, i) => (
          <line key={`h${i}`} x1="0" y1={i * 52} x2={model.W} y2={i * 52} />
        ))}
      </g>

      {model.variant === 'network' && (
        <>
          <g stroke="rgba(0,245,255,0.35)" strokeWidth="1">
            {model.edges.map(([a, b], i) => (
              <line
                key={i}
                x1={model.nodes[a].x}
                y1={model.nodes[a].y}
                x2={model.nodes[b].x}
                y2={model.nodes[b].y}
              />
            ))}
          </g>
          {model.nodes.map((n, i) => (
            <g key={i}>
              <circle cx={n.x} cy={n.y} r={n.r + 4} fill="rgba(0,245,255,0.12)" />
              <circle
                cx={n.x}
                cy={n.y}
                r={n.r}
                fill={i % 3 === 0 ? '#FF2BD6' : i % 3 === 1 ? '#00F5FF' : '#8A2BE2'}
              />
            </g>
          ))}
        </>
      )}

      {model.variant === 'signal' &&
        model.paths.map((p, i) => (
          <polyline
            key={i}
            points={p}
            fill="none"
            stroke={i === 0 ? '#00F5FF' : i === 1 ? '#FF2BD6' : '#8A2BE2'}
            strokeWidth="1.6"
            strokeOpacity="0.85"
          />
        ))}

      {model.variant === 'grid' &&
        model.cells.map((c, i) => (
          <rect
            key={i}
            x={c.x}
            y={c.y}
            width="22"
            height="20"
            rx="2"
            fill="#00F5FF"
            fillOpacity={c.o}
          />
        ))}

      {/* HUD ticks */}
      <g stroke="rgba(255,255,255,0.25)" strokeWidth="1">
        <line x1="10" y1="10" x2="26" y2="10" />
        <line x1="10" y1="10" x2="10" y2="26" />
        <line x1={model.W - 10} y1={model.H - 10} x2={model.W - 26} y2={model.H - 10} />
        <line x1={model.W - 10} y1={model.H - 10} x2={model.W - 10} y2={model.H - 26} />
      </g>
    </svg>
  )
}

export default GeneratedVisual
