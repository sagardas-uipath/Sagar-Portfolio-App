import { motion } from 'framer-motion'
import { EASE, inView } from '../animations/variants'
import { expertise } from '../data/portfolio'
import { Icon } from './ui/Icon'
import { SubHeader } from './ui/SubHeader'
import { TiltCard } from './ui/TiltCard'

/**
 * Part ① of My Work. Automation Expertise — calm, readable tiles: no 3D tilt, a small lift on hover,
 * the icon fills with the accent and the skills tint. Grid is 3 + 2 on desktop.
 */
export function Expertise() {
  return (
    <div id="expertise" className="scroll-mt-12">
      <SubHeader step="01" id="expertise-title" title="Automation Expertise" description="The platforms, practices and technologies behind every project below." />
      <motion.ul
        initial="hidden"
        whileInView="show"
        viewport={inView}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07 } } }}
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-6"
      >
        {expertise.map((a, i) => (
          <motion.li
            key={a.id}
            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } } }}
            className={i < 3 ? 'lg:col-span-2' : i === 4 ? 'sm:col-span-2 lg:col-span-3' : 'lg:col-span-3'}
          >
            <TiltCard max={0} className="group relative flex flex-col overflow-hidden p-6">
              {/* Accent line that draws across the top on hover */}
              <span aria-hidden="true" className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-gradient-to-r from-accent to-accent-2 transition-transform duration-500 ease-out group-hover:scale-x-100" />
              <div className="flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-accent/15 to-accent-2/10 text-accent ring-1 ring-accent/10 transition-colors duration-300 group-hover:from-accent group-hover:to-accent-2 group-hover:text-[#ffffff]">
                  <Icon name={a.icon} className="h-5 w-5" />
                </span>
                <div className="min-w-0">
                  <h3 className="text-lg font-semibold leading-tight text-fg">{a.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-fg-muted">{a.summary}</p>
                </div>
              </div>
              <ul className="mt-5 flex flex-wrap gap-1.5 border-t border-white/[0.06] pt-4" aria-label={`${a.title} skills`}>
                {a.items.map((t) => (
                  <li
                    key={t}
                    className="rounded-full border border-white/[0.08] bg-white/[0.03] px-2.5 py-1 text-xs font-medium text-fg-muted transition-colors duration-300 group-hover:border-accent/25 group-hover:bg-accent/[0.06] group-hover:text-fg"
                  >
                    {t}
                  </li>
                ))}
              </ul>
            </TiltCard>
          </motion.li>
        ))}
      </motion.ul>
    </div>
  )
}
