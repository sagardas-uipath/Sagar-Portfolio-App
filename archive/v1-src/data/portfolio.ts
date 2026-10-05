/**
 * ─────────────────────────────────────────────────────────────
 *  PORTFOLIO CONTENT — single source of truth
 * ─────────────────────────────────────────────────────────────
 *  Every piece of personal content shown on the site lives here.
 *  Edit this file to update the portfolio; no component changes needed.
 *
 *  Content rules
 *  • Experience, projects and certifications come from the resume only.
 *  • Fields marked `TODO` are placeholders — replace them with real values.
 *  • Anything inside `demo` is simulated data for the interactive lab and
 *    command center. It is labelled "Demo" in the UI and is NOT presented
 *    as a professional achievement.
 */
import type {
  ArchitectureNode,
  Certification,
  DocumentSample,
  LifecycleStage,
  Metric,
  NavItem,
  Project,
  Role,
  SkillArea,
} from './types'

export const profile = {
  name: 'Sagar Das',
  initials: 'SD',
  title: 'Lead Engineer',
  roleLine: ['Lead Engineer', 'Intelligent Automation', 'AI & RPA'],
  headline: 'Engineering Intelligent Automation for Enterprise Transformation',
  /** Phrase inside `headline` that receives the accent gradient. */
  headlineHighlight: 'Intelligent Automation',
  statement:
    'Designing scalable automation, AI-powered solutions, agentic workflows and enterprise integrations that transform complex business processes.',
  status: 'Enterprise Automation • AI • RPA',
  location: 'Bengaluru, India',
  education: 'B.Tech / B.E. — Electronics & Communication Engineering',
  domains: ['Hospitality', 'Banking', 'Finance'],
  aboutHeadline: 'From Business Problems to Intelligent Automation',
  about: [
    'I am a Lead Engineer with around five years of hands-on experience in enterprise automation, working across the Hospitality, Banking and Finance domains.',
    'My work spans the full automation lifecycle — business requirement analysis, solution design, development, testing, deployment and production support — using UiPath, Automation Anywhere, AI-powered automation and enterprise integrations.',
    'I have delivered with both offshore and onsite teams, including Saudi Arabia, and I stay with solutions after go-live: monitoring, troubleshooting, root-cause analysis and continuous improvement.',
  ],
  focus: [
    'Agentic automation — autonomous & conversational agents',
    'UiPath Coded Apps and IXP',
    'AI-powered document processing',
    'API & enterprise integration',
  ],
}

export const navigation: NavItem[] = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'expertise', label: 'Expertise' },
  { id: 'projects', label: 'Projects' },
  { id: 'architecture', label: 'Architecture' },
  { id: 'lab', label: 'Automation Lab' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'contact', label: 'Contact' },
]

/**
 * Professional snapshot. Only resume-supported values.
 * (If you want to add e.g. "20+ Automation Solutions", add it here once verified.)
 */
export const snapshot: Metric[] = [
  { value: 5, suffix: '+', label: 'Years Experience', note: 'Enterprise automation since Nov 2021' },
  { value: 'AI + RPA', label: 'Core Expertise', note: 'Agentic, document & process automation' },
  { value: 3, label: 'Industry Domains', note: 'Hospitality · Banking · Finance' },
  { value: 4, label: 'Professional Certifications', note: 'UiPath · Automation Anywhere' },
]

export const lifecycle: LifecycleStage[] = [
  { id: 'discover', label: 'Discover', icon: 'search', description: 'Business requirement analysis and process assessment with stakeholders.' },
  { id: 'design', label: 'Design', icon: 'pen', description: 'Solution design — REFramework structure, exception strategy, integrations.' },
  { id: 'build', label: 'Build', icon: 'code', description: 'Development of robots, agents, apps and reusable components.' },
  { id: 'test', label: 'Test', icon: 'flask', description: 'Functional, regression, integration and end-to-end testing.' },
  { id: 'deploy', label: 'Deploy', icon: 'rocket', description: 'Release through Orchestrator with environment-aware configuration.' },
  { id: 'monitor', label: 'Monitor', icon: 'activity', description: 'Production support, logging, incident handling and RCA.' },
  { id: 'optimize', label: 'Optimize', icon: 'trending', description: 'Continuous improvement driven by production insight.' },
]

