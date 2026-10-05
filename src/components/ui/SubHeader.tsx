import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { EASE, inView } from '../../animations/variants'

type Props = { step: string; title: string; description?: ReactNode; id?: string }

/**
 * Editorial sub-section heading: an oversized outlined numeral sits behind the title,
 * a small "Part 0X" label, and a gradient hairline closes the heading.
 */
export function SubHeader({ step, title, description, id }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={inView}
      transition={{ duration: 0.7, ease: EASE }}
      className="relative mb-10 sm:mb-12"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-6 right-0 select-none font-display text-[6.5rem] font-extrabold leading-none tracking-tighter text-transparent [-webkit-text-stroke:1.5px_rgb(29_111_209/0.22)] sm:-top-10 sm:text-[9.5rem]"
      >
        {step}
      </span>
      <div className="relative max-w-3xl pr-24 sm:pr-40">
        <p className="flex items-center gap-3 font-mono text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-accent">
          <span className="h-px w-8 bg-accent" aria-hidden="true" />
          Part {step}
        </p>
        <h3 id={id} className="mt-3 text-3xl font-extrabold tracking-tight text-fg sm:text-4xl">
          {title}
        </h3>
        {description && <p className="mt-3 text-base leading-relaxed text-fg-muted">{description}</p>}
      </div>
      <div aria-hidden="true" className="relative mt-8 h-px bg-gradient-to-r from-accent/60 via-accent-2/20 to-transparent" />
    </motion.div>
  )
}
