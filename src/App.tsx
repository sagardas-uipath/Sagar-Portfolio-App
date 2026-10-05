import { MotionConfig } from 'framer-motion'
import { About } from './components/About'
import { Contact } from './components/Contact'
import { ErrorBoundary } from './components/ErrorBoundary'
import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { Navigation } from './components/Navigation'
import { MyWork } from './components/MyWork'
import { ScrollToTop } from './components/ScrollToTop'
import { SideRail } from './components/SideRail'
import { Work } from './components/Work'

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <Navigation />
      <main id="main" tabIndex={-1} className="outline-none">
        <ErrorBoundary>
          <Hero />
        </ErrorBoundary>
        {/* Everything after the hero uses the light, enterprise theme */}
        <div className="theme-light">
        <ErrorBoundary>
          <About />
        </ErrorBoundary>
        <ErrorBoundary>
          <MyWork />
        </ErrorBoundary>
        <ErrorBoundary>
          <Work />
        </ErrorBoundary>
        <ErrorBoundary>
          <Contact />
        </ErrorBoundary>
        </div>
      </main>
      <Footer />
      <SideRail />
      <ScrollToTop />
    </MotionConfig>
  )
}
