import {
  Activity, AppWindow, Bot, Building2, Code2, Database, File, FileCheck2, FileScan, FlaskConical,
  Globe, Layers, Network, PenTool, Plug, Radar, Rocket, Search, Server, Sparkles, Table2, Target,
  TrendingUp, Users, Workflow, Wrench, type LucideProps,
} from 'lucide-react'

const icons = {
  activity: Activity, app: AppWindow, bot: Bot, building: Building2, code: Code2, database: Database,
  file: File, fileCheck: FileCheck2, fileScan: FileScan, flask: FlaskConical, globe: Globe, layers: Layers,
  network: Network, pen: PenTool, plug: Plug, radar: Radar, rocket: Rocket, search: Search, server: Server,
  sparkles: Sparkles, table: Table2, target: Target, trending: TrendingUp, users: Users, workflow: Workflow,
  wrench: Wrench,
} as const

export type IconName = keyof typeof icons

/** Renders a content-model icon by name so the data file stays free of component imports. */
export function Icon({ name, ...props }: { name: IconName } & LucideProps) {
  const Cmp = icons[name]
  return <Cmp aria-hidden="true" strokeWidth={1.6} {...props} />
}
