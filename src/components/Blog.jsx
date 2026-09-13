import React, { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Search } from 'lucide-react'
import { posts, blogCategories } from '../data/blog.js'
import SectionHeading from './ui/SectionHeading.jsx'
import Reveal from './ui/Reveal.jsx'
import { cn } from '../lib/cn.js'
import { formatDate } from '../lib/date.js'

export function Blog() {
  const [activeFilter, setActiveFilter] = useState('ALL')
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const cat = blogCategories.find((c) => c.label === activeFilter) || blogCategories[0]
    const q = query.trim().toLowerCase()
    return posts.filter((post) => {
      if (!cat.match(post.category)) return false
      if (!q) return true
      return (
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q) ||
        post.category.toLowerCase().includes(q) ||
        post.tags.some((t) => t.toLowerCase().includes(q))
      )
    })
  }, [activeFilter, query])

  return (
    <section id="data-logs" className="relative scroll-mt-24 py-24">
      <div className="container-nx">
        <SectionHeading
          kicker="// DATA_LOGS"
          title="Intelligence Feed"
          description="Sample write-ups and field notes. Manage them in src/data/blog.js."
        />

        {/* controls */}
        <div className="mt-10 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter articles by category">
            {blogCategories.map((cat) => (
              <button
                key={cat.label}
                type="button"
                role="tab"
                aria-selected={activeFilter === cat.label}
                onClick={() => setActiveFilter(cat.label)}
                className={cn(
                  'mono rounded border px-3 py-1.5 text-[10.5px] tracking-[0.14em] transition-all',
                  activeFilter === cat.label
                    ? 'border-cyan/60 bg-cyan/10 text-cyan shadow-neon-cyan'
                    : 'border-white/10 text-muted hover:border-white/25 hover:text-ink',
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <label className="relative flex items-center lg:w-72">
            <Search size={14} className="pointer-events-none absolute left-3 text-muted" />
            <span className="sr-only">Search articles</span>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="search logs..."
              className="mono w-full rounded border border-white/10 bg-white/[0.03] py-2 pl-9 pr-3 text-xs text-ink placeholder:text-muted/60 focus:border-cyan/50 focus:outline-none focus:ring-1 focus:ring-cyan/40"
            />
          </label>
        </div>

        {/* grid */}
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((post, i) => (
            <Reveal
              as="article"
              key={post.id}
              delay={(i % 3) * 60}
              className="group relative flex flex-col rounded-xl border border-white/10 bg-white/[0.02] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-cyan/45 hover:shadow-neon-cyan"
            >
              <div className="flex items-center justify-between">
                <span className="mono text-[10px] tracking-[0.16em] text-cyan">{post.id}</span>
                <span className="mono text-[10px] tracking-[0.12em] text-muted">
                  {formatDate(post.date)}
                </span>
              </div>

              <span className="mono mt-3 inline-flex w-fit rounded border border-purple/30 bg-purple/[0.06] px-2 py-0.5 text-[9.5px] uppercase tracking-[0.14em] text-purple">
                {post.category}
              </span>

              <h3 className="mt-3 text-base font-bold leading-snug text-ink">
                <Link
                  to={`/blog/${post.slug}`}
                  className="after:absolute after:inset-0 focus-visible:outline-none"
                >
                  <span className="relative">{post.title}</span>
                </Link>
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{post.excerpt}</p>

              <span className="mono mt-4 inline-flex items-center gap-1.5 text-[11px] tracking-[0.14em] text-cyan">
                READ_LOG
                <ArrowRight
                  size={13}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </span>
            </Reveal>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="mono mt-10 rounded-lg border border-white/10 bg-white/[0.02] px-4 py-8 text-center text-xs tracking-[0.16em] text-muted">
            NO_MATCHING_LOGS // adjust filter or query
          </p>
        )}
      </div>
    </section>
  )
}

export default Blog