export const experience: Role[] = [
  {
    company: 'HCLTech',
    title: 'Lead Engineer',
    start: 'Sep 2024',
    end: 'Present',
    current: true,
    summary:
      'Leading enterprise automation delivery — from process automation and test automation to AI-powered and agentic solutions.',
    highlights: [
      'Enterprise automation with UiPath Process Automation and UiPath Test Automation',
      'AI-powered and agentic automation solutions',
      'UiPath Coded Apps and IXP-based document processing',
      'APIs and enterprise application integrations',
      'Orchestrator administration and REFramework-based solution design',
      'Production support, troubleshooting and root-cause analysis',
    ],
    technologies: ['UiPath Studio', 'Orchestrator', 'REFramework', 'Test Automation', 'Agents', 'Coded Apps', 'IXP', 'APIs'],
  },
  {
    company: 'ITC Infotech',
    title: 'Senior RPA Developer',
    start: 'Nov 2021',
    end: 'Sep 2024',
    summary:
      'Built and supported automation with UiPath and Automation Anywhere — from web and desktop to document and API automation — working directly with clients across onsite and offshore teams.',
    highlights: [
      'Web, desktop, database, API, PDF and Excel automation',
      'Human-in-the-loop workflows with Action Center; ML models with AI Center',
      'Document Understanding for intelligent data extraction',
      'Integration Services and GenAI capabilities',
      'Client interaction and onsite / offshore delivery',
    ],
    technologies: ['UiPath', 'Automation Anywhere', 'Action Center', 'AI Center', 'Document Understanding', 'Integration Services', 'GenAI'],
  },
]

