/**
 * Portfolio agent
 * ───────────────
 * One interface, two implementations:
 *  • LocalKnowledgeAgent — answers from `data/portfolio.ts` with intent matching (default).
 *  • RemoteAgent        — POSTs to VITE_AGENT_ENDPOINT, e.g. your own serverless proxy to an LLM.
 *
 * Never call an LLM provider directly from the browser: API keys would be exposed.
 * Point VITE_AGENT_ENDPOINT at a backend that holds the key and returns { answer, sources? }.
 */
import { certifications, contact, education, experience, expertise, profile, projects } from '../data/portfolio'

export interface AgentAnswer {
  text: string
  sources?: string[]
}

export interface PortfolioAgent {
  readonly mode: 'local' | 'remote'
  ask(question: string): Promise<AgentAnswer>
}

export const suggestedQuestions = [
  'What automation technologies does Sagar work with?',
  'Which projects involve document automation?',
  'What experience does Sagar have with AI?',
  'What UiPath capabilities does Sagar work with?',
]

const first = profile.name.split(' ')[0]
const area = (id: string) => expertise.find((a) => a.id === id)!
const names = (id: string) => area(id).items.map((i) => i.name).join(', ')
const bullet = (lines: string[]) => lines.map((l) => `• ${l}`).join('\n')

type Intent = { keywords: string[]; generic?: boolean; answer: () => AgentAnswer }

const intents: Intent[] = [
  {
    keywords: ['document', 'idp', 'ocr', 'extract', 'abbyy', 'ixp', 'pdf', 'invoice', 'understanding'],
    answer: () => {
      const docProjects = projects.filter((p) => ['p01', 'p05', 'p06'].includes(p.id))
      return {
        text: `Document automation appears across several of ${first}'s projects:\n${bullet(
          docProjects.map((p) => `${p.title} — ${p.summary}`),
        )}\n\nRelevant capabilities: Document Understanding, UiPath IXP, ABBYY, PDF automation and human-in-the-loop validation with Action Center.`,
        sources: docProjects.map((p) => `Project ${p.index}`),
      }
    },
  },
  {
    keywords: ['ai', 'genai', 'agent', 'agentic', 'llm', 'machine', 'intelligence', 'autonomous', 'conversational'],
    answer: () => ({
      text: `${first} works at the intersection of AI and automation:\n${bullet([
        `Agentic automation — autonomous and conversational agents, UiPath Maestro`,
        `AI-powered automation with GenAI and AI Center`,
        `Document Understanding and UiPath IXP for intelligent extraction`,
      ])}\n\nCurrently, as ${experience[0].title} at ${experience[0].company}, this includes AI-powered and agentic automation, Coded Apps and IXP. Certified: UiPath Agentic Automation Associate.`,
      sources: ['Expertise · AI & Agentic', `${experience[0].company}`],
    }),
  },
  {
    keywords: ['uipath', 'orchestrator', 'reframework', 'studio', 'maestro', 'coded', 'apps', 'capabilities'],
    answer: () => ({
      text: `UiPath capabilities ${first} works with:\n${bullet([
        'UiPath Studio & REFramework — attended and unattended automation',
        'Orchestrator — deployment, queues, assets and administration',
        'UiPath Test Automation',
        'Agents, UiPath Maestro and agentic automation',
        'UiPath Apps and Coded Apps',
        'Document Understanding, IXP, AI Center, Action Center',
        'Integration Services',
      ])}\n\nHolds the UiPath Automation Developer Professional and Agentic Automation Associate certifications.`,
      sources: ['Expertise', 'Certifications'],
    }),
  },
  {
    keywords: ['technology', 'technologies', 'stack', 'tools', 'skills', 'languages', 'tech', 'programming'],
    generic: true,
    answer: () => ({
      text: `${first}'s automation stack, by area:\n${bullet(expertise.map((a) => `${a.title}: ${names(a.id)}`))}`,
      sources: ['Expertise'],
    }),
  },
  {
    keywords: ['project', 'built', 'case', 'solutions', 'delivered', 'build'],
    generic: true,
    answer: () => ({
      text: `Featured automation case studies:\n${bullet(projects.map((p) => `${p.index} · ${p.title} — ${p.category}`))}\n\nOpen any project in the Projects section for the full case study.`,
      sources: ['Projects'],
    }),
  },
  {
    keywords: ['experience', 'career', 'years', 'company', 'companies', 'role', 'job', 'hcltech', 'hcl', 'itc', 'background', 'worked'],
    generic: true,
    answer: () => ({
      text: `${first} has around five years of enterprise automation experience:\n${bullet(
        experience.map((r) => `${r.title}, ${r.company} (${r.start} – ${r.end}) — ${r.summary}`),
      )}\n\nDomains: ${profile.domains.join(', ')}. Has worked with offshore and onsite teams, including Saudi Arabia.`,
      sources: ['Experience'],
    }),
  },
  {
    keywords: ['test', 'testing', 'regression', 'quality', 'qa'],
    answer: () => ({
      text: `Testing is part of how ${first} delivers automation:\n${bullet(area('testing').items.map((i) => `${i.name} — ${i.description}`))}`,
      sources: ['Expertise · Testing'],
    }),
  },
  {
    keywords: ['support', 'production', 'rca', 'incident', 'monitoring', 'troubleshoot', 'reliability', 'exception'],
    answer: () => ({
      text: `${first} supports automations after go-live — monitoring, incident handling, exception handling, logging, root-cause analysis, recovery and defect resolution. The goal: fix problems once, not repeatedly.`,
      sources: ['Production Support'],
    }),
  },
  {
    keywords: ['certification', 'certifications', 'certified', 'certificate', 'credential'],
    answer: () => ({
      text: `Certifications:\n${bullet(
        certifications.map((c) => `${c.issuer} — ${c.name}${c.validUntil ? ` (valid until ${c.validUntil})` : ''}`),
      )}`,
      sources: ['Certifications'],
    }),
  },
  {
    // Generic so "case study" still routes to projects (listed earlier) on a tie.
    keywords: ['education', 'degree', 'college', 'university', 'study', 'studied', 'graduate', 'qualification', 'engineering'],
    generic: true,
    answer: () => ({
      text: `${education.degree} in ${education.field} from ${education.institution} (${education.year}).`,
      sources: ['Education'],
    }),
  },
  {
    keywords: ['domain', 'industry', 'banking', 'finance', 'hospitality', 'saudi', 'onsite', 'client'],
    answer: () => ({
      text: `${first} has delivered automation in ${profile.domains.join(', ')} — including loan processing, transaction monitoring, reporting and document validation — working with both offshore and onsite teams, including Saudi Arabia.`,
      sources: ['About', 'Projects'],
    }),
  },
  {
    keywords: ['api', 'apis', 'integration', 'integrations', 'database', 'systems', 'connect'],
    answer: () => ({
      text: `Integration capabilities: ${names('integration')}. ${first} favours APIs and Integration Services over UI automation where possible, and connects robots to databases and enterprise applications.`,
      sources: ['Expertise · Integration', 'Architecture'],
    }),
  },
  {
    keywords: ['contact', 'hire', 'email', 'reach', 'linkedin', 'available'],
    answer: () => ({
      text: `You can reach ${first} via the Contact section, by email (${contact.email}) or on LinkedIn.`,
      sources: ['Contact'],
    }),
  },
]

