import React, { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from '../hooks/useReducedMotion.js'
import { profile } from '../data/profile.js'
import { cn } from '../lib/cn.js'

/**
 * Terminal — small faux shell that types out `profile.terminal` line by line.
 * With reduced motion it renders the full transcript immediately.
 */
export function Terminal({ className, lines = profile.terminal, title = 'nexus@soc: ~' }) {
  const reduced = useReducedMotion()
  const [rendered, setRendered] = useState(reduced ? lines.length * 2 : 0)
  const [typed, setTyped] = useState('')
  const timers = useRef([])

  useEffect(() => {
    if (reduced) {
      setRendered(lines.length * 2)
      return
    }
    let cancelled = false
    let step = 0

    const run = async () => {
      for (let i = 0; i < lines.length; i++) {
        const prompt = `$ ${lines[i].cmd}`
        for (let c = 0; c <= prompt.length; c++) {
          if (cancelled) return
          setTyped(prompt.slice(0, c))
          // eslint-disable-next-line no-await-in-loop
          await wait(26)
        }
        if (cancelled) return
        step += 1
        setRendered(step)
        setTyped('')
        // eslint-disable-next-line no-await-in-loop
        await wait(260)
        step += 1
        setRendered(step)
        // eslint-disable-next-line no-await-in-loop
        await wait(420)
      }
    }

    const wait = (ms) =>
      new Promise((res) => {
        const t = setTimeout(res, ms)
        timers.current.push(t)
      })

    run()
    return () => {
      cancelled = true
      timers.current.forEach(clearTimeout)
      timers.current = []
    }
  }, [lines, reduced])

  const visibleCount = Math.min(rendered, lines.length * 2)
  const activeLineIndex = Math.floor(visibleCount / 2)
  const showingTyped = !reduced && typed && activeLineIndex < lines.length

  return (
    <div
      className={cn('glass overflow-hidden rounded-xl border border-white/10', className)}
    >
      <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.02] px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-pink/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-warn/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-green/70" />
        <span className="mono ml-2 text-[11px] tracking-[0.14em] text-muted">{title}</span>
      </div>

      <div className="mono space-y-1.5 p-4 text-[12.5px] leading-relaxed">
        {lines.map((line, i) => {
          const cmdShown = visibleCount >= i * 2 + 1
          const outShown = visibleCount >= i * 2 + 2
          return (
            <div key={i}>
              {cmdShown && (
                <p className="text-ink">
                  <span className="text-green">$</span> {line.cmd}
                </p>
              )}
              {outShown && <p className="pl-3 text-cyan/90">{line.out}</p>}
            </div>
          )
        })}

        {showingTyped && (
          <p className="text-ink">
            {typed}
            <span className="ml-0.5 inline-block h-4 w-2 -translate-y-px animate-blink bg-cyan align-middle" />
          </p>
        )}

        {(reduced || visibleCount >= lines.length * 2) && (
          <p className="text-ink">
            <span className="text-green">$</span>{' '}
            <span className="ml-0.5 inline-block h-4 w-2 -translate-y-px animate-blink bg-cyan align-middle" />
          </p>
        )}
      </div>
    </div>
  )
}

export default Terminal
