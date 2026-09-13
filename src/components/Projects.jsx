import React from 'react'
import { ArrowUpRight, Github, ExternalLink } from 'lucide-react'
import { projects } from '../data/projects.js'
import SectionHeading from './ui/SectionHeading.jsx'
import Reveal from './ui/Reveal.jsx'
import Tag from './ui/Tag.jsx'
import GeneratedVisual from './visuals/GeneratedVisual.jsx'
import { cn } from '../lib/cn.js'

const VISUAL_VARIANTS = ['network', 'signal', 'grid']

export function Projects() {
  return (
    <section id="deployments" className="relative scroll-mt-24 py-24">
      <div className="container-nx">
        <SectionHeading
          kicker="// DEPLOYMENTS"
          title="Selected Projects"
          description="Placeholder descriptions outline intended design, not verified results. Edit src/data/projects.js."
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <Reveal
              as="article"
              key={project.id}
              delay={(i % 3) * 70}
              className="group relative flex flex-col overflow-hidden rounded-xl border border-cyan/20 bg-white/[0.02] transition-all duration-300 hover:-translate-y-1.5 hover:border-cyan/55 hover:shadow-neon-cyan"
            >
              {/* corner accents */}
              <span aria-hidden className="pointer-events-none absolute left-0 top-0 h-4 w-4 border-l-2 border-t-2 border-pink/60" />
              <span aria-hidden className="pointer-events-none absolute bottom-0 right-0 h-4 w-4 border-b-2 border-r-2 border-purple/60" />

              {/* visual */}
              <div className="relative aspect-[16/10] overflow-hidden border-b border-white/10">
                <div className="h-full w-full transition-transform duration-500 group-hover:scale-105">
                  <GeneratedVisual
                    seed={project.visualSeed}
                    variant={VISUAL_VARIANTS[i % VISUAL_VARIANTS.length]}
                    label={`${project.title} — abstract project visual`}
                  />
                </div>
                <span className="mono absolute left-3 top-3 rounded bg-bg/70 px-2 py-0.5 text-[10px] tracking-[0.16em] text-cyan backdrop-blur">
                  {project.id}
                </span>
                <span
                  className={cn(
                    'mono absolute right-3 top-3 rounded border px-2 py-0.5 text-[9.5px] tracking-[0.16em]',
                    project.status === 'ACTIVE'
                      ? 'border-green/40 text-green'
                      : project.status === 'PROTOTYPE'
                        ? 'border-cyan/40 text-cyan'
                        : 'border-purple/40 text-purple',
                  )}
                >
                  {project.status}
                </span>
              </div>

              {/* body */}
              <div className="flex flex-1 flex-col p-5">
                <h3 className="text-base font-bold text-ink">{project.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{project.summary}</p>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <Tag key={tag}>{tag}</Tag>
                  ))}
                </div>

                <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4">
                  <div className="flex gap-2">
                    {project.links.repo && (
                      <a
                        href={project.links.repo}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${project.title} source code`}
                        className="grid h-8 w-8 place-items-center rounded border border-white/10 text-muted transition-colors hover:border-cyan/50 hover:text-cyan"
                      >
                        <Github size={14} />
                      </a>
                    )}
                    {project.links.demo && (
                      <a
                        href={project.links.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${project.title} live demo`}
                        className="grid h-8 w-8 place-items-center rounded border border-white/10 text-muted transition-colors hover:border-cyan/50 hover:text-cyan"
                      >
                        <ExternalLink size={14} />
                      </a>
                    )}
                    {!project.links.repo && !project.links.demo && (
                      <span className="mono text-[10px] tracking-[0.14em] text-muted/60">
                        LINKS_PENDING
                      </span>
                    )}
                  </div>

                  <ArrowUpRight
                    size={18}
                    className="text-muted transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-cyan"
                  />
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects
