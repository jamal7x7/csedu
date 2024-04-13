'use client'
// import { Metadata } from 'next'
import Image from 'next/image'

import { showSidebar } from '@/app/utils/adminEditSwitchAtom'
import { SidebarToggle } from '@/components/SidebarToggle'
import { SidebarNav } from '@/components/sidebar-nav'
import { Separator } from '@/components/ui/separator'
import { AnimatePresence, motion, useCycle } from 'framer-motion'
import { useAtom } from 'jotai'

import { ImperativePanelGroupHandle } from 'react-resizable-panels'

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import {
  BookUser,
  CalendarDays,
  Home,
  LibrarySquare,
  List,
  Plus,
} from 'lucide-react'
import { useEffect, useRef } from 'react'

// export const metadata: Metadata = {
//   title: 'Teacher Dashboard',
//   description: 'Teacher Dashboard',
// }

const sidebarNavItems = [
  {
    title: 'Main',
    href: '/teacherDashboard/mainDashView',
    icon: <Home className='stroke-inherit' />,
  },
  {
    title: 'All Levels',
    href: '/teacherDashboard/myLevels',
    icon: <LibrarySquare className='stroke-inherit' />,
  },
  {
    title: 'My Time Table',
    href: '/teacherDashboard/myTimeTable',
    icon: <CalendarDays className='stroke-inherit' />,
  },
  {
    title: 'Mes Élèves',
    href: '/teacherDashboard/myStudents',
    icon: <BookUser className='stroke-inherit' />,
  },
  {
    title: 'List',
    href: '/teacherDashboard/studentList',
    icon: <List className='stroke-inherit' />,
  },
]

interface SettingsLayoutProps {
  children: React.ReactNode
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  const [showLeftPanel] = useAtom(showSidebar)
  const [onOff, setOnOff] = useCycle(false, true)
  const ref = useRef<ImperativePanelGroupHandle>(null)
  const resetLayout = () => {
    const panelGroup = ref.current
    if (panelGroup) {
      // Reset each Panel to 50% of the group's width
      panelGroup.setLayout([30, 70])
    }
  }
  // ref.current?.setLayout([30, 70])
  useEffect(() => {
    // resetLayout()
    // ref.current?.setLayout([15, 85])
  }, [])

  // if (showLeftPanel) {
  //   resetLayout()
  // }

  return (
    <ResizablePanelGroup
      // ref={ref}
      autoSaveId='conditional'
      direction='horizontal'
      className='min-h-full w-full mt-[52px] fixed '
    >
      {/* <AnimatePresence> */}
      {showLeftPanel && (
        <>
          <ResizablePanel
            id='left'
            order={1}
            collapsible
            // maxSize={15}
            // minSize={10}
            // collapsedSize={15}
            defaultSize={15}
            className=''
          >
            <div className='top-8   min-h-full p-0  '>
              <SidebarNav items={sidebarNavItems} />
            </div>
          </ResizablePanel>
          <ResizableHandle />
        </>
      )}
      {/* </AnimatePresence> */}
      <ResizablePanel
        id='center'
        order={2}
        // defaultSize={85}
        // className='overflow-y-auto'
      >
        {/* <ScrollArea> */}
        <div className='flex justify-center left-0 top-0 overflow-scroll h-full '>
          {children}
        </div>
        {/* </ScrollArea> */}
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}
