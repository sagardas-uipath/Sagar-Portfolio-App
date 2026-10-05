import { motion, type HTMLMotionProps } from 'framer-motion'
import type { ReactNode } from 'react'

type Variant = 'primary' | 'secondary' | 'ghost'

const styles: Record<Variant, string> = {
  primary: 'bg-fg text-ink-950 hover:bg-white shadow-[0_8px_30px_-12px_rgb(110_155_255/0.6)]',
  secondary: 'glass text-fg hover:bg-white/[0.07]',
  ghost: 'text-fg-muted hover:text-fg hover:bg-white/[0.04]',
}

const base =
  'group relative inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-colors duration-200 disabled:opacity-50'

type CommonProps = { variant?: Variant; children: ReactNode; className?: string }

export function Button({ variant = 'primary', className = '', children, ...rest }: CommonProps & HTMLMotionProps<'button'>) {
  return (
    <motion.button whileTap={{ scale: 0.97 }} className={`${base} ${styles[variant]} ${className}`} {...rest}>
      {children}
    </motion.button>
  )
}

export function LinkButton({ variant = 'primary', className = '', children, ...rest }: CommonProps & HTMLMotionProps<'a'>) {
  return (
    <motion.a whileTap={{ scale: 0.97 }} className={`${base} ${styles[variant]} ${className}`} {...rest}>
      {children}
    </motion.a>
  )
}
