import { motion, useInView } from 'framer-motion'
import { AlertTriangle, CheckCircle2, Loader2, RotateCcw } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { EASE, inView } from '../animations/variants'
import { demo } from '../data/portfolio'
import { useSequence } from '../hooks/useSequence'
import { DemoBadge } from './ui/Badge'
import { SectionHeader } from './ui/SectionHeader'

const STAGES = ['Functional Testing', 'Regression Testing', 'Integration Testing', 'End-to-End Testing', 'Release Validation']

export function TestAutomation() {
  const suite = demo.testSuite
  const ref = useRef<HTMLDivElement>(null)
  const visible = useInView(ref, { once: true, margin: '-20% 0px' })
  const [done, setDone] = useState(-1)
  const [runningIdx, setRunningIdx] = useState(-1)
  const { run } = useSequence()

  const execute = () => {
    setDone(-1)
    run(async (wait) => {
      for (let i = 0; i < suite.length; i++) {
        setRunningIdx(i)
        await wait(650)
        setDone(i)
      }
      setRunningIdx(-1)
    })
  }

  useEffect(() => {
    if (visible) execute()
  }, [visible])

  const finished = done === suite.length - 1
  const passed = suite.filter((t, i) => i <= done && t.status === 'pass').length
  const warned = suite.filter((t, i) => i <= done && t.status === 'warn').length
  const stageReached = Math.min(STAGES.length - 1, Math.floor(((done + 1) / suite.length) * STAGES.length) - (finished ? 0 : 1))

  return (
    <section id="testing" aria-labelledby="testing-title" className="section-y relative">
      <div className="container-x">
        <SectionHeader
          id="testing-title"
          eyebrow="Test Automation"
          title="Quality is engineered in, not inspected in"
          description="UiPath Test Automation across functional, regression, integration and end-to-end testing — so every release of an automation is as reliable as the last."
        />

        <div ref={ref} className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <ol className="relative space-y-3">
            {STAGES.map((s, i) => {
              const on = i <= stageReached
              return (
                <motion.li
                  key={s}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={inView}
                  transition={{ delay: i * 0.07, duration: 0.5, ease: EASE }}
                  className={`flex items-center gap-4 rounded-xl border px-4 py-3.5 transition-colors duration-500 ${on ? 'border-teal/30 bg-teal/[0.05]' : 'border-white/[0.07] bg-white/[0.015]'}`}
                >
                  <span className={`font-mono text-xs ${on ? 'text-teal' : 'text-fg-subtle'}`}>{String(i + 1).padStart(2, '0')}</span>
                  <span className={`flex-1 text-sm font-medium ${on ? 'text-fg' : 'text-fg-muted'}`}>{s}</span>
                  {on && <CheckCircle2 className="h-4 w-4 text-teal" aria-hidden="true" />}
                </motion.li>
              )
            })}
          </ol>

          <div className="surface rounded-2xl p-5 sm:p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="font-mono text-[0.68rem] text-fg-subtle">test-suite · release candidate</p>
              <DemoBadge label="Demo run" />
            </div>
            <ul className="mt-5 divide-y divide-white/[0.05]" aria-live="polite">
              {suite.map((t, i) => {
                const state = i <= done ? t.status : i === runningIdx ? 'running' : 'queued'
                return (
                  <li key={t.name} className="flex items-center gap-3 py-3 text-sm">
                    <span className="flex w-5 justify-center">
                      {state === 'pass' && (
                        <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 400, damping: 20 }}>
                          <CheckCircle2 className="h-4 w-4 text-ok" aria-label="Passed" />
                        </motion.span>
                      )}
                      {state === 'warn' && (
                        <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 400, damping: 20 }}>
                          <AlertTriangle className="h-4 w-4 text-warn" aria-label="Warning" />
                        </motion.span>
                      )}
                      {state === 'running' && <Loader2 className="h-4 w-4 animate-spin text-signal" aria-label="Running" />}
                      {state === 'queued' && <span className="h-1.5 w-1.5 rounded-full bg-white/20" aria-label="Queued" />}
                    </span>
                    <span className={`flex-1 ${state === 'queued' ? 'text-fg-subtle' : 'text-fg'}`}>{t.name}</span>
                    <span className="hidden font-mono text-[0.65rem] text-fg-subtle sm:block">{t.stage}</span>
                    <span className={`w-16 text-right font-mono text-[0.68rem] ${state === 'pass' ? 'text-ok' : state === 'warn' ? 'text-warn' : 'text-fg-subtle'}`}>
                      {state === 'pass' ? 'Passed' : state === 'warn' ? 'Warning' : state === 'running' ? 'Running' : 'Queued'}
                    </span>
                  </li>
                )
              })}
            </ul>
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.06] pt-4 text-xs">
              <span className="text-fg-muted">
                <span className="text-ok">{passed} passed</span>
                {warned > 0 && <span className="text-warn"> · {warned} warning</span>}
                {finished && <span> · release gate: review warning before deploy</span>}
              </span>
              <button onClick={execute} disabled={runningIdx !== -1} className="inline-flex min-h-11 items-center gap-2 text-fg-muted transition hover:text-fg disabled:opacity-40">
                <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" /> Re-run suite
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
