import type { IconName } from '../components/ui/Icon'

export interface NavItem {
  id: string
  label: string
}

export interface Metric {
  /** Numeric values animate as counters; string values render as-is. */
  value: number | string
  suffix?: string
  label: string
  note?: string
}

export interface LifecycleStage {
  id: string
  label: string
  description: string
  icon: IconName
}

export interface Role {
  company: string
  title: string
  start: string
  end: string
  current?: boolean
  summary: string
  highlights: string[]
  technologies: string[]
}

export interface SkillItem {
  id: string
  name: string
  description: string
  related: string[]
  /** Project ids from `projects` that demonstrate this skill. */
  projects: string[]
}

export interface SkillArea {
  id: string
  title: string
  icon: IconName
  blurb: string
  items: SkillItem[]
}

export interface Project {
  id: string
  index: string
  title: string
  category: string
  domain?: string
  summary: string
  icon: IconName
  technologies: string[]
  /** Only resume-supported, measured outcomes belong here. */
  outcomeMetric?: { value: number; suffix: string; label: string }
  caseStudy: {
    problem: string
    currentProcess: string
    opportunity: string
    solution: string
    architecture: { layer: string; detail: string }[]
    flow: string[]
    outcomes: string[]
  }
}

export interface ArchitectureNode {
  id: string
  label: string
  sublabel: string
  icon: IconName
  purpose: string
  capabilities: string[]
}

export interface Certification {
  id: string
  name: string
  issuer: 'UiPath' | 'Automation Anywhere' | string
  level: string
  /** Leave null until known — the UI hides empty fields. */
  year: string | null
  validUntil: string | null
  credentialId: string | null
  verifyUrl: string | null
}

export interface DocumentSample {
  id: string
  label: string
  fileName: string
  docType: string
  confidence: number
  result: 'PASS' | 'FAIL' | 'NOT CLEAR'
  fields: { key: string; value: string; confidence: number }[]
  note: string
}
