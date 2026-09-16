/**
 * markdown.jsx — intentionally tiny Markdown renderer for blog post bodies.
 * Supports: #/##/### headings, fenced ``` code blocks, a ```flow pipeline
 * diagram (see FlowDiagram below), - lists, > quotes, blank-line paragraphs,
 * and inline **bold**, *italic*, `code`, [links](url).
 *
 * This is not a general-purpose parser — it only handles the subset used in
 * src/data/blog.js. Input is authored by the site owner (trusted), so no
 * sanitization layer is included; do not feed it untrusted content.
 */
import React from 'react'
import { ArrowRight } from 'lucide-react'

let keySeq = 0
const k = () => `md-${keySeq++}`

function inline(text) {
  // Split on the supported inline tokens while keeping delimiters.
  const pattern = /(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g
  const parts = text.split(pattern).filter((p) => p !== '')
  return parts.map((part) => {
    if (/^\*\*[^*]+\*\*$/.test(part))
      return <strong key={k()} className="font-semibold text-ink">{part.slice(2, -2)}</strong>
    if (/^\*[^*]+\*$/.test(part))
      return <em key={k()} className="italic">{part.slice(1, -1)}</em>
    if (/^`[^`]+`$/.test(part))
      return (
        <code key={k()} className="mono rounded bg-white/[0.06] px-1.5 py-0.5 text-[0.85em] text-cyan">
          {part.slice(1, -1)}
        </code>
      )
    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/)
    if (link)
      return (
        <a
          key={k()}
          href={link[2]}
          className="text-cyan underline decoration-cyan/40 underline-offset-2 hover:decoration-cyan"
          target="_blank"
          rel="noopener noreferrer"
        >
          {link[1]}
        </a>
      )
    return <React.Fragment key={k()}>{part}</React.Fragment>
  })
}

/**
 * FlowDiagram — a lightweight left-to-right (wrapping) pipeline diagram, no
 * charting library required. Authored in a ```flow fence as:
 *
 *   Collection: feeds, OSINT -> Normalization: one schema -> Scoring
 *
 * Each stage is "Label" or "Label: short caption"; stages are separated by
 * "->". Wraps to multiple rows on narrow viewports automatically.
 */
function FlowDiagram({ source }) {
  const stages = source
    .split('->')
    .map((s) => s.trim())
    .filter(Boolean)
    .map((s) => {
      const idx = s.indexOf(':')
      return idx === -1
        ? { label: s.trim(), caption: '' }
        : { label: s.slice(0, idx).trim(), caption: s.slice(idx + 1).trim() }
    })

  if (stages.length === 0) return null

  return (
    <div
      role="img"
      aria-label={`Pipeline diagram: ${stages.map((s) => s.label).join(' → ')}`}
      className="my-6 flex flex-wrap items-stretch gap-2 rounded-lg border border-white/10 bg-white/[0.02] p-4"
    >
      {stages.map((stage, i) => (
        <React.Fragment key={k()}>
          <div className="flex min-w-[9rem] flex-1 flex-col justify-center rounded-md border border-cyan/30 bg-cyan/[0.05] px-3 py-2.5 text-center">
            <span className="mono text-[10.5px] font-semibold uppercase tracking-[0.1em] text-cyan">
              {stage.label}
            </span>
            {stage.caption && (
              <span className="mt-1 text-[11px] leading-snug text-muted">{stage.caption}</span>
            )}
          </div>
          {i < stages.length - 1 && (
            <ArrowRight
              size={16}
              className="my-auto flex-none text-muted/60"
              aria-hidden="true"
            />
          )}
        </React.Fragment>
      ))}
    </div>
  )
}

/** Extract `## `/`### ` headings for a table of contents. */
export function extractHeadings(md) {
  const out = []
  let inFence = false
  md.split('\n').forEach((line) => {
    if (line.trim().startsWith('```')) inFence = !inFence
    if (inFence) return
    const m = line.match(/^(#{2,3})\s+(.*)$/)
    if (m) {
      const text = m[2].trim()
      out.push({
        level: m[1].length,
        text,
        id: text.toLowerCase().replace(/[^\w]+/g, '-').replace(/(^-|-$)/g, ''),
      })
    }
  })
  return out
}

export function Markdown({ children }) {
  keySeq = 0
  const src = String(children || '')
  const lines = src.split('\n')
  const blocks = []
  let i = 0

  while (i < lines.length) {
    const line = lines[i]

    // Fenced code block
    if (line.trim().startsWith('```')) {
      const lang = line.trim().slice(3).trim()
      const buf = []
      i++
      while (i < lines.length && !lines[i].trim().startsWith('```')) {
        buf.push(lines[i])
        i++
      }
      i++ // consume closing fence

      if (lang === 'flow') {
        blocks.push(<FlowDiagram key={k()} source={buf.join('\n')} />)
        continue
      }

      blocks.push(
        <pre
          key={k()}
          className="my-5 overflow-x-auto rounded-lg border border-white/10 bg-[#06070d] p-4"
        >
          {lang && (
            <span className="mono mb-2 block text-[10px] uppercase tracking-widest text-muted">
              {lang}
            </span>
          )}
          <code className="mono text-[13px] leading-relaxed text-ink/90">{buf.join('\n')}</code>
        </pre>,
      )
      continue
    }

    // Headings
    const h = line.match(/^(#{1,3})\s+(.*)$/)
    if (h) {
      const level = h[1].length
      const text = h[2].trim()
      const id = text.toLowerCase().replace(/[^\w]+/g, '-').replace(/(^-|-$)/g, '')
      const cls =
        level === 1
          ? 'mt-8 mb-4 text-2xl font-bold text-ink'
          : level === 2
            ? 'mt-9 mb-3 text-xl font-bold text-ink scroll-mt-28'
            : 'mt-6 mb-2 text-base font-semibold text-ink scroll-mt-28'
      const Tag = `h${Math.min(level + 1, 4)}`
      blocks.push(
        <Tag key={k()} id={id} className={cls}>
          {inline(text)}
        </Tag>,
      )
      i++
      continue
    }

    // Blockquote (consecutive `> ` lines)
    if (line.trim().startsWith('>')) {
      const buf = []
      while (i < lines.length && lines[i].trim().startsWith('>')) {
        buf.push(lines[i].replace(/^\s*>\s?/, ''))
        i++
      }
      blocks.push(
        <blockquote
          key={k()}
          className="my-5 border-l-2 border-cyan/50 bg-cyan/[0.04] px-4 py-3 text-muted"
        >
          {inline(buf.join(' '))}
        </blockquote>,
      )
      continue
    }

    // Unordered list
    if (/^\s*-\s+/.test(line)) {
      const buf = []
      while (i < lines.length && /^\s*-\s+/.test(lines[i])) {
        buf.push(lines[i].replace(/^\s*-\s+/, ''))
        i++
      }
      blocks.push(
        <ul key={k()} className="my-4 space-y-1.5 pl-1">
          {buf.map((item) => (
            <li key={k()} className="flex gap-2.5 text-muted">
              <span aria-hidden className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-cyan/70" />
              <span>{inline(item)}</span>
            </li>
          ))}
        </ul>,
      )
      continue
    }

    // Blank line
    if (line.trim() === '') {
      i++
      continue
    }

    // Paragraph (gather until blank line)
    const buf = [line]
    i++
    while (i < lines.length && lines[i].trim() !== '' && !/^(#{1,3}\s|>|\s*-\s|```)/.test(lines[i])) {
      buf.push(lines[i])
      i++
    }
    blocks.push(
      <p key={k()} className="my-4 leading-7 text-muted">
        {inline(buf.join(' '))}
      </p>,
    )
  }

  return <div className="text-[15px]">{blocks}</div>
}

export default Markdown
