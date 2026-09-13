import { useEffect, useState } from 'react'

/**
 * useScrollSpy — returns the id of the section currently in view.
 * @param {string[]} ids  section element ids, in document order
 * @param {number} offset  px from the top counted as "active" (nav height)
 */
export function useScrollSpy(ids, offset = 100) {
  const [activeId, setActiveId] = useState(ids[0])

  useEffect(() => {
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean)

    if (!sections.length) return

    const onScroll = () => {
      const pos = window.scrollY + offset + 1
      let current = sections[0].id
      for (const section of sections) {
        if (section.offsetTop <= pos) current = section.id
      }
      // Near the bottom of the page, force the last section active.
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 2) {
        current = sections[sections.length - 1].id
      }
      setActiveId(current)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [ids, offset])

  return activeId
}

export default useScrollSpy
