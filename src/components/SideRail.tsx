import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { ArrowUp, Mail } from 'lucide-react'
import { useState } from 'react'
import { contact } from '../data/portfolio'
import { InstagramIcon, LinkedInIcon } from './ui/BrandIcons'

const SOCIALS = [
  { label: 'LinkedIn profile', href: contact.linkedin, icon: LinkedInIcon, external: true },
  { label: 'Instagram profile', href: contact.instagram, icon: InstagramIcon, external: true },
  { label: 'Send an email', href: `mailto:${contact.email}`, icon: Mail, external: false },
]

const iconLink =
  'flex h-8 w-8 items-center justify-center rounded-full text-hero-ink/70 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#ffffff] hover:text-accent hover:shadow-[0_6px_16px_-8px_rgb(11_42_74/0.45)]'

/**
 * Desktop side rail (≥1340px — where the page has a clear left gutter), fixed to the left edge:
 *  • top    — vertical "Back to top" control that fades in once you scroll past the hero
 *  • bottom — social links with a fine line running down to the viewport edge
 * Smaller screens use the floating ScrollToTop button and the Contact/Footer links instead.
 */
export function SideRail() {
  const { scrollY } = useScroll()
  const [show, setShow] = useState(false)
  useMotionValueEvent(scrollY, 'change', (y) => setShow(y > 700))

  return (
    <div className="pointer-events-none fixed inset-y-0 left-0 z-40 hidden w-12 min-[1340px]:block">
      <AnimatePresence>
        {show && (
          <motion.button
            key="top"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            onClick={() => window.scrollTo({ top: 0 })}
            aria-label="Back to top"
            className="group pointer-events-auto absolute left-1/2 top-24 flex -translate-x-1/2 flex-col items-center gap-3 rounded-full px-2 py-3 text-hero-ink/70 transition-colors hover:text-accent"
          >
            <ArrowUp className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-1" aria-hidden="true" />
            <span className="font-mono text-[0.68rem] font-semibold uppercase tracking-[0.25em] [writing-mode:vertical-rl]">Back to top</span>
          </motion.button>
        )}
      </AnimatePresence>

      <motion.nav
        aria-label="Social links"
        initial={{ opacity: 0, x: -12 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="pointer-events-auto absolute bottom-0 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2"
      >
        {SOCIALS.map((s) => (
          <a key={s.label} href={s.href} aria-label={s.label} className={iconLink} {...(s.external ? { target: '_blank', rel: 'noreferrer noopener' } : {})}>
            <s.icon className="h-[18px] w-[18px]" />
          </a>
        ))}
        <span aria-hidden="true" className="mt-2 h-24 w-px bg-gradient-to-b from-accent/70 to-hero-ink/30" />
      </motion.nav>
    </div>
  )
}
