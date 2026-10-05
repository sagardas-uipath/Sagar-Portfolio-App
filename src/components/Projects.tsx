import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Briefcase, Building2, CheckCircle2, ChevronDown, Clock3, MapPin, Users } from 'lucide-react'
import { Fragment, useCallback, useState, type ReactNode } from 'react'
import { EASE, inView } from '../animations/variants'
import { PROJECTS_SHOWN, projects } from '../data/portfolio'
import type { Project } from '../data/types'
import { ProjectVisual } from './ProjectVisual'
import { AnimatedCounter } from './ui/AnimatedCounter'
import { Badge } from './ui/Badge'
import { Modal } from './ui/Modal'
import { SubHeader } from './ui/SubHeader'
import { TiltCard } from './ui/TiltCard'

/** Compact icon-led facts for a card: domain, location, then team size or duration. */
function MetaChip({ icon, children }: { icon: ReactNode; children: ReactNode }) {
  return (
    <li className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.02] px-2.5 py-1 text-[0.72rem] font-medium text-fg-muted">
      <span className="text-accent" aria-hidden="true">
        {icon}
      </span>
      {children}
    </li>
  )
}

function CardMeta({ project }: { project: Project }) {
  const i = 'h-3.5 w-3.5'
  return (
    <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Project facts">
      <MetaChip icon={<Building2 className={i} />}>{project.domain}</MetaChip>
      <MetaChip icon={<MapPin className={i} />}>{project.location}</MetaChip>
      {project.teamSize ? (
        <MetaChip icon={<Users className={i} />}>Team of {project.teamSize}</MetaChip>
      ) : project.duration ? (
        <MetaChip icon={<Clock3 className={i} />}>{project.duration}</MetaChip>
      ) : null}
    </ul>
  )
}

function ProjectCard({ project, featured, onOpen }: { project: Project; featured?: boolean; onOpen: () => void }) {
  return (
    <motion.li
      variants={{ hidden: { opacity: 0, y: 36, rotateX: -8 }, show: { opacity: 1, y: 0, rotateX: 0, transition: { duration: 0.75, ease: EASE } } }}
      className={featured ? 'md:col-span-2 lg:col-span-3' : ''}
    >
      <TiltCard max={featured ? 3 : 6} className={`group flex h-full flex-col p-4 sm:p-5 ${featured ? 'lg:grid lg:grid-cols-[1.05fr_1fr] lg:gap-8 lg:p-6' : ''}`}>
        <ProjectVisual project={project} tall={featured} />
        <div className={`flex flex-1 flex-col ${featured ? 'pt-5 lg:pt-1' : 'pt-5'}`}>
          <p className="eyebrow !text-[0.62rem] !text-accent-soft">{project.category}</p>
          <h3 className={`mt-2.5 font-bold leading-snug text-fg ${featured ? 'text-2xl sm:text-3xl' : 'text-lg'}`}>{project.title}</h3>
          <p className="mt-2.5 text-sm leading-relaxed text-fg-muted">{project.description}</p>
          <CardMeta project={project} />

          {project.outcome && (
            <p className="mt-4 flex items-baseline gap-2 rounded-xl border border-accent/25 bg-accent/[0.07] px-4 py-3">
              <span className="font-display text-2xl font-bold text-accent">
                {project.outcome.value}
                {project.outcome.suffix}
              </span>
              <span className="text-sm text-fg-muted">{project.outcome.label}</span>
            </p>
          )}

          {featured && (
            <ul className="mt-5 grid gap-x-4 gap-y-2 sm:grid-cols-2">
              {project.highlights.map((h) => (
                <li key={h} className="flex items-start gap-2 text-sm text-fg-muted">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                  {h}
                </li>
              ))}
            </ul>
          )}

          <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Technologies">
            {project.tags.map((t, i) => (
              <li key={t} className="transition-transform duration-300 group-hover:-translate-y-0.5" style={{ transitionDelay: `${i * 35}ms` }}>
                <Badge className="transition-colors group-hover:border-accent/30 group-hover:text-fg">{t}</Badge>
              </li>
            ))}
          </ul>

          <div className="mt-auto pt-6">
            <button
              onClick={onOpen}
              aria-label={`View details: ${project.title}`}
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/12 px-4 py-2 text-sm font-medium text-fg transition hover:border-accent/50 hover:bg-accent/10"
            >
              View Details
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </TiltCard>
    </motion.li>
  )
}

