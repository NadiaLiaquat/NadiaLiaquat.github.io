import { useEffect, useRef, useState } from 'react'

/**
 * useReveal — adds an `is-visible` class (via `revealed` boolean) the first
 * time the element scrolls into view. Pair with the `.reveal` CSS utility.
 */
export function useReveal({ threshold = 0.15, rootMargin = '0px 0px -8% 0px' } = {}) {
  const ref = useRef(null)
  const [revealed, setRevealed] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || revealed) return

    if (typeof IntersectionObserver === 'undefined') {
      setRevealed(true)
      return
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setRevealed(true)
            io.disconnect()
          }
        })
      },
      { threshold, rootMargin },
    )

    io.observe(el)
    return () => io.disconnect()
  }, [revealed, threshold, rootMargin])

  return [ref, revealed]
}

export default useReveal
