import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { useEffect, useRef, type ReactNode } from 'react'
import { createPortal } from 'react-dom'

type Props = { open: boolean; onClose: () => void; title: string; children: ReactNode; size?: 'md' | 'xl'; themeClass?: string }

/** Accessible modal: focus moves in on open, Tab is trapped, Escape closes, focus returns on close. */
export function Modal({ open, onClose, title, children, size = 'md', themeClass = '' }: Props) {
  const panelRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef(onClose)
  closeRef.current = onClose

  useEffect(() => {
    if (!open) return
    const previous = document.activeElement as HTMLElement | null
    const { overflow } = document.body.style
    document.body.style.overflow = 'hidden'
    const t = window.setTimeout(() => panelRef.current?.querySelector<HTMLElement>('[data-autofocus]')?.focus(), 40)

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') return closeRef.current()
      if (e.key !== 'Tab' || !panelRef.current) return
      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href],button:not([disabled]),input,textarea,select,[tabindex]:not([tabindex="-1"])',
      )
      if (!focusable.length) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      window.clearTimeout(t)
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = overflow
      previous?.focus()
    }
  }, [open])

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className={`fixed inset-0 z-[80] flex items-end justify-center sm:items-center sm:p-6 ${themeClass}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <div className="absolute inset-0 bg-black/55 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label={title}
            initial={{ opacity: 0, y: 32, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className={`surface scrollbar-thin relative max-h-[92dvh] w-full overflow-y-auto overscroll-contain rounded-t-3xl sm:rounded-3xl ${
              size === 'xl' ? 'sm:max-w-5xl' : 'sm:max-w-lg'
            } shadow-[0_40px_120px_-30px_rgb(0_0_0/0.6)]`}
          >
            <button
              data-autofocus
              onClick={onClose}
              aria-label="Close dialog"
              className="sticky top-3 z-10 float-right mr-3 mt-3 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-ink-900/80 text-fg-muted backdrop-blur transition hover:text-fg"
            >
              <X className="h-4 w-4" />
            </button>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}
