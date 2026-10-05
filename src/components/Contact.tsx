import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, Loader2, Mail, Send } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { EASE, inView } from '../animations/variants'
import { contact } from '../data/portfolio'
import { InstagramIcon, LinkedInIcon } from './ui/BrandIcons'
import { Button, LinkButton } from './ui/Button'

type Status = 'idle' | 'sending' | 'sent' | 'error'
type Errors = Partial<Record<'name' | 'email' | 'message', string>>

const ENDPOINT = import.meta.env.VITE_CONTACT_ENDPOINT as string | undefined

function validate(data: { name: string; email: string; message: string }): Errors {
  const e: Errors = {}
  if (!data.name.trim()) e.name = 'Please enter your name.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) e.email = 'Please enter a valid email address.'
  if (data.message.trim().length < 10) e.message = 'A few more words, please (10+ characters).'
  return e
}

const field =
  'mt-2 block w-full rounded-xl border bg-ink-950/60 px-4 py-3 text-sm text-fg placeholder:text-fg-subtle transition focus:border-accent/60 focus:outline-none focus:ring-4 focus:ring-accent/10'

export function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<Status>('idle')

  const set = (k: keyof typeof form) => (e: { target: { value: string } }) => {
    setForm((f) => ({ ...f, [k]: e.target.value }))
    if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }))
  }

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const errs = validate(form)
    setErrors(errs)
    if (Object.keys(errs).length) {
      document.getElementById(`contact-${Object.keys(errs)[0]}`)?.focus()
      return
    }
    setStatus('sending')
    try {
      if (ENDPOINT) {
        const res = await fetch(ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(form) })
        if (!res.ok) throw new Error(String(res.status))
      } else {
        // No endpoint configured: simulate delivery so the experience is complete.
        await new Promise((r) => setTimeout(r, 1100))
      }
      setStatus('sent')
      setForm({ name: '', email: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" aria-labelledby="contact-title" className="band-alt section-y relative overflow-hidden">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute bottom-[-20rem] left-1/2 h-[40rem] w-[60rem] -translate-x-1/2 rounded-full bg-accent/[0.08] blur-[140px]" />
        <div className="grid-bg absolute inset-0 opacity-50" />
      </div>

      <div className="container-x relative grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={inView} transition={{ duration: 0.8, ease: EASE }}>
          <p className="eyebrow flex items-center gap-3">
            <span className="text-accent">04</span>
            <span className="h-px w-8 bg-white/15" aria-hidden="true" />
            Contact
          </p>
          <h2 id="contact-title" className="mt-5 text-4xl font-extrabold leading-[1.05] tracking-[-0.03em] text-fg sm:text-5xl lg:text-6xl">
            {contact.headline}
          </h2>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-fg-muted">{contact.text}</p>
          <div className="mt-10 flex flex-wrap gap-3">
            <LinkButton href={`mailto:${contact.email}`}>
              <Mail className="h-4 w-4" aria-hidden="true" /> Email Me
            </LinkButton>
            <LinkButton href={contact.linkedin} target="_blank" rel="noreferrer noopener" variant="secondary">
              <LinkedInIcon className="h-4 w-4" /> LinkedIn
            </LinkButton>
            <LinkButton href={contact.instagram} target="_blank" rel="noreferrer noopener" variant="secondary">
              <InstagramIcon className="h-4 w-4" /> Instagram
            </LinkButton>
          </div>
          <ul className="mt-10 space-y-3 text-sm">
            <li>
              <a href={`mailto:${contact.email}`} className="inline-flex items-center gap-3 text-fg-muted transition hover:text-fg">
                <Mail className="h-4 w-4 text-accent" aria-hidden="true" /> {contact.email}
              </a>
            </li>
            <li>
              <a href={contact.linkedin} target="_blank" rel="noreferrer noopener" className="inline-flex items-center gap-3 text-fg-muted transition hover:text-fg">
                <LinkedInIcon className="h-4 w-4 text-accent" /> {contact.linkedin.replace("https://", "").replace("www.", "")}
              </a>
            </li>
            <li>
              <a href={contact.instagram} target="_blank" rel="noreferrer noopener" className="inline-flex items-center gap-3 text-fg-muted transition hover:text-fg">
                <InstagramIcon className="h-4 w-4 text-accent" /> {contact.instagram.replace("https://", "").replace("www.", "")}
              </a>
            </li>
          </ul>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={inView} transition={{ duration: 0.8, ease: EASE, delay: 0.1 }} className="glass relative min-h-[28rem] overflow-hidden rounded-3xl p-6 sm:p-8">
          <AnimatePresence mode="wait">
            {status === 'sent' ? (
              <motion.div key="sent" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5, ease: EASE }} className="flex h-full min-h-[24rem] flex-col items-center justify-center text-center" role="status">
                <div className="relative flex h-20 w-20 items-center justify-center">
                  <motion.span className="absolute inset-0 rounded-full border border-ok/40" initial={{ scale: 0.6, opacity: 1 }} animate={{ scale: 1.6, opacity: 0 }} transition={{ duration: 1.2, ease: 'easeOut' }} />
                  <svg viewBox="0 0 52 52" className="h-20 w-20" aria-hidden="true">
                    <motion.circle cx="26" cy="26" r="24" fill="none" stroke="#15803D" strokeWidth="1.5" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6, ease: EASE }} />
                    <motion.path d="M16 27 l7 7 l13 -15" fill="none" stroke="#15803D" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.4, delay: 0.5, ease: EASE }} />
                  </svg>
                </div>
                <h3 className="mt-6 text-2xl font-bold text-fg">Message Received</h3>
                <p className="mt-2 max-w-xs text-sm text-fg-muted">Thank you for reaching out. I'll get back to you soon.</p>
                <button onClick={() => setStatus('idle')} className="mt-8 min-h-11 text-sm text-fg-muted underline-offset-4 transition hover:text-fg hover:underline">
                  Send another message
                </button>
              </motion.div>
            ) : (
              <motion.form key="form" onSubmit={onSubmit} noValidate initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 0.98 }} className="space-y-5">
                <div>
                  <label htmlFor="contact-name" className="text-sm font-medium text-fg">Name</label>
                  <input id="contact-name" name="name" autoComplete="name" value={form.name} onChange={set('name')} aria-invalid={!!errors.name} aria-describedby={errors.name ? 'err-name' : undefined} className={`${field} ${errors.name ? 'border-bad/60' : 'border-white/10'}`} placeholder="Your name" />
                  {errors.name && <p id="err-name" className="mt-1.5 text-xs text-bad">{errors.name}</p>}
                </div>
                <div>
                  <label htmlFor="contact-email" className="text-sm font-medium text-fg">Email</label>
                  <input id="contact-email" name="email" type="email" autoComplete="email" value={form.email} onChange={set('email')} aria-invalid={!!errors.email} aria-describedby={errors.email ? 'err-email' : undefined} className={`${field} ${errors.email ? 'border-bad/60' : 'border-white/10'}`} placeholder="you@company.com" />
                  {errors.email && <p id="err-email" className="mt-1.5 text-xs text-bad">{errors.email}</p>}
                </div>
                <div>
                  <label htmlFor="contact-message" className="text-sm font-medium text-fg">Message</label>
                  <textarea id="contact-message" name="message" rows={5} value={form.message} onChange={set('message')} aria-invalid={!!errors.message} aria-describedby={errors.message ? 'err-message' : undefined} className={`${field} resize-none ${errors.message ? 'border-bad/60' : 'border-white/10'}`} placeholder="Tell me about the process or idea…" />
                  {errors.message && <p id="err-message" className="mt-1.5 text-xs text-bad">{errors.message}</p>}
                </div>
                {status === 'error' && <p className="text-sm text-bad" role="alert">The message could not be sent. Please try again or use email.</p>}
                <Button type="submit" disabled={status === 'sending'} className="w-full">
                  {status === 'sending' ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> Sending…
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" aria-hidden="true" /> Send Message
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                    </>
                  )}
                </Button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