function ProjectDetails({ project, total, onPrev, onNext }: { project: Project; total: number; onPrev: () => void; onNext: () => void }) {
  const d = project.details
  return (
    <article className="px-5 pb-8 pt-6 sm:px-10 sm:pb-10 sm:pt-10">
      <p className="eyebrow pr-12">
        <span className="text-accent">Project {project.index}</span> · {project.category}
      </p>
      <h2 className="mt-3 pr-10 text-2xl font-bold leading-tight text-fg sm:text-3xl">{project.title}</h2>
      <p className="mt-3 max-w-2xl leading-relaxed text-fg-muted">{project.description}</p>

      {/* Fact panel */}
      <dl className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.08] sm:grid-cols-4">
        {[
          { k: 'Domain', v: project.domain, icon: Building2 },
          { k: 'Location', v: project.location, icon: MapPin },
          { k: 'Role', v: project.role, icon: Briefcase },
          project.teamSize ? { k: 'Team size', v: project.teamSize, icon: Users } : { k: 'Duration', v: project.duration ?? '—', icon: Clock3 },
        ].map((f) => (
          <div key={f.k} className="bg-[#ffffff] px-4 py-3.5">
            <dt className="flex items-center gap-1.5 text-[0.68rem] font-semibold uppercase tracking-wider text-fg-subtle">
              <f.icon className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
              {f.k}
            </dt>
            <dd className="mt-1 text-sm font-semibold text-fg">{f.v}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5">
          <p className="eyebrow !text-[0.62rem]">Challenge</p>
          <p className="mt-2 text-sm leading-relaxed text-fg">{d.challenge}</p>
        </div>
        <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5">
          <p className="eyebrow !text-[0.62rem]">Approach</p>
          <p className="mt-2 text-sm leading-relaxed text-fg">{d.approach}</p>
        </div>
      </div>

      <p className="eyebrow mb-3 mt-8 !text-[0.62rem]">Automation flow</p>
      <ol className="flex flex-wrap items-center gap-2">
        {d.flow.map((s, i) => (
          <Fragment key={s}>
            <motion.li
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.08, duration: 0.35 }}
              className="rounded-lg border border-accent/25 bg-accent/[0.06] px-3 py-1.5 text-xs font-medium text-fg"
            >
              {s}
            </motion.li>
            {i < d.flow.length - 1 && (
              <li aria-hidden="true" className="text-fg-subtle">
                →
              </li>
            )}
          </Fragment>
        ))}
      </ol>

      <div className="mt-8 grid gap-6 sm:grid-cols-[1fr_auto] sm:items-start">
        <div>
          <p className="eyebrow mb-3 !text-[0.62rem]">Highlights</p>
          <ul className="space-y-2">
            {project.highlights.map((h) => (
              <li key={h} className="flex gap-2.5 text-sm text-fg">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                {h}
              </li>
            ))}
          </ul>
        </div>
        {project.outcome && (
          <div className="rounded-2xl border border-accent/25 bg-accent/[0.07] px-6 py-5">
            <p className="font-display text-4xl font-bold text-accent">
              <AnimatedCounter value={project.outcome.value} suffix={project.outcome.suffix} />
            </p>
            <p className="mt-1 text-sm text-fg-muted">{project.outcome.label}</p>
          </div>
        )}
      </div>

      <ul className="mt-8 flex flex-wrap gap-2" aria-label="Technologies">
        {project.tags.map((t) => (
          <li key={t}>
            <Badge tone="accent">{t}</Badge>
          </li>
        ))}
      </ul>

      <footer className="mt-10 flex items-center justify-between gap-3 border-t border-white/[0.07] pt-5">
        <button onClick={onPrev} className="inline-flex min-h-11 items-center gap-2 rounded-full px-3 text-sm text-fg-muted transition hover:text-fg">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Previous
        </button>
        <span className="font-mono text-xs text-fg-subtle">
          {project.index} / {String(total).padStart(2, '0')}
        </span>
        <button onClick={onNext} className="inline-flex min-h-11 items-center gap-2 rounded-full px-3 text-sm text-fg-muted transition hover:text-fg">
          Next <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </button>
      </footer>
    </article>
  )
}

