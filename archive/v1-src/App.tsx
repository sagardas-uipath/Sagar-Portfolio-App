import { AnimatePresence, MotionConfig } from 'framer-motion'
import { useEffect, useState } from 'react'
import { About } from './components/About'
import { AIAssistant } from './components/AIAssistant'
import { Architecture } from './components/Architecture'
import { AutomationLab } from './components/AutomationLab'
import { Certifications } from './components/Certifications'
import { CommandCenter } from './components/CommandCenter'
import { Contact } from './components/Contact'
import { Experience } from './components/Experience'
import { Expertise } from './components/Expertise'
import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { Loader } from './components/Loader'
import { Navigation } from './components/Navigation'
import { Projects } from './components/Projects'
import { Reliability } from './components/Reliability'
import { Snapshot } from './components/Snapshot'
import { TestAutomation } from './components/TestAutomation'
import { DataFlow } from './components/ui/DataFlow'
import { ErrorBoundary } from './components/ErrorBoundary'

const prefersReduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

export default function App() {
  const [ready, setReady] = useState(prefersReduced)

  useEffect(() => {
    if (ready) return
    const t = window.setTimeout(() => setReady(true), 1000)
    return () => window.clearTimeout(t)
  }, [ready])

  return (
    <MotionConfig reducedMotion="user">
      <AnimatePresence>{!ready && <Loader key="loader" />}</AnimatePresence>
      <Navigation />
      <main id="main" tabIndex={-1} className="outline-none">
        <Hero ready={ready} />
        <ErrorBoundary>
          <Snapshot />
        </ErrorBoundary>
        <ErrorBoundary>
          <About />
        </ErrorBoundary>
        <ErrorBoundary>
          <Experience />
        </ErrorBoundary>
        <DataFlow />
        <ErrorBoundary>
          <Expertise />
        </ErrorBoundary>
        <ErrorBoundary>
          <Projects />
        </ErrorBoundary>
        <ErrorBoundary>
          <Architecture />
        </ErrorBoundary>
        <ErrorBoundary>
          <AutomationLab />
        </ErrorBoundary>
        <ErrorBoundary>
          <CommandCenter />
        </ErrorBoundary>
        <ErrorBoundary>
          <TestAutomation />
        </ErrorBoundary>
        <ErrorBoundary>
          <Reliability />
        </ErrorBoundary>
        <DataFlow stages={['Monitor', 'Detect', 'Analyze', 'RCA', 'Fix', 'Optimize']} />
        <ErrorBoundary>
          <Certifications />
        </ErrorBoundary>
        <ErrorBoundary>
          <Contact />
        </ErrorBoundary>
      </main>
      <Footer />
      <AIAssistant ready={ready} />
    </MotionConfig>
  )
}