export const expertise: SkillArea[] = [
  {
    id: 'automation',
    title: 'Automation',
    icon: 'workflow',
    blurb: 'The execution layer — robust, recoverable process automation.',
    items: [
      { id: 'uipath', name: 'UiPath', description: 'Primary enterprise automation platform used across process, test and agentic automation.', related: ['uipath-studio', 'orchestrator', 'reframework'], projects: ['p01', 'p05'] },
      { id: 'uipath-studio', name: 'UiPath Studio', description: 'Designing and developing attended and unattended automation workflows.', related: ['uipath', 'reframework', 'csharp'], projects: ['p01'] },
      { id: 'reframework', name: 'REFramework', description: 'Transactional framework for queue-driven, retry-aware and well-logged automations.', related: ['orchestrator', 'exception-handling', 'logging'], projects: ['p01'] },
      { id: 'orchestrator', name: 'Orchestrator', description: 'Deployment, scheduling, queues, assets and administration of robots in production.', related: ['reframework', 'monitoring', 'production-support'], projects: ['p01'] },
      { id: 'process-automation', name: 'Process Automation', description: 'End-to-end automation of business processes — from requirement to production.', related: ['workflow-automation', 'uipath'], projects: ['p01', 'p02', 'p03'] },
      { id: 'workflow-automation', name: 'Workflow Automation', description: 'Orchestrating multi-step processes across people, robots and systems.', related: ['process-automation', 'action-center', 'maestro'], projects: ['p01'] },
      { id: 'automation-anywhere', name: 'Automation Anywhere', description: 'Second RPA platform — Master and Advanced RPA Professional certified.', related: ['process-automation', 'web-automation'], projects: [] },
      { id: 'action-center', name: 'Action Center', description: 'Human-in-the-loop validation and approval steps inside automated flows.', related: ['document-understanding', 'workflow-automation'], projects: [] },
    ],
  },
  {
    id: 'ai',
    title: 'AI & Agentic Automation',
    icon: 'sparkles',
    blurb: 'Reasoning and understanding layered on top of deterministic automation.',
    items: [
      { id: 'ai-automation', name: 'AI-powered Automation', description: 'Combining ML, document AI and GenAI with RPA for judgement-based work.', related: ['genai', 'ai-center', 'document-understanding'], projects: ['p01'] },
      { id: 'genai', name: 'GenAI', description: 'Generative AI capabilities embedded within automation workflows.', related: ['ai-automation', 'conversational-agents'], projects: ['p01'] },
      { id: 'ai-center', name: 'AI Center', description: 'Deploying and consuming ML models from within UiPath automations.', related: ['ai-automation', 'document-understanding'], projects: [] },
      { id: 'document-understanding', name: 'Document Understanding', description: 'Classification, extraction and validation of semi-structured documents.', related: ['ixp', 'pdf-automation', 'action-center', 'abbyy'], projects: ['p05', 'p06'] },
      { id: 'ixp', name: 'UiPath IXP', description: 'Intelligent extraction and processing for complex, unstructured content.', related: ['document-understanding', 'ai-automation'], projects: ['p01'] },
      { id: 'abbyy', name: 'ABBYY', description: 'OCR and multilingual data extraction from PDFs and invoices.', related: ['document-understanding', 'pdf-automation'], projects: ['p05'] },
      { id: 'autonomous-agents', name: 'Autonomous Agents', description: 'Goal-driven agents that plan and invoke automations and tools.', related: ['agentic-automation', 'maestro', 'apis'], projects: ['p01'] },
      { id: 'conversational-agents', name: 'Conversational Agents', description: 'Natural-language interfaces that front enterprise processes.', related: ['agentic-automation', 'genai'], projects: ['p01'] },
      { id: 'agentic-automation', name: 'Agentic Automation', description: 'Agents, robots and people collaborating in one governed process.', related: ['autonomous-agents', 'conversational-agents', 'maestro'], projects: ['p01'] },
      { id: 'maestro', name: 'UiPath Maestro', description: 'Orchestrating long-running processes across agents, robots and humans.', related: ['agentic-automation', 'workflow-automation'], projects: [] },
    ],
  },
  {
    id: 'apps',
    title: 'Applications',
    icon: 'app',
    blurb: 'The surfaces automation touches — and the ones it creates.',
    items: [
      { id: 'uipath-apps', name: 'UiPath Apps', description: 'Low-code front-ends for business users to interact with automations.', related: ['coded-apps', 'action-center'], projects: [] },
      { id: 'coded-apps', name: 'Coded Apps', description: 'Code-first web applications on the UiPath platform.', related: ['uipath-apps', 'javascript', 'apis'], projects: ['p01'] },
      { id: 'web-automation', name: 'Web Automation', description: 'Reliable browser automation for portals and external web applications.', related: ['desktop-automation', 'apis'], projects: ['p04'] },
      { id: 'desktop-automation', name: 'Desktop Automation', description: 'Automating thick-client and legacy desktop applications.', related: ['web-automation', 'enterprise-apps'], projects: [] },
      { id: 'excel-automation', name: 'Excel Automation', description: 'Large-volume data processing, pivots and report generation.', related: ['database-integration', 'pdf-automation'], projects: ['p03'] },
      { id: 'pdf-automation', name: 'PDF Automation', description: 'Reading, inspecting and extracting data from PDF documents.', related: ['document-understanding', 'abbyy', 'excel-automation'], projects: ['p05', 'p06'] },
    ],
  },
  {
    id: 'integration',
    title: 'Integration',
    icon: 'plug',
    blurb: 'Connecting automation to the systems of record.',
    items: [
      { id: 'apis', name: 'APIs', description: 'REST API integration as a first-class alternative to UI automation.', related: ['integration-services', 'enterprise-apps'], projects: ['p01', 'p04'] },
      { id: 'integration-services', name: 'Integration Services', description: 'Pre-built connectors and event triggers across enterprise applications.', related: ['apis', 'email-integration'], projects: [] },
      { id: 'database-integration', name: 'Database Integration', description: 'Reading, writing and reconciling data directly against databases.', related: ['apis', 'excel-automation'], projects: ['p01', 'p03'] },
      { id: 'enterprise-apps', name: 'Enterprise Applications', description: 'Integrating automation with core business applications.', related: ['apis', 'desktop-automation'], projects: ['p01', 'p04'] },
      { id: 'email-integration', name: 'Email Integration', description: 'Email-triggered processes, notifications and alerting.', related: ['integration-services'], projects: ['p07'] },
    ],
  },
  {
    id: 'testing',
    title: 'Testing',
    icon: 'flask',
    blurb: 'Quality engineered into every release.',
    items: [
      { id: 'test-automation', name: 'UiPath Test Automation', description: 'Automated test suites for applications and automations.', related: ['functional-testing', 'regression-testing'], projects: ['p01'] },
      { id: 'functional-testing', name: 'Functional Testing', description: 'Verifying business behaviour against requirements.', related: ['test-automation', 'e2e-testing'], projects: ['p01'] },
      { id: 'regression-testing', name: 'Regression Testing', description: 'Protecting existing behaviour as processes evolve.', related: ['test-automation', 'integration-testing'], projects: ['p01'] },
      { id: 'integration-testing', name: 'Integration Testing', description: 'Validating contracts between automations, APIs and systems.', related: ['apis', 'regression-testing'], projects: ['p01'] },
      { id: 'e2e-testing', name: 'End-to-End Testing', description: 'Full business scenarios across every system involved.', related: ['functional-testing', 'integration-testing'], projects: ['p01'] },
    ],
  },
  {
    id: 'engineering',
    title: 'Engineering & Support',
    icon: 'wrench',
    blurb: 'The engineering discipline that keeps automation running.',
    items: [
      { id: 'csharp', name: 'C#', description: 'Custom activities, coded workflows and complex logic.', related: ['dotnet', 'uipath-studio'], projects: [] },
      { id: 'dotnet', name: '.NET', description: 'The runtime underpinning UiPath workflows and custom components.', related: ['csharp'], projects: [] },
      { id: 'java', name: 'Java', description: 'General-purpose programming experience.', related: ['javascript'], projects: [] },
      { id: 'javascript', name: 'JavaScript', description: 'Web scripting and Coded Apps development.', related: ['coded-apps', 'web-automation'], projects: [] },
      { id: 'python', name: 'Python', description: 'Scripting and data handling alongside automation.', related: ['ai-automation'], projects: [] },
      { id: 'exception-handling', name: 'Exception Handling', description: 'Business vs. system exceptions, retries and graceful recovery.', related: ['reframework', 'logging'], projects: ['p01'] },
      { id: 'logging', name: 'Logging', description: 'Structured, actionable logs for audit and diagnosis.', related: ['monitoring', 'exception-handling'], projects: ['p01'] },
      { id: 'monitoring', name: 'Monitoring', description: 'Watching robot health, queues and SLAs in production.', related: ['orchestrator', 'production-support'], projects: ['p01'] },
      { id: 'rca', name: 'RCA', description: 'Root-cause analysis to fix problems once, not repeatedly.', related: ['production-support', 'logging'], projects: ['p01'] },
      { id: 'production-support', name: 'Production Support', description: 'Incident handling, defect resolution and recovery after go-live.', related: ['monitoring', 'rca', 'orchestrator'], projects: ['p01'] },
    ],
  },
]

