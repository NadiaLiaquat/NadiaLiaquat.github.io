import React from 'react'
import { Github, Linkedin, Mail } from 'lucide-react'
import { profile } from '../data/profile.js'
import StatusDot from './ui/StatusDot.jsx'
import Logo from './ui/Logo.jsx'

const BUILT_WITH = ['React', 'Vite', 'Tailwind CSS', 'Lucide']

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative border-t border-white/10 bg-[#06070d]/60">
      <div className="container-nx flex flex-col gap-8 py-10 md:flex-row md:items-center md:justify-between">
        <div>
          <Logo showText />
          <p className="mono mt-2 text-[11px] tracking-[0.12em] text-muted">
            © {year} // ALL_SYSTEMS_OPERATIONAL
          </p>
        </div>

        <div className="flex flex-col gap-4 md:items-end">
          <div className="flex items-center gap-3">
            <span className="mono text-[10px] tracking-[0.16em] text-muted">BUILT_WITH</span>
            <div className="flex flex-wrap gap-1.5">
              {BUILT_WITH.map((t) => (
                <span
                  key={t}
                  className="mono rounded border border-white/10 px-2 py-0.5 text-[10px] tracking-[0.1em] text-muted"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            {profile.socials.github && (
              <a
                href={profile.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="grid h-9 w-9 place-items-center rounded-md border border-white/10 text-muted transition-colors hover:border-cyan/50 hover:text-cyan"
              >
                <Github size={15} />
              </a>
            )}
            {profile.socials.linkedin && (
              <a
                href={profile.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="grid h-9 w-9 place-items-center rounded-md border border-white/10 text-muted transition-colors hover:border-cyan/50 hover:text-cyan"
              >
                <Linkedin size={15} />
              </a>
            )}
            <a
              href={`mailto:${profile.email}`}
              aria-label="Email"
              className="grid h-9 w-9 place-items-center rounded-md border border-white/10 text-muted transition-colors hover:border-pink/50 hover:text-pink"
            >
              <Mail size={15} />
            </a>
          </div>

          <StatusDot accent="green" label="SYSTEM_STATUS: OPERATIONAL" />
        </div>
      </div>
    </footer>
  )
}

export default Footer
