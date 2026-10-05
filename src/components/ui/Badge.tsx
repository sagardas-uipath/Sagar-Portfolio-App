import type { ReactNode } from 'react'

export type Tone = 'neutral' | 'accent' | 'cool' | 'ok'

const tones: Record<Tone, string> = {
  neutral: 'border-white/10 bg-white/[0.03] text-fg-muted',
  accent: 'border-accent/30 bg-accent/10 text-accent-soft',
  cool: 'border-accent-2/30 bg-accent-2/10 text-accent-2-soft',
  ok: 'border-ok/30 bg-ok/10 text-[#8fe3b8]',
}

export function Badge({ children, tone = 'neutral', className = '' }: { children: ReactNode; tone?: Tone; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[0.7rem] leading-none tracking-wide ${tones[tone]} ${className}`}>
      {children}
    </span>
  )
}
