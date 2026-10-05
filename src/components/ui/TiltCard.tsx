import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { useTilt } from '../../hooks/useTilt'

type Props = { max?: number; className?: string; children: ReactNode }

/**
 * Card with hover lift, optional pointer-driven 3D tilt (`max` degrees; 0 = no tilt) and spotlight border.
 *
 * The outer element is a *stationary* hover target; only the inner card moves. If the moving card
 * were its own hover target, lifting it near the bottom edge would slide it out from under the cursor,
 * un-hover, drop back, re-hover… — the visible "vibration". Tilt is likewise measured on the static box.
 */
export function TiltCard({ max = 7, className = '', children }: Props) {
  const tilt = useTilt(max)
  return (
    <div className="group/tilt h-full" {...tilt.handlers}>
      <motion.div
        style={max > 0 ? tilt.style : undefined}
        className={`surface spotlight h-full rounded-2xl shadow-[0_1px_2px_rgb(15_23_42/0.05),0_12px_28px_-16px_rgb(15_23_42/0.18)] transition-[translate,box-shadow,border-color] duration-300 ease-out group-hover/tilt:-translate-y-1 group-hover/tilt:shadow-[0_24px_48px_-24px_rgb(15_23_42/0.3),0_0_0_1px_rgb(29_111_209/0.18)] ${className}`}
      >
        {children}
      </motion.div>
    </div>
  )
}
