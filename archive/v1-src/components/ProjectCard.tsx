import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import type { PointerEvent } from 'react'
import { EASE } from '../animations/variants'
import type { Project } from '../data/types'
import { ProjectVisual } from './ProjectVisual'
import { Badge } from './ui/Badge'

export function ProjectCard({ project, featured = false, onOpen }: { project: Project; featured?: boolean; onOpen: () => void }) {
  const reduce = useReducedMotion()
  const px = useMotionValue(0)
  const py = useMotionValue(0)
  const rx = useSpring(useTransform(py, [-0.5, 0.5], [3, -3]), { stiffness: 200, damping: 20 })
  const ry = useSpring(useTransform(px, [-0.5, 0.5], [-3, 3]), { stiffness: 200, damping: 20 })

  const onMove = (e: PointerEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
    if (reduce || e.pointerType !== 'mouse') return
    px.set((e.clientX - r.left) / r.width - 0.5)
    py.set((e.clientY - r.top) / r.height - 0.5)
  }
  const reset = () => {
    px.set(0)
    py.set(0)
  }

  const { caseStudy } = project
  return (
    <motion.article

      variants={{ hidden: { opacity: 0, y: 32 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } } }}
      onPointerMove={onMove}
      onPointerLeave={reset}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 1200 }}
      whileHover={{ y: -6 }}
      className={`surface spotlight group flex flex-col rounded-2xl p-4 transition-shadow duration-300 hover:shadow-[0_30px_60px_-30px_rgb(0_0_0/0.9),0_0_0_1px_rgb(110_155_255/0.12)] sm:p-5 ${
        featured ? 'md:col-span-2 lg:col-span-3 lg:grid lg:grid-cols-[1.1fr_1fr] lg:gap-8 lg:p-6' : ''
      }`}
    >
      <ProjectVisual project={project} tall={featured} />

      <div className={`flex flex-1 flex-col ${featured ? 'pt-5 lg:pt-1' : 'pt-5'}`}>
        <div className="flex flex-wrap items-center gap-2">
          <span className="eyebrow !text-[0.62rem] !text-signal">{project.category}</span>
          {project.domain && <span className="eyebrow !text-[0.62rem]">· {project.domain}</span>}
        </div>
        <h3 className={`mt-3 font-bold leading-snug text-fg ${featured ? 'text-2xl sm:text-3xl' : 'text-lg'}`}>{project.title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-fg-muted">{project.summary}</p>

        {featured && (
          <dl className="mt-6 grid gap-4 border-t border-white/[0.06] pt-5 sm:grid-cols-2">
            <div>
              <dt className="eyebrow !text-[0.62rem]">Business challenge</dt>
              <dd className="mt-2 text-sm leading-relaxed text-fg-muted">{caseStudy.problem}</dd>
            </div>
            <div>
              <dt className="eyebrow !text-[0.62rem]">Business value</dt>
              <dd className="mt-2 text-sm leading-relaxed text-fg-muted">{caseStudy.outcomes[0]}</dd>
            </div>
          </dl>
        )}

        {project.outcomeMetric && (
          <p className="mt-5 flex items-baseline gap-2 rounded-xl border border-teal/20 bg-teal/[0.06] px-4 py-3">
            <span className="font-display text-2xl font-bold text-teal">
              {project.outcomeMetric.value}
              {project.outcomeMetric.suffix}
            </span>
            <span className="text-sm text-fg-muted">{project.outcomeMetric.label}</span>
          </p>
        )}

        <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Technologies">
          {project.technologies.slice(0, featured ? 9 : 4).map((t) => (
            <li key={t}>
              <Badge>{t}</Badge>
            </li>
          ))}
        </ul>

        <div className="mt-auto pt-6">
          <button
            onClick={onOpen}
            className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/12 px-4 py-2 text-sm font-medium text-fg transition hover:border-signal/50 hover:bg-signal/10"
            aria-label={`View case study: ${project.title}`}
          >
            View Case Study
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </motion.article>
  )
}
