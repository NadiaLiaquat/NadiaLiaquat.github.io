import React from 'react'
import { cn } from '../../lib/cn.js'

/** Small pulsing status indicator. */
export function StatusDot({ accent = 'green', className, label }) {
  const color =
    accent === 'cyan'
      ? 'bg-cyan'
      : accent === 'pink'
        ? 'bg-pink'
        : accent === 'purple'
          ? 'bg-purple'
          : accent === 'warn'
            ? 'bg-warn'
            : 'bg-green'

  return (
    <span className={cn('inline-flex items-center gap-2', className)}>
      <span className="relative flex h-2 w-2">
        <span className={cn('absolute inline-flex h-full w-full rounded-full opacity-60 animate-pulse-dot', color)} />
        <span className={cn('relative inline-flex h-2 w-2 rounded-full', color)} />
      </span>
      {label && <span className="mono text-[11px] tracking-[0.18em] text-muted">{label}</span>}
    </span>
  )
}

export default StatusDot
