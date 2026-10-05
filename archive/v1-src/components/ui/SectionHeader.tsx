import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { fadeUp, inView, stagger } from '../../animations/variants'

type Props = { index?: string; eyebrow: string; title: ReactNode; description?: ReactNode; align?: 'left' | 'center'; id?: string }

export function SectionHeader({ index, eyebrow, title, description, align = 'left', id }: Props) {
  const center = align === 'center'
  return (
    <motion.header
      variants={stagger(0.08)}
      initial="hidden"
      whileInView="show"
      viewport={inView}
      className={`mb-12 sm:mb-16 ${center ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}`}
    >
      <motion.p variants={fadeUp} className={`eyebrow flex items-center gap-3 ${center ? 'justify-center' : ''}`}>
        {index && <span className="text-signal">{index}</span>}
        <span className="h-px w-8 bg-white/15" aria-hidden="true" />
        {eyebrow}
      </motion.p>
      <motion.h2 id={id} variants={fadeUp} className="mt-5 text-3xl font-bold leading-[1.1] text-fg sm:text-4xl lg:text-5xl">
        {title}
      </motion.h2>
      {description && (
        <motion.p variants={fadeUp} className="mt-5 text-base leading-relaxed text-fg-muted sm:text-lg">
          {description}
        </motion.p>
      )}
    </motion.header>
  )
}
