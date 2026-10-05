import { useEffect, useRef } from 'react'

/**
 * A slowly rotating 3D point-cloud "neural network": nodes on a sphere, each
 * linked to its nearest neighbours, projected with perspective. Depth drives
 * size, opacity and colour. `tone="onAccent"` draws in white/navy for use on the sky-blue hero.
 * Pauses off-screen / in background tabs; draws one static frame under reduced motion.
 */
export function NeuralSphere({ nodes = 96, tone = 'default', className = '' }: { nodes?: number; tone?: 'default' | 'onAccent'; className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return
    const onAccent = tone === 'onAccent'
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    // Fibonacci sphere
    const pts = Array.from({ length: nodes }, (_, i) => {
      const y = 1 - (i / (nodes - 1)) * 2
      const r = Math.sqrt(1 - y * y)
      const t = i * Math.PI * (3 - Math.sqrt(5))
      return [Math.cos(t) * r, y, Math.sin(t) * r] as const
    })
    // Edges: 3 nearest neighbours, deduplicated
    const edges = new Set<string>()
    pts.forEach((p, i) => {
      pts
        .map((q, j) => [j, (p[0] - q[0]) ** 2 + (p[1] - q[1]) ** 2 + (p[2] - q[2]) ** 2] as const)
        .filter(([j]) => j !== i)
        .sort((a, b) => a[1] - b[1])
        .slice(0, 3)
        .forEach(([j]) => edges.add(i < j ? `${i}-${j}` : `${j}-${i}`))
    })
    const edgeList = [...edges].map((e) => e.split('-').map(Number) as [number, number])

    let w = 0
    let h = 0
    let raf = 0
    let visible = true
    let yaw = 0
    let pitch = 0.25
    const target = { yaw: 0, pitch: 0 }

    const resize = () => {
      const r = canvas.getBoundingClientRect()
      w = r.width
      h = r.height
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      const R = Math.min(w, h) * 0.42
      const cy = Math.cos(yaw + target.yaw)
      const sy = Math.sin(yaw + target.yaw)
      const cp = Math.cos(pitch + target.pitch)
      const sp = Math.sin(pitch + target.pitch)
      const proj = pts.map(([x, y, z]) => {
        const x1 = x * cy - z * sy
        const z1 = x * sy + z * cy
        const y1 = y * cp - z1 * sp
        const z2 = y * sp + z1 * cp
        const s = 2.6 / (2.6 + z2)
        return { x: w / 2 + x1 * R * s, y: h / 2 + y1 * R * s, z: z2 }
      })
      ctx.lineWidth = 0.7
      for (const [a, b] of edgeList) {
        const p = proj[a]
        const q = proj[b]
        const depth = (2 - (p.z + q.z)) / 4 // 0 back … 1 front
        ctx.strokeStyle = onAccent
          ? depth > 0.5 ? `rgba(255,255,255,${0.08 + depth * 0.4})` : `rgba(11,42,74,${0.06 + depth * 0.2})`
          : depth > 0.5 ? `rgba(255,140,100,${0.06 + depth * 0.32})` : `rgba(142,162,255,${0.05 + depth * 0.25})`
        ctx.beginPath()
        ctx.moveTo(p.x, p.y)
        ctx.lineTo(q.x, q.y)
        ctx.stroke()
      }
      for (const p of proj) {
        const depth = (1 - p.z) / 2
        ctx.fillStyle = onAccent
          ? depth > 0.5 ? `rgba(255,255,255,${0.35 + depth * 0.6})` : `rgba(11,42,74,${0.18 + depth * 0.3})`
          : depth > 0.5 ? `rgba(255,170,140,${0.25 + depth * 0.7})` : `rgba(170,185,255,${0.2 + depth * 0.5})`
        ctx.beginPath()
        ctx.arc(p.x, p.y, 0.6 + depth * 1.8, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    const loop = () => {
      yaw += 0.0016
      draw()
      if (visible && !document.hidden) raf = requestAnimationFrame(loop)
    }
    const start = () => {
      cancelAnimationFrame(raf)
      if (reduce) draw()
      else raf = requestAnimationFrame(loop)
    }

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting
      if (visible) start()
    })
    const ro = new ResizeObserver(() => {
      resize()
      draw()
    })
    const onMove = (e: PointerEvent) => {
      target.yaw = (e.clientX / window.innerWidth - 0.5) * 0.6
      target.pitch = (e.clientY / window.innerHeight - 0.5) * 0.4
      if (reduce) draw()
    }
    const onVis = () => !document.hidden && visible && start()

    io.observe(canvas)
    ro.observe(canvas)
    window.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('visibilitychange', onVis)
    resize()
    start()
    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
      ro.disconnect()
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('visibilitychange', onVis)
    }
  }, [nodes, tone])

  return <canvas ref={ref} aria-hidden="true" className={`pointer-events-none ${className}`} />
}
