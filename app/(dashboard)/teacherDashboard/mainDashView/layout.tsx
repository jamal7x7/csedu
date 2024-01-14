'use client'
// import { Metadata } from 'next'
import Image from 'next/image'

import { Separator } from '@/components/ui/separator'
import { SidebarNav } from '@/components/sidebar-nav'
import { showSidebar } from '@/app/utils/adminEditSwitchAtom'
import { useAtom } from 'jotai'
import { SidebarToggle } from '@/components/SidebarToggle'
import { AnimatePresence, motion, useCycle } from 'framer-motion'

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable'
import { ScrollArea } from '@/components/ui/scroll-area'

interface SettingsLayoutProps {
  children: React.ReactNode
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  const [sidebarOnOff] = useAtom(showSidebar)
  const [onOff, setOnOff] = useCycle(false, true)
  return (
    // <ScrollArea>
    <div className='  flex p-4   items-center justify-center '>{children}</div>
    // </ScrollArea>
  )
}
