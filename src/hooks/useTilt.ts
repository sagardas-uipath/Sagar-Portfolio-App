import { useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion'
import type { PointerEvent } from 'react'
import { useFinePointer } from './useMedia'

/**
 * Pointer-driven 3D tilt for cards. Also writes --mx/--my for the spotlight border.
 * Inactive on touch devices and under reduced motion (the spotlight still works).
 */
export function useTilt(max = 7) {
  const fine = useFinePointer()
  const reduce = useReducedMotion()
  const enabled = fine && !reduce
  const px = useMotionValue(0)
  const py = useMotionValue(0)
  const spring = { stiffness: 220, damping: 22 }
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [max, -max]), spring)
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-max, max]), spring)

  const onPointerMove = (e: PointerEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
    if (!enabled) return
    px.set((e.clientX - r.left) / r.width - 0.5)
    py.set((e.clientY - r.top) / r.height - 0.5)
  }
  const onPointerLeave = () => {
    px.set(0)
    py.set(0)
  }

  return {
    handlers: { onPointerMove, onPointerLeave },
    style: enabled ? { rotateX, rotateY, transformPerspective: 1000 } : undefined,
    enabled,
  }
}
