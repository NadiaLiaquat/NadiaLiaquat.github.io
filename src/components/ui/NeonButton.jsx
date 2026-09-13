import React from 'react'
import { cn } from '../../lib/cn.js'

/**
 * NeonButton — monospace CTA with a selective neon hover glow.
 * Renders as <a> when `href` is given, otherwise <button>.
 * variant: 'solid' | 'outline' | 'ghost'   accent: 'cyan' | 'pink' | 'purple' | 'green'
 */
export function NeonButton({
  href,
  variant = 'outline',
  accent = 'cyan',
  className,
  children,
  ...rest
}) {
  const Tag = href ? 'a' : 'button'

  const accentMap = {
    cyan: { line: 'border-cyan/50 text-cyan hover:shadow-neon-cyan hover:border-cyan', solid: 'bg-cyan/15 text-cyan border-cyan/60 hover:bg-cyan/25 hover:shadow-neon-cyan' },
    pink: { line: 'border-pink/50 text-pink hover:shadow-neon-pink hover:border-pink', solid: 'bg-pink/15 text-pink border-pink/60 hover:bg-pink/25 hover:shadow-neon-pink' },
    purple: { line: 'border-purple/50 text-purple hover:shadow-neon-purple hover:border-purple', solid: 'bg-purple/15 text-purple border-purple/60 hover:bg-purple/25 hover:shadow-neon-purple' },
    green: { line: 'border-green/50 text-green hover:shadow-neon-green hover:border-green', solid: 'bg-green/15 text-green border-green/60 hover:bg-green/25 hover:shadow-neon-green' },
  }
  const a = accentMap[accent] || accentMap.cyan

  return (
    <Tag
      href={href}
      className={cn(
        'mono group inline-flex items-center justify-center gap-2 rounded-md border px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.14em] transition-all duration-200',
        'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan',
        variant === 'solid' && a.solid,
        variant === 'outline' && cn('bg-transparent', a.line),
        variant === 'ghost' && 'border-transparent text-muted hover:text-ink',
        className,
      )}
      {...rest}
    >
      {children}
    </Tag>
  )
}

export default NeonButton
