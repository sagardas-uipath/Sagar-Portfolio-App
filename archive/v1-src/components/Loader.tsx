import { motion } from 'framer-motion'
import { profile } from '../data/portfolio'

/** Brief brand entrance (~1s). Skipped entirely under reduced motion. */
export function Loader() {
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-ink-950"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }}
      aria-hidden="true"
    >
      <div className="flex flex-col items-center">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} className="relative flex h-16 w-16 items-center justify-center">
          <svg viewBox="0 0 64 64" className="absolute inset-0">
            <motion.rect x="1" y="1" width="62" height="62" rx="18" fill="none" stroke="url(#ld-g)" strokeWidth="1.5" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.9, ease: 'easeInOut' }} />
            <defs>
              <linearGradient id="ld-g" x1="0" y1="0" x2="64" y2="64">
                <stop stopColor="#6E9BFF" />
                <stop offset="1" stopColor="#4FD1C5" />
              </linearGradient>
            </defs>
          </svg>
          <span className="font-display text-lg font-bold text-fg">{profile.initials}</span>
        </motion.div>
        <div className="mt-6 h-px w-32 overflow-hidden bg-white/10">
          <motion.div className="h-full bg-gradient-to-r from-signal to-teal" initial={{ width: '0%' }} animate={{ width: '100%' }} transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }} />
        </div>
        <p className="mt-4 font-mono text-[0.65rem] uppercase tracking-[0.25em] text-fg-subtle">Initializing</p>
      </div>
    </motion.div>
  )
}
