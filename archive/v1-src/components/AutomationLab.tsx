import { AnimatePresence, motion } from 'framer-motion'
import { Bot, FileScan, Workflow } from 'lucide-react'
import { useRef, useState, type KeyboardEvent } from 'react'
import { EASE, inView } from '../animations/variants'
import { profile } from '../data/portfolio'
import { ChatPanel } from './lab/ChatPanel'
import { DocumentDemo } from './lab/DocumentDemo'
import { WorkflowDemo } from './lab/WorkflowDemo'
import { DemoBadge } from './ui/Badge'
import { SectionHeader } from './ui/SectionHeader'

const first = profile.name.split(' ')[0]

const tabs = [
  { id: 'doc', label: 'Document Intelligence', short: 'Documents', icon: FileScan, intro: 'Classify, extract and validate a document — with confidence scores and human-in-the-loop routing for anything unclear.' },
  { id: 'flow', label: 'Automation Workflow', short: 'Workflow', icon: Workflow, intro: 'A queue-driven, REFramework-style transaction: trigger, queue, process, business rule, API call and result.' },
  { id: 'agent', label: 'Ask the Automation Agent', short: 'Agent', icon: Bot, intro: `Ask about ${first}'s work. The agent layer is built behind an interface, ready to be pointed at a real LLM backend.` },
] as const

type TabId = (typeof tabs)[number]['id']

export function AutomationLab() {
  const [tab, setTab] = useState<TabId>('doc')
  const refs = useRef<(HTMLButtonElement | null)[]>([])
  const current = tabs.find((t) => t.id === tab)!

  // WAI-ARIA tabs: arrow keys move between tabs.
  const onKey = (e: KeyboardEvent, i: number) => {
    const dir = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0
    if (!dir) return
    e.preventDefault()
    const next = (i + dir + tabs.length) % tabs.length
    setTab(tabs[next].id)
    refs.current[next]?.focus()
  }

  return (
    <section id="lab" aria-labelledby="lab-title" className="section-y relative">
      <div className="container-x">
        <SectionHeader
          id="lab-title"
          index="06"
          eyebrow="Automation Lab"
          title="See the thinking, not just the résumé"
          description="Three small, working simulations of the kinds of systems I build. Everything here runs in your browser on demo data."
        />

        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={inView} transition={{ duration: 0.8, ease: EASE }} className="glass overflow-hidden rounded-3xl">
          {/* Window chrome */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.06] px-4 py-3 sm:px-6">
            <div className="flex items-center gap-2" aria-hidden="true">
              <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
              <span className="ml-3 font-mono text-[0.68rem] text-fg-subtle">automation-lab</span>
            </div>
            <DemoBadge label="Simulation" />
          </div>

          <div role="tablist" aria-label="Lab demonstrations" className="flex gap-1 overflow-x-auto border-b border-white/[0.06] px-2 sm:px-4">
            {tabs.map((t, i) => (
              <button
                key={t.id}
                ref={(el) => {
                  refs.current[i] = el
                }}
                role="tab"
                id={`tab-${t.id}`}
                aria-selected={tab === t.id}
                aria-controls={`panel-${t.id}`}
                tabIndex={tab === t.id ? 0 : -1}
                onClick={() => setTab(t.id)}
                onKeyDown={(e) => onKey(e, i)}
                className={`relative flex min-h-12 shrink-0 items-center gap-2 px-3 text-sm font-medium transition-colors sm:px-4 ${tab === t.id ? 'text-fg' : 'text-fg-muted hover:text-fg'}`}
              >
                <t.icon className="h-4 w-4" aria-hidden="true" />
                <span className="sm:hidden">{t.short}</span>
                <span className="hidden sm:inline">{t.label}</span>
                {tab === t.id && <motion.span layoutId="lab-tab" className="absolute inset-x-2 -bottom-px h-0.5 rounded-full bg-gradient-to-r from-signal to-teal" />}
              </button>
            ))}
          </div>

          <div className="p-4 sm:p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={tab}
                role="tabpanel"
                id={`panel-${tab}`}
                aria-labelledby={`tab-${tab}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.3, ease: EASE }}
              >
                <p className="mb-6 max-w-2xl text-sm leading-relaxed text-fg-muted">{current.intro}</p>
                {tab === 'doc' && <DocumentDemo />}
                {tab === 'flow' && <WorkflowDemo />}
                {tab === 'agent' && (
                  <div className="h-[30rem] overflow-hidden rounded-2xl border border-white/[0.07] bg-ink-950/50">
                    <ChatPanel greeting={`Hi — I'm the automation agent for this portfolio. Ask me about ${first}'s projects, skills, experience or technologies.`} />
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
