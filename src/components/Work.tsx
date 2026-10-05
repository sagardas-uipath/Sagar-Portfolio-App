import { motion, useScroll, useSpring } from 'framer-motion'
import { useRef } from 'react'
import { EASE, inView } from '../animations/variants'
import { experience } from '../data/portfolio'
import type { Role } from '../data/types'
import { Badge } from './ui/Badge'
import { SectionHeader } from './ui/SectionHeader'
import { TiltCard } from './ui/TiltCard'

function TimelineItem({ role }: { role: Role }) {
  return (
    <li className="relative pl-10 md:grid md:grid-cols-[10rem_1fr] md:gap-12 md:pl-0">
      <motion.span
        aria-hidden="true"
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={inView}
        transition={{ duration: 0.5, ease: EASE }}
        className="absolute left-[0.45rem] top-2 flex h-4 w-4 items-center justify-center rounded-full border border-accent/60 bg-ink-950 md:left-[11.5rem]"
      >
        <span className={`h-1.5 w-1.5 rounded-full ${role.current ? 'bg-accent' : 'bg-accent-2'}`} />
      </motion.span>

      <div className="mb-3 md:mb-0 md:pt-1 md:text-right">
        <p className="font-mono text-xs text-fg-subtle">
          {role.start} — {role.end}
        </p>
        {role.current && (
          <Badge tone="accent" className="mt-2">
            Current
          </Badge>
        )}
      </div>

      {/* Card swings in from a slight 3D angle as it enters the viewport */}
      <div style={{ perspective: 1200 }} className="md:ml-6">
        <motion.div
          initial={{ opacity: 0, rotateX: -14, y: 40 }}
          whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
          viewport={inView}
          transition={{ duration: 0.9, ease: EASE }}
          style={{ transformOrigin: 'top center' }}
        >
          <TiltCard max={4} className="p-6 sm:p-8">
            <h3 className="text-xl font-bold text-fg sm:text-2xl">
              {role.title} <span className="text-fg-subtle">—</span> <span className="text-accent-soft">{role.company}</span>
            </h3>
            <ul className="mt-5 space-y-3">
              {role.points.map((p) => (
                <li key={p} className="flex gap-3 text-sm leading-relaxed text-fg-muted sm:text-[0.95rem]">
                  <span className="mt-[0.6rem] h-1 w-1 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                  {p}
                </li>
              ))}
            </ul>
            <ul className="mt-6 flex flex-wrap gap-2 border-t border-white/[0.06] pt-5" aria-label="Technologies">
              {role.tags.map((t) => (
                <li key={t}>
                  <Badge>{t}</Badge>
                </li>
              ))}
            </ul>
          </TiltCard>
        </motion.div>
      </div>
    </li>
  )
}

export function Work() {
  const ref = useRef<HTMLOListElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 75%', 'end 60%'] })
  const draw = useSpring(scrollYProgress, { stiffness: 120, damping: 26 })

  return (
    <section id="experience" aria-labelledby="experience-title" className="section-y relative">
      <div className="container-x">
        <SectionHeader id="experience-title" index="03" eyebrow="Experience" title="Five years of enterprise automation" description="From Senior RPA Developer to Lead Engineer." />

        <ol ref={ref} className="relative space-y-10 md:space-y-14">
          <span aria-hidden="true" className="absolute bottom-0 left-[0.95rem] top-2 w-px bg-white/[0.07] md:left-[12rem]" />
          <motion.span aria-hidden="true" style={{ scaleY: draw }} className="absolute bottom-0 left-[0.95rem] top-2 w-px origin-top bg-gradient-to-b from-accent via-accent-2 to-transparent md:left-[12rem]" />
          {experience.map((r) => (
            <TimelineItem key={r.company} role={r} />
          ))}
        </ol>
      </div>
    </section>
  )
}
