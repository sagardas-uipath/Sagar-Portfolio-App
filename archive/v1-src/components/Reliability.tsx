import { AnimatePresence, motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { EASE, fadeUp, inView, stagger } from '../animations/variants'
import { reliability } from '../data/portfolio'
import { useStepCycle } from '../hooks/useStepCycle'
import { SectionHeader } from './ui/SectionHeader'

const loop = reliability.loop
const R = 42 // radius in % of the ring container

export function Reliability() {
  const ref = useRef<HTMLDivElement>(null)
  const visible = useInView(ref, { margin: '-20% 0px' })
  const [manual, setManual] = useState<number | null>(null)
  const auto = useStepCycle(loop.length, visible && manual === null, 1600, 1600)
  const active = manual ?? auto
  const stage = loop[active]
  const mobileActive = manual ?? 0

  return (
    <section id="reliability" aria-labelledby="reliability-title" className="section-y relative overflow-hidden">
      <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2 h-[36rem] w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-teal/[0.04] blur-[120px]" />
      <div className="container-x relative grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <div>
          <SectionHeader id="reliability-title" eyebrow="Production Support & Reliability" title={reliability.headline} description={reliability.intro} />
          <motion.ul variants={stagger(0.05)} initial="hidden" whileInView="show" viewport={inView} className="-mt-4 flex flex-wrap gap-2">
            {reliability.practices.map((p) => (
              <motion.li key={p} variants={fadeUp} className="rounded-full border border-white/10 bg-white/[0.02] px-3 py-1.5 text-xs text-fg-muted">
                {p}
              </motion.li>
            ))}
          </motion.ul>
        </div>

        <div ref={ref} onMouseLeave={() => setManual(null)}>
          {/* Ring (md+) */}
          <div className="relative mx-auto hidden aspect-square w-full max-w-[30rem] md:block">
            <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-hidden="true">
              <circle cx="50" cy="50" r={R} fill="none" stroke="rgb(255 255 255 / 0.08)" strokeWidth="0.3" />
              <motion.circle
                cx="50"
                cy="50"
                r={R}
                fill="none"
                stroke="url(#ring-g)"
                strokeWidth="0.5"
                strokeLinecap="round"
                transform="rotate(-90 50 50)"
                animate={{ pathLength: (active + 1) / loop.length }}
                transition={{ duration: 0.8, ease: EASE }}
              />
              <defs>
                <linearGradient id="ring-g" x1="0" y1="0" x2="1" y2="1">
                  <stop stopColor="#6E9BFF" />
                  <stop offset="1" stopColor="#4FD1C5" />
                </linearGradient>
              </defs>
            </svg>

            {loop.map((s, i) => {
              const a = (i / loop.length) * Math.PI * 2 - Math.PI / 2
              const on = i === active
              return (
                <button
                  key={s.id}
                  onMouseEnter={() => setManual(i)}
                  onFocus={() => setManual(i)}
                  onBlur={() => setManual(null)}
                  onClick={() => setManual(i)}
                  aria-pressed={on}
                  style={{ left: `${50 + R * Math.cos(a)}%`, top: `${50 + R * Math.sin(a)}%` }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full border px-3.5 py-2 font-mono text-[0.7rem] uppercase tracking-[0.12em] transition-all duration-300 ${
                    on ? 'border-signal/60 bg-[#121a2c] text-fg shadow-[0_0_30px_-6px_rgb(110_155_255/0.7)]' : i < active ? 'border-teal/30 bg-ink-900 text-fg-muted' : 'border-white/10 bg-ink-900 text-fg-subtle'
                  }`}
                >
                  {s.label}
                </button>
              )
            })}

            <div className="absolute inset-[24%] flex flex-col items-center justify-center text-center" aria-live="polite">
              <AnimatePresence mode="wait">
                <motion.div key={stage.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.3 }}>
                  <p className="font-mono text-[0.65rem] text-signal">
                    STEP {String(active + 1).padStart(2, '0')} / {String(loop.length).padStart(2, '0')}
                  </p>
                  <p className="mt-2 font-display text-2xl font-bold text-fg">{stage.label}</p>
                  <p className="mt-2 text-sm leading-relaxed text-fg-muted">{stage.description}</p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Stacked list (mobile) — no auto-advance, so content never shifts while reading */}
          <ol className="space-y-2 md:hidden">
            {loop.map((s, i) => (
              <li key={s.id}>
                <button
                  onClick={() => setManual(i)}
                  aria-expanded={i === mobileActive}
                  className={`w-full rounded-xl border px-4 py-3 text-left transition-colors duration-300 ${i === mobileActive ? 'border-signal/50 bg-signal/[0.07]' : 'border-white/[0.07] bg-white/[0.015]'}`}
                >
                  <span className="flex items-center gap-3">
                    <span className={`font-mono text-xs ${i <= mobileActive ? 'text-signal' : 'text-fg-subtle'}`}>{String(i + 1).padStart(2, '0')}</span>
                    <span className="font-display text-sm font-semibold uppercase tracking-[0.1em] text-fg">{s.label}</span>
                  </span>
                  <AnimatePresence initial={false}>
                    {i === mobileActive && (
                      <motion.span initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="block overflow-hidden">
                        <span className="block pt-2 text-sm text-fg-muted">{s.description}</span>
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
