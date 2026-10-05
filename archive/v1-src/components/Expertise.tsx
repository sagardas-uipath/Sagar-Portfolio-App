import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { useMemo, useState } from 'react'
import { EASE, fadeUp, inView, stagger } from '../animations/variants'
import { expertise, projects } from '../data/portfolio'
import type { SkillArea, SkillItem } from '../data/types'
import { openProject } from '../lib/events'
import { Icon } from './ui/Icon'
import { SectionHeader } from './ui/SectionHeader'

const index = new Map<string, { item: SkillItem; area: SkillArea }>()
expertise.forEach((area) => area.items.forEach((item) => index.set(item.id, { item, area })))

function SkillDetail({ id, onSelect }: { id: string; onSelect: (id: string) => void }) {
  const entry = index.get(id)
  if (!entry) return null
  const { item, area } = entry
  const linked = projects.filter((p) => item.projects.includes(p.id))
  return (
    <motion.div key={id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3, ease: EASE }}>
      <p className="eyebrow flex items-center gap-2">
        <Icon name={area.icon} className="h-3.5 w-3.5 text-signal" />
        {area.title}
      </p>
      <h3 className="mt-3 text-2xl font-bold text-fg">{item.name}</h3>
      <p className="mt-3 text-sm leading-relaxed text-fg-muted">{item.description}</p>

      {item.related.length > 0 && (
        <div className="mt-6">
          <p className="eyebrow mb-3 !text-[0.62rem]">Works with</p>
          <div className="flex flex-wrap gap-2">
            {item.related.map((r) => (
              <button
                key={r}
                onClick={() => onSelect(r)}
                className="rounded-full border border-signal/25 bg-signal/[0.08] px-3 py-1.5 text-xs text-[#c4d4ff] transition hover:border-signal/50"
              >
                {index.get(r)?.item.name}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="mt-6">
        <p className="eyebrow mb-3 !text-[0.62rem]">Seen in</p>
        {linked.length ? (
          <ul className="space-y-2">
            {linked.map((p) => (
              <li key={p.id}>
                <button
                  onClick={() => openProject(p.id)}
                  className="group flex w-full items-center justify-between gap-3 rounded-xl border border-white/[0.07] bg-white/[0.02] px-3.5 py-3 text-left text-sm text-fg transition hover:border-white/15 hover:bg-white/[0.04]"
                >
                  <span>
                    <span className="mr-2 font-mono text-xs text-signal">{p.index}</span>
                    {p.title}
                  </span>
                  <ArrowUpRight className="h-4 w-4 shrink-0 text-fg-subtle transition group-hover:text-fg" aria-hidden="true" />
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-fg-subtle">Applied across delivery work rather than a single featured case study.</p>
        )}
      </div>
    </motion.div>
  )
}

export function Expertise() {
  const [pinned, setPinned] = useState('agentic-automation')
  const [hovered, setHovered] = useState<string | null>(null)
  const active = hovered ?? pinned
  const related = useMemo(() => new Set([active, ...(index.get(active)?.item.related ?? [])]), [active])

  return (
    <section id="expertise" aria-labelledby="expertise-title" className="section-y relative">
      <div className="container-x">
        <SectionHeader
          id="expertise-title"
          index="03"
          eyebrow="Expertise"
          title={<>The Automation Stack</>}
          description="Six layers that work together. Hover or select a capability to see how it connects to the rest of the stack — and where it shows up in delivered work."
        />

        <div className="grid gap-6 lg:grid-cols-[1fr_22rem] lg:gap-8">
          <motion.div variants={stagger(0.07)} initial="hidden" whileInView="show" viewport={inView} className="grid gap-4 sm:grid-cols-2" onMouseLeave={() => setHovered(null)}>
            {expertise.map((area) => {
              const areaHot = area.items.some((i) => related.has(i.id))
              const containsActive = area.items.some((i) => i.id === active)
              return (
                <motion.div
                  key={area.id}
                  variants={fadeUp}
                  className={`surface rounded-2xl p-5 transition-[border-color,box-shadow] duration-300 sm:p-6 ${
                    areaHot ? '!border-signal/25 shadow-[0_0_0_1px_rgb(110_155_255/0.08),0_20px_50px_-30px_rgb(110_155_255/0.5)]' : ''
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`flex h-9 w-9 items-center justify-center rounded-lg border transition-colors ${areaHot ? 'border-signal/40 text-signal' : 'border-white/10 text-fg-muted'}`}>
                      <Icon name={area.icon} className="h-4 w-4" />
                    </span>
                    <div>
                      <h3 className="text-base font-semibold text-fg">{area.title}</h3>
                      <p className="text-xs text-fg-subtle">{area.blurb}</p>
                    </div>
                  </div>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {area.items.map((item) => {
                      const isActive = item.id === active
                      const isRelated = related.has(item.id)
                      return (
                        <li key={item.id}>
                          <button
                            onMouseEnter={() => setHovered(item.id)}
                            onFocus={() => setHovered(item.id)}
                            onBlur={() => setHovered(null)}
                            onClick={() => setPinned(item.id)}
                            aria-pressed={item.id === pinned}
                            className={`rounded-full border px-3 py-1.5 text-[0.8rem] transition-all duration-200 ${
                              isActive
                                ? 'border-signal/70 bg-signal/15 text-fg shadow-[0_0_20px_-6px_rgb(110_155_255/0.7)]'
                                : isRelated
                                  ? 'border-teal/40 bg-teal/[0.08] text-fg'
                                  : 'border-white/[0.08] bg-white/[0.02] text-fg-muted hover:border-white/20 hover:text-fg'
                            }`}
                          >
                            {item.name}
                          </button>
                        </li>
                      )
                    })}
                  </ul>
                  {/* Inline detail on small screens */}
                  <AnimatePresence initial={false}>
                    {containsActive && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: EASE }}
                        className="overflow-hidden lg:hidden"
                      >
                        <div className="mt-5 border-t border-white/[0.07] pt-5">
                          <SkillDetail id={active} onSelect={setPinned} />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )
            })}
          </motion.div>

          <aside aria-live="polite" className="hidden lg:block">
            <div className="glass sticky top-24 rounded-2xl p-6">
              <AnimatePresence mode="wait">
                <SkillDetail key={active} id={active} onSelect={setPinned} />
              </AnimatePresence>
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}
