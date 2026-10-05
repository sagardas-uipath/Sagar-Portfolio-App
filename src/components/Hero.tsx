import { motion } from 'framer-motion'
import { ArrowRight, Mail } from 'lucide-react'
import { EASE } from '../animations/variants'
import { profile } from '../data/portfolio'
import { useFinePointer } from '../hooks/useMedia'
import { HeroStage } from './hero/HeroStage'
import { BrandMark } from './ui/BrandMark'

const reveal = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: EASE, delay },
})

const btn = 'group inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 text-sm font-semibold transition-colors duration-200'

/**
 * Cool sky-blue hero behind the cut-out portrait. All text uses deep navy "hero ink"
 * (white would fail contrast on a light sky background).
 */
export function Hero() {
  const fine = useFinePointer()

  return (
    <section id="home" aria-labelledby="hero-title" className="relative overflow-hidden bg-[linear-gradient(180deg,var(--color-hero-light)_0%,var(--color-hero)_70%,#8ccdf1_100%)] text-hero-ink">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 -top-32 h-[36rem] w-[36rem] rounded-full bg-white/50 blur-[110px]" />
        <div className="absolute -right-24 top-1/3 h-[28rem] w-[28rem] rounded-full bg-[#5fb5ea]/30 blur-[110px]" />
        <div className="absolute inset-0 opacity-60 [background-image:linear-gradient(rgb(255_255_255/0.35)_1px,transparent_1px),linear-gradient(90deg,rgb(255_255_255/0.35)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_40%,black_30%,transparent_75%)]" />
      </div>

      <div className="container-x relative grid min-h-[100svh] lg:grid-cols-[1fr_1fr] lg:gap-6">
        {/* Brand mark — part of the hero, so it scrolls away rather than staying pinned */}
        <a href="#home" aria-label={`${profile.name} — home`} className="group absolute left-4 top-3 z-20 hidden sm:left-6 sm:top-4 sm:block lg:left-10">
          <BrandMark className="h-10 w-auto transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-hover:scale-105 lg:h-11" />
        </a>
        <div className="pb-16 pt-6 text-center lg:self-center lg:pb-24 lg:pt-32 lg:text-left">
          <motion.p {...reveal(0.05)} className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-hero-deep">
            Hello, I'm
          </motion.p>
          <h1 id="hero-title" className="mt-4">
            <motion.span {...reveal(0.12)} className="block pb-1 font-display text-5xl font-extrabold leading-[1.02] tracking-[-0.04em] text-hero-ink sm:text-7xl xl:text-8xl">
              {profile.name}
            </motion.span>
            <motion.span {...reveal(0.22)} className="mt-5 block font-display text-lg font-bold sm:text-xl">
              {profile.role}
            </motion.span>
          </h1>
          <motion.p {...reveal(0.32)} className="mx-auto mt-4 max-w-xl text-base font-medium leading-relaxed sm:text-lg lg:mx-0">
            {profile.intro}
          </motion.p>

          <motion.ul {...reveal(0.42)} className="mt-7 flex flex-wrap justify-center gap-2 lg:justify-start" aria-label="Highlights">
            {profile.indicators.map((t, i) => (
              <motion.li
                key={t}
                whileHover={{ y: -3 }}
                className={`cursor-default rounded-full px-3.5 py-1.5 text-xs font-semibold ${
                  i === 0 ? 'bg-hero-ink text-white' : 'border border-hero-ink/15 bg-white/60 text-hero-ink transition-colors hover:bg-white'
                }`}
              >
                {t}
              </motion.li>
            ))}
          </motion.ul>

          <motion.div {...reveal(0.52)} className="mt-9 flex flex-wrap justify-center gap-3 lg:justify-start">
            <motion.a whileTap={{ scale: 0.97 }} href="#my-work" className={`${btn} bg-hero-ink text-white shadow-[0_14px_30px_-12px_rgb(11_42_74/0.55)] hover:bg-[#061a30]`}>
              Explore My Work
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true" />
            </motion.a>
            <motion.a whileTap={{ scale: 0.97 }} href="#contact" className={`${btn} bg-white text-hero-ink shadow-[0_10px_24px_-14px_rgb(11_42_74/0.35)] hover:bg-[#eef8fe]`}>
              <Mail className="h-4 w-4" aria-hidden="true" /> Contact Me
            </motion.a>
          </motion.div>
        </div>

        {/* Portrait anchored to the bottom edge on desktop so the shoulders run off the section */}
        <motion.div
          className="order-first pt-24 lg:order-none lg:self-end lg:pt-28"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE, delay: 0.1 }}
        >
          <HeroStage finePointer={fine} />
        </motion.div>
      </div>

      {/* Soft curved horizon into the page below (also tucks in the portrait's cropped bottom edge) */}
      <svg aria-hidden="true" viewBox="0 0 1440 80" preserveAspectRatio="none" className="pointer-events-none absolute inset-x-0 -bottom-px z-10 h-8 w-full sm:h-14 lg:h-20">
        <path d="M0,80 L0,46 C320,10 640,0 720,0 C800,0 1120,10 1440,46 L1440,80 Z" fill="#f7f8fa" />
      </svg>
    </section>
  )
}