const normalise = (s: string) => s.toLowerCase().replace(/[^a-z0-9\s]/g, ' ')

export class LocalKnowledgeAgent implements PortfolioAgent {
  readonly mode = 'local' as const

  async ask(question: string): Promise<AgentAnswer> {
    const tokens = normalise(question).split(/\s+/).filter(Boolean)
    const matches = (token: string, k: string) =>
      token === k || (k.length >= 4 && token.startsWith(k) && token.length - k.length <= 3)
    let best: Intent | null = null
    let bestScore = 0
    for (const intent of intents) {
      // Topical intents outrank broad ones ("projects", "experience") when both match.
      const weight = intent.generic ? 1 : 3
      const score = tokens.reduce((s, t) => s + (intent.keywords.some((k) => matches(t, k)) ? weight : 0), 0)
      if (score > bestScore) {
        best = intent
        bestScore = score
      }
    }
    // Simulated "thinking" time keeps the interaction legible.
    await new Promise((r) => setTimeout(r, 650 + Math.random() * 450))
    if (best) return best.answer()
    return {
      text: `I can answer questions about ${first}'s projects, skills, experience, certifications and the technologies used. Try one of the suggestions below.`,
    }
  }
}

export class RemoteAgent implements PortfolioAgent {
  readonly mode = 'remote' as const
  private readonly endpoint: string
  constructor(endpoint: string) {
    this.endpoint = endpoint
  }

  async ask(question: string): Promise<AgentAnswer> {
    const res = await fetch(this.endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question }),
    })
    if (!res.ok) throw new Error(`Agent endpoint returned ${res.status}`)
    const data = (await res.json()) as { answer: string; sources?: string[] }
    return { text: data.answer, sources: data.sources }
  }
}

let instance: PortfolioAgent | null = null

/** Returns the configured agent. Falls back to local knowledge if the remote call fails. */
export function getAgent(): PortfolioAgent {
  if (instance) return instance
  const endpoint = import.meta.env.VITE_AGENT_ENDPOINT as string | undefined
  const local = new LocalKnowledgeAgent()
  if (!endpoint) return (instance = local)
  const remote = new RemoteAgent(endpoint)
  instance = {
    mode: 'remote',
    ask: (q) => remote.ask(q).catch(() => local.ask(q)),
  }
  return instance
}
