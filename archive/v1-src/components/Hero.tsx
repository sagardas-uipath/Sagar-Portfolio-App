import { motion, useInView } from 'framer-motion'
import { ArrowDown, ArrowRight } from 'lucide-react'
import { Fragment, useRef } from 'react'
import { EASE } from '../animations/variants'
import { profile } from '../data/portfolio'
import { useStepCycle } from '../hooks/useStepCycle'
import { LinkButton } from './ui/Button'
import { Icon, type IconName } from './ui/Icon'
import { StatusIndicator } from './ui/StatusIndicator'
import { NetworkCanvas } from './NetworkCanvas'

const pipeline: { label: string; hint: string; icon: IconName }[] = [
  { label: 'User', hint: 'Request or business event', icon: 'users' },
  { label: 'AI / Agent', hint: 'Understands and decides', icon: 'bot' },
  { label: 'Automation', hint: 'Executes reliably', icon: 'workflow' },
  { label: 'API / Integration', hint: 'Connects systems', icon: 'plug' },
  { label: 'Enterprise Systems', hint: 'Systems of record', icon: 'server' },
  { label: 'Business Outcome', hint: 'Measurable result', icon: 'target' },
]

// Splits the headline so the configured phrase can carry the accent treatment.
const headlineParts = profile.headline.split(new RegExp(`(${profile.headlineHighlight})`))

