import { AnimatePresence, motion } from 'framer-motion'
import { AlertTriangle, CheckCircle2, CircleHelp, FileText, Loader2, RotateCcw, Upload, XCircle } from 'lucide-react'
import { useRef, useState, type ChangeEvent } from 'react'
import { EASE } from '../../animations/variants'
import { demo } from '../../data/portfolio'
import type { DocumentSample } from '../../data/types'
import { useSequence } from '../../hooks/useSequence'
import { Badge } from '../ui/Badge'

const STAGES = ['Upload', 'Classify', 'Extract', 'Validate', 'Result'] as const

const resultStyle = {
  PASS: { tone: 'ok' as const, icon: CheckCircle2, text: 'text-ok' },
  FAIL: { tone: 'bad' as const, icon: XCircle, text: 'text-bad' },
  'NOT CLEAR': { tone: 'warn' as const, icon: AlertTriangle, text: 'text-warn' },
}

/** Uploaded files never leave the browser; the "classification" is a name-based simulation. */
function fromUpload(file: File): DocumentSample {
  const n = file.name.toLowerCase()
  const match = demo.documents.find((d) => n.includes(d.id) || n.includes(d.label.toLowerCase().split(' ')[0]))
  if (match) return { ...match, fileName: file.name }
  return {
    id: 'upload',
    label: 'Your file',
    fileName: file.name,
    docType: 'Unrecognised document',
    confidence: 58,
    result: 'NOT CLEAR',
    fields: [
      { key: 'File type', value: file.type || 'unknown', confidence: 99 },
      { key: 'Size', value: `${Math.max(1, Math.round(file.size / 1024))} KB`, confidence: 99 },
    ],
    note: 'Classification confidence below threshold — in production this would route to a human validator.',
  }
}

