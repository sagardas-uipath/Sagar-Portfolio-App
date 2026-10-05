import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from 'framer-motion'
import { useState, type MouseEvent } from 'react'
import { navigation } from '../data/portfolio'
import { useActiveSection } from '../hooks/useActiveSection'

// Sections observed for the active indicator; the hero maps to no tab.
const OBSERVED = ['home', 'about', 'my-work', 'experience', 'contact']
const MAP: Record<string, string | null> = { home: null }

// Glass hover pill: soft sky gradient, inner top highlight, hairline ring and a blue glow beneath.
const HOVER_PILL =
  'absolute inset-0 rounded-full bg-[linear-gradient(180deg,#f2f8ff_0%,#dcebfd_100%)] shadow-[inset_0_1px_0_rgb(255_255_255),inset_0_-1px_0_rgb(29_111_209/0.08),0_0_0_1px_rgb(29_111_209/0.22),0_8px_20px_-8px_rgb(29_111_209/0.55)]'
// Current-section pill: deep navy gradient with a subtle inner highlight.
const ACTIVE_PILL =
  'absolute inset-0 rounded-full bg-[linear-gradient(180deg,#1d2f4d_0%,#0b1628_100%)] shadow-[inset_0_1px_0_rgb(255_255_255/0.14),0_6px_16px_-6px_rgb(11_42_74/0.65)]'

export function Navigation() {
  const current = useActiveSection(OBSERVED)
  const active = current in MAP ? MAP[current] : current
  const [scrolled, setScrolled] = useState(false)
  // Tab under the pointer (or keyboard focus) — drives the sliding hover highlight.
  const [hovered, setHovered] = useState<string | null>(null)
  const { scrollY, scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 30, restDelta: 0.001 })
  useMotionValueEvent(scrollY, 'change', (y) => setScrolled(y > 24))

  // Pointer position for the spotlight, written as a CSS variable (no re-render per move).
  const trackPointer = (e: MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--nx', `${e.clientX - r.left}px`)
  }

  return (
    <>
      <a href="#main" className="sr-only z-[100] rounded-full bg-fg px-4 py-2 text-ink-950 focus:not-sr-only focus:fixed focus:left-4 focus:top-4">
        Skip to content
      </a>
      <header className="theme-light fixed inset-x-0 top-0 z-50 !bg-transparent px-3 pt-3 sm:pt-4">
        {/* Only the nav pill is fixed; the brand mark lives in the hero and scrolls away with it */}
        <div className="mx-auto flex max-w-7xl items-center justify-center">
          <nav
            aria-label="Primary"
            onMouseMove={trackPointer}
            className={`relative rounded-full border p-1 backdrop-blur-xl transition-[background-color,border-color,box-shadow] duration-300 ${
              scrolled ? 'border-white/10 bg-[#ffffff]/90 shadow-[0_10px_30px_-15px_rgb(15_23_42/0.35)]' : 'border-white/10 bg-[#ffffff]/70'
            }`}
          >
            {/* Cursor spotlight: a soft light that follows the pointer across the menu */}
            <span
              aria-hidden="true"
              className={`pointer-events-none absolute inset-0 rounded-full transition-opacity duration-500 ${hovered ? 'opacity-100' : 'opacity-0'}`}
              style={{ background: 'radial-gradient(140px circle at var(--nx, 50%) 50%, rgb(29 111 209 / 0.13), transparent 70%)' }}
            />

            <ul
              className="relative flex items-center"
              onMouseLeave={() => setHovered(null)}
              onBlur={(e) => {
                if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setHovered(null)
              }}
            >
              {navigation.map((item) => {
                const isActive = active === item.id
                const isHovered = hovered === item.id
                return (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      aria-current={isActive ? 'true' : undefined}
                      onMouseEnter={() => setHovered(item.id)}
                      onFocus={() => setHovered(item.id)}
                      className={`relative block whitespace-nowrap rounded-full px-3 py-2 text-[0.8rem] font-medium transition-colors duration-300 min-[400px]:px-4 sm:px-5 sm:text-sm ${
                        isActive ? 'text-ink-950' : isHovered ? 'text-accent-soft' : 'text-fg-muted'
                      }`}
                    >
                      {/* Glass pill glides between tabs on a spring */}
                      <AnimatePresence>
                        {isHovered && (
                          <motion.span
                            layoutId="nav-hover"
                            className={HOVER_PILL}
                            initial={{ opacity: 0, scale: 0.85 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.85 }}
                            transition={{ type: 'spring', stiffness: 420, damping: 30, mass: 0.8 }}
                          />
                        )}
                      </AnimatePresence>

                      {isActive && <motion.span layoutId="nav-active" className={ACTIVE_PILL} transition={{ type: 'spring', stiffness: 380, damping: 32 }} />}

                      <span className={`relative inline-block transition-transform duration-300 ${isHovered && !isActive ? '-translate-y-px' : ''}`}>{item.label}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
            <motion.span aria-hidden="true" className="absolute inset-x-6 -bottom-px h-px origin-left bg-gradient-to-r from-accent to-accent-2" style={{ scaleX: progress }} />
          </nav>
        </div>
      </header>
    </>
  )
}
