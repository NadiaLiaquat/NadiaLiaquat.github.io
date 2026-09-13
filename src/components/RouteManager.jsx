import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * RouteManager — on navigation, either scrolls to the hash target (when
 * arriving on the home page with a "#section" hash) or resets scroll to top.
 */
export function RouteManager() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '')
      // Wait a frame so the target section is mounted.
      requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      })
      return
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [pathname, hash])

  return null
}

export default RouteManager
