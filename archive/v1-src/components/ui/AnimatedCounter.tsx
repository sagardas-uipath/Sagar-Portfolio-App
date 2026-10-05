import { animate, useInView, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

/** Counts up once when scrolled into view. Renders the final value immediately under reduced motion. */
export function AnimatedCounter({ value, suffix = '', duration = 1.6 }: { value: number; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const seen = useInView(ref, { once: true, margin: '0px 0px -10% 0px' })
  const reduce = useReducedMotion()
  const [display, setDisplay] = useState(reduce ? value : 0)

  useEffect(() => {
    if (!seen) return
    if (reduce) {
      setDisplay(value)
      return
    }
    const controls = animate(0, value, { duration, ease: [0.16, 1, 0.3, 1], onUpdate: (v) => setDisplay(Math.round(v)) })
    return () => controls.stop()
  }, [seen, value, duration, reduce])

  return (
    <span ref={ref} className="tabular-nums">
      {display.toLocaleString('en-US')}
      {suffix}
    </span>
  )
}
