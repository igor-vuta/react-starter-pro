import { useState } from 'react'
import { useOnScroll } from './useOnScroll'

const READING_LINE = 120 // px from the top of the viewport

/**
 * Reports which of the given section ids is the reader's current position,
 * for highlighting the table of contents.
 *
 * A "most visible wins" IntersectionObserver flickers on short sections, so
 * this instead picks the last heading that has passed a notional reading line
 * near the top of the viewport.
 */
export function useActiveSection(ids) {
  const [activeId, setActiveId] = useState(ids[0] ?? null)

  useOnScroll(() => {
    let current = ids[0] ?? null

    for (const id of ids) {
      const element = document.getElementById(id)
      if (!element) continue
      if (element.getBoundingClientRect().top <= READING_LINE) current = id
    }

    // At the very bottom the final section may never cross the reading line,
    // so select it explicitly rather than leaving the previous one lit.
    if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 2) {
      current = ids[ids.length - 1] ?? current
    }

    setActiveId(current)
  })

  return activeId
}
