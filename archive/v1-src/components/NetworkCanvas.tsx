import { useEffect, useRef } from 'react'

/**
 * Ambient background: a sparse graph of drifting nodes whose nearby pairs connect.
 * Kept deliberately quiet — low node count, slow drift, faint lines.
 * Pauses when off-screen or the tab is hidden; renders a single static frame under reduced motion.
 */
export function NetworkCanvas({ className = '' }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    let w = 0
    let h = 0
    let raf = 0
    let visible = true
    const pointer = { x: -9999, y: -9999 }
    type N = { x: number; y: number; vx: number; vy: number; r: number }
    let nodes: N[] = []

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      w = rect.width
      h = rect.height
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const count = Math.min(70, Math.round((w * h) / 22000))
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.16,
        vy: (Math.random() - 0.5) * 0.16,
        r: Math.random() * 1.2 + 0.6,
      }))
    }

    const LINK = 140
    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      for (const n of nodes) {
        if (!reduce) {
          n.x += n.vx
          n.y += n.vy
          if (n.x < 0 || n.x > w) n.vx *= -1
          if (n.y < 0 || n.y > h) n.vy *= -1
        }
      }
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i]
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const d = Math.hypot(dx, dy)
          if (d < LINK) {
            const near = Math.hypot((a.x + b.x) / 2 - pointer.x, (a.y + b.y) / 2 - pointer.y) < 180
            ctx.strokeStyle = near ? `rgba(110,155,255,${(1 - d / LINK) * 0.45})` : `rgba(160,175,210,${(1 - d / LINK) * 0.12})`
            ctx.lineWidth = 0.6
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
      }
      for (const n of nodes) {
        const near = Math.hypot(n.x - pointer.x, n.y - pointer.y) < 180
        ctx.fillStyle = near ? 'rgba(150,185,255,0.9)' : 'rgba(180,192,220,0.35)'
        ctx.beginPath()
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    const loop = () => {
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
    io.observe(canvas)

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      pointer.x = e.clientX - rect.left
      pointer.y = e.clientY - rect.top
      if (reduce) draw()
    }
    const onVis = () => !document.hidden && visible && start()
    const ro = new ResizeObserver(() => {
      resize()
      if (reduce) draw()
    })
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
  }, [])

  return <canvas ref={ref} className={`pointer-events-none ${className}`} aria-hidden="true" />
}
