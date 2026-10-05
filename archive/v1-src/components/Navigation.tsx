import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { flushSync } from 'react-dom'
import { navigation, profile } from '../data/portfolio'
import { useActiveSection } from '../hooks/useActiveSection'

export function Logo() {
  return (
    <a href="#home" className="group flex items-center gap-3" aria-label={`${profile.name} — back to top`}>
      <span className="relative flex h-9 w-9 items-center justify-center">
        <svg viewBox="0 0 40 40" className="absolute inset-0 h-full w-full" aria-hidden="true">
          <rect x="1" y="1" width="38" height="38" rx="11" fill="none" stroke="rgb(255 255 255 / 0.12)" />
          <motion.rect
            x="1" y="1" width="38" height="38" rx="11" fill="none" stroke="url(#logo-g)" strokeWidth="1.5"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          />
          <defs>
            <linearGradient id="logo-g" x1="0" y1="0" x2="40" y2="40">
              <stop stopColor="#6E9BFF" />
              <stop offset="1" stopColor="#4FD1C5" />
            </linearGradient>
          </defs>
        </svg>
        <span className="font-display text-[0.8rem] font-bold tracking-tight text-fg">{profile.initials}</span>
      </span>
      <span className="hidden font-display text-sm font-semibold text-fg sm:block">{profile.name}</span>
    </a>
  )
}

export function Navigation() {
  const ids = useMemo(() => navigation.map((n) => n.id), [])
  const active = useActiveSection(ids)
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const toggleRef = useRef<HTMLButtonElement>(null)

  const { scrollY, scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 30, restDelta: 0.001 })
  useMotionValueEvent(scrollY, 'change', (y) => setScrolled(y > 24))

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
      toggleRef.current?.focus()
    }
  }, [open])

  return (
    <>
      <a href="#main" className="sr-only z-[100] rounded-full bg-fg px-4 py-2 text-ink-950 focus:not-sr-only focus:fixed focus:left-4 focus:top-4">
        Skip to content
      </a>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300 ${
          scrolled || open ? 'border-b border-white/[0.06] bg-ink-950/75 backdrop-blur-xl' : 'border-b border-transparent'
        }`}
      >
        <nav className="container-x flex h-16 items-center justify-between lg:h-[4.5rem]" aria-label="Primary">
          <Logo />
          <ul className="hidden items-center gap-0.5 xl:flex">
            {navigation.map((item) => {
              const isActive = active === item.id
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    aria-current={isActive ? 'true' : undefined}
                    className={`relative block rounded-full px-3.5 py-2 text-[0.8rem] font-medium transition-colors ${isActive ? 'text-fg' : 'text-fg-muted hover:text-fg'}`}
                  >
                    {isActive && (
                      <motion.span layoutId="nav-pill" className="absolute inset-0 rounded-full border border-white/10 bg-white/[0.06]" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />
                    )}
                    <span className="relative">{item.label}</span>
                  </a>
                </li>
              )
            })}
          </ul>
          <a href="#contact" className="hidden rounded-full border border-white/12 px-4 py-2 text-[0.8rem] font-medium text-fg transition hover:border-signal/50 hover:bg-signal/10 xl:inline-flex">
            Let's talk
          </a>
          <button
            ref={toggleRef}
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-fg xl:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </nav>
        <motion.div className="absolute bottom-0 left-0 h-px w-full origin-left bg-gradient-to-r from-signal to-teal" style={{ scaleX: progress }} aria-hidden="true" />
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-40 bg-ink-950/95 pt-20 backdrop-blur-xl xl:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <motion.ul
              className="container-x flex flex-col"
              initial="hidden"
              animate="show"
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.04, delayChildren: 0.05 } } }}
            >
              {navigation.map((item, i) => (
                <motion.li key={item.id} variants={{ hidden: { opacity: 0, x: -16 }, show: { opacity: 1, x: 0 } }}>
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => {
                      // Close synchronously so the body scroll lock is released before scrolling.
                      e.preventDefault()
                      flushSync(() => setOpen(false))
                      document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' })
                      history.replaceState(null, '', `#${item.id}`)
                    }}
                    className={`flex items-baseline gap-4 border-b border-white/[0.06] py-4 font-display text-2xl font-semibold ${active === item.id ? 'text-fg' : 'text-fg-muted'}`}
                  >
                    <span className="font-mono text-xs text-signal">{String(i + 1).padStart(2, '0')}</span>
                    {item.label}
                  </a>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
