import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { ArrowUp } from 'lucide-react'
import { useState } from 'react'

export function ScrollToTop() {
  const { scrollY } = useScroll()
  const [show, setShow] = useState(false)
  useMotionValueEvent(scrollY, 'change', (y) => setShow(y > 700))

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          whileHover={{ y: -3 }}
          whileTap={{ scale: 0.94 }}
          onClick={() => window.scrollTo({ top: 0 })}
          aria-label="Scroll to top"
          className="fixed bottom-5 right-5 z-50 flex min-[1340px]:hidden h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-[#0f172a] text-white shadow-[0_15px_40px_-15px_rgb(0_0_0/0.6)] transition-colors hover:bg-[#1e293b]"
        >
          <ArrowUp className="h-5 w-5" aria-hidden="true" />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
