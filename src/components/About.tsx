import { motion } from 'framer-motion'
import { fadeUp, inView, stagger } from '../animations/variants'
import { about } from '../data/portfolio'
import { AutomationLayers } from './AutomationLayers'
import { Icon } from './ui/Icon'
import { TechStack } from './TechStack'
import { SectionHeader } from './ui/SectionHeader'

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="section-y relative">
      <div className="container-x">
        <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <div>
            <SectionHeader id="about-title" index="01" eyebrow="About" title={about.headline} description={about.lead} />

            <motion.ul variants={stagger(0.08)} initial="hidden" whileInView="show" viewport={inView} className="-mt-4 grid gap-3 sm:grid-cols-2">
              {about.points.map((p) => (
                <motion.li key={p.title} variants={fadeUp} className="surface group flex gap-4 rounded-2xl p-5 transition-colors hover:border-accent/25">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-accent/15 to-accent-2/10 text-accent ring-1 ring-accent/10 transition-colors duration-300 group-hover:from-accent group-hover:to-accent-2 group-hover:text-[#ffffff]">
                    <Icon name={p.icon} className="h-[18px] w-[18px]" />
                  </span>
                  <div>
                    <p className="font-display text-sm font-semibold text-fg">{p.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-fg-muted">{p.text}</p>
                  </div>
                </motion.li>
              ))}
            </motion.ul>
          </div>

          <AutomationLayers />
        </div>

        <TechStack />
      </div>
    </section>
  )
}
