import { motion, useMotionValueEvent, useScroll, useSpring } from 'framer-motion'
import { GraduationCap, MapPin } from 'lucide-react'
import { useRef, useState } from 'react'
import { fadeUp, inView, stagger } from '../animations/variants'
import { lifecycle, profile } from '../data/portfolio'
import { Badge } from './ui/Badge'
import { GlassCard } from './ui/GlassCard'
import { Icon } from './ui/Icon'
import { SectionHeader } from './ui/SectionHeader'

/** Lifecycle that "charges" stage by stage as the reader scrolls through it. */
function Lifecycle() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 85%', 'end 55%'] })
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24 })
  const [reached, setReached] = useState(-1)
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const idx = v <= 0 ? -1 : Math.min(lifecycle.length - 1, Math.floor(v * lifecycle.length))
    setReached((prev) => (prev === idx ? prev : idx))
  })

  return (
    <div ref={ref} className="relative mt-20">
      <div className="mb-8 flex items-end justify-between gap-6">
        <h3 className="text-xl font-semibold text-fg sm:text-2xl">The automation lifecycle I own</h3>
        <span className="eyebrow hidden sm:block">Discover → Optimize</span>
      </div>

      <div className="relative">
      {/* Track: vertical on small screens, horizontal on large — aligned to the icon centres */}
      <div aria-hidden="true" className="absolute bottom-6 left-[1.125rem] top-[1.125rem] w-px bg-white/[0.07] lg:bottom-auto lg:left-0 lg:right-0 lg:top-[2.875rem] lg:h-px lg:w-auto" />
      <motion.div
        aria-hidden="true"
        style={{ scaleY: progress }}
        className="absolute bottom-6 left-[1.125rem] top-[1.125rem] w-px origin-top bg-gradient-to-b from-signal to-teal lg:hidden"
      />
      <motion.div
        aria-hidden="true"
        style={{ scaleX: progress }}
        className="absolute left-0 right-0 top-[2.875rem] hidden h-px origin-left bg-gradient-to-r from-signal to-teal lg:block"
      />

      <ol className="relative grid gap-6 lg:grid-cols-7 lg:gap-4">
        {lifecycle.map((s, i) => {
          const on = i <= reached
          return (
            <li key={s.id} className="flex gap-4 lg:flex-col lg:gap-0">
              <span className="eyebrow hidden h-4 !text-[0.62rem] !leading-4 lg:mb-3 lg:block">{String(i + 1).padStart(2, '0')}</span>
              <span
                className={`relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border bg-ink-950 transition-all duration-500 ${
                  on ? 'border-signal/60 text-signal shadow-[0_0_0_4px_rgb(110_155_255/0.08)]' : 'border-white/10 text-fg-subtle'
                }`}
              >
                <Icon name={s.icon} className="h-4 w-4" />
              </span>
              <div className="lg:mt-5">
                <p className={`font-display text-sm font-semibold uppercase tracking-[0.12em] transition-colors duration-500 ${on ? 'text-fg' : 'text-fg-subtle'}`}>{s.label}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-fg-muted">{s.description}</p>
              </div>
            </li>
          )
        })}
      </ol>
      </div>
    </div>
  )
}

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="section-y relative">
      <div className="container-x">
        <SectionHeader id="about-title" index="01" eyebrow="About" title={profile.aboutHeadline} />

        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
          <motion.div variants={stagger(0.1)} initial="hidden" whileInView="show" viewport={inView} className="space-y-5">
            {profile.about.map((p) => (
              <motion.p key={p.slice(0, 24)} variants={fadeUp} className="text-base leading-[1.8] text-fg-muted sm:text-lg">
                {p}
              </motion.p>
            ))}
            <motion.div variants={fadeUp} className="pt-4">
              <p className="eyebrow mb-4">Current focus</p>
              <ul className="grid gap-2 sm:grid-cols-2">
                {profile.focus.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm text-fg">
                    <span className="mt-2 h-1 w-3 shrink-0 rounded-full bg-gradient-to-r from-signal to-teal" aria-hidden="true" />
                    {f}
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>

          <GlassCard glass initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={inView} transition={{ duration: 0.7 }} className="h-fit overflow-hidden">
            <div className="relative h-24 bg-[radial-gradient(120%_120%_at_0%_0%,rgb(110_155_255/0.25),transparent_60%),radial-gradient(100%_100%_at_100%_0%,rgb(79_209_197/0.15),transparent_60%)]">
              <div className="grid-bg absolute inset-0 opacity-60" aria-hidden="true" />
            </div>
            <div className="-mt-10 px-6 pb-6">
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-white/10 bg-ink-900 font-display text-2xl font-bold text-fg shadow-xl">
                {profile.initials}
              </div>
              <p className="mt-5 font-display text-xl font-bold text-fg">{profile.name}</p>
              <p className="text-sm text-fg-muted">{profile.title}</p>
              <ul className="mt-6 space-y-3 border-t border-white/[0.07] pt-5 text-sm">
                <li className="flex gap-3 text-fg-muted">
                  <GraduationCap className="mt-0.5 h-4 w-4 shrink-0 text-fg-subtle" aria-hidden="true" />
                  {profile.education}
                </li>
                <li className="flex gap-3 text-fg-muted">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-fg-subtle" aria-hidden="true" />
                  {profile.location}
                </li>
              </ul>
              <div className="mt-5 flex flex-wrap gap-2">
                {profile.domains.map((d) => (
                  <Badge key={d}>{d}</Badge>
                ))}
              </div>
            </div>
          </GlassCard>
        </div>

        <Lifecycle />
      </div>
    </section>
  )
}
