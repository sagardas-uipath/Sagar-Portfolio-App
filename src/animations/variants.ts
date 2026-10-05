import type { Transition, Variants } from 'framer-motion'

/**
 * ANIMATION LANGUAGE
 * • Fast: 0.35–0.7s. Nothing loops unless it communicates live status or flow.
 * • Natural: expo-out easing for entrances, springs only for direct manipulation.
 * • Purposeful: motion shows progress, relationship, status, interaction or hierarchy.
 * Reduced motion is handled globally via <MotionConfig reducedMotion="user">.
 */
export const EASE = [0.16, 1, 0.3, 1] as const

export const transition: Transition = { duration: 0.7, ease: EASE }

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition },
}

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.6, ease: EASE } },
}

export const stagger = (staggerChildren = 0.08, delayChildren = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren, delayChildren } },
})

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: EASE } },
}

/** Default viewport config for scroll reveals: trigger once, slightly before fully in view. */
export const inView = { once: true, margin: '0px 0px -12% 0px' } as const
