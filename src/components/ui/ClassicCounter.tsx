import { useInView } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

/**
 * Classic count-up: once in view, the number ticks 1, 2, 3 … and stops on `value`.
 * Cinematic pacing — a short beat before the first tick, then each step takes a little longer than
 * the last, so the count eases into its final number.
 * Plain digit changes only (no motion), so it also runs under reduced motion.
 * The final value's width is reserved up-front so the layout never shifts.
 */
export function ClassicCounter({ value, stepMs = 240, startDelayMs = 300 }: { value: number; stepMs?: number; startDelayMs?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const seen = useInView(ref, { once: true, margin: '0px 0px -15% 0px' })
  const [n, setN] = useState(1)

  useEffect(() => {
    if (!seen || value <= 1) return
    let current = 1
    let timer: number
    const tick = () => {
      current += 1
      setN(current)
      if (current < value) {
        // Decelerate by step number (not by target), so several counters tick in unison
        // and simply stop at different values: ~240, 252, 264, 276 … ms.
        timer = window.setTimeout(tick, stepMs * (1 + 0.05 * (current - 1)))
      }
    }
    timer = window.setTimeout(tick, startDelayMs + stepMs)
    return () => window.clearTimeout(timer)
  }, [seen, value, stepMs, startDelayMs])

  return (
    <span ref={ref} className="relative inline-block tabular-nums">
      <span className="invisible">{value}</span>
      <span className="absolute inset-0">{n}</span>
    </span>
  )
}
