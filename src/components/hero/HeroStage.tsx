import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { profile } from '../../data/portfolio'
import { useMediaQuery } from '../../hooks/useMedia'
import { NeuralSphere } from './NeuralSphere'
import { Portrait } from './Portrait'

// Chip positions around the portrait (% of the portrait box) and their depth.
const CHIP_LAYOUT = [
  { left: '-4%', top: '16%', z: 110, delay: 0 },
  { right: '-2%', top: '12%', z: 70, delay: 1.2 },
  { left: '-8%', top: '44%', z: 60, delay: 2.1 },
  { right: '-6%', top: '38%', z: 130, delay: 0.6 },
  { left: '0%', top: '68%', z: 90, delay: 1.6 },
  { right: '2%', top: '62%', z: 50, delay: 2.6 },
] as const

/**
 * Orbit ring with workflow nodes travelling around it. Drawn as a flattened circle on a plane
 * parallel to the portrait — a truly tilted plane would slice through the 3D scene and make
 * Chrome split and mis-sort the chips.
 */
function OrbitRing({ tilt, spin, size, top = '38%', reverse = false }: { tilt: string; spin: number; size: string; top?: string; reverse?: boolean }) {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute left-1/2" style={{ top, width: size, height: size, transform: `translate(-50%,-50%) ${tilt}` }}>
      <svg viewBox="0 0 200 200" className="h-full w-full animate-orbit" style={{ animationDuration: `${spin}s`, animationDirection: reverse ? 'reverse' : 'normal' }}>
        <circle cx="100" cy="100" r="98" fill="none" stroke="rgb(255 255 255 / 0.8)" strokeWidth="0.4" strokeDasharray="1 3" />
        <circle cx="100" cy="2" r="2.4" fill="#fff" />
        <circle cx="198" cy="100" r="1.7" fill="#1d78c1" />
        <circle cx="30" cy="170" r="1.5" fill="#fff" />
      </svg>
    </div>
  )
}

/**
 * Hero visual: the cut-out portrait stands directly on the sky-blue hero (no card).
 * Gentle 3D tilt on desktop.
 */
export function HeroStage({ finePointer }: { finePointer: boolean }) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const wide = useMediaQuery('(min-width: 768px)')
  const tiltOn = finePointer && wide && !reduce

  const px = useMotionValue(0)
  const py = useMotionValue(0)
  const rotateY = useSpring(useTransform(px, [-1, 1], [-6, 6]), { stiffness: 90, damping: 18 })
  const rotateX = useSpring(useTransform(py, [-1, 1], [4, -4]), { stiffness: 90, damping: 18 })

  useEffect(() => {
    if (!tiltOn) {
      px.set(0)
      py.set(0)
      return
    }
    const onMove = (e: PointerEvent) => {
      const el = ref.current
      if (!el) return
      const r = el.getBoundingClientRect()
      px.set(Math.max(-1, Math.min(1, (e.clientX - (r.left + r.width / 2)) / (window.innerWidth / 2))))
      py.set(Math.max(-1, Math.min(1, (e.clientY - (r.top + r.height / 2)) / (window.innerHeight / 2))))
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [tiltOn, px, py])

  return (
    <div ref={ref} className="relative mx-auto w-[min(80vw,24rem)] sm:w-[min(62vw,28rem)] lg:w-[min(42vw,34rem)]" style={{ perspective: 1400 }}>

      <motion.div className="preserve-3d relative" style={{ transformOrigin: '50% 100%', ...(tiltOn ? { rotateX, rotateY } : {}) }}>
        {/* Back layer: neural sphere around the head (skipped on small screens) */}
        {wide && (
          <div className="absolute left-1/2 top-[34%] h-[120%] w-[120%]" style={{ transform: 'translate(-50%,-50%) translateZ(-160px)' }}>
            <NeuralSphere tone="onAccent" nodes={finePointer ? 110 : 70} className="h-full w-full" />
          </div>
        )}

        <OrbitRing tilt="translateZ(-40px) scaleY(0.3)" spin={46} size="118%" />
        {wide && <OrbitRing tilt="translateZ(-60px) rotate(-16deg) scaleY(0.36)" spin={62} size="104%" top="42%" reverse />}

        {/* Portrait — transparent cut-out, no frame */}
        <div className="portrait-blend relative" style={{ transform: 'translateZ(0px)' }}>
          <Portrait finePointer={finePointer} />
        </div>

        {/* Floating capability chips */}
        {profile.orbit.map((label, i) => {
          const { z, delay, ...pos } = CHIP_LAYOUT[i % CHIP_LAYOUT.length]
          return (
            <span
              key={label}
              aria-hidden="true"
              className="absolute flex animate-float items-center gap-2 rounded-full bg-white px-2.5 py-1.5 font-mono text-[0.62rem] font-semibold tracking-wide text-hero-ink shadow-[0_14px_30px_-14px_rgb(11_42_74/0.45)] sm:px-3 sm:text-[0.72rem]"
              style={{ ...pos, ['--z' as string]: `${wide ? z : 40}px`, transform: 'translate3d(0, 0, var(--z))', animationDelay: `${delay}s` }}
            >
              <span className={`h-1.5 w-1.5 rounded-full ${i % 2 ? 'bg-hero-ink' : 'bg-hero-deep'}`} />
              {label}
            </span>
          )
        })}
      </motion.div>
    </div>
  )
}
