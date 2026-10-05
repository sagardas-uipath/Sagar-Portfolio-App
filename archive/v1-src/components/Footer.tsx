import { Mail } from 'lucide-react'
import { contact, navigation, profile } from '../data/portfolio'
import { GitHubIcon, LinkedInIcon } from './ui/BrandIcons'

export function Footer() {
  const socials = [
    { label: 'LinkedIn', href: contact.linkedin, icon: LinkedInIcon, external: true },
    { label: 'GitHub', href: contact.github, icon: GitHubIcon, external: true },
    { label: 'Email', href: contact.email && `mailto:${contact.email}`, icon: Mail, external: false },
  ].filter((s) => s.href)

  return (
    <footer className="border-t border-white/[0.06] py-12">
      <div className="container-x flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="font-display text-lg font-bold text-fg">{profile.name}</p>
          <p className="mt-1 text-sm text-fg-muted">AI • Automation • Enterprise Technology</p>
        </div>

        <nav aria-label="Footer">
          <ul className="grid grid-cols-2 gap-x-10 gap-y-2 text-sm sm:grid-cols-3">
            {navigation.map((n) => (
              <li key={n.id}>
                <a href={`#${n.id}`} className="text-fg-muted transition hover:text-fg">
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <ul className="flex gap-2">
          {socials.map((s) => (
            <li key={s.label}>
              <a
                href={s.href}
                aria-label={s.label}
                {...(s.external ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-fg-muted transition hover:border-white/25 hover:text-fg"
              >
                <s.icon className="h-4 w-4" />
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="container-x mt-10 flex flex-col justify-between gap-2 border-t border-white/[0.06] pt-6 text-xs text-fg-subtle sm:flex-row">
        <p>
          © {new Date().getFullYear()} {profile.name}. All rights reserved.
        </p>
        <p>Demo sections use simulated data.</p>
      </div>
    </footer>
  )
}
