import React from 'react'
import Reveal from './Reveal.jsx'
import { cn } from '../../lib/cn.js'

/**
 * SectionHeading — the "// LABEL" kicker + H2 title used to open each section.
 */
export function SectionHeading({ kicker, title, description, id, align = 'left', className }) {
  return (
    <Reveal
      className={cn(
        'flex flex-col gap-3',
        align === 'center' && 'items-center text-center',
        className,
      )}
    >
      <span className="kicker inline-flex items-center gap-2">
        <span aria-hidden className="h-px w-6 bg-cyan/60" />
        {kicker}
      </span>
      <h2
        id={id}
        className="glitch text-3xl font-bold tracking-tight text-ink sm:text-4xl"
        data-text={title}
      >
        {title}
      </h2>
      {description && (
        <p className={cn('max-w-2xl text-muted', align === 'center' && 'mx-auto')}>
          {description}
        </p>
      )}
    </Reveal>
  )
}

export default SectionHeading
