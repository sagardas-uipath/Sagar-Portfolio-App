import { motion } from 'framer-motion'
import { EASE, inView } from '../animations/variants'
import { about } from '../data/portfolio'
import type { IconKey } from '../data/types'
import { Icon } from './ui/Icon'
import { TiltCard } from './ui/TiltCard'

/**
 * Compact tech stack: icon + name tiles, all ten in one row on desktop (3 → 5 → 10 columns).
 * The one-line caption is a hover tooltip (and screen-reader text). Icons are generic symbols, not vendor logos.
 */
export function TechStack() {
  return (
    <div className="mt-20 sm:mt-24">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={inView}
        transition={{ duration: 0.6, ease: EASE }}
        className="mb-8 flex flex-wrap items-end justify-between gap-4 border-b border-white/[0.08] pb-6"
      >
        <div>
          <p className="flex items-center gap-3 font-mono text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-accent">
            <span className="h-px w-8 bg-accent" aria-hidden="true" />
            Tech stack
          </p>
          <h3 className="mt-3 text-2xl font-extrabold tracking-tight text-fg sm:text-3xl">Tools I build with</h3>
        </div>
        <p className="rounded-full border border-white/[0.08] bg-[#ffffff] px-3.5 py-1.5 text-xs font-medium text-fg-muted shadow-[0_1px_2px_rgb(15_23_42/0.05)]">
          <span className="font-semibold text-fg">{about.stack.length}</span> core technologies
        </p>
      </motion.div>

      <motion.ul
        initial="hidden"
        whileInView="show"
        viewport={inView}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05 } } }}
        className="grid grid-cols-3 gap-2.5 sm:grid-cols-5 sm:gap-3 lg:grid-cols-10"
        aria-label="Tech stack"
      >
        {about.stack.map((t) => (
          <motion.li key={t.name} title={t.caption} variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } } }}>
            <TiltCard max={0} className="group relative flex flex-col items-center overflow-hidden px-2 py-4 text-center">
              <span aria-hidden="true" className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-gradient-to-r from-accent to-accent-2 transition-transform duration-500 ease-out group-hover:scale-x-100" />
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-accent/15 to-accent-2/10 text-accent ring-1 ring-accent/10 transition-colors duration-300 group-hover:from-accent group-hover:to-accent-2 group-hover:text-[#ffffff]">
                <Icon name={t.icon} className="h-5 w-5" />
              </span>
              <p className="mt-2.5 text-[0.72rem] font-semibold leading-tight text-fg">{t.name}</p>
              {/* Caption kept for screen readers; sighted users get it as a hover tooltip */}
              <span className="sr-only">: {t.caption}</span>
            </TiltCard>
          </motion.li>
        ))}
      </motion.ul>

      {/* Languages and other platforms — short labelled rows, easy to scan */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={inView}
        transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
        className="mt-4 grid gap-3 lg:grid-cols-2"
      >
        <ChipGroup icon="code" label="Languages I code in" items={about.languages} mono />
        <ChipGroup icon="workflow" label="Also worked with" items={about.otherTools} />
      </motion.div>
    </div>
  )
}

function ChipGroup({ icon, label, items, mono = false }: { icon: IconKey; label: string; items: string[]; mono?: boolean }) {
  return (
    <div className="surface flex flex-col gap-3 rounded-2xl px-5 py-4 sm:flex-row sm:items-center">
      <p className="flex shrink-0 items-center gap-2 text-sm font-semibold text-fg sm:w-48">
        <Icon name={icon} className="h-4 w-4 text-accent" />
        {label}
      </p>
      <ul className="flex flex-wrap gap-2" aria-label={label}>
        {items.map((t) => (
          <li
            key={t}
            className={`rounded-lg border border-white/[0.08] bg-white/[0.03] px-2.5 py-1 text-xs font-semibold text-fg transition-colors hover:border-accent/30 hover:text-accent-soft ${mono ? 'font-mono' : ''}`}
          >
            {t}
          </li>
        ))}
      </ul>
    </div>
  )
}
