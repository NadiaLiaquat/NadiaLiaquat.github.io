import React from 'react'
import { useReveal } from '../../hooks/useReveal.js'
import { cn } from '../../lib/cn.js'

/**
 * Reveal — fades/slides its children in on first scroll into view.
 * `as` lets it render as any element/component. `delay` staggers groups.
 */
export function Reveal({ as: Tag = 'div', delay = 0, className, children, ...rest }) {
  const [ref, revealed] = useReveal()
  return (
    <Tag
      ref={ref}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      className={cn('reveal', revealed && 'is-visible', className)}
      {...rest}
    >
      {children}
    </Tag>
  )
}

export default Reveal
