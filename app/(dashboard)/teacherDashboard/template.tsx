'use client'
import { ScrollArea } from '@/components/ui/scroll-area'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'

const variants = {
  hidden: { opacity: 0, x: 0, y: 16 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: 0, y: -100 },
}

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <AnimatePresence mode='wait'>
      <motion.main
        key={'hello'}
        variants={variants}
        initial='hidden'
        animate='enter'
        exit='exit'
        transition={{ ease: [0.45, 0, 0.55, 1], duration: 0.35 }}
        className='w-full'
      >
        {children}
      </motion.main>
    </AnimatePresence>
  )
}
