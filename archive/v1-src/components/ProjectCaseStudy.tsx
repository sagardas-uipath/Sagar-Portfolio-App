import { motion, useInView } from 'framer-motion'
import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react'
import { Fragment, useEffect, useRef, type ReactNode } from 'react'
import { EASE } from '../animations/variants'
import type { Project } from '../data/types'
import { useStepCycle } from '../hooks/useStepCycle'
import { AnimatedCounter } from './ui/AnimatedCounter'
import { Badge } from './ui/Badge'
import { Icon } from './ui/Icon'

function Stage({ n, title, children }: { n: number; title: string; children: ReactNode }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -8% 0px' }}
      transition={{ duration: 0.55, ease: EASE }}
      className="relative pb-10 pl-10 last:pb-0 sm:pl-14"
    >
      <span className="absolute left-0 top-0 flex h-7 w-7 items-center justify-center rounded-full border border-signal/40 bg-ink-900 font-mono text-[0.65rem] text-signal sm:h-8 sm:w-8">
        {String(n).padStart(2, '0')}
      </span>
      <h3 className="eyebrow !text-[0.7rem] !text-fg-muted pt-1.5">{title}</h3>
      <div className="mt-3">{children}</div>
    </motion.section>
  )
}

/** Animated automation flow: a packet walks the steps, completed steps turn teal. */
function FlowRunner({ steps }: { steps: string[] }) {
  const ref = useRef<HTMLOListElement>(null)
  const visible = useInView(ref, { margin: '-10% 0px' })
  const step = useStepCycle(steps.length, visible, 800, 2200)
  return (
    <ol ref={ref} className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:gap-y-3">
      {steps.map((s, i) => (
        <Fragment key={s}>
          <li
            className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-xs font-medium transition-all duration-500 ${
              i === step ? 'border-signal/60 bg-signal/10 text-fg' : i < step ? 'border-teal/30 bg-teal/[0.06] text-fg' : 'border-white/[0.08] text-fg-subtle'
            }`}
          >
            {i < step ? <CheckCircle2 className="h-3.5 w-3.5 text-teal" aria-hidden="true" /> : <span className={`h-1.5 w-1.5 rounded-full ${i === step ? 'bg-signal' : 'bg-white/20'}`} aria-hidden="true" />}
            {s}
          </li>
          {i < steps.length - 1 && (
            <li aria-hidden="true" className="relative ml-4 h-3 w-px bg-white/10 sm:ml-0 sm:h-px sm:w-5">
              {i === step - 1 && <motion.span className="absolute inset-0 bg-teal" initial={{ scale: 0 }} animate={{ scale: 1 }} style={{ originX: 0, originY: 0 }} transition={{ duration: 0.4 }} />}
            </li>
          )}
        </Fragment>
      ))}
    </ol>
  )
}

type Props = { project: Project; total: number; onPrev: () => void; onNext: () => void }

export function ProjectCaseStudy({ project, total, onPrev, onNext }: Props) {
  const cs = project.caseStudy
  const ref = useRef<HTMLElement>(null)
  // Start each case study from the top when paging between projects.
  useEffect(() => {
    ref.current?.scrollIntoView({ block: 'start' })
  }, [project.id])
  return (
    <article ref={ref} className="px-5 pb-8 pt-6 sm:px-10 sm:pb-10 sm:pt-10">
      <header className="pr-12">
        <p className="eyebrow flex flex-wrap items-center gap-2">
          <span className="text-signal">Case Study {project.index}</span>
          <span aria-hidden="true">·</span>
          {project.category}
          {project.domain && (
            <>
              <span aria-hidden="true">·</span>
              {project.domain}
            </>
          )}
        </p>
        <h2 className="mt-4 text-2xl font-bold leading-tight text-fg sm:text-4xl">{project.title}</h2>
        <p className="mt-4 max-w-3xl leading-relaxed text-fg-muted">{project.summary}</p>
        <ul className="mt-6 flex flex-wrap gap-2" aria-label="Technologies">
          {project.technologies.map((t) => (
            <li key={t}>
              <Badge tone="signal">{t}</Badge>
            </li>
          ))}
        </ul>
      </header>

      <div className="relative mt-12">
        <span aria-hidden="true" className="absolute bottom-4 left-[0.85rem] top-4 w-px bg-gradient-to-b from-signal/40 via-white/10 to-teal/40 sm:left-4" />

        <Stage n={1} title="Business Problem">
          <p className="text-lg leading-relaxed text-fg">{cs.problem}</p>
        </Stage>
        <Stage n={2} title="Current Process">
          <p className="leading-relaxed text-fg-muted">{cs.currentProcess}</p>
        </Stage>
        <Stage n={3} title="Automation Opportunity">
          <p className="leading-relaxed text-fg-muted">{cs.opportunity}</p>
        </Stage>
        <Stage n={4} title="Solution">
          <p className="leading-relaxed text-fg">{cs.solution}</p>
        </Stage>
        <Stage n={5} title="Architecture">
          <ol className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {cs.architecture.map((a, i) => (
              <motion.li
                key={a.layer}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.4 }}
                className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-4"
              >
                <p className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-signal">{a.layer}</p>
                <p className="mt-1.5 text-sm text-fg">{a.detail}</p>
              </motion.li>
            ))}
          </ol>
        </Stage>
        <Stage n={6} title="Automation Flow">
          <FlowRunner steps={cs.flow} />
        </Stage>
        <Stage n={7} title="Business Outcome">
          <div className="grid gap-4 sm:grid-cols-[auto_1fr] sm:items-start">
            {project.outcomeMetric && (
              <div className="rounded-2xl border border-teal/25 bg-teal/[0.06] px-6 py-5">
                <p className="font-display text-4xl font-bold text-teal">
                  <AnimatedCounter value={project.outcomeMetric.value} suffix={project.outcomeMetric.suffix} />
                </p>
                <p className="mt-1 text-sm text-fg-muted">{project.outcomeMetric.label}</p>
              </div>
            )}
            <ul className="space-y-2.5">
              {cs.outcomes.map((o) => (
                <li key={o} className="flex gap-3 text-fg">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-teal" aria-hidden="true" />
                  {o}
                </li>
              ))}
            </ul>
          </div>
        </Stage>
      </div>

      <footer className="mt-12 flex items-center justify-between gap-3 border-t border-white/[0.07] pt-6">
        <button onClick={onPrev} className="inline-flex min-h-11 items-center gap-2 rounded-full px-3 text-sm text-fg-muted transition hover:text-fg">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Previous
        </button>
        <span className="flex items-center gap-2 text-fg-subtle">
          <Icon name={project.icon} className="h-4 w-4" />
          <span className="font-mono text-xs">{project.index} / {String(total).padStart(2, '0')}</span>
        </span>
        <button onClick={onNext} className="inline-flex min-h-11 items-center gap-2 rounded-full px-3 text-sm text-fg-muted transition hover:text-fg">
          Next <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </button>
      </footer>
    </article>
  )
}
