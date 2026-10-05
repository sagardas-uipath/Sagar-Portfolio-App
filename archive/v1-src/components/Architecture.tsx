import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion'
import { Pause, Play } from 'lucide-react'
import { Fragment, useRef, useState } from 'react'
import { EASE, inView } from '../animations/variants'
import { architecture } from '../data/portfolio'
import type { ArchitectureNode as Node } from '../data/types'
import { Icon } from './ui/Icon'
import { SectionHeader } from './ui/SectionHeader'

const all = [...architecture.tiers, ...architecture.branches, ...architecture.base]

function ArchitectureNode({ node, selected, onSelect, compact = false }: { node: Node; selected: boolean; onSelect: (id: string) => void; compact?: boolean }) {
  return (
    <motion.button
      onClick={() => onSelect(node.id)}
      aria-pressed={selected}
      aria-label={`${node.label}: show details`}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      className={`relative z-10 flex w-full items-center gap-3 rounded-xl border text-left transition-[border-color,background-color,box-shadow] duration-300 ${
        compact ? 'flex-col justify-center px-2 py-3 text-center sm:flex-row sm:px-3 sm:text-left' : 'px-4 py-3'
      } ${
        selected
          ? 'border-signal/60 bg-[#121a2c] shadow-[0_0_0_4px_rgb(110_155_255/0.08),0_10px_40px_-12px_rgb(110_155_255/0.45)]'
          : 'border-white/[0.09] bg-ink-900 hover:border-white/20'
      }`}
    >
      <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border ${selected ? 'border-signal/50 text-signal' : 'border-white/10 text-fg-muted'}`}>
        <Icon name={node.icon} className="h-4 w-4" />
      </span>
      <span className="min-w-0">
        <span className="block text-sm font-semibold text-fg">{node.label}</span>
        <span className={`block text-xs text-fg-subtle ${compact ? 'hidden sm:block' : ''}`}>{node.sublabel}</span>
      </span>
    </motion.button>
  )
}

/** Vertical connector with data packets travelling downward. */
function Connector({ running, delay = 0 }: { running: boolean; delay?: number }) {
  return (
    <div aria-hidden="true" className="relative mx-auto h-9 w-px bg-gradient-to-b from-white/25 to-white/10">
      {running &&
        [0, 0.7].map((d) => (
          <motion.span
            key={d}
            className="absolute -left-[2px] h-[5px] w-[5px] rounded-full bg-signal shadow-[0_0_8px_2px_rgb(110_155_255/0.6)]"
            initial={{ top: '-5%', opacity: 0 }}
            animate={{ top: ['-5%', '100%'], opacity: [0, 1, 1, 0] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut', delay: delay + d }}
          />
        ))}
    </div>
  )
}

/** Fan-out / fan-in between one node and three branch nodes (columns at 1/6, 1/2, 5/6 of the width). */
function Fan({ direction, running }: { direction: 'out' | 'in'; running: boolean }) {
  const paths =
    direction === 'out'
      ? ['M225,0 C225,24 75,20 75,48', 'M225,0 L225,48', 'M225,0 C225,24 375,20 375,48']
      : ['M75,0 C75,28 225,24 225,48', 'M225,0 L225,48', 'M375,0 C375,28 225,24 225,48']
  return (
    <svg aria-hidden="true" viewBox="0 0 450 48" preserveAspectRatio="none" className="block h-12 w-full overflow-visible">
      {paths.map((d, i) => (
        <g key={d}>
          <path d={d} fill="none" stroke="rgb(255 255 255 / 0.22)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
          {running && (
            <circle r="2.5" fill={direction === 'out' ? '#6E9BFF' : '#4FD1C5'}>
              <animateMotion dur="1.6s" repeatCount="indefinite" begin={`${i * 0.35}s`} path={d} />
            </circle>
          )}
        </g>
      ))}
    </svg>
  )
}

function NodeInfo({ node }: { node: Node }) {
  const position = all.findIndex((n) => n.id === node.id) + 1
  return (
    <motion.div key={node.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} transition={{ duration: 0.3, ease: EASE }}>
      <div className="flex items-center justify-between">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-signal/40 bg-signal/10 text-signal">
          <Icon name={node.icon} className="h-5 w-5" />
        </span>
        <span className="font-mono text-[0.65rem] text-fg-subtle">
          COMPONENT {String(position).padStart(2, '0')} / {String(all.length).padStart(2, '0')}
        </span>
      </div>
      <h3 className="mt-5 text-2xl font-bold text-fg">{node.label}</h3>
      <p className="mt-1 font-mono text-xs text-signal">{node.sublabel}</p>
      <p className="mt-4 leading-relaxed text-fg-muted">{node.purpose}</p>
      <ul className="mt-5 space-y-2">
        {node.capabilities.map((c) => (
          <li key={c} className="flex items-center gap-3 text-sm text-fg">
            <span className="h-1 w-1 rounded-full bg-teal" aria-hidden="true" />
            {c}
          </li>
        ))}
      </ul>
    </motion.div>
  )
}

function InlineInfo({ node, show }: { node: Node | undefined; show: boolean }) {
  return (
    <AnimatePresence initial={false}>
      {show && node && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.35, ease: EASE }}
          className="overflow-hidden lg:hidden"
        >
          <div className="glass mt-3 rounded-xl p-5">
            <NodeInfo node={node} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export function Architecture() {
  const ref = useRef<HTMLDivElement>(null)
  const visible = useInView(ref, { margin: '-10% 0px' })
  const reduce = useReducedMotion()
  const [paused, setPaused] = useState(false)
  const [selected, setSelected] = useState('agent')
  const running = visible && !paused && !reduce
  const node = all.find((n) => n.id === selected)
  const isIn = (list: Node[]) => list.some((n) => n.id === selected)
  const { tiers, branches, base } = architecture

  return (
    <section id="architecture" aria-labelledby="architecture-title" className="section-y relative overflow-hidden">
      <div aria-hidden="true" className="grid-bg pointer-events-none absolute inset-0 opacity-40" />
      <div className="container-x relative">
        <SectionHeader
          id="architecture-title"
          index="05"
          eyebrow="Architecture"
          title="How intelligent automation fits together"
          description="A reference architecture for enterprise automation — from the person asking, through AI and orchestration, to the systems of record and the business result. Select any component."
        />

        <div className="grid gap-8 lg:grid-cols-[1.25fr_1fr] lg:gap-14">
          <motion.div ref={ref} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={inView} transition={{ duration: 0.8, ease: EASE }} className="surface rounded-3xl p-4 sm:p-8">
            <div className="mb-6 flex items-center justify-between">
              <span className="font-mono text-[0.68rem] text-fg-subtle">reference-architecture.v1</span>
              {!reduce && (
                <button
                  onClick={() => setPaused((p) => !p)}
                  className="inline-flex min-h-9 items-center gap-1.5 rounded-full border border-white/10 px-3 font-mono text-[0.68rem] text-fg-muted transition hover:text-fg"
                  aria-label={paused ? 'Resume data-flow animation' : 'Pause data-flow animation'}
                >
                  {paused ? <Play className="h-3 w-3" /> : <Pause className="h-3 w-3" />}
                  {paused ? 'Resume flow' : 'Pause flow'}
                </button>
              )}
            </div>

            <div className="mx-auto max-w-md">
              {tiers.map((n, i) => (
                <Fragment key={n.id}>
                  <ArchitectureNode node={n} selected={selected === n.id} onSelect={setSelected} />
                  <InlineInfo node={node} show={selected === n.id} />
                  {i < tiers.length - 1 && <Connector running={running} delay={i * 0.25} />}
                </Fragment>
              ))}
            </div>

            <div className="mx-auto max-w-xl">
              <Fan direction="out" running={running} />
              <div className="grid grid-cols-3 gap-2 sm:gap-3">
                {branches.map((n) => (
                  <ArchitectureNode key={n.id} node={n} compact selected={selected === n.id} onSelect={setSelected} />
                ))}
              </div>
              <InlineInfo node={node} show={isIn(branches)} />
              <Fan direction="in" running={running} />
            </div>

            <div className="mx-auto max-w-md">
              {base.map((n, i) => (
                <Fragment key={n.id}>
                  {i > 0 && <Connector running={running} delay={0.4} />}
                  <ArchitectureNode node={n} selected={selected === n.id} onSelect={setSelected} />
                  <InlineInfo node={node} show={selected === n.id} />
                </Fragment>
              ))}
            </div>
          </motion.div>

          <aside className="hidden lg:block" aria-live="polite">
            <div className="glass sticky top-24 rounded-3xl p-8">
              <AnimatePresence mode="wait">{node && <NodeInfo key={node.id} node={node} />}</AnimatePresence>
              <div className="mt-8 border-t border-white/[0.07] pt-6">
                <p className="eyebrow mb-3 !text-[0.62rem]">Design principles</p>
                <ul className="space-y-2 text-sm text-fg-muted">
                  <li>APIs before UI automation, wherever available</li>
                  <li>Humans in the loop for low-confidence decisions</li>
                  <li>Every transaction logged, retried and recoverable</li>
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}
