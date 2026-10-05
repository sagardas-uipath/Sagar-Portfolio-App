import { Mail } from 'lucide-react'
import { contact, profile } from '../data/portfolio'
import { InstagramIcon, LinkedInIcon } from './ui/BrandIcons'
import { BrandMark } from './ui/BrandMark'

export function Footer() {
  return (
    <footer className="border-t border-white/[0.06] py-10">
      <div className="container-x flex flex-col items-center justify-between gap-5 text-sm sm:flex-row">
        <div className="flex items-center gap-3">
          <BrandMark className="h-7 w-auto" />
          <p className="text-fg-subtle">
            © {new Date().getFullYear()} {profile.name} · UiPath Automation Professional
          </p>
        </div>
        <div className="flex gap-2">
          <a href={contact.linkedin} target="_blank" rel="noreferrer noopener" aria-label="LinkedIn" className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-fg-muted transition hover:border-white/25 hover:text-fg">
            <LinkedInIcon className="h-4 w-4" />
          </a>
          <a href={contact.instagram} target="_blank" rel="noreferrer noopener" aria-label="Instagram" className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-fg-muted transition hover:border-white/25 hover:text-fg">
            <InstagramIcon className="h-4 w-4" />
          </a>
          <a href={`mailto:${contact.email}`} aria-label="Email" className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-fg-muted transition hover:border-white/25 hover:text-fg">
            <Mail className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  )
}
