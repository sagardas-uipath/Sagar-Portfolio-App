import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { useId, useRef, useState } from 'react'
import { EASE, inView } from '../animations/variants'
import { experience, profile } from '../data/portfolio'
import type { Role } from '../data/types'
import { Badge } from './ui/Badge'
import { GlassCard } from './ui/GlassCard'
import { SectionHeader } from './ui/SectionHeader'

function TimelineItem({ role, defaultOpen }: { role: Role; defaultOpen: boolean }) {
  const [open, setOpen] = useState(defaultOpen)
  const panelId = useId()

  return (
    <li className="relative grid gap-4 pl-12 md:grid-cols-[11rem_1fr] md:gap-12 md:pl-0">
      {/* Node */}
      <motion.span
        aria-hidden="true"
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={inView}
        transition={{ duration: 0.5, ease: EASE, delay: 0.1 }}
        className="absolute left-[0.6rem] top-2 flex h-4 w-4 items-center justify-center rounded-full border border-signal/60 bg-ink-950 md:left-[12rem]"
      >
        <span className={`h-1.5 w-1.5 rounded-full ${role.current ? 'bg-teal' : 'bg-signal'}`} />
      </motion.span>

      <motion.div initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={inView} transition={{ duration: 0.6, ease: EASE }} className="md:text-right">
        <p className="font-mono text-xs text-fg-subtle">
          {role.start} — {role.end}
        </p>
        {role.current && (
          <Badge tone="teal" className="mt-2">
            Current
          </Badge>
        )}
      </motion.div>

      <GlassCard
        interactive
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={inView}
        transition={{ duration: 0.7, ease: EASE }}
        className="p-6 sm:p-8 md:ml-12"
      >
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h3 className="text-xl font-bold text-fg sm:text-2xl">{role.title}</h3>
            <p className="mt-1 text-sm font-medium text-signal">{role.company}</p>
          </div>
        </div>
        <p className="mt-4 leading-relaxed text-fg-muted">{role.summary}</p>

        <button
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls={panelId}
          className="mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-medium text-fg transition hover:text-signal"
        >
          {open ? 'Hide responsibilities' : 'View responsibilities'}
          <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} aria-hidden="true" />
        </button>
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              id={panelId}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.45, ease: EASE }}
              className="overflow-hidden"
            >
              <ul className="space-y-2.5 pb-1 pt-2">
                {role.highlights.map((h) => (
                  <li key={h} className="flex gap-3 text-sm leading-relaxed text-fg-muted">
                    <span className="mt-[0.55rem] h-1 w-1 shrink-0 rounded-full bg-signal" aria-hidden="true" />
                    {h}
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.ul
          className="mt-6 flex flex-wrap gap-2 border-t border-white/[0.06] pt-5"
          initial="hidden"
          whileInView="show"
          viewport={inView}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.04, delayChildren: 0.3 } } }}
          aria-label="Technologies"
        >
          {role.technologies.map((t) => (
            <motion.li key={t} variants={{ hidden: { opacity: 0, y: 6 }, show: { opacity: 1, y: 0 } }}>
              <Badge tone="signal">{t}</Badge>
            </motion.li>
          ))}
        </motion.ul>
      </GlassCard>
    </li>
  )
}

export function Experience() {
  const ref = useRef<HTMLOListElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 75%', 'end 60%'] })
  const draw = useSpring(scrollYProgress, { stiffness: 120, damping: 26 })

  return (
    <section id="experience" aria-labelledby="experience-title" className="section-y relative">
      <div className="container-x">
        <SectionHeader
          id="experience-title"
          index="02"
          eyebrow="Experience"
          title="Five years of enterprise automation"
          description={`From Senior RPA Developer to Lead Engineer — delivering across ${profile.domains.join(', ')} with onsite and offshore teams.`}
        />

        <ol ref={ref} className="relative space-y-12 md:space-y-16">
          <span aria-hidden="true" className="absolute bottom-0 left-[1.1rem] top-2 w-px bg-white/[0.07] md:left-[12.5rem]" />
          <motion.span
            aria-hidden="true"
            style={{ scaleY: draw }}
            className="absolute bottom-0 left-[1.1rem] top-2 w-px origin-top bg-gradient-to-b from-teal via-signal to-signal/0 md:left-[12.5rem]"
          />
          {experience.map((role, i) => (
            <TimelineItem key={`${role.company}-${role.start}`} role={role} defaultOpen={i === 0} />
          ))}
        </ol>
      </div>
    </section>
  )
}
