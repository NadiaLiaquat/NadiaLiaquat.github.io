import React from 'react'
import { cn } from '../../lib/cn.js'

/** Technology / metadata pill in monospace. */
export function Tag({ children, className }) {
  return (
    <span
      className={cn(
        'mono inline-flex items-center rounded border border-white/10 bg-white/[0.03] px-2 py-0.5 text-[10.5px] uppercase tracking-[0.12em] text-muted',
        className,
      )}
    >
      {children}
    </span>
  )
}

export default Tag
