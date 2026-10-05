import { motion } from 'framer-motion'
import { ArrowDownRight } from 'lucide-react'
import { EASE, inView } from '../animations/variants'
import { certifications, expertise, projects } from '../data/portfolio'
import { Certifications } from './Certifications'
import { Expertise } from './Expertise'
import { SelectedWork } from './Projects'
import { ClassicCounter } from './ui/ClassicCounter'
import { SectionHeader } from './ui/SectionHeader'

// Counted from the content model — nothing hard-coded. Each stat links to its part of My Work.
const STATS = [
  { value: expertise.length, label: 'Expertise areas', target: 'expertise', targetName: 'Automation Expertise' },
  { value: projects.length, label: 'Projects delivered', target: 'selected-work', targetName: 'Selected Automation Work' },
  { value: certifications.length, label: 'Certifications', target: 'certifications', targetName: 'Certifications' },
]

/** My Work: ① Automation Expertise → ② Selected Automation Work → ③ Certifications. */
export function MyWork() {
  return (
    <section id="my-work" aria-labelledby="my-work-title" className="band-alt section-y relative">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-x-0 top-24 mx-auto h-[26rem] max-w-5xl rounded-full bg-accent/[0.06] blur-[120px]" />
        <div className="absolute inset-0 opacity-60 [background-image:radial-gradient(rgb(15_23_42/0.07)_1px,transparent_1px)] [background-size:22px_22px] [mask-image:linear-gradient(to_bottom,black,transparent_35%)]" />
      </div>
      <div className="container-x relative">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <SectionHeader id="my-work-title" index="02" eyebrow="My Work" title="Expertise, delivered work & credentials" description="What I work with, what I have built with it, and how it is certified." />
          <motion.ul
            aria-label="My Work at a glance"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={inView}
            transition={{ duration: 0.6, ease: EASE, delay: 0.15 }}
            className="relative mb-12 grid grid-cols-3 divide-x divide-white/[0.08] overflow-hidden rounded-2xl border border-white/[0.08] bg-[#ffffff] shadow-[0_1px_2px_rgb(15_23_42/0.05),0_16px_36px_-20px_rgb(15_23_42/0.25)] before:absolute before:inset-x-0 before:top-0 before:h-0.5 before:bg-gradient-to-r before:from-accent before:via-accent-2 before:to-accent/30 sm:mb-16"
          >
            {STATS.map((s) => (
              <li key={s.label}>
                <a
                  href={`#${s.target}`}
                  aria-label={`${s.value} ${s.label}: go to ${s.targetName}`}
                  className="group flex h-full flex-col px-5 py-4 transition-colors duration-300 hover:bg-accent/[0.05] focus-visible:bg-accent/[0.05] sm:px-7"
                >
                  <span className="font-display text-3xl font-bold text-fg">
                    <ClassicCounter value={s.value} />
                  </span>
                  <span className="flex items-center gap-1 text-xs text-fg-muted transition-colors duration-300 group-hover:text-accent-soft">
                    {s.label}
                    <ArrowDownRight
                      aria-hidden="true"
                      className="h-3 w-3 -translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100"
                    />
                  </span>
                </a>
              </li>
            ))}
          </motion.ul>
        </div>

        <div className="space-y-28 sm:space-y-36">
          <Expertise />
          <SelectedWork />
          <Certifications />
        </div>
      </div>
    </section>
  )
}
