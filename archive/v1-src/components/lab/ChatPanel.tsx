import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUp, Bot, Info } from 'lucide-react'
import { useEffect, useRef, useState, type FormEvent } from 'react'
import { profile } from '../../data/portfolio'
import { getAgent, suggestedQuestions } from '../../lib/agent'

type Msg = { role: 'user' | 'agent'; text: string; sources?: string[] }

/**
 * Chat surface shared by the Automation Lab agent demo and the floating assistant.
 * Talks to whatever `getAgent()` returns — local knowledge today, an LLM backend later.
 */
export function ChatPanel({ greeting, compact = false, autoFocus = false }: { greeting: string; compact?: boolean; autoFocus?: boolean }) {
  const agent = getAgent()
  const [messages, setMessages] = useState<Msg[]>([{ role: 'agent', text: greeting }])
  const [input, setInput] = useState('')
  const [thinking, setThinking] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const el = scrollRef.current
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' })
  }, [messages, thinking])

  useEffect(() => {
    if (autoFocus) inputRef.current?.focus()
  }, [autoFocus])

  const ask = async (q: string) => {
    const question = q.trim()
    if (!question || thinking) return
    setInput('')
    setMessages((m) => [...m, { role: 'user', text: question }])
    setThinking(true)
    try {
      const a = await agent.ask(question)
      setMessages((m) => [...m, { role: 'agent', text: a.text, sources: a.sources }])
    } catch {
      setMessages((m) => [...m, { role: 'agent', text: 'Sorry — something went wrong. Please try again.' }])
    } finally {
      setThinking(false)
    }
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    void ask(input)
  }

  const asked = messages.some((m) => m.role === 'user')

  return (
    <div className="flex h-full min-h-0 flex-col">
      <p className="flex items-start gap-2 border-b border-white/[0.06] px-4 py-2.5 text-[0.7rem] leading-relaxed text-fg-subtle">
        <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
        {agent.mode === 'local'
          ? 'Portfolio demonstration — answers come from local portfolio data, not a live AI model.'
          : 'Connected to the portfolio agent endpoint.'}
      </p>

      <div ref={scrollRef} className={`scrollbar-thin flex-1 space-y-4 overflow-y-auto px-4 py-4 ${compact ? '' : 'min-h-[18rem]'}`} aria-live="polite" aria-label="Conversation">
        {messages.map((m, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className={`flex gap-3 ${m.role === 'user' ? 'justify-end' : ''}`}>
            {m.role === 'agent' && (
              <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-signal/30 bg-signal/10 text-signal">
                <Bot className="h-3.5 w-3.5" aria-hidden="true" />
              </span>
            )}
            <div
              className={`max-w-[85%] whitespace-pre-line rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                m.role === 'user' ? 'rounded-br-md bg-fg text-ink-950' : 'rounded-tl-md border border-white/[0.07] bg-white/[0.03] text-fg'
              }`}
            >
              <span className="sr-only">{m.role === 'user' ? 'You:' : 'Agent:'}</span>
              {m.text}
              {m.sources && m.sources.length > 0 && (
                <span className="mt-2 flex flex-wrap gap-1.5">
                  {m.sources.map((s) => (
                    <span key={s} className="rounded-full border border-white/10 px-2 py-0.5 font-mono text-[0.6rem] text-fg-subtle">
                      {s}
                    </span>
                  ))}
                </span>
              )}
            </div>
          </motion.div>
        ))}
        <AnimatePresence>
          {thinking && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-3" aria-label="Agent is thinking">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-signal/30 bg-signal/10 text-signal">
                <Bot className="h-3.5 w-3.5" aria-hidden="true" />
              </span>
              <span className="flex gap-1">
                {[0, 1, 2].map((d) => (
                  <motion.span key={d} className="h-1.5 w-1.5 rounded-full bg-fg-muted" animate={{ opacity: [0.25, 1, 0.25] }} transition={{ duration: 1, repeat: Infinity, delay: d * 0.15 }} />
                ))}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {!asked && (
        <div className="flex flex-wrap gap-2 px-4 pb-3">
          {suggestedQuestions.map((q) => (
            <button key={q} onClick={() => ask(q)} className="rounded-full border border-white/10 bg-white/[0.02] px-3 py-1.5 text-left text-xs text-fg-muted transition hover:border-signal/40 hover:text-fg">
              {q}
            </button>
          ))}
        </div>
      )}

      <form onSubmit={onSubmit} className="flex items-center gap-2 border-t border-white/[0.06] p-3">
        <label htmlFor={compact ? 'assistant-input' : 'agent-input'} className="sr-only">
          Ask a question about {profile.name.split(' ')[0]}'s work
        </label>
        <input
          ref={inputRef}
          id={compact ? 'assistant-input' : 'agent-input'}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about projects, skills, experience…"
          autoComplete="off"
          maxLength={300}
          className="min-h-11 flex-1 rounded-full border border-white/10 bg-ink-950/60 px-4 text-sm text-fg placeholder:text-fg-subtle focus:border-signal/50 focus:outline-none"
        />
        <button
          type="submit"
          disabled={!input.trim() || thinking}
          aria-label="Send question"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-fg text-ink-950 transition hover:bg-white disabled:opacity-30"
        >
          <ArrowUp className="h-4 w-4" aria-hidden="true" />
        </button>
      </form>
    </div>
  )
}
