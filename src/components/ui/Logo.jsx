import React from 'react'
import { profile } from '../../data/profile.js'
import { cn } from '../../lib/cn.js'
import { asset } from '../../lib/asset.js'

/**
 * Logo — the site's avatar mark (public/logo-avatar.png) framed in a small
 * rounded badge with the brand's neon gradient border, used in place of the
 * text wordmark. The image's `alt` carries the accessible name
 * (profile.codename), so no extra label is needed when this is the sole
 * content of a link. Pass `showText` to also print the codename next to it.
 */
export function Logo({ className, size = 36, showText = false }) {
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <span
        className="inline-block shrink-0 rounded-[10px] p-[1.5px]"
        style={{
          width: size,
          height: size,
          background: 'linear-gradient(135deg, #00F5FF, #8A2BE2 55%, #FF2BD6)',
        }}
      >
        <img
          src={asset('logo-avatar.png')}
          alt={`${profile.codename} — site logo`}
          width={size}
          height={size}
          className="h-full w-full rounded-[9px] object-cover select-none"
          decoding="async"
        />
      </span>
      {showText && (
        <span className="mono text-sm font-bold tracking-[0.14em] text-ink">
          {profile.codename}
        </span>
      )}
    </span>
  )
}

export default Logo
