import React, { useMemo } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Clock, User, Calendar, Hash } from 'lucide-react'
import { posts } from '../data/blog.js'
import { profile } from '../data/profile.js'
import { Markdown, extractHeadings } from '../lib/markdown.jsx'
import { formatDate } from '../lib/date.js'
import GeneratedVisual from '../components/visuals/GeneratedVisual.jsx'
import CornerFrame from '../components/ui/CornerFrame.jsx'
import Tag from '../components/ui/Tag.jsx'
import NotFound from './NotFound.jsx'

export default function BlogPost() {
  const { slug } = useParams()
  const index = posts.findIndex((p) => p.slug === slug)
  const post = posts[index]

  const headings = useMemo(() => (post ? extractHeadings(post.content) : []), [post])
  const related = useMemo(() => {
    if (!post) return []
    return posts
      .filter((p) => p.slug !== post.slug && p.category === post.category)
      .slice(0, 2)
      .concat(posts.filter((p) => p.slug !== post.slug && p.category !== post.category))
      .slice(0, 3)
  }, [post])

  if (!post) return <NotFound />

  const prev = index > 0 ? posts[index - 1] : null
  const next = index < posts.length - 1 ? posts[index + 1] : null

  return (
    <article className="pt-28">
      <div className="container-nx">
        <Link
          to="/#data-logs"
          className="mono inline-flex items-center gap-2 text-[11px] tracking-[0.16em] text-muted transition-colors hover:text-cyan"
        >
          <ArrowLeft size={13} /> BACK_TO_FEED
        </Link>

        {/* header */}
        <header className="mt-6 max-w-3xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="mono rounded border border-purple/30 bg-purple/[0.06] px-2 py-0.5 text-[10px] uppercase tracking-[0.14em] text-purple">
              {post.category}
            </span>
            <span className="mono text-[10px] tracking-[0.14em] text-cyan">{post.id}</span>
          </div>

          <h1 className="mt-4 text-3xl font-extrabold leading-tight text-ink sm:text-4xl">
            {post.title}
          </h1>

          <div className="mono mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-[11px] tracking-[0.1em] text-muted">
            <span className="inline-flex items-center gap-1.5">
              <User size={12} /> {post.author || profile.codename}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Calendar size={12} /> {formatDate(post.date)}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock size={12} /> {post.readingTime}
            </span>
          </div>
        </header>

        {/* hero visual */}
        <CornerFrame label="LOG_MEDIA" accent="cyan" className="mt-8 max-w-4xl rounded-xl">
          <div className="aspect-[21/9] overflow-hidden rounded-xl border border-white/10">
            <GeneratedVisual
              seed={post.visualSeed || index + 3}
              variant={index % 2 ? 'signal' : 'network'}
              label={`${post.title} — decorative header graphic`}
            />
          </div>
        </CornerFrame>

        {/* body + toc */}
        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_240px]">
          <div className="max-w-3xl min-w-0">
            <Markdown>{post.content}</Markdown>

            {/* tags */}
            <div className="mt-10 flex flex-wrap items-center gap-2 border-t border-white/10 pt-6">
              <Hash size={14} className="text-muted" />
              {post.tags.map((t) => (
                <Tag key={t}>{t}</Tag>
              ))}
            </div>
          </div>

          {/* TOC */}
          {headings.length > 0 && (
            <aside className="hidden lg:block">
              <div className="sticky top-28">
                <p className="mono mb-3 text-[10px] tracking-[0.2em] text-muted">// CONTENTS</p>
                <nav className="flex flex-col gap-1.5 border-l border-white/10 pl-3 text-sm">
                  {headings.map((h) => (
                    <a
                      key={h.id}
                      href={`#${h.id}`}
                      className={`text-muted transition-colors hover:text-cyan ${
                        h.level === 3 ? 'pl-3 text-[13px]' : ''
                      }`}
                    >
                      {h.text}
                    </a>
                  ))}
                </nav>
              </div>
            </aside>
          )}
        </div>

        {/* prev / next */}
        <nav
          aria-label="Article navigation"
          className="mt-14 grid gap-4 border-t border-white/10 pt-8 sm:grid-cols-2"
        >
          {prev ? (
            <Link
              to={`/blog/${prev.slug}`}
              className="group rounded-xl border border-white/10 p-4 transition-colors hover:border-cyan/45"
            >
              <span className="mono flex items-center gap-1.5 text-[10px] tracking-[0.16em] text-muted">
                <ArrowLeft size={12} /> PREV_LOG
              </span>
              <span className="mt-1.5 block font-semibold text-ink group-hover:text-cyan">
                {prev.title}
              </span>
            </Link>
          ) : (
            <span />
          )}
          {next && (
            <Link
              to={`/blog/${next.slug}`}
              className="group rounded-xl border border-white/10 p-4 text-right transition-colors hover:border-cyan/45 sm:col-start-2"
            >
              <span className="mono flex items-center justify-end gap-1.5 text-[10px] tracking-[0.16em] text-muted">
                NEXT_LOG <ArrowRight size={12} />
              </span>
              <span className="mt-1.5 block font-semibold text-ink group-hover:text-cyan">
                {next.title}
              </span>
            </Link>
          )}
        </nav>

        {/* related */}
        {related.length > 0 && (
          <section className="mt-16">
            <p className="mono mb-5 text-[11px] tracking-[0.2em] text-muted">// RELATED_LOGS</p>
            <div className="grid gap-4 sm:grid-cols-3">
              {related.map((r) => (
                <Link
                  key={r.id}
                  to={`/blog/${r.slug}`}
                  className="group rounded-xl border border-white/10 bg-white/[0.02] p-4 transition-all hover:-translate-y-1 hover:border-cyan/45"
                >
                  <span className="mono text-[10px] tracking-[0.14em] text-cyan">{r.id}</span>
                  <p className="mt-2 font-semibold leading-snug text-ink group-hover:text-cyan">
                    {r.title}
                  </p>
                  <p className="mono mt-2 text-[10px] tracking-[0.12em] text-muted">
                    {formatDate(r.date)}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        )}

        <div className="h-20" />
      </div>
    </article>
  )
}
