import React from 'react'
import { cn } from '../../lib/cn.js'

/**
 * CornerFrame — wraps content with futuristic L-shaped corner brackets and an
 * optional small technical label (e.g. "SYS_01", "NODE_ACTIVE").
 */
export function CornerFrame({
  label,
  accent = 'cyan',
  className,
  children,
  as: Tag = 'div',
}) {
  const stroke =
    accent === 'pink'
      ? 'border-pink/50'
      : accent === 'purple'
        ? 'border-purple/50'
        : accent === 'green'
          ? 'border-green/50'
          : 'border-cyan/50'

  return (
    <Tag className={cn('relative', className)}>
      <span aria-hidden className={cn('pointer-events-none absolute left-0 top-0 z-10 h-3.5 w-3.5 border-l border-t', stroke)} />
      <span aria-hidden className={cn('pointer-events-none absolute right-0 top-0 z-10 h-3.5 w-3.5 border-r border-t', stroke)} />
      <span aria-hidden className={cn('pointer-events-none absolute bottom-0 left-0 z-10 h-3.5 w-3.5 border-b border-l', stroke)} />
      <span aria-hidden className={cn('pointer-events-none absolute bottom-0 right-0 z-10 h-3.5 w-3.5 border-b border-r', stroke)} />
      {label && (
        <span className="mono absolute -top-2 left-4 z-10 bg-bg px-1.5 text-[10px] tracking-[0.2em] text-muted">
          {label}
        </span>
      )}
      {children}
    </Tag>
  )
}

export default CornerFrame
