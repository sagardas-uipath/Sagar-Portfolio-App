import type { ReactNode } from 'react'

export type Tone = 'neutral' | 'signal' | 'teal' | 'ok' | 'warn' | 'bad'

const tones: Record<Tone, string> = {
  neutral: 'border-white/10 bg-white/[0.03] text-fg-muted',
  signal: 'border-signal/30 bg-signal/10 text-[#b7cbff]',
  teal: 'border-teal/30 bg-teal/10 text-[#9fe8e0]',
  ok: 'border-ok/30 bg-ok/10 text-[#8fe3b8]',
  warn: 'border-warn/30 bg-warn/10 text-[#f6d39f]',
  bad: 'border-bad/30 bg-bad/10 text-[#f8b0a8]',
}

export function Badge({ children, tone = 'neutral', className = '' }: { children: ReactNode; tone?: Tone; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[0.7rem] leading-none tracking-wide ${tones[tone]} ${className}`}>
      {children}
    </span>
  )
}

/** Marks simulated content so it is never mistaken for a real metric. */
export function DemoBadge({ label = 'Demo data' }: { label?: string }) {
  return (
    <Badge tone="warn" className="uppercase">
      <span className="h-1.5 w-1.5 rounded-full bg-warn" aria-hidden="true" />
      {label}
    </Badge>
  )
}
