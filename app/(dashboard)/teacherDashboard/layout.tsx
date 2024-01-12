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

// export const metadata: Metadata = {
//   title: 'Teacher Dashboard',
//   description: 'Teacher Dashboard',
// }

const sidebarNavItems = [
  {
    title: 'Main',
    href: '/teacherDashboard/mainDashView',
  },
  {
    title: 'All Levels',
    href: '/levels',
  },
  {
    title: 'My Time Table',
    href: '/teacherDashboard/myTimeTable',
  },
  {
    title: 'Level 2',
    href: '/teacherDashboard/levels/2',
  },
  {
    title: 'Level 3',
    href: '/teacherDashboard/levels/3',
  },
]

interface SettingsLayoutProps {
  children: React.ReactNode
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  const [sidebarOnOff] = useAtom(showSidebar)
  const [onOff, setOnOff] = useCycle(false, true)
  return (
    <ResizablePanelGroup
      direction='horizontal'
      className='min-h-full w-full mt-[52px] fixed '
    >
      <ResizablePanel
        collapsible
        // maxSize={100}
        // minSize={10}
        // collapsedSize={15}
        defaultSize={15}
        className='      '
      >
        <div className='top-8   p-4 min-h-full   mt-16  '>
          <SidebarNav items={sidebarNavItems} />
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={85} className='overflow-y-auto'>
        <ScrollArea>
          <div className='flex   items-center justify-center '>{children}</div>
        </ScrollArea>
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}
