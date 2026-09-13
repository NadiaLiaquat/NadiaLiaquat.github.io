import React from 'react'
import { ArrowRight, Radio, ShieldAlert, Activity } from 'lucide-react'
import { profile } from '../data/profile.js'
import NeonButton from './ui/NeonButton.jsx'
import CornerFrame from './ui/CornerFrame.jsx'
import Reveal from './ui/Reveal.jsx'
import StatusPanel from './StatusPanel.jsx'
import Terminal from './Terminal.jsx'
import GeneratedVisual from './visuals/GeneratedVisual.jsx'

function scrollTo(id) {
  return (e) => {
    e.preventDefault()
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    history.replaceState(null, '', `#${id}`)
  }
}

export function Hero() {
  return (
    <section id="init" className="relative scroll-mt-24 pt-28 sm:pt-32">
      <div className="container-nx">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          {/* ---- left: copy ---- */}
          <div>
            <Reveal className="mono inline-flex items-center gap-2 rounded border border-cyan/30 bg-cyan/[0.05] px-3 py-1.5 text-[11px] tracking-[0.2em] text-cyan">
              SYSTEM INITIALIZED
              <span className="inline-block h-3.5 w-1.5 animate-blink bg-cyan" />
            </Reveal>

            <Reveal delay={60}>
              <h1 className="mt-6 text-[2rem] font-extrabold leading-[1.02] tracking-tight xs:text-[2.5rem] sm:text-6xl lg:text-7xl">
                <span
                  className="glitch block break-words text-ink text-glow-cyan"
                  data-text="CYBERSECURITY"
                >
                  CYBERSECURITY
                </span>
                <span
                  className="glitch block break-words text-pink text-glow-pink"
                  data-text={profile.roleAccent}
                >
                  {profile.roleAccent}
                </span>
              </h1>
            </Reveal>

            <Reveal delay={120}>
              <p className="mono mt-5 text-xs tracking-[0.14em] text-muted sm:text-sm">
                {profile.tagline}
              </p>
            </Reveal>

            <Reveal delay={160}>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
                {profile.heroDescription}
              </p>
            </Reveal>

            <Reveal delay={220} className="mt-8 flex flex-wrap gap-3">
              <NeonButton
                href="#deployments"
                onClick={scrollTo('deployments')}
                accent="cyan"
                variant="solid"
              >
                VIEW_DEPLOYMENTS <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </NeonButton>
              <NeonButton href="#link" onClick={scrollTo('link')} accent="pink" variant="outline">
                ESTABLISH_LINK
              </NeonButton>
            </Reveal>
          </div>

          {/* ---- right: visual ---- */}
          <Reveal delay={140} className="relative">
            <CornerFrame label="NODE_ACTIVE" accent="purple" className="rounded-2xl">
              <div className="glass-strong relative overflow-hidden rounded-2xl p-3">
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl">
                  <GeneratedVisual
                    seed={7}
                    variant="network"
                    label="Threat intelligence node graph — decorative"
                  />

                  {/* floating HUD chips */}
                  <div className="absolute left-3 top-3 flex flex-col gap-2">
                    <HudChip icon={ShieldAlert} label="IOC_STATUS" value="TRACKING" accent="text-cyan" />
                    <HudChip icon={Activity} label="ANALYSIS" value="RUNNING" accent="text-pink" />
                  </div>
                  <div className="absolute bottom-3 right-3">
                    <HudChip icon={Radio} label="SIGNAL" value="STABLE" accent="text-green" />
                  </div>
                </div>

                <Terminal className="mt-3" title="nexus@soc: ~/intel" />
              </div>
            </CornerFrame>

            {/* offset accent panel */}
            <div className="pointer-events-none absolute -bottom-5 -left-5 hidden h-24 w-24 rounded-xl border border-pink/30 sm:block" />
          </Reveal>
        </div>

        {/* ---- status cards ---- */}
        <div className="mt-14">
          <StatusPanel />
        </div>
      </div>
    </section>
  )
}

function HudChip({ icon: Icon, label, value, accent }) {
  return (
    <div className="glass flex items-center gap-2 rounded-md border border-white/10 px-2.5 py-1.5">
      <Icon size={13} className={accent} />
      <span className="mono text-[9.5px] tracking-[0.14em] text-muted">{label}</span>
      <span className={`mono text-[9.5px] font-semibold ${accent}`}>{value}</span>
    </div>
  )
}

export default Hero