export function DocumentDemo() {
  const [doc, setDoc] = useState<DocumentSample>(demo.documents[0])
  const [stage, setStage] = useState(-1) // -1 idle, 0..4 processing, 5 done
  const [log, setLog] = useState<string[]>([])
  const fileRef = useRef<HTMLInputElement>(null)
  const { run, cancel } = useSequence()
  const busy = stage >= 0 && stage < STAGES.length

  const process = (d: DocumentSample) => {
    setDoc(d)
    setLog([])
    run(async (wait) => {
      const push = (l: string) => setLog((prev) => [...prev, l])
      setStage(0)
      push(`Received ${d.fileName}`)
      await wait(600)
      setStage(1)
      push('Classifying document…')
      await wait(900)
      push(`Classified as ${d.docType} (${d.confidence}%)`)
      setStage(2)
      await wait(900)
      push(`Extracted ${d.fields.length} fields`)
      setStage(3)
      await wait(800)
      push(`Validation: ${d.result}`)
      setStage(4)
      await wait(400)
      setStage(5)
    })
  }

  const reset = () => {
    cancel()
    setStage(-1)
    setLog([])
  }

  const onUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]
    if (f) process(fromUpload(f))
    e.target.value = ''
  }

  const done = stage === 5
  const R = resultStyle[doc.result]

  return (
    <div className="grid gap-6 lg:grid-cols-[18rem_1fr]">
      {/* Input */}
      <div>
        <p className="eyebrow mb-3 !text-[0.62rem]">1 · Choose a sample</p>
        <div className="grid grid-cols-3 gap-2 lg:grid-cols-1">
          {demo.documents.map((d) => (
            <button
              key={d.id}
              disabled={busy}
              onClick={() => process(d)}
              className={`flex min-h-11 flex-col items-start gap-1 rounded-xl border px-3 py-3 text-left transition sm:flex-row sm:items-center sm:gap-3 ${
                doc.id === d.id && stage !== -1 ? 'border-signal/50 bg-signal/[0.07]' : 'border-white/[0.08] bg-white/[0.02] hover:border-white/20'
              }`}
            >
              <FileText className="h-4 w-4 shrink-0 text-fg-muted" aria-hidden="true" />
              <span className="min-w-0">
                <span className="block text-sm font-medium text-fg">{d.label}</span>
                <span className="hidden truncate font-mono text-[0.65rem] text-fg-subtle sm:block">{d.fileName}</span>
              </span>
            </button>
          ))}
        </div>
        <p className="eyebrow mb-3 mt-6 !text-[0.62rem]">or upload</p>
        <button
          disabled={busy}
          onClick={() => fileRef.current?.click()}
          className="flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border border-dashed border-white/15 px-3 py-4 text-sm text-fg-muted transition hover:border-signal/50 hover:text-fg"
        >
          <Upload className="h-4 w-4" aria-hidden="true" /> Upload a document
        </button>
        <input ref={fileRef} type="file" accept=".pdf,.png,.jpg,.jpeg" className="sr-only" onChange={onUpload} aria-label="Upload a document for the simulated pipeline" tabIndex={-1} />
        <p className="mt-2 text-[0.7rem] leading-relaxed text-fg-subtle">Files stay in your browser — nothing is uploaded or stored.</p>
      </div>

      {/* Pipeline + result */}
      <div className="min-w-0">
        <ol className="grid grid-cols-5 gap-1.5" aria-label="Processing stages">
          {STAGES.map((s, i) => {
            const state = stage > i || done ? 'done' : stage === i ? 'active' : 'idle'
            return (
              <li key={s} className="min-w-0">
                <div className="h-1 overflow-hidden rounded-full bg-white/[0.06]">
                  <motion.div
                    className={`h-full ${state === 'done' ? 'bg-teal' : 'bg-signal'}`}
                    initial={false}
                    animate={{ width: state === 'idle' ? '0%' : '100%' }}
                    transition={{ duration: state === 'active' ? 0.8 : 0.3, ease: 'easeInOut' }}
                  />
                </div>
                <p className={`mt-2 flex items-center gap-1 truncate font-mono text-[0.62rem] uppercase tracking-wider sm:text-[0.68rem] ${state === 'idle' ? 'text-fg-subtle' : 'text-fg'}`}>
                  {state === 'active' && <Loader2 className="h-3 w-3 shrink-0 animate-spin text-signal" aria-hidden="true" />}
                  {s}
                </p>
              </li>
            )
          })}
        </ol>

        <div className="mt-5 min-h-[18rem] rounded-2xl border border-white/[0.07] bg-ink-950/60 p-5" aria-live="polite">
          <AnimatePresence mode="wait">
            {stage === -1 && (
              <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex h-full min-h-[16rem] flex-col items-center justify-center text-center">
                <CircleHelp className="h-8 w-8 text-fg-subtle" aria-hidden="true" />
                <p className="mt-3 text-sm text-fg-muted">Select a sample document to run it through the pipeline.</p>
              </motion.div>
            )}
            {busy && (
              <motion.ul key="log" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-2 font-mono text-xs">
                {log.map((l, i) => (
                  <motion.li key={i} initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} className="text-fg-muted">
                    <span className="mr-2 text-signal">›</span>
                    {l}
                  </motion.li>
                ))}
              </motion.ul>
            )}
            {done && (
              <motion.div key="result" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.45, ease: EASE }}>
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="eyebrow !text-[0.62rem]">Document type</p>
                    <p className="mt-1 text-xl font-bold text-fg">{doc.docType}</p>
                  </div>
                  <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', stiffness: 300, damping: 18, delay: 0.15 }}>
                    <Badge tone={R.tone} className="!px-3 !py-1.5 !text-xs">
                      <R.icon className="h-3.5 w-3.5" aria-hidden="true" /> {doc.result}
                    </Badge>
                  </motion.div>
                </div>

                <div className="mt-5">
                  <div className="flex justify-between text-xs">
                    <span className="text-fg-muted">Classification confidence</span>
                    <span className="font-mono text-fg">{doc.confidence}%</span>
                  </div>
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
                    <motion.div className="h-full rounded-full bg-gradient-to-r from-signal to-teal" initial={{ width: 0 }} animate={{ width: `${doc.confidence}%` }} transition={{ duration: 0.9, ease: EASE }} />
                  </div>
                </div>

                <table className="mt-5 w-full text-left text-sm">
                  <caption className="sr-only">Extracted fields</caption>
                  <thead>
                    <tr className="eyebrow !text-[0.6rem]">
                      <th className="pb-2 font-normal">Field</th>
                      <th className="pb-2 font-normal">Value</th>
                      <th className="pb-2 text-right font-normal">Conf.</th>
                    </tr>
                  </thead>
                  <tbody>
                    {doc.fields.map((f) => (
                      <tr key={f.key} className="border-t border-white/[0.05]">
                        <td className="py-2 pr-2 text-fg-muted">{f.key}</td>
                        <td className="py-2 pr-2 font-mono text-xs text-fg">{f.value}</td>
                        <td className={`py-2 text-right font-mono text-xs ${f.confidence < 80 ? 'text-warn' : 'text-fg-muted'}`}>{f.confidence}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p className={`mt-4 text-sm ${R.text}`}>{doc.note}</p>
                <button onClick={reset} className="mt-5 inline-flex min-h-11 items-center gap-2 text-sm text-fg-muted transition hover:text-fg">
                  <RotateCcw className="h-4 w-4" aria-hidden="true" /> Reset
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
