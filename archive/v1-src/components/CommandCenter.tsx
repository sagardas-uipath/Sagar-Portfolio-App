import { motion, useInView, useReducedMotion } from 'framer-motion'
import { Activity, Bot, CheckCircle2, Plug, Workflow } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { EASE, fadeUp, inView, stagger } from '../animations/variants'
import { demo } from '../data/portfolio'
import { AnimatedCounter } from './ui/AnimatedCounter'
import { DemoBadge } from './ui/Badge'
import { SectionHeader } from './ui/SectionHeader'
import { StatusIndicator } from './ui/StatusIndicator'

const cc = demo.commandCenter

// Deterministic throughput series for the sparkline.
const series = Array.from({ length: 32 }, (_, i) => 40 + Math.sin(i / 2.6) * 14 + Math.sin(i * 1.7) * 6 + i * 0.9)

function Sparkline() {
  const W = 300
  const H = 72
  const max = Math.max(...series)
  const min = Math.min(...series)
  const pts = series.map((v, i) => [(i / (series.length - 1)) * W, H - ((v - min) / (max - min)) * (H - 8) - 4])
  const line = pts.map(([x, y], i) => `${i ? 'L' : 'M'}${x.toFixed(1)},${y.toFixed(1)}`).join(' ')
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="h-20 w-full" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <linearGradient id="spark-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#6E9BFF" stopOpacity="0.25" />
          <stop offset="1" stopColor="#6E9BFF" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={`${line} L${W},${H} L0,${H} Z`} fill="url(#spark-fill)" />
      <motion.path d={line} fill="none" stroke="#6E9BFF" strokeWidth="1.5" vectorEffect="non-scaling-stroke" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.6, ease: EASE }} />
    </svg>
  )
}

/** Ticks the demo transaction count upward while the dashboard is on screen. */
function useLiveCount(base: number, active: boolean) {
  const reduce = useReducedMotion()
  const [n, setN] = useState(base)
  useEffect(() => {
    if (!active || reduce) return
    const t = window.setInterval(() => setN((v) => v + 1 + Math.floor(Math.random() * 3)), 2600)
    return () => window.clearInterval(t)
  }, [active, reduce])
  return n
}

export function CommandCenter() {
  const ref = useRef<HTMLDivElement>(null)
  const visible = useInView(ref, { margin: '-15% 0px' })
  const [counted, setCounted] = useState(false)
  const live = useLiveCount(cc.transactions, visible && counted)

  useEffect(() => {
    if (!visible || counted) return
    const t = window.setTimeout(() => setCounted(true), 1800)
    return () => window.clearTimeout(t)
  }, [visible, counted])

  const tiles = [
    { label: 'Active Automations', value: cc.activeAutomations, icon: Workflow },
    { label: 'AI Workflows', value: cc.aiWorkflows, icon: Bot },
    { label: 'API Integrations', value: cc.apiIntegrations, icon: Plug },
  ]

  return (
    <section id="command-center" aria-labelledby="cc-title" className="section-y relative">
      <div className="container-x">
        <SectionHeader
          id="cc-title"
          eyebrow="Command Center"
          title="Built to be operated, not just built"
          description="Enterprise automation lives in a control room. This is a demo of the operational view I design for: health, throughput and exceptions at a glance."
        />

        <motion.div ref={ref} variants={stagger(0.06)} initial="hidden" whileInView="show" viewport={inView} className="surface rounded-3xl p-4 sm:p-6">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-fg-muted">
              <span className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-fg-subtle">Automation status</span>
              <StatusIndicator label="Production" tone="ok" />
              <StatusIndicator label="Healthy" tone="ok" />
              <StatusIndicator label="Monitoring" tone="signal" />
            </div>
            <DemoBadge label="Demo values" />
          </div>

          <div className="grid gap-3 lg:grid-cols-4">
            {/* Transactions + sparkline */}
            <motion.div variants={fadeUp} className="rounded-2xl border border-white/[0.07] bg-ink-950/50 p-5 lg:col-span-2">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs text-fg-muted">Transactions processed</p>
                  <p className="mt-1 font-display text-4xl font-bold tabular-nums text-fg">{counted ? live.toLocaleString('en-US') : <AnimatedCounter value={cc.transactions} />}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-fg-muted">Success rate</p>
                  <p className="mt-1 font-display text-2xl font-bold text-ok">
                    <AnimatedCounter value={cc.successRate} suffix="%" />
                  </p>
                </div>
              </div>
              <Sparkline />
            </motion.div>

            {/* Queue */}
            <motion.div variants={fadeUp} className="rounded-2xl border border-white/[0.07] bg-ink-950/50 p-5 lg:col-span-2">
              <div className="flex items-center justify-between">
                <p className="text-xs text-fg-muted">Queue · Invoice Intake</p>
                <p className="font-mono text-sm text-fg">
                  <AnimatedCounter value={cc.queueProgress} suffix="%" />
                </p>
              </div>
              <div className="mt-3 flex gap-[3px]" role="progressbar" aria-valuenow={cc.queueProgress} aria-valuemin={0} aria-valuemax={100} aria-label="Queue progress (demo)">
                {Array.from({ length: 28 }, (_, i) => (
                  <motion.span
                    key={i}
                    className={`h-6 flex-1 rounded-[3px] ${i / 28 < cc.queueProgress / 100 ? 'bg-signal' : 'bg-white/[0.06]'}`}
                    initial={{ opacity: 0.15 }}
                    whileInView={{ opacity: i / 28 < cc.queueProgress / 100 ? 0.4 + (i / 28) * 0.6 : 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.025, duration: 0.3 }}
                  />
                ))}
              </div>
              <ul className="mt-5 space-y-3">
                {cc.processes.map((p) => (
                  <li key={p.name} className="grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-1.5 text-xs sm:grid-cols-[10rem_1fr_auto]">
                    <span className="text-fg-muted">{p.name}</span>
                    <span className="col-span-2 row-start-2 h-1 overflow-hidden rounded-full bg-white/[0.06] sm:col-span-1 sm:row-start-auto">
                      <motion.span className="block h-full rounded-full bg-gradient-to-r from-signal to-teal" initial={{ width: 0 }} whileInView={{ width: `${p.progress}%` }} viewport={{ once: true }} transition={{ duration: 1, ease: EASE }} />
                    </span>
                    <span className={`font-mono ${p.status === 'Healthy' ? 'text-ok' : 'text-signal'}`}>{p.status}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {tiles.map((t) => (
              <motion.div key={t.label} variants={fadeUp} className="flex items-center gap-4 rounded-2xl border border-white/[0.07] bg-ink-950/50 p-5">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 text-fg-muted">
                  <t.icon className="h-4 w-4" aria-hidden="true" />
                </span>
                <div>
                  <p className="font-display text-2xl font-bold text-fg">
                    <AnimatedCounter value={t.value} />
                  </p>
                  <p className="text-xs text-fg-muted">{t.label}</p>
                </div>
              </motion.div>
            ))}
            <motion.div variants={fadeUp} className="flex items-center gap-4 rounded-2xl border border-ok/20 bg-ok/[0.04] p-5">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-ok/30 text-ok">
                <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
              </span>
              <div>
                <p className="flex items-center gap-2 font-display text-lg font-bold text-fg">
                  <Activity className="h-4 w-4 text-ok" aria-hidden="true" /> All systems normal
                </p>
                <p className="text-xs text-fg-muted">Production status</p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
