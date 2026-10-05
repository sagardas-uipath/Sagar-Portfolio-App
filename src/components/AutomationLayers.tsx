import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useRef } from 'react'
import { useTilt } from '../hooks/useTilt'

// Three isometric planes: business process → automation → systems & data.
const LAYERS = [
  { label: 'Systems & Data', z: 0, tint: 'rgb(79 95 214 / 0.07)', border: 'rgb(79 95 214 / 0.4)', nodes: [[22, 30], [70, 26], [46, 72], [78, 70]] },
  { label: 'Automation', z: 70, tint: 'rgb(255 255 255 / 0.85)', border: 'rgb(71 85 105 / 0.35)', nodes: [[30, 50], [56, 38], [74, 60]] },
  { label: 'Business Process', z: 140, tint: 'rgb(29 111 209 / 0.08)', border: 'rgb(29 111 209 / 0.5)', nodes: [[26, 34], [50, 56], [76, 40]] },
]

/** Decorative 3D illustration for the About section. */
export function AutomationLayers() {
  const ref = useRef<HTMLDivElement>(null)
  const seen = useInView(ref, { once: true, margin: '-15% 0px' })
  const reduce = useReducedMotion()
  const tilt = useTilt(6)

  return (
    <div ref={ref} aria-hidden="true" className="relative mx-auto aspect-square w-full max-w-[26rem]" style={{ perspective: 1200 }} {...tilt.handlers}>
      <motion.div className="preserve-3d absolute inset-0" style={tilt.style}>
        <div className="preserve-3d absolute inset-[14%]" style={{ transform: 'rotateX(58deg) rotateZ(-42deg)' }}>
          {LAYERS.map((l, i) => (
            <motion.div
              key={l.label}
              className="preserve-3d absolute inset-0 rounded-3xl border"
              style={{ background: l.tint, borderColor: l.border, boxShadow: '0 24px 40px -28px rgb(15 23 42 / 0.35)' }}
              initial={{ z: 0, opacity: 0 }}
              animate={seen ? { z: l.z, opacity: 1 } : undefined}
              transition={{ duration: reduce ? 0 : 1.1, ease: [0.16, 1, 0.3, 1], delay: i * 0.15 }}
            >
              <div className="absolute inset-0 rounded-3xl opacity-60 [background-image:linear-gradient(rgb(15_23_42/0.06)_1px,transparent_1px),linear-gradient(90deg,rgb(15_23_42/0.06)_1px,transparent_1px)] [background-size:22px_22px]" />
              <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
                <polyline points={l.nodes.map((n) => n.join(',')).join(' ')} fill="none" stroke={l.border} strokeWidth="0.6" strokeDasharray="2 2" />
                {l.nodes.map(([x, y]) => (
                  <circle key={`${x}-${y}`} cx={x} cy={y} r="2.6" fill="#ffffff" stroke={l.border} strokeWidth="0.8" />
                ))}
              </svg>
              <span className="absolute bottom-3 left-4 font-mono text-[0.6rem] uppercase tracking-[0.18em] text-fg-muted">{l.label}</span>
            </motion.div>
          ))}
          {/* Vertical data streams between layers */}
          {[
            [30, 50],
            [56, 38],
            [74, 60],
          ].map(([x, y], i) => (
            <div key={i} className="absolute h-[140px] w-px origin-top" style={{ left: `${x}%`, top: `${y}%`, transform: 'rotateX(90deg)' }}>
              <div className="h-full w-full bg-gradient-to-b from-accent/70 via-white/20 to-accent-2/60" />
              {!reduce && (
                <motion.span
                  className="absolute -left-[2px] h-[5px] w-[5px] rounded-full bg-accent shadow-[0_0_10px_2px_rgb(29_111_209/0.5)]"
                  animate={{ top: ['0%', '100%'] }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut', delay: i * 0.7 }}
                />
              )}
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