/**
 * Case studies. Projects 02–07 reflect the resume descriptions; no outcome
 * numbers are added beyond what the resume states (File Reception Control: 60%).
 * TODO: add measured outcomes to `outcomeMetric` once you have verified figures.
 */
export const projects: Project[] = [
  {
    id: 'p01',
    index: '01',
    title: 'Enterprise Intelligent Automation & AI-Driven Process Transformation',
    category: 'Enterprise Automation · AI · RPA',
    summary:
      'A broad enterprise automation programme: scalable process automation, attended and unattended RPA, test automation, agents, Coded Apps, IXP and enterprise integrations — supported end to end in production.',
    icon: 'layers',
    technologies: ['UiPath Studio', 'Orchestrator', 'REFramework', 'Test Automation', 'Agents', 'Coded Apps', 'IXP', 'APIs', 'Databases'],
    caseStudy: {
      problem: 'Enterprise processes spread across many systems needed automation that could scale, be governed centrally and absorb AI-based judgement work.',
      currentProcess: 'Manual and partially automated processes with uneven reliability, limited reuse and growing support overhead.',
      opportunity: 'Standardise on a reusable automation foundation and extend it with agents, document AI and code-first apps.',
      solution: 'Scalable attended and unattended automations on REFramework, reusable components, UiPath Test Automation, agents, Coded Apps and IXP — integrated with APIs and databases and administered through Orchestrator.',
      architecture: [
        { layer: 'Experience', detail: 'Coded Apps for business users' },
        { layer: 'Intelligence', detail: 'Agents and IXP for reasoning and extraction' },
        { layer: 'Orchestration', detail: 'Orchestrator — queues, schedules, assets' },
        { layer: 'Execution', detail: 'REFramework robots, attended and unattended' },
        { layer: 'Integration', detail: 'APIs and databases' },
        { layer: 'Quality', detail: 'Test Automation, monitoring and production support' },
      ],
      flow: ['Request', 'Agent / App', 'Orchestrator Queue', 'Robot (REFramework)', 'API / Database', 'Validation', 'Reporting', 'Monitoring'],
      outcomes: [
        'A reusable, governed automation foundation across processes',
        'AI and agentic capabilities layered onto deterministic automation',
        'Quality built in through automated testing',
        'Production stability through monitoring, RCA and support',
      ],
    },
  },
  {
    id: 'p02',
    index: '02',
    title: 'File Reception Control',
    category: 'Process Automation',
    domain: 'Banking & Finance',
    summary: 'An automation robot that detects errors in incoming batch files, replacing manual file checks.',
    icon: 'fileCheck',
    technologies: ['RPA', 'Batch File Processing', 'Error Detection'],
    outcomeMetric: { value: 60, suffix: '%', label: 'less manual error-checking time' },
    caseStudy: {
      problem: 'Batch files had to be checked manually for errors before they could be processed.',
      currentProcess: 'Team members opened and reviewed batch files by hand — slow, repetitive and error-prone.',
      opportunity: 'Rule-based error checks are a strong fit for an unattended robot.',
      solution: 'An automation robot that reads each received batch file, detects errors and reports them for action.',
      architecture: [
        { layer: 'Trigger', detail: 'Batch file received' },
        { layer: 'Execution', detail: 'Robot parses and inspects the file' },
        { layer: 'Rules', detail: 'Error-detection checks' },
        { layer: 'Output', detail: 'Error report / notification' },
      ],
      flow: ['File Received', 'Bot Trigger', 'Parse File', 'Run Checks', 'Detect Errors', 'Report', 'Notify'],
      outcomes: ['Reduced manual error-checking time by 60%', 'Consistent, repeatable file validation'],
    },
  },
  {
    id: 'p03',
    index: '03',
    title: 'Pending Transaction Report',
    category: 'Data & Reporting Automation',
    domain: 'Banking & Finance',
    summary: 'Identifies pending credit transactions awaiting approval and generates pivot reports — across millions of data points from multiple departments.',
    icon: 'table',
    technologies: ['RPA', 'Excel Automation', 'Pivot Reporting', 'Large-volume Data'],
    caseStudy: {
      problem: 'Pending credit transactions requiring approval had to be identified and reported.',
      currentProcess: 'Identifying pending items meant working through very large data sets spanning multiple departments.',
      opportunity: 'Automate identification and report generation so approvers see what is pending.',
      solution: 'An automation that identifies pending transactions and generates pivot reports — engineered to handle millions of data points across departments.',
      architecture: [
        { layer: 'Input', detail: 'Departmental transaction data' },
        { layer: 'Execution', detail: 'Robot filters and consolidates' },
        { layer: 'Processing', detail: 'High-volume data handling' },
        { layer: 'Output', detail: 'Pivot reports for approvers' },
      ],
      flow: ['Scheduled Trigger', 'Collect Data', 'Filter Pending', 'Consolidate', 'Build Pivots', 'Distribute Report'],
      outcomes: ['Pending transactions surfaced automatically', 'Pivot reports generated from millions of data points'],
    },
  },
  {
    id: 'p04',
    index: '04',
    title: 'Fetch LG Process',
    category: 'Web Automation & Integration',
    domain: 'Banking & Finance',
    summary: 'Web automation that integrates with an external application to extract data and streamline the process.',
    icon: 'globe',
    technologies: ['Web Automation', 'External Application Integration', 'Data Extraction'],
    caseStudy: {
      problem: 'Required data lived in an external application and had to be fetched to move the process forward.',
      currentProcess: 'Data was retrieved from the external application by hand.',
      opportunity: 'Automate retrieval through web automation and integrate it into the process.',
      solution: 'A web automation that connects to the external application, extracts the required data and hands it into the business process.',
      architecture: [
        { layer: 'Trigger', detail: 'Process request' },
        { layer: 'Execution', detail: 'Web automation robot' },
        { layer: 'Integration', detail: 'External application' },
        { layer: 'Output', detail: 'Extracted, structured data' },
      ],
      flow: ['Trigger', 'Open Application', 'Navigate', 'Extract Data', 'Validate', 'Update Process'],
      outcomes: ['Data retrieval from the external application automated', 'Process improvement through integrated extraction'],
    },
  },
  {
    id: 'p05',
    index: '05',
    title: 'Off Plan Phase 1',
    category: 'Intelligent Document Processing',
    domain: 'Banking & Finance',
    summary: 'Supports customer housing-loan approval with UiPath and ABBYY, extracting data from multilingual PDFs and invoices.',
    icon: 'fileScan',
    technologies: ['UiPath', 'ABBYY', 'Multilingual OCR', 'PDF / Invoice Extraction'],
    caseStudy: {
      problem: 'Housing-loan approval depended on data held in PDFs and invoices in more than one language.',
      currentProcess: 'Documents were reviewed and key data captured manually for each application.',
      opportunity: 'Combine RPA with OCR-based extraction for multilingual documents.',
      solution: 'UiPath automation with ABBYY extraction that reads multilingual PDF and invoice data and feeds it into the loan-approval process.',
      architecture: [
        { layer: 'Input', detail: 'Multilingual PDFs and invoices' },
        { layer: 'Intelligence', detail: 'ABBYY OCR and extraction' },
        { layer: 'Execution', detail: 'UiPath robot' },
        { layer: 'Output', detail: 'Data for loan approval' },
      ],
      flow: ['Documents Received', 'Classify', 'OCR (ABBYY)', 'Extract Fields', 'Validate', 'Loan Approval Input'],
      outcomes: ['Multilingual document data captured automatically', 'Structured input for the loan-approval decision'],
    },
  },
  {
    id: 'p06',
    index: '06',
    title: 'Construction Finance',
    category: 'Document Validation',
    domain: 'Banking & Finance',
    summary: 'Validates loan applications against PDF inspection reports to support business decisions.',
    icon: 'building',
    technologies: ['PDF Automation', 'Automated Validation', 'Business Rules'],
    caseStudy: {
      problem: 'Loan applications had to be validated against inspection reports supplied as PDFs.',
      currentProcess: 'Inspection reports were read and cross-checked against applications manually.',
      opportunity: 'Automate PDF inspection and rule-based validation.',
      solution: 'An automation that inspects PDF reports, validates loan-application details and presents the result for decision-making.',
      architecture: [
        { layer: 'Input', detail: 'Loan application + inspection PDF' },
        { layer: 'Execution', detail: 'PDF inspection robot' },
        { layer: 'Rules', detail: 'Automated validation' },
        { layer: 'Output', detail: 'Decision support' },
      ],
      flow: ['Application Received', 'Read Inspection PDF', 'Extract', 'Validate Rules', 'Flag Exceptions', 'Decision Support'],
      outcomes: ['Automated validation of loan applications', 'Faster, consistent input to business decisions'],
    },
  },
  {
    id: 'p07',
    index: '07',
    title: 'ESTR Phase 1',
    category: 'Monitoring & Compliance',
    domain: 'Banking & Finance',
    summary: 'Transaction monitoring that detects suspicious transactions and raises automated alerts for investigation.',
    icon: 'radar',
    technologies: ['Transaction Monitoring', 'Rule-based Detection', 'Automated Alerts'],
    caseStudy: {
      problem: 'Suspicious transactions needed to be detected and escalated for investigation.',
      currentProcess: 'Transactions were reviewed and escalated with considerable manual effort.',
      opportunity: 'Automate monitoring and alerting so investigators focus on flagged cases.',
      solution: 'An automation that monitors transactions, detects suspicious activity and sends alerts into the investigation workflow.',
      architecture: [
        { layer: 'Input', detail: 'Transaction data' },
        { layer: 'Rules', detail: 'Suspicious-pattern detection' },
        { layer: 'Execution', detail: 'Monitoring robot' },
        { layer: 'Output', detail: 'Alerts to investigators' },
      ],
      flow: ['Transactions', 'Monitor', 'Apply Rules', 'Detect Suspicious', 'Alert', 'Investigation'],
      outcomes: ['Suspicious transactions flagged automatically', 'Investigation workflow triggered by alerts'],
    },
  },
]

