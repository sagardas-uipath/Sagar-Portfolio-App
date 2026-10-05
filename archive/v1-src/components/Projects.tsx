import { AnimatePresence, motion } from 'framer-motion'
import { lazy, Suspense, useCallback, useEffect, useState } from 'react'
import { inView, stagger } from '../animations/variants'
import { projects } from '../data/portfolio'
import { onOpenProject } from '../lib/events'
import { ErrorBoundary } from './ErrorBoundary'
import { ProjectCard } from './ProjectCard'
import { Modal } from './ui/Modal'
import { SectionHeader } from './ui/SectionHeader'

// The case-study view is only needed on demand.
const ProjectCaseStudy = lazy(() => import('./ProjectCaseStudy').then((m) => ({ default: m.ProjectCaseStudy })))

export function Projects() {
  const [openIdx, setOpenIdx] = useState<number | null>(null)
  const close = useCallback(() => setOpenIdx(null), [])
  const step = (d: number) => setOpenIdx((i) => (i === null ? i : (i + d + projects.length) % projects.length))

  useEffect(
    () =>
      onOpenProject((id) => {
        const i = projects.findIndex((p) => p.id === id)
        if (i >= 0) setOpenIdx(i)
      }),
    [],
  )

  const [featured, ...rest] = projects
  const current = openIdx === null ? null : projects[openIdx]

  return (
    <section id="projects" aria-labelledby="projects-title" className="section-y relative">
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-40 mx-auto h-[30rem] max-w-5xl rounded-full bg-signal/[0.05] blur-[120px]" />
      <div className="container-x relative">
        <SectionHeader
          id="projects-title"
          index="04"
          eyebrow="Projects"
          title="Enterprise Automation Case Studies"
          description="Each project is told the way it was delivered: the business problem, the process, the automation opportunity, the solution and the outcome."
        />

        <motion.div variants={stagger(0.08)} initial="hidden" whileInView="show" viewport={inView} className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          <ProjectCard project={featured} featured onOpen={() => setOpenIdx(0)} />
          {rest.map((p, i) => (
            <ProjectCard key={p.id} project={p} onOpen={() => setOpenIdx(i + 1)} />
          ))}
        </motion.div>
      </div>

      <Modal open={current !== null} onClose={close} title={current ? `Case study: ${current.title}` : 'Case study'} size="xl">
        <ErrorBoundary fallback={<p className="p-10 text-fg-muted">This case study could not be displayed.</p>}>
        <Suspense fallback={<div className="h-[60vh] animate-pulse" />}>
          <AnimatePresence mode="wait">
            {current && (
              <motion.div key={current.id} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.3 }}>
                <ProjectCaseStudy project={current} total={projects.length} onPrev={() => step(-1)} onNext={() => step(1)} />
              </motion.div>
            )}
          </AnimatePresence>
        </Suspense>
        </ErrorBoundary>
      </Modal>
    </section>
  )
}
