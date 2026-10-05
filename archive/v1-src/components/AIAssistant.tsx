import { AnimatePresence, motion } from 'framer-motion'
import { Sparkles, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { EASE } from '../animations/variants'
import { ChatPanel } from './lab/ChatPanel'

/** Floating "Ask My Portfolio" assistant. Shares the agent layer with the Automation Lab. */
export function AIAssistant({ ready }: { ready: boolean }) {
  const [open, setOpen] = useState(false)
  const btnRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        btnRef.current?.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-label="Ask My Portfolio assistant"
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.35, ease: EASE }}
            style={{ transformOrigin: 'bottom right' }}
            className="fixed inset-x-3 bottom-20 z-[70] flex h-[min(34rem,calc(100dvh-7rem))] flex-col overflow-hidden rounded-3xl border border-white/10 bg-ink-900/95 shadow-[0_30px_80px_-20px_rgb(0_0_0/0.9)] backdrop-blur-xl sm:inset-x-auto sm:right-6 sm:w-[24rem]"
          >
            <div className="flex items-center justify-between px-4 py-3">
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-signal to-teal text-ink-950">
                  <Sparkles className="h-4 w-4" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-fg">Ask My Portfolio</p>
                  <p className="text-[0.7rem] text-fg-subtle">Projects · Skills · Experience</p>
                </div>
              </div>
              <button onClick={() => setOpen(false)} aria-label="Close assistant" className="flex h-10 w-10 items-center justify-center rounded-full text-fg-muted transition hover:bg-white/5 hover:text-fg">
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="min-h-0 flex-1">
              <ChatPanel compact autoFocus greeting="Hi! Ask me about my projects, skills, experience or technologies." />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        ref={btnRef}
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-label={open ? 'Close Ask My Portfolio' : 'Open Ask My Portfolio'}
        initial={{ opacity: 0, y: 20 }}
        animate={ready ? { opacity: 1, y: 0 } : undefined}
        transition={{ delay: 1.4, duration: 0.6, ease: EASE }}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.96 }}
        className="glass fixed bottom-4 right-4 z-[70] flex min-h-12 items-center gap-2.5 rounded-full py-2 pl-2 pr-4 text-sm font-medium text-fg shadow-[0_20px_50px_-20px_rgb(110_155_255/0.6)] sm:bottom-6 sm:right-6"
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-signal to-teal text-ink-950">
          {open ? <X className="h-4 w-4" aria-hidden="true" /> : <Sparkles className="h-4 w-4" aria-hidden="true" />}
        </span>
        <span className="hidden sm:inline">Ask My Portfolio</span>
        <span className="sm:hidden">Ask</span>
      </motion.button>
    </>
  )
}
