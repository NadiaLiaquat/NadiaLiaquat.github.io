import React from 'react'
import { useNavigate } from 'react-router-dom'
import { NeonButton } from '../components/ui/NeonButton.jsx'

export default function NotFound() {
  const navigate = useNavigate()
  return (
    <section className="container-nx flex min-h-[70vh] flex-col items-center justify-center py-32 text-center">
      <p className="mono text-xs tracking-[0.3em] text-pink">ERROR // 404</p>
      <h1 className="mt-4 text-5xl font-extrabold text-ink sm:text-7xl">SIGNAL_LOST</h1>
      <p className="mt-4 max-w-md text-muted">
        The requested resource is not on this node. It may have been moved, retired, or never
        existed.
      </p>
      <NeonButton
        type="button"
        onClick={() => navigate('/')}
        accent="cyan"
        variant="solid"
        className="mt-8"
      >
        RETURN_TO_BASE
      </NeonButton>
    </section>
  )
}
