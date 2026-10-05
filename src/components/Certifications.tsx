import { motion } from 'framer-motion'
import { Award, BadgeCheck, ExternalLink } from 'lucide-react'
import { EASE, inView } from '../animations/variants'
import { certifications } from '../data/portfolio'
import type { Certification } from '../data/types'
import { SubHeader } from './ui/SubHeader'

const PROVIDERS: { name: Certification['provider']; monogram: string; tone: string; ring: string }[] = [
  { name: 'UiPath', monogram: 'Ui', tone: 'bg-accent text-[#ffffff]', ring: 'from-accent/15' },
  { name: 'Automation Anywhere', monogram: 'AA', tone: 'bg-accent-2 text-[#ffffff]', ring: 'from-accent-2/15' },
]

/** Part ③ of My Work: certifications grouped into one clean panel per issuer. */
export function Certifications() {
  return (
    <div id="certifications" className="scroll-mt-12">
      <SubHeader step="03" id="certs-title" title="Certifications" description="Professional certifications across both leading RPA platforms." />

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={inView}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
        className="grid gap-5 lg:grid-cols-2"
      >
        {PROVIDERS.map((p) => {
          const certs = certifications.filter((c) => c.provider === p.name)
          return (
            <motion.section
              key={p.name}
              aria-label={`${p.name} certifications`}
              variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } } }}
              className="surface relative overflow-hidden rounded-2xl shadow-[0_1px_2px_rgb(15_23_42/0.05),0_12px_28px_-16px_rgb(15_23_42/0.18)]"
            >
              {/* Header */}
              <div className={`flex items-center gap-4 border-b border-white/[0.07] bg-gradient-to-r ${p.ring} to-transparent px-6 py-5`}>
                <span className={`flex h-12 w-12 items-center justify-center rounded-xl font-display text-base font-extrabold tracking-tight ${p.tone}`} aria-hidden="true">
                  {p.monogram}
                </span>
                <div>
                  <h4 className="text-lg font-semibold text-fg">{p.name}</h4>
                  <p className="text-sm text-fg-muted">
                    {certs.length} certification{certs.length === 1 ? '' : 's'}
                  </p>
                </div>
              </div>

              {/* Rows */}
              <ul className="divide-y divide-white/[0.06]">
                {certs.map((c) => (
                  <li key={c.id} className="flex items-start gap-4 px-6 py-5 transition-colors duration-200 hover:bg-accent/[0.04]">
                    <Award className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-medium uppercase tracking-wide text-fg-subtle">{c.issuer}</p>
                      <p className="mt-0.5 font-semibold leading-snug text-fg">{c.name}</p>
                      <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-fg-muted">
                        <span className="inline-flex items-center gap-1 rounded-full border border-white/10 px-2 py-0.5 font-medium">
                          <BadgeCheck className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
                          {c.level}
                        </span>
                        {c.credentialId && (
                          <span>
                            ID <span className="font-mono text-fg">{c.credentialId}</span>
                          </span>
                        )}
                        {c.validUntil && <span>Valid until {c.validUntil}</span>}
                        {c.verifyUrl && (
                          <a href={c.verifyUrl} target="_blank" rel="noreferrer noopener" className="inline-flex items-center gap-1 font-medium text-accent-soft hover:underline">
                            Verify <ExternalLink className="h-3 w-3" aria-hidden="true" />
                          </a>
                        )}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </motion.section>
          )
        })}
      </motion.div>
    </div>
  )
}
