import { motion } from 'framer-motion'
import { fadeUp, inView, stagger } from '../animations/variants'
import { snapshot } from '../data/portfolio'
import { AnimatedCounter } from './ui/AnimatedCounter'

export function Snapshot() {
  return (
    <section id="snapshot" aria-label="Professional snapshot" className="relative">
      <div className="container-x">
        <motion.dl
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          className="glass grid grid-cols-2 overflow-hidden rounded-3xl lg:grid-cols-4"
        >
          {snapshot.map((m, i) => (
            <motion.div
              key={m.label}
              variants={fadeUp}
              className={`relative flex flex-col p-6 sm:p-8 ${i % 2 === 1 ? 'border-l border-white/[0.06]' : ''} ${i >= 2 ? 'border-t border-white/[0.06] lg:border-t-0' : ''} ${i === 2 ? 'lg:border-l' : ''}`}
            >
              <dt className="order-2 mt-3 text-sm font-medium text-fg">{m.label}</dt>
              <dd className="order-1 font-display text-4xl font-bold tracking-tight text-fg sm:text-5xl">
                {typeof m.value === 'number' ? <AnimatedCounter value={m.value} suffix={m.suffix} /> : <span className="text-gradient whitespace-nowrap text-[0.8em] sm:text-[1em]">{m.value}</span>}
              </dd>
              {m.note && <dd className="order-3 mt-1 text-xs leading-relaxed text-fg-subtle">{m.note}</dd>}
            </motion.div>
          ))}
        </motion.dl>
      </div>
    </section>
  )
}
