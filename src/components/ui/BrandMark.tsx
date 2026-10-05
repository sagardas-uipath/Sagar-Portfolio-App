import { useId } from 'react'

// 100×64 design grid. Keep in sync with src/assets/favicon.svg (same mark on a white tile).
const S = 'M34.96 15.62 A8.5 8.5 0 1 0 28 29 A8.5 8.5 0 1 1 21.04 42.38'
const D = 'M50 12 H55 A17 17 0 0 1 55 46 H50 Z'
const SWOOSH = 'M3 35 C 24 52, 60 51, 97 6 C 63 42, 28 45, 3 35 Z'

/**
 * SD brand mark: bold geometric S and D slanted 14° for forward momentum, crossed by a tapered
 * azure swoosh that rises left → right. The letters are masked away around the swoosh, so the
 * gap stays clean on any background. Transparent — no tile, no wordmark.
 */
export function BrandMark({ className = '', title }: { className?: string; title?: string }) {
  const uid = useId().replace(/:/g, '')
  return (
    <svg viewBox="0 0 100 64" className={className} role={title ? 'img' : undefined} aria-hidden={title ? undefined : true} aria-label={title}>
      <defs>
        <linearGradient id={`${uid}n`} x1="10" y1="8" x2="80" y2="52" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#163F73" />
          <stop offset="1" stopColor="#0B2A4A" />
        </linearGradient>
        <linearGradient id={`${uid}s`} x1="3" y1="45" x2="97" y2="9" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#7CC8F7" />
          <stop offset="0.55" stopColor="#2B8BEA" />
          <stop offset="1" stopColor="#1D6FD1" />
        </linearGradient>
        <mask id={`${uid}m`} maskUnits="userSpaceOnUse" x="0" y="0" width="100" height="64">
          <rect width="100" height="64" fill="#fff" />
          <path d={SWOOSH} fill="#000" stroke="#000" strokeWidth="4" strokeLinejoin="round" />
        </mask>
      </defs>
      <g mask={`url(#${uid}m)`}>
        <g transform="translate(0 29) skewX(-14) translate(0 -29)" fill="none" stroke={`url(#${uid}n)`} strokeWidth="7.4">
          <path d={S} strokeLinecap="round" />
          <path d={D} strokeLinejoin="round" />
        </g>
      </g>
      <path d={SWOOSH} fill={`url(#${uid}s)`} />
    </svg>
  )
}