function PipelineVertical({ step }: { step: number }) {
  return (
    <ol className="relative">
      {pipeline.map((p, i) => {
        const state = i < step ? 'done' : i === step ? 'active' : 'idle'
        return (
          <Fragment key={p.label}>
            <li
              className={`flex items-center gap-4 rounded-xl border px-4 py-3 transition-all duration-500 ${
                state === 'active' ? 'border-signal/40 bg-signal/[0.07]' : 'border-white/[0.06] bg-white/[0.015]'
              }`}
            >
              <span
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border transition-colors duration-500 ${
                  state === 'active' ? 'border-signal/50 text-signal shadow-[0_0_24px_-4px_rgb(110_155_255/0.6)]' : state === 'done' ? 'border-teal/30 text-teal' : 'border-white/10 text-fg-subtle'
                }`}
              >
                <Icon name={p.icon} className="h-4 w-4" />
              </span>
              <span className="min-w-0 flex-1">
                <span className={`block text-sm font-medium transition-colors ${state === 'idle' ? 'text-fg-muted' : 'text-fg'}`}>{p.label}</span>
                <span className="block text-xs text-fg-subtle">{p.hint}</span>
              </span>
              <span className={`font-mono text-[0.65rem] ${state === 'active' ? 'text-signal' : state === 'done' ? 'text-teal' : 'text-fg-subtle/60'}`}>
                {state === 'active' ? 'RUNNING' : state === 'done' ? 'DONE' : 'QUEUED'}
              </span>
            </li>
            {i < pipeline.length - 1 && (
              <li aria-hidden="true" className="relative ml-[2.15rem] h-5 w-px bg-white/10">
                {i === step && (
                  <motion.span
                    key={`pk-${step}`}
                    className="absolute -left-[2px] h-[5px] w-[5px] rounded-full bg-signal shadow-[0_0_10px_2px_rgb(110_155_255/0.7)]"
                    initial={{ top: '-10%' }}
                    animate={{ top: '100%' }}
                    transition={{ duration: 0.9, ease: 'easeInOut' }}
                  />
                )}
              </li>
            )}
          </Fragment>
        )
      })}
    </ol>
  )
}

function PipelineCompact({ step }: { step: number }) {
  return (
    <ol className="relative grid grid-cols-6 gap-1">
      <span aria-hidden="true" className="absolute left-[8%] right-[8%] top-[1.05rem] h-px bg-white/10" />
      <motion.span
        aria-hidden="true"
        className="absolute left-[8%] top-[1.05rem] h-px bg-gradient-to-r from-signal to-teal"
        animate={{ width: `${(step / (pipeline.length - 1)) * 84}%` }}
        transition={{ duration: 0.8, ease: EASE }}
      />
      {pipeline.map((p, i) => (
        <li key={p.label} className="relative flex flex-col items-center text-center">
          <span
            className={`relative flex h-[2.1rem] w-[2.1rem] items-center justify-center rounded-lg border bg-ink-900 transition-colors duration-500 ${
              i === step ? 'border-signal/60 text-signal' : i < step ? 'border-teal/40 text-teal' : 'border-white/10 text-fg-subtle'
            }`}
          >
            <Icon name={p.icon} className="h-3.5 w-3.5" />
          </span>
          <span className={`mt-2 text-[0.62rem] leading-tight ${i <= step ? 'text-fg-muted' : 'text-fg-subtle'}`}>{p.label}</span>
        </li>
      ))}
    </ol>
  )
}

export function Hero({ ready }: { ready: boolean }) {
  const panelRef = useRef<HTMLDivElement>(null)
  const panelVisible = useInView(panelRef)
  const step = useStepCycle(pipeline.length, ready && panelVisible)

  const reveal = (delay: number) => ({
    initial: { opacity: 0, y: 28 },
    animate: ready ? { opacity: 1, y: 0 } : undefined,
    transition: { duration: 0.9, ease: EASE, delay },
  })

  return (
    <section id="home" aria-labelledby="hero-title" className="relative flex min-h-[100svh] items-center overflow-hidden pb-16 pt-28 lg:pt-24">
      {/* Atmosphere */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="grid-bg absolute inset-0 opacity-70" />
        <div className="absolute -top-40 left-1/2 h-[42rem] w-[42rem] -translate-x-1/2 rounded-full bg-signal/[0.09] blur-[120px]" />
        <div className="absolute bottom-0 right-[-10rem] h-[30rem] w-[30rem] rounded-full bg-teal/[0.06] blur-[120px]" />
        <NetworkCanvas className="absolute inset-0 h-full w-full" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-ink-950" />
      </div>

      <div className="container-x relative grid items-center gap-14 lg:grid-cols-[1.25fr_0.75fr] lg:gap-16">
        <div>
          <motion.div {...reveal(0.05)}>
            <span className="glass inline-flex items-center rounded-full px-3.5 py-1.5 text-xs text-fg-muted">
              <StatusIndicator label={profile.status} />
            </span>
          </motion.div>

          <h1 id="hero-title" className="mt-6 lg:mt-7">
            <motion.span {...reveal(0.15)} className="block font-display text-lg font-semibold tracking-[0.02em] text-fg sm:text-xl">
              {profile.name}
            </motion.span>
            <motion.span {...reveal(0.22)} className="mt-2 flex flex-wrap gap-x-3 gap-y-1 font-mono text-[0.72rem] uppercase tracking-[0.16em] text-fg-subtle sm:text-xs">
              {profile.roleLine.map((r, i) => (
                <span key={r} className="flex items-center gap-3">
                  {i > 0 && <span className="text-signal/60" aria-hidden="true">|</span>}
                  {r}
                </span>
              ))}
            </motion.span>
            <motion.span
              {...reveal(0.32)}
              className="mt-6 block text-[2.6rem] font-extrabold leading-[1.02] tracking-[-0.035em] sm:text-6xl lg:text-[3.8rem] xl:text-[4.4rem]"
            >
              {headlineParts.map((part, i) =>
                part === profile.headlineHighlight ? <span key={i} className="text-gradient">{part}</span> : part,
              )}
            </motion.span>
          </h1>

          <motion.p {...reveal(0.45)} className="mt-5 max-w-xl text-base leading-relaxed text-fg-muted sm:text-lg">
            {profile.statement}
          </motion.p>

          <motion.div {...reveal(0.55)} className="mt-8 flex flex-wrap items-center gap-3">
            <LinkButton href="#projects">
              Explore My Work
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </LinkButton>
            <LinkButton href="#experience" variant="secondary">
              View Experience
            </LinkButton>
          </motion.div>

          <motion.dl {...reveal(0.65)} className="mt-12 grid max-w-xl grid-cols-3 gap-4 border-t border-white/[0.07] pt-6 text-sm">
            <div>
              <dt className="eyebrow !text-[0.62rem]">Focus</dt>
              <dd className="mt-1.5 text-fg-muted">AI · RPA · Agents</dd>
            </div>
            <div>
              <dt className="eyebrow !text-[0.62rem]">Domains</dt>
              <dd className="mt-1.5 text-fg-muted">{profile.domains.join(' · ')}</dd>
            </div>
            <div>
              <dt className="eyebrow !text-[0.62rem]">Based in</dt>
              <dd className="mt-1.5 text-fg-muted">{profile.location}</dd>
            </div>
          </motion.dl>
        </div>

        {/* Ecosystem visual */}
        <motion.div
          ref={panelRef}
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          animate={ready ? { opacity: 1, y: 0, scale: 1 } : undefined}
          transition={{ duration: 1, ease: EASE, delay: 0.5 }}
          aria-label="Animated illustration: a request flowing from user, through AI and automation, to a business outcome"
          role="img"
        >
          <div className="glass rounded-3xl p-4 shadow-[0_40px_100px_-40px_rgb(0_0_0/0.9)] sm:p-5">
            <div className="mb-4 flex items-center justify-between px-1">
              <span className="font-mono text-[0.68rem] text-fg-subtle">automation.pipeline</span>
              <StatusIndicator label="live" tone="signal" className="font-mono text-[0.68rem] text-fg-subtle" />
            </div>
            <div className="hidden lg:block">
              <PipelineVertical step={step} />
            </div>
            <div className="lg:hidden">
              <PipelineCompact step={step} />
            </div>
          </div>
        </motion.div>
      </div>

      <motion.a
        href="#snapshot"
        aria-label="Scroll to the professional snapshot"
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : undefined}
        transition={{ delay: 1.2 }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-fg-subtle transition hover:text-fg md:flex"
      >
        <span className="font-mono text-[0.62rem] uppercase tracking-[0.2em]">Scroll</span>
        <ArrowDown className="h-4 w-4" />
      </motion.a>
    </section>
  )
}
