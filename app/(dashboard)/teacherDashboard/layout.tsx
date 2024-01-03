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
    title: 'Profile',
    href: '/teacherDashboard',
  },
  {
    title: 'Account',
    href: '/levels/1/chapters/1',
  },
  {
    title: 'Appearance',
    href: '/levels/1',
  },
  {
    title: 'Notifications',
    href: '/levels/2',
  },
  {
    title: 'Display',
    href: '/levels/3',
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
      className='min-h-[200px] w-full mt-[52px] '
    >
      <ResizablePanel
        collapsible
        // maxSize={100}
        // minSize={10}
        // collapsedSize={15}
        defaultSize={15}
        className='      '
      >
        <div className='top-8   p-4 h-full   mt-16  '>
          <SidebarNav items={sidebarNavItems} />
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={85}>
        {/* <ScrollArea> */}
        <div className='flex min-h-fit  items-center justify-center  '>
          {children}
        </div>
        {/* </ScrollArea> */}
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}
