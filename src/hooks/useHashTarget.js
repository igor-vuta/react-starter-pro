import { useEffect } from 'react'

/**
 * Resolves a deep link on first load.
 *
 * The browser tries to scroll to `location.hash` while parsing the document,
 * which is before React has rendered anything — so the target element does not
 * exist yet and the attempt is silently dropped. Re-running the scroll after
 * the first paint makes shared section links work.
 */
export function useHashTarget() {
  useEffect(() => {
    if (!window.location.hash) return

    const id = decodeURIComponent(window.location.hash.slice(1))
    const target = document.getElementById(id)
    if (!target) return

    // Stop the browser restoring the previous scroll offset on reload; it
    // runs after this effect and would otherwise overwrite the jump.
    const previousRestoration = history.scrollRestoration
    history.scrollRestoration = 'manual'

    // Two frames: the first lets React commit, the second lets layout settle
    // once fonts have applied, so the measured offset matches what is painted.
    let inner
    const outer = window.requestAnimationFrame(() => {
      inner = window.requestAnimationFrame(() => {
        target.scrollIntoView({ block: 'start', behavior: 'instant' })
      })
    })

    return () => {
      window.cancelAnimationFrame(outer)
      window.cancelAnimationFrame(inner)
      history.scrollRestoration = previousRestoration
    }
  }, [])
}