export const architecture: { tiers: ArchitectureNode[]; branches: ArchitectureNode[]; base: ArchitectureNode[] } = {
  tiers: [
    { id: 'user', label: 'User', sublabel: 'Business user · Customer', icon: 'users', purpose: 'Where every automation starts — a business user, a customer request or a scheduled business event.', capabilities: ['Requests & approvals', 'Self-service', 'Human-in-the-loop'] },
    { id: 'app', label: 'Coded App / UI', sublabel: 'UiPath Apps · Coded Apps', icon: 'app', purpose: 'A purpose-built interface that captures intent and presents results without exposing the machinery.', capabilities: ['Coded Apps', 'UiPath Apps', 'Action Center tasks'] },
    { id: 'agent', label: 'AI / Agent', sublabel: 'Agents · GenAI · IXP', icon: 'bot', purpose: 'Understands the request, reasons over context and documents, and decides which automations to invoke.', capabilities: ['Autonomous & conversational agents', 'Document Understanding / IXP', 'GenAI'] },
    { id: 'orchestration', label: 'Orchestration Layer', sublabel: 'Orchestrator · Maestro', icon: 'network', purpose: 'Governs execution — queues, schedules, assets, credentials and long-running processes across robots, agents and people.', capabilities: ['Queues & triggers', 'Assets & credentials', 'Process orchestration'] },
    { id: 'robot', label: 'UiPath Automation', sublabel: 'REFramework robots', icon: 'workflow', purpose: 'Deterministic execution with retries, exception handling and structured logging — attended or unattended.', capabilities: ['REFramework', 'Web / desktop / PDF / Excel', 'Exception handling'] },
  ],
  branches: [
    { id: 'api', label: 'API', sublabel: 'REST · Integration Services', icon: 'plug', purpose: 'Preferred integration path — fast, stable and auditable system-to-system calls.', capabilities: ['REST APIs', 'Integration Services', 'Event triggers'] },
    { id: 'database', label: 'Database', sublabel: 'Read · write · reconcile', icon: 'database', purpose: 'Direct data access for high-volume reads, reconciliation and reporting.', capabilities: ['Queries', 'Bulk data handling', 'Reconciliation'] },
    { id: 'files', label: 'Files', sublabel: 'PDF · Excel · Batch', icon: 'file', purpose: 'Document and file-based exchange — batch files, spreadsheets, PDFs and email attachments.', capabilities: ['PDF extraction', 'Excel & pivots', 'Batch validation'] },
  ],
  base: [
    { id: 'enterprise', label: 'Enterprise Systems', sublabel: 'Core business applications', icon: 'server', purpose: 'The systems of record the automation ultimately reads from and updates.', capabilities: ['Core applications', 'External portals', 'Email & notifications'] },
    { id: 'result', label: 'Business Result', sublabel: 'Outcome · Report · Alert', icon: 'target', purpose: 'The measurable outcome — a processed transaction, a validated document, a report or an alert.', capabilities: ['Reports', 'Notifications', 'Audit trail'] },
  ],
}

