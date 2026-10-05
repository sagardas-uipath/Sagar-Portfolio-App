import { motion } from 'framer-motion'
import { Check, Loader2, Play, RotateCcw } from 'lucide-react'
import { Fragment, useState } from 'react'
import { EASE } from '../../animations/variants'
import { demo } from '../../data/portfolio'
import { useSequence } from '../../hooks/useSequence'
import { Button } from '../ui/Button'

type Phase = 'idle' | 'Initializing…' | 'Processing…' | 'Validating…' | 'Completed'

const time = () => new Date().toLocaleTimeString('en-GB', { hour12: false })

export function WorkflowDemo() {
  const steps = demo.workflow
  const [active, setActive] = useState(-1)
  const [phase, setPhase] = useState<Phase>('idle')
  const [log, setLog] = useState<{ t: string; m: string }[]>([])
  const { run, cancel } = useSequence()
  const running = phase !== 'idle' && phase !== 'Completed'

  const start = () => {
    setLog([])
    setActive(-1)
    run(async (wait) => {
      setPhase('Initializing…')
      await wait(700)
      for (let i = 0; i < steps.length; i++) {
        setPhase(i < 3 ? 'Processing…' : i < 5 ? 'Validating…' : 'Processing…')
        setActive(i)
        setLog((l) => [...l, { t: time(), m: steps[i].log }])
        await wait(850)
      }
      setActive(steps.length)
      setPhase('Completed')
    })
  }

  const reset = () => {
    cancel()
    setActive(-1)
    setPhase('idle')
    setLog([])
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3" aria-live="polite">
          <span className="eyebrow !text-[0.62rem]">Status</span>
          {/* Entrance-only swap: status must never lag behind the real state. */}
          <motion.span
            key={phase}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className={`inline-flex items-center gap-2 font-mono text-sm ${phase === 'Completed' ? 'text-ok' : phase === 'idle' ? 'text-fg-subtle' : 'text-signal'}`}
          >
            {running && <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden="true" />}
            {phase === 'idle' ? 'Ready' : phase === 'Completed' ? 'Completed ✓' : phase}
          </motion.span>
        </div>
        <div className="flex gap-2">
          {phase !== 'idle' && (
            <Button variant="ghost" onClick={reset}>
              <RotateCcw className="h-4 w-4" aria-hidden="true" /> Reset
            </Button>
          )}
          <Button onClick={start} disabled={running}>
            <Play className="h-4 w-4" aria-hidden="true" /> Run Automation
          </Button>
        </div>
      </div>

      {/* Flow */}
      <ol className="mt-8 flex flex-col gap-0 md:flex-row md:items-center">
        {steps.map((s, i) => {
          const state = i < active ? 'done' : i === active ? 'active' : 'idle'
          return (
            <Fragment key={s.id}>
              <li className="md:flex-1">
                <motion.div
                  animate={state === 'active' ? { scale: 1.04 } : { scale: 1 }}
                  transition={{ duration: 0.3, ease: EASE }}
                  className={`flex items-center gap-3 rounded-xl border px-3 py-3 transition-colors duration-300 md:flex-col md:px-2 md:py-4 md:text-center ${
                    state === 'active'
                      ? 'border-signal/60 bg-signal/10 shadow-[0_0_30px_-10px_rgb(110_155_255/0.7)]'
                      : state === 'done'
                        ? 'border-teal/30 bg-teal/[0.05]'
                        : 'border-white/[0.08] bg-white/[0.02]'
                  }`}
                >
                  <span
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border font-mono text-[0.65rem] ${
                      state === 'done' ? 'border-teal/50 text-teal' : state === 'active' ? 'border-signal text-signal' : 'border-white/15 text-fg-subtle'
                    }`}
                  >
                    {state === 'done' ? <Check className="h-3.5 w-3.5" aria-hidden="true" /> : state === 'active' ? <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden="true" /> : i + 1}
                  </span>
                  <span className={`text-sm font-medium ${state === 'idle' ? 'text-fg-muted' : 'text-fg'}`}>{s.label}</span>
                </motion.div>
              </li>
              {i < steps.length - 1 && (
                <li aria-hidden="true" className="relative ml-[1.6rem] h-4 w-px bg-white/10 md:ml-0 md:h-px md:w-6 md:flex-none">
                  <motion.span
                    className="absolute inset-0 origin-top bg-teal md:origin-left"
                    initial={false}
                    animate={{ scale: i < active ? 1 : 0 }}
                    transition={{ duration: 0.35 }}
                  />
                </li>
              )}
            </Fragment>
          )
        })}
      </ol>

      {/* Console */}
      <div className="mt-6 rounded-xl border border-white/[0.07] bg-ink-950/70 p-4 font-mono text-xs">
        <p className="mb-2 text-fg-subtle">orchestrator.log</p>
        <ul className="min-h-[8.5rem] space-y-1.5" aria-live="polite">
          {log.length === 0 && <li className="text-fg-subtle">Waiting for trigger — press “Run Automation”.</li>}
          {log.map((l, i) => (
            <motion.li key={i} initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} className="flex gap-3">
              <span className="text-fg-subtle">{l.t}</span>
              <span className="text-fg-muted">{l.m}</span>
            </motion.li>
          ))}
          {phase === 'Completed' && (
            <motion.li initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-ok">
              ✓ Run completed — 1 transaction, 0 exceptions
            </motion.li>
          )}
        </ul>
      </div>
    </div>
  )
}
