import { motion } from 'framer-motion'
import type { Project } from '../data/types'
import { Icon } from './ui/Icon'

/**
 * Generated "blueprint" for a project card: the project's own automation flow
 * drawn as a small node graph. No stock imagery — the visual is the process.
 */
export function ProjectVisual({ project, tall = false }: { project: Project; tall?: boolean }) {
  const steps = project.caseStudy.flow.slice(0, 6)
  const W = 400
  const H = tall ? 220 : 160
  const seed = Number(project.index)
  const pts = steps.map((_, i) => {
    const t = steps.length === 1 ? 0.5 : i / (steps.length - 1)
    return { x: 36 + t * (W - 72), y: H / 2 + Math.sin(t * Math.PI * 1.6 + seed) * (H * 0.22) }
  })
  const d = pts.map((p, i) => (i === 0 ? `M${p.x},${p.y}` : `L${p.x},${p.y}`)).join(' ')

  return (
    <div className="relative overflow-hidden rounded-xl border border-white/[0.06] bg-[radial-gradient(120%_100%_at_0%_0%,rgb(110_155_255/0.12),transparent_55%),radial-gradient(100%_100%_at_100%_100%,rgb(79_209_197/0.08),transparent_60%)] bg-ink-900">
      <div className="grid-bg absolute inset-0 opacity-50" aria-hidden="true" />
      <svg viewBox={`0 0 ${W} ${H}`} className="relative block h-auto w-full" aria-hidden="true">
        <defs>
          <linearGradient id={`pv-${project.id}`} x1="0" x2="1">
            <stop offset="0" stopColor="#6E9BFF" stopOpacity="0.9" />
            <stop offset="1" stopColor="#4FD1C5" stopOpacity="0.9" />
          </linearGradient>
        </defs>
        <path d={d} fill="none" stroke="rgb(255 255 255 / 0.08)" strokeWidth="1" />
        <motion.path
          d={d}
          fill="none"
          stroke={`url(#pv-${project.id})`}
          strokeWidth="1.25"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        />
        <path d={d} fill="none" stroke="#B7CBFF" strokeOpacity="0.5" strokeWidth="1" strokeDasharray="2 10" className="animate-flow" />
        {pts.map((p, i) => (
          <g key={i}>
            <circle cx={p.x} cy={p.y} r={i === 0 || i === pts.length - 1 ? 5 : 3.5} fill="#0B0D12" stroke={i === pts.length - 1 ? '#4FD1C5' : '#6E9BFF'} strokeWidth="1.25" />
            {/* Edge labels anchor inward so they never clip at the card edge. */}
            <text
              x={i === 0 ? p.x - 8 : i === pts.length - 1 ? p.x + 8 : p.x}
              y={p.y + (i % 2 ? -14 : 22)}
              textAnchor={i === 0 ? 'start' : i === pts.length - 1 ? 'end' : 'middle'}
              fontSize="9"
              fontFamily="JetBrains Mono, monospace"
              fill="rgb(163 171 189 / 0.8)"
            >
              {steps[i].length > 15 ? steps[i].slice(0, 14) + '…' : steps[i]}
            </text>
          </g>
        ))}
      </svg>
      <span className="absolute left-3 top-3 flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-ink-950/70 text-signal backdrop-blur">
        <Icon name={project.icon} className="h-4 w-4" />
      </span>
      <span className="absolute right-3 top-3 font-mono text-[0.65rem] text-fg-subtle">{project.index}</span>
    </div>
  )
}