/** Production-support loop — reflects the support responsibilities on the resume. */
export const reliability = {
  headline: "Automation Doesn't End at Deployment.",
  intro:
    'Robots meet real-world data, changing applications and unexpected inputs. Production support is where automation earns trust — so I treat it as an engineering discipline.',
  loop: [
    { id: 'monitor', label: 'Monitor', description: 'Watch robot health, queues, SLAs and logs in Orchestrator.' },
    { id: 'detect', label: 'Detect', description: 'Surface failures and anomalies early through alerts and exception trends.' },
    { id: 'analyze', label: 'Analyze', description: 'Trace the transaction through structured logs to see exactly what happened.' },
    { id: 'rca', label: 'RCA', description: 'Find the root cause — data, application change, environment or logic.' },
    { id: 'fix', label: 'Fix', description: 'Resolve the defect properly and regression-test the change.' },
    { id: 'recover', label: 'Recover', description: 'Reprocess affected transactions safely and restore service.' },
    { id: 'optimize', label: 'Optimize', description: 'Harden the automation so the same issue does not recur.' },
  ],
  practices: ['Monitoring', 'Incident handling', 'Exception handling', 'Logging', 'RCA', 'Recovery', 'Defect resolution', 'Production support'],
}

export const certifications: Certification[] = [
  { id: 'aa-master', name: 'Certified Master RPA Professional', issuer: 'Automation Anywhere', level: 'Master', year: null /* TODO */, validUntil: null, credentialId: null /* TODO */, verifyUrl: null /* TODO */ },
  { id: 'aa-advanced', name: 'Certified Advanced RPA Professional', issuer: 'Automation Anywhere', level: 'Advanced', year: null /* TODO */, validUntil: null, credentialId: null /* TODO */, verifyUrl: null /* TODO */ },
  { id: 'uip-adp', name: 'UiPath Certified Professional — Automation Developer Professional', issuer: 'UiPath', level: 'Professional', year: null /* TODO */, validUntil: null, credentialId: null /* TODO */, verifyUrl: null /* TODO */ },
  { id: 'uip-agentic', name: 'UiPath Certified Professional — Agentic Automation Associate', issuer: 'UiPath', level: 'Associate', year: null /* TODO */, validUntil: 'June 2029', credentialId: null /* TODO */, verifyUrl: null /* TODO */ },
]

