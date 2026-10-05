export interface NavItem {
  id: string
  label: string
}

export interface Role {
  company: string
  title: string
  start: string
  end: string
  current?: boolean
  points: string[]
  tags: string[]
}

export interface ExpertiseArea {
  id: string
  title: string
  icon: IconKey
  /** One line on what this area covers. */
  summary: string
  items: string[]
}

export interface Project {
  id: string
  index: string
  title: string
  category: string
  icon: IconKey
  /** Industry only — never a client name. */
  domain: string
  /** Where the work was delivered (e.g. "Onsite · Saudi Arabia"). */
  location: string
  role: string
  teamSize?: string
  duration?: string
  description: string
  highlights: string[]
  tags: string[]
  /** Only resume-supported, measured outcomes. */
  outcome?: { value: number; suffix: string; label: string }
  details: {
    challenge: string
    approach: string
    flow: string[]
  }
}

export interface Certification {
  id: string
  name: string
  /** Groups certifications into issuer panels. */
  provider: 'UiPath' | 'Automation Anywhere'
  issuer: string
  level: string
  /** Leave null until known — empty fields are hidden. */
  validUntil: string | null
  credentialId: string | null
  verifyUrl: string | null
}

export interface TechItem {
  name: string
  icon: IconKey
  /** Short plain-language description shown under the name. */
  caption: string
}

export type IconKey =
  | 'workflow'
  | 'sparkles'
  | 'code'
  | 'flask'
  | 'app'
  | 'layers'
  | 'fileCheck'
  | 'table'
  | 'globe'
  | 'fileScan'
  | 'building'
  | 'radar'
  | 'bot'
  | 'serverCog'
  | 'refresh'
  | 'codeXml'
  | 'scanText'
  | 'brain'
  | 'cable'
  | 'database'
  | 'fileSheet'
  | 'shieldCheck'
  | 'users'
  | 'award'
  | 'target'
