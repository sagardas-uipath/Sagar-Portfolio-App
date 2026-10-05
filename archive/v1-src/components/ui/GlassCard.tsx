import { motion, type HTMLMotionProps } from 'framer-motion'
import type { PointerEvent } from 'react'

type Props = HTMLMotionProps<'div'> & { glass?: boolean; interactive?: boolean }

/**
 * Base card. `interactive` adds a pointer-tracked spotlight border and hover lift.
 * Pointer position is written to CSS variables — no React re-render per move.
 */
export function GlassCard({ glass = false, interactive = false, className = '', onPointerMove, children, ...rest }: Props) {
  const handleMove = (e: PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
    onPointerMove?.(e)
  }
  return (
    <motion.div
      onPointerMove={interactive ? handleMove : onPointerMove}
      whileHover={interactive ? { y: -4 } : undefined}
      transition={{ type: 'spring', stiffness: 300, damping: 26 }}
      className={`${glass ? 'glass' : 'surface'} ${interactive ? 'spotlight' : ''} rounded-2xl shadow-[0_1px_0_0_rgb(255_255_255/0.04)_inset,0_20px_40px_-24px_rgb(0_0_0/0.8)] ${className}`}
      {...rest}
    >
      {children}
    </motion.div>
  )
}
