import { useEffect, useRef } from 'react'

/**
 * Runs `callback` on scroll and resize, throttled to one call per animation
 * frame.
 *
 * Scroll fires far more often than the screen repaints, so an unthrottled
 * handler that calls setState re-renders many times per frame for no visible
 * benefit. The callback is held in a ref so that passing an inline function
 * does not re-subscribe on every render.
 */
export function useOnScroll(callback) {
  const callbackRef = useRef(callback)
  callbackRef.current = callback

  useEffect(() => {
    let frame = null

    function schedule() {
      if (frame !== null) return
      frame = window.requestAnimationFrame(() => {
        frame = null
        callbackRef.current()
      })
    }

    callbackRef.current()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)

    return () => {
      if (frame !== null) window.cancelAnimationFrame(frame)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
    }
  }, [])
}
