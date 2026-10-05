type Tone = 'ok' | 'accent'
const colors: Record<Tone, string> = { ok: 'bg-ok', accent: 'bg-accent' }

export function StatusIndicator({ label, tone = 'ok', className = '' }: { label: string; tone?: Tone; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <span className="relative flex h-2 w-2" aria-hidden="true">
        <span className={`absolute inline-flex h-full w-full rounded-full ${colors[tone]} animate-pulse-soft`} />
        <span className={`relative inline-flex h-2 w-2 rounded-full ${colors[tone]}`} />
      </span>
      <span>{label}</span>
    </span>
  )
}
