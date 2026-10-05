import {
  AppWindow, Award, Bot, BrainCircuit, Building2, Cable, Code2, CodeXml, Database, FileCheck2, FileScan, FileSpreadsheet, FlaskConical,
  Globe, Layers, Radar, RefreshCcwDot, ScanText, ServerCog, ShieldCheck, Sparkles, Table2, Target, Users, Workflow,
  type LucideProps,
} from 'lucide-react'
import type { IconKey } from '../../data/types'

const icons: Record<IconKey, typeof Workflow> = {
  workflow: Workflow,
  sparkles: Sparkles,
  code: Code2,
  flask: FlaskConical,
  app: AppWindow,
  layers: Layers,
  fileCheck: FileCheck2,
  table: Table2,
  globe: Globe,
  fileScan: FileScan,
  building: Building2,
  radar: Radar,
  bot: Bot,
  serverCog: ServerCog,
  refresh: RefreshCcwDot,
  codeXml: CodeXml,
  scanText: ScanText,
  brain: BrainCircuit,
  cable: Cable,
  database: Database,
  fileSheet: FileSpreadsheet,
  shieldCheck: ShieldCheck,
  users: Users,
  award: Award,
  target: Target,
}

/** Renders a content-model icon by name so the data file stays free of component imports. */
export function Icon({ name, ...props }: { name: IconKey } & LucideProps) {
  const Cmp = icons[name]
  return <Cmp aria-hidden="true" strokeWidth={1.6} {...props} />
}
