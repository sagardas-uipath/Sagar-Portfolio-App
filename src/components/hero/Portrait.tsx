import { animate, motion, useInView, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { profile } from '../../data/portfolio'

/**
 * Eye-tracking portrait
 * ─────────────────────
 * The face is never warped. For each eye we:
 *   1. fill the iris area with the surrounding eye-white (row-wise interpolation, done once at load),
 *   2. draw the original iris pixels on top as a soft-edged disc,
 *   3. shift only that disc a few pixels, clipped to the eyelid opening (at source and destination).
 * Coordinates are in the portrait's native pixel space (1086 × 1146), measured from the image.
 */
const { src, width: W, height: H, alt } = profile.portrait

type Eye = { id: string; cx: number; cy: number; r: number; lid: string }
const EYES: Eye[] = [
  { id: 'l', cx: 441.5, cy: 266.5, r: 12.5, lid: 'M418,268 Q439.5,243 461,270 Q439.5,281 418,268 Z' },
  { id: 'r', cx: 560.5, cy: 266.5, r: 12.5, lid: 'M539,268 Q559.5,244 580,268 Q559.5,282 539,268 Z' },
]
const EYE_MID = { x: 501, y: 266.5 }
const MAX_X = 4.5 // native px — about 2 screen px at typical display size
const MAX_Y = 2.2
const PAD = 4

/** Builds an "iris removed" patch per eye by interpolating the eye-white across each row. */
async function buildScleraPatches(): Promise<Record<string, string>> {
  const bitmap = await createImageBitmap(await (await fetch(src)).blob())
  const out: Record<string, string> = {}
  for (const e of EYES) {
    const size = Math.ceil((e.r + PAD) * 2)
    const x0 = Math.round(e.cx - e.r - PAD)
    const y0 = Math.round(e.cy - e.r - PAD)
    const c = document.createElement('canvas')
    c.width = size
    c.height = size
    const ctx = c.getContext('2d', { willReadFrequently: true })!
    ctx.drawImage(bitmap, x0, y0, size, size, 0, 0, size, size)
    const img = ctx.getImageData(0, 0, size, size)
    const d = img.data
    const R = e.r + 1.5
    const px = (x: number, y: number) => {
      const xi = Math.min(size - 1, Math.max(0, Math.round(x)))
      const k = (y * size + xi) * 4
      return [d[k], d[k + 1], d[k + 2]]
    }
    for (let y = 0; y < size; y++) {
      const dy = y + y0 - e.cy
      if (Math.abs(dy) >= R) continue
      const hw = Math.sqrt(R * R - dy * dy)
      const xl = e.cx - hw - 1 - x0
      const xr = e.cx + hw + 1 - x0
      const a = px(xl, y)
      const b = px(xr, y)
      for (let x = Math.ceil(xl + 1); x < xr - 1; x++) {
        const t = (x - xl) / (xr - xl)
        const k = (y * size + x) * 4
        d[k] = a[0] + (b[0] - a[0]) * t
        d[k + 1] = a[1] + (b[1] - a[1]) * t
        d[k + 2] = a[2] + (b[2] - a[2]) * t
      }
    }
    ctx.putImageData(img, 0, 0)
    out[e.id] = c.toDataURL()
  }
  bitmap.close()
  return out
}

export function Portrait({ finePointer, className = '' }: { finePointer: boolean; className?: string }) {
  const svgRef = useRef<SVGSVGElement>(null)
  const visible = useInView(svgRef)
  const reduce = useReducedMotion()
  const [patches, setPatches] = useState<Record<string, string> | null>(null)

  const gx = useMotionValue(0)
  const gy = useMotionValue(0)
  const x = useSpring(gx, { stiffness: 140, damping: 18, mass: 0.6 })
  const y = useSpring(gy, { stiffness: 140, damping: 18, mass: 0.6 })

  useEffect(() => {
    let alive = true
    buildScleraPatches()
      .then((p) => alive && setPatches(p))
      .catch(() => {
        /* fall back to the static portrait */
      })
    return () => {
      alive = false
    }
  }, [])

  // Mouse: gaze follows the cursor. Direct, user-driven response — kept under reduced motion.
  useEffect(() => {
    if (!finePointer || !patches) return
    let frame = 0
    const onMove = (ev: PointerEvent) => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const svg = svgRef.current
        if (!svg) return
        const r = svg.getBoundingClientRect()
        const ex = r.left + (EYE_MID.x / W) * r.width
        const ey = r.top + (EYE_MID.y / H) * r.height
        const vx = ev.clientX - ex
        const vy = ev.clientY - ey
        const dist = Math.hypot(vx, vy) || 1
        const mag = Math.min(1, dist / 280)
        gx.set((vx / dist) * mag * MAX_X)
        gy.set((vy / dist) * mag * MAX_Y)
      })
    }
    const recenter = () => {
      gx.set(0)
      gy.set(0)
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    document.documentElement.addEventListener('pointerleave', recenter)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('pointermove', onMove)
      document.documentElement.removeEventListener('pointerleave', recenter)
    }
  }, [finePointer, patches, gx, gy])

  // Touch: a slow, gentle glance cycle while on screen.
  useEffect(() => {
    if (finePointer || reduce || !visible || !patches) return
    const opts = { duration: 10, repeat: Infinity, ease: 'easeInOut' as const, times: [0, 0.12, 0.3, 0.42, 0.55, 0.67, 0.85, 1] }
    const a = animate(gx, [0, -MAX_X * 0.8, -MAX_X * 0.8, 0, 0, MAX_X * 0.7, MAX_X * 0.7, 0], opts)
    const b = animate(gy, [0, 0.4, 0.4, 0, 0, -0.6, -0.6, 0], opts)
    return () => {
      a.stop()
      b.stop()
      gx.set(0)
      gy.set(0)
    }
  }, [finePointer, reduce, visible, patches, gx, gy])

  return (
    <svg ref={svgRef} viewBox={`0 0 ${W} ${H}`} role="img" aria-label={alt} className={`block h-auto w-full ${className}`}>
      <defs>
        {EYES.map((e) => (
          <g key={e.id}>
            <clipPath id={`lid-${e.id}`}>
              <path d={e.lid} />
            </clipPath>
            <radialGradient id={`feather-${e.id}`} cx={e.cx} cy={e.cy} r={e.r + 1.5} gradientUnits="userSpaceOnUse">
              <stop offset="0.82" stopColor="#fff" />
              <stop offset="1" stopColor="#000" />
            </radialGradient>
            <mask id={`iris-${e.id}`} maskUnits="userSpaceOnUse" x="0" y="0" width={W} height={H}>
              <circle cx={e.cx} cy={e.cy} r={e.r + 1.5} fill={`url(#feather-${e.id})`} />
            </mask>
          </g>
        ))}
      </defs>

      <image href={src} width={W} height={H} />

      {patches &&
        EYES.map((e) => {
          const size = Math.ceil((e.r + PAD) * 2)
          return (
            <g key={e.id} clipPath={`url(#lid-${e.id})`}>
              <image href={patches[e.id]} x={Math.round(e.cx - e.r - PAD)} y={Math.round(e.cy - e.r - PAD)} width={size} height={size} />
              <motion.g style={{ x, y }}>
                {/* Clipped to the eyelid at the source too, so lid pixels never travel with the iris. */}
                <image href={src} width={W} height={H} mask={`url(#iris-${e.id})`} clipPath={`url(#lid-${e.id})`} />
              </motion.g>
            </g>
          )
        })}
    </svg>
  )
}
