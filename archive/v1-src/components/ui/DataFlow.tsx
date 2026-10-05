import { motion } from 'framer-motion'
import { inView } from '../../animations/variants'

const DEFAULT = ['Business Problem', 'Data', 'AI', 'Automation', 'Integration', 'Business Outcome']

/**
 * Signature visual: a hairline carrying a travelling pulse through the stages
 * of an automation. Sits between sections to connect the narrative.
 */
export function DataFlow({ stages = DEFAULT, className = '' }: { stages?: string[]; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={inView}
      transition={{ duration: 0.8 }}
      className={`container-x ${className}`}
      aria-hidden="true"
    >
      <div className="relative overflow-hidden pb-1">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/15 to-transparent" />
        <motion.div
          className="absolute -top-px h-[3px] w-40 rounded-full bg-gradient-to-r from-transparent via-signal to-transparent"
          initial={{ left: '-12%' }}
          animate={{ left: '105%' }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', repeatDelay: 2 }}
        />
        <ol className="mt-4 hidden justify-between md:flex">
          {stages.map((s, i) => (
            <li key={s} className="eyebrow flex items-center gap-2 !text-[0.65rem]">
              <span className="text-signal/80">{String(i + 1).padStart(2, '0')}</span>
              {s}
            </li>
          ))}
        </ol>
      </div>
    </motion.div>
  )
}
