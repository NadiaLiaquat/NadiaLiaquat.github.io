import React, { useCallback, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { navLinks } from '../data/navigation.js'
import { useScrollSpy } from '../hooks/useScrollSpy.js'
import { cn } from '../lib/cn.js'
import StatusDot from './ui/StatusDot.jsx'
import Logo from './ui/Logo.jsx'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const onHome = location.pathname === '/'

  const ids = navLinks.map((l) => l.id)
  const activeId = useScrollSpy(onHome ? ids : [], 96)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll while the mobile drawer is open.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const go = useCallback(
    (id) => (e) => {
      e.preventDefault()
      setOpen(false)
      if (onHome) {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
        history.replaceState(null, '', `#${id}`)
      } else {
        navigate(`/#${id}`)
      }
    },
    [onHome, navigate],
  )

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-colors duration-300',
        scrolled
          ? 'border-b border-white/10 bg-[#050509]/85 backdrop-blur-xl'
          : 'border-b border-transparent bg-[#050509]/40 backdrop-blur-md',
      )}
    >
      <nav className="container-nx flex h-[68px] items-center justify-between" aria-label="Primary">
        <a
          href="/#init"
          onClick={go('init')}
          className="rounded-md transition-transform hover:scale-105 focus-visible:scale-105"
        >
          <Logo />
        </a>

        {/* desktop links */}
        <ul className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => {
            const isActive = onHome && activeId === link.id
            return (
              <li key={link.id}>
                <a
                  href={`/#${link.id}`}
                  onClick={go(link.id)}
                  aria-current={isActive ? 'true' : undefined}
                  className={cn(
                    'mono relative rounded px-3 py-2 text-[11px] font-medium tracking-[0.14em] transition-colors',
                    isActive ? 'text-cyan' : 'text-muted hover:text-ink',
                  )}
                >
                  {link.label}
                  <span
                    className={cn(
                      'absolute inset-x-3 -bottom-0.5 h-px origin-left bg-cyan transition-transform duration-300',
                      isActive ? 'scale-x-100 shadow-neon-cyan' : 'scale-x-0',
                    )}
                  />
                </a>
              </li>
            )
          })}
        </ul>

        <div className="hidden items-center gap-2 lg:flex">
          <StatusDot accent="green" label="ONLINE" />
        </div>

        {/* mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-drawer"
          aria-label={open ? 'Close menu' : 'Open menu'}
          className="rounded-md border border-white/10 p-2 text-ink transition-colors hover:border-cyan/50 hover:text-cyan lg:hidden"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>

      {/* mobile drawer */}
      <div
        id="mobile-drawer"
        className={cn(
          'lg:hidden',
          'overflow-hidden border-t border-white/10 bg-[#050509]/95 backdrop-blur-xl transition-[max-height,opacity] duration-300 ease-out',
          open ? 'max-h-[520px] opacity-100' : 'max-h-0 opacity-0',
        )}
      >
        <ul className="container-nx flex flex-col gap-1 py-4">
          {navLinks.map((link, i) => (
            <li
              key={link.id}
              style={{ transitionDelay: open ? `${i * 40}ms` : '0ms' }}
              className={cn(
                'transition-all duration-300',
                open ? 'translate-x-0 opacity-100' : '-translate-x-3 opacity-0',
              )}
            >
              <a
                href={`/#${link.id}`}
                onClick={go(link.id)}
                className={cn(
                  'mono flex items-center gap-3 rounded-md border border-white/5 px-4 py-3 text-xs tracking-[0.14em]',
                  onHome && activeId === link.id
                    ? 'border-cyan/40 text-cyan'
                    : 'text-muted hover:text-ink',
                )}
              >
                <span className="text-cyan/50">›</span>
                {link.label}
              </a>
            </li>
          ))}
          <li className="px-4 pt-3">
            <StatusDot accent="green" label="ONLINE" />
          </li>
        </ul>
      </div>
    </header>
  )
}

export default Navbar
