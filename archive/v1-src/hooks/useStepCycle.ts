import { useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'

/**
 * Advances an index through `count` steps while `running`, pausing on the last
 * step before looping. Under reduced motion it parks on the final step.
 */
export function useStepCycle(count: number, running: boolean, stepMs = 1100, holdMs = 1800) {
  const reduce = useReducedMotion()
  const [step, setStep] = useState(0)

  useEffect(() => {
    if (reduce) {
      setStep(count - 1)
      return
    }
    if (!running) return
    const delay = step === count - 1 ? holdMs : stepMs
    const t = window.setTimeout(() => setStep((s) => (s + 1) % count), delay)
    return () => window.clearTimeout(t)
  }, [step, running, count, stepMs, holdMs, reduce])

  return step
}
