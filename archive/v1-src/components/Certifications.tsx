import { motion } from 'framer-motion'
import { Award, ExternalLink, GraduationCap, ShieldCheck } from 'lucide-react'
import { useCallback, useState } from 'react'
import { EASE, fadeUp, inView, stagger } from '../animations/variants'
import { certifications, education } from '../data/portfolio'
import type { Certification } from '../data/types'
import { GlassCard } from './ui/GlassCard'
import { Modal } from './ui/Modal'
import { SectionHeader } from './ui/SectionHeader'

const issuerAccent: Record<string, string> = {
  UiPath: 'from-[#6E9BFF]/30',
  'Automation Anywhere': 'from-[#4FD1C5]/25',
}

function CertificateView({ cert }: { cert: Certification }) {
  const rows = [
    ['Issuer', cert.issuer],
    ['Level', cert.level],
    ['Issued', cert.year],
    ['Valid until', cert.validUntil],
    ['Credential ID', cert.credentialId],
  ].filter((r): r is [string, string] => Boolean(r[1]))

  return (
    <div className="p-6 pt-14 sm:p-10">
      {/* Certificate preview */}
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[radial-gradient(120%_100%_at_0%_0%,rgb(110_155_255/0.18),transparent_55%),radial-gradient(100%_100%_at_100%_100%,rgb(79_209_197/0.12),transparent_55%)] p-8 text-center">
        <div className="grid-bg absolute inset-0 opacity-40" aria-hidden="true" />
        <div className="relative">
          <motion.span initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', stiffness: 260, damping: 18, delay: 0.1 }} className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-signal/40 bg-ink-950/70 text-signal">
            <Award className="h-6 w-6" aria-hidden="true" />
          </motion.span>
          <p className="eyebrow mt-5">{cert.issuer}</p>
          <h2 className="mt-3 text-xl font-bold leading-snug text-fg sm:text-2xl">{cert.name}</h2>
        </div>
      </div>

      <dl className="mt-6 divide-y divide-white/[0.06]">
        {rows.map(([k, v]) => (
          <div key={k} className="flex justify-between gap-4 py-3 text-sm">
            <dt className="text-fg-muted">{k}</dt>
            <dd className="text-right font-medium text-fg">{v}</dd>
          </div>
        ))}
      </dl>

      {cert.verifyUrl ? (
        <a href={cert.verifyUrl} target="_blank" rel="noreferrer noopener" className="mt-6 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-fg px-5 text-sm font-medium text-ink-950 transition hover:bg-white">
          Verify credential <ExternalLink className="h-4 w-4" aria-hidden="true" />
        </a>
      ) : (
        <p className="mt-6 flex items-center justify-center gap-2 text-xs text-fg-subtle">
          <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" /> Verification link available on request
        </p>
      )}
    </div>
  )
}

export function Certifications() {
  const [open, setOpen] = useState<Certification | null>(null)
  const close = useCallback(() => setOpen(null), [])

  return (
    <section id="certifications" aria-labelledby="certs-title" className="section-y relative">
      <div className="container-x">
        <SectionHeader id="certs-title" index="07" eyebrow="Certifications" title="Certified across both major RPA platforms" description="Professional certifications from UiPath and Automation Anywhere — including agentic automation." />

        <motion.ul variants={stagger(0.08)} initial="hidden" whileInView="show" viewport={inView} className="grid gap-4 sm:grid-cols-2">
          {certifications.map((c) => (
            <motion.li key={c.id} variants={fadeUp}>
              <GlassCard interactive className="relative flex h-full flex-col overflow-hidden p-6">
                <div aria-hidden="true" className={`pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-gradient-to-br ${issuerAccent[c.issuer] ?? 'from-white/10'} to-transparent blur-2xl`} />
                <div className="relative flex items-start justify-between gap-4">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-ink-950/60 text-signal">
                    <Award className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span className="rounded-full border border-white/10 px-2.5 py-1 font-mono text-[0.62rem] uppercase tracking-wider text-fg-muted">{c.level}</span>
                </div>
                <p className="relative mt-6 text-xs font-medium text-signal">{c.issuer}</p>
                <h3 className="relative mt-1.5 text-lg font-semibold leading-snug text-fg">{c.name}</h3>
                <p className="relative mt-2 text-xs text-fg-subtle">
                  {[c.year && `Issued ${c.year}`, c.validUntil && `Valid until ${c.validUntil}`].filter(Boolean).join(' · ') || ' '}
                </p>
                <div className="relative mt-auto pt-6">
                  <button onClick={() => setOpen(c)} className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/12 px-4 text-sm font-medium text-fg transition hover:border-signal/50 hover:bg-signal/10" aria-label={`View certificate: ${c.name}`}>
                    View Certificate
                  </button>
                </div>
              </GlassCard>
            </motion.li>
          ))}
        </motion.ul>

        {/* Education — a quiet academic footnote rather than a full section */}
        <motion.div id="education" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={inView} transition={{ duration: 0.6, ease: EASE }} className="mt-16 flex flex-col gap-6 border-t border-white/[0.07] pt-10 sm:flex-row sm:items-center">
          <div className="flex items-center gap-4">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 text-fg-muted">
              <GraduationCap className="h-5 w-5" aria-hidden="true" />
            </span>
            <p className="eyebrow">Education</p>
          </div>
          <div className="relative flex-1 sm:pl-6">
            <span aria-hidden="true" className="absolute left-0 top-1 hidden h-full w-px bg-white/10 sm:block" />
            <p className="font-display text-lg font-semibold text-fg">
              {education.degree} — {education.field}
            </p>
            <p className="mt-1 text-sm text-fg-muted">
              {education.institution} · <span className="font-mono">{education.year}</span>
            </p>
          </div>
        </motion.div>
      </div>

      <Modal open={open !== null} onClose={close} title={open ? `Certificate: ${open.name}` : 'Certificate'}>
        {open && <CertificateView cert={open} />}
      </Modal>
    </section>
  )
}