export const education = {
  degree: 'B.Tech / B.E.',
  field: 'Electronics & Communication Engineering',
  institution: 'Ramkrishna Mahato Government Engineering College, Purulia',
  year: '2021',
}

/** TODO: replace with your real public contact details. */
export const contact = {
  headline: "Let's Automate What's Next.",
  text: 'Have a complex business process, automation opportunity or AI idea?',
  email: 'your.email@example.com', // TODO
  linkedin: 'https://www.linkedin.com/in/your-profile', // TODO
  github: '', // optional — leave empty to hide
}

/* ───────────────────────── DEMO DATA ─────────────────────────
   Simulated values for the Automation Lab and Command Center.
   Clearly labelled as demo in the UI. Not professional metrics. */
export const demo = {
  commandCenter: {
    queueProgress: 82,
    transactions: 1248,
    successRate: 98,
    activeAutomations: 12,
    aiWorkflows: 4,
    apiIntegrations: 9,
    processes: [
      { name: 'Invoice Intake', status: 'Healthy', progress: 82 },
      { name: 'Batch File Validation', status: 'Healthy', progress: 64 },
      { name: 'Transaction Monitoring', status: 'Monitoring', progress: 47 },
      { name: 'Report Generation', status: 'Healthy', progress: 91 },
    ],
  },
  documents: [
    {
      id: 'passport',
      label: 'Passport',
      fileName: 'sample_passport.jpg',
      docType: 'Passport',
      confidence: 97,
      result: 'PASS',
      fields: [
        { key: 'Surname', value: 'SAMPLE', confidence: 99 },
        { key: 'Given names', value: 'ALEX', confidence: 98 },
        { key: 'Document no.', value: 'X0000000', confidence: 96 },
        { key: 'Expiry', value: '2031-08-14', confidence: 95 },
      ],
      note: 'All mandatory fields extracted above threshold. Expiry date is valid.',
    },
    {
      id: 'invoice',
      label: 'Invoice',
      fileName: 'sample_invoice_ar_en.pdf',
      docType: 'Invoice (multilingual)',
      confidence: 74,
      result: 'NOT CLEAR',
      fields: [
        { key: 'Vendor', value: 'Example Trading Co.', confidence: 93 },
        { key: 'Invoice no.', value: 'INV-0042', confidence: 91 },
        { key: 'Total', value: '12,450.00', confidence: 62 },
        { key: 'Date', value: '2026-03-02', confidence: 88 },
      ],
      note: 'Total amount below confidence threshold — routed to Action Center for human validation.',
    },
    {
      id: 'inspection',
      label: 'Inspection Report',
      fileName: 'sample_inspection_report.pdf',
      docType: 'Inspection Report',
      confidence: 92,
      result: 'FAIL',
      fields: [
        { key: 'Site ID', value: 'SITE-007', confidence: 97 },
        { key: 'Completion', value: '45%', confidence: 94 },
        { key: 'Inspector sign-off', value: 'Missing', confidence: 90 },
        { key: 'Report date', value: '2026-01-18', confidence: 95 },
      ],
      note: 'Business rule failed: inspector sign-off is mandatory before disbursement.',
    },
  ] satisfies DocumentSample[],
  workflow: [
    { id: 'trigger', label: 'Trigger', log: 'Event received — new work item' },
    { id: 'queue', label: 'Queue', log: 'Item added to Orchestrator queue' },
    { id: 'process', label: 'Process', log: 'Robot picked transaction (REFramework)' },
    { id: 'rule', label: 'Business Rule', log: 'Validation rules evaluated — 6/6 passed' },
    { id: 'api', label: 'API', log: 'POST /records → 201 Created' },
    { id: 'result', label: 'Result', log: 'Transaction successful — status updated' },
  ],
  testSuite: [
    { name: 'Login & session handling', stage: 'Functional', status: 'pass' },
    { name: 'Queue item creation', stage: 'Functional', status: 'pass' },
    { name: 'Existing report layout', stage: 'Regression', status: 'pass' },
    { name: 'API contract — records endpoint', stage: 'Integration', status: 'warn' },
    { name: 'Invoice to posting scenario', stage: 'End-to-End', status: 'pass' },
    { name: 'Release smoke checks', stage: 'Release', status: 'pass' },
  ] as { name: string; stage: string; status: 'pass' | 'warn' }[],
}