/** Part ② of My Work: the project grid and its details modal. */
export function SelectedWork() {
  const [openIdx, setOpenIdx] = useState<number | null>(null)
  const close = useCallback(() => setOpenIdx(null), [])
  const step = (d: number) => setOpenIdx((i) => (i === null ? i : (i + d + projects.length) % projects.length))
  const current = openIdx === null ? null : projects[openIdx]
  const [showAll, setShowAll] = useState(false)
  const featuredProjects = projects.slice(0, PROJECTS_SHOWN)
  const moreProjects = projects.slice(PROJECTS_SHOWN)
  const toggleAll = () => {
    if (showAll) document.getElementById('selected-work')?.scrollIntoView({ behavior: 'smooth' })
    setShowAll((v) => !v)
  }

  return (
    <div id="selected-work" className="scroll-mt-12">
      <SubHeader
        step="02"
        id="selected-work-title"
        title="Selected Automation Work"
        description="Enterprise RPA, AI, document automation and production support across banking, telecom, manufacturing, hospitality and more. Open any project for the details."
      />

      <motion.ul
        initial="hidden"
        whileInView="show"
        viewport={inView}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07 } } }}
        className="grid gap-5 md:grid-cols-2 lg:grid-cols-3"
        aria-labelledby="selected-work-title"
      >
        {featuredProjects.map((p, i) => (
          <ProjectCard key={p.id} project={p} featured={i === 0} onOpen={() => setOpenIdx(i)} />
        ))}
      </motion.ul>

      {/* Remaining projects cascade in below, in the same card style */}
      <AnimatePresence initial={false}>
        {showAll && (
          <motion.ul
            id="more-projects"
            key="more"
            initial="hidden"
            animate="show"
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
            className="mt-5 grid gap-5 md:grid-cols-2 lg:grid-cols-3"
            aria-label="More projects"
          >
            {moreProjects.map((p, i) => (
              <ProjectCard key={p.id} project={p} onOpen={() => setOpenIdx(PROJECTS_SHOWN + i)} />
            ))}
          </motion.ul>
        )}
      </AnimatePresence>

      {moreProjects.length > 0 && (
        <div className="mt-10 flex items-center gap-4">
          <span aria-hidden="true" className="h-px flex-1 bg-gradient-to-r from-transparent to-accent/30" />
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={toggleAll}
            aria-expanded={showAll}
            aria-controls="more-projects"
            className="group inline-flex min-h-12 items-center gap-3 rounded-full border border-accent/25 bg-[#ffffff] py-2 pl-2 pr-5 text-sm font-semibold text-fg shadow-[0_1px_2px_rgb(15_23_42/0.05),0_12px_28px_-14px_rgb(29_111_209/0.45)] transition-colors hover:border-accent/50"
          >
            <span className="flex h-8 min-w-8 items-center justify-center rounded-full bg-gradient-to-br from-accent to-accent-2 px-2 font-mono text-xs text-[#ffffff]">
              {showAll ? projects.length : `+${moreProjects.length}`}
            </span>
            {showAll ? 'Show fewer projects' : `Explore all ${projects.length} projects`}
            <ChevronDown
              aria-hidden="true"
              className={`h-4 w-4 text-accent transition-transform duration-300 ${showAll ? 'rotate-180' : 'group-hover:translate-y-0.5'}`}
            />
          </motion.button>
          <span aria-hidden="true" className="h-px flex-1 bg-gradient-to-l from-transparent to-accent/30" />
        </div>
      )}

      <Modal open={current !== null} onClose={close} title={current ? `Project details: ${current.title}` : 'Project details'} size="xl" themeClass="theme-light !bg-transparent">
        <AnimatePresence mode="wait" initial={false}>
          {current && (
            <motion.div key={current.id} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.25 }}>
              <ProjectDetails project={current} total={projects.length} onPrev={() => step(-1)} onNext={() => step(1)} />
            </motion.div>
          )}
        </AnimatePresence>
      </Modal>
    </div>
  )
}
