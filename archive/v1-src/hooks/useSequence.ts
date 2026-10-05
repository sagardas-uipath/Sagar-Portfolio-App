import { useCallback, useEffect, useRef } from 'react'

/**
 * Runs a timed sequence of async steps that can be cancelled (on re-run or unmount).
 * `wait(ms)` rejects silently after cancellation, ending the sequence.
 */
export function useSequence() {
  const runId = useRef(0)

  useEffect(() => () => void runId.current++, [])

  const run = useCallback(async (script: (wait: (ms: number) => Promise<void>) => Promise<void>) => {
    const id = ++runId.current
    const wait = (ms: number) =>
      new Promise<void>((resolve, reject) => {
        window.setTimeout(() => (id === runId.current ? resolve() : reject(new Error('cancelled'))), ms)
      })
    try {
      await script(wait)
    } catch {
      /* cancelled */
    }
  }, [])

  const cancel = useCallback(() => void runId.current++, [])
  return { run, cancel }
}
