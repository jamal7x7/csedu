'use client'
// import { Metadata } from 'next'
import Image from 'next/image'

import { showSidebar } from '@/app/utils/adminEditSwitchAtom'
import { SidebarToggle } from '@/components/SidebarToggle'
import { SidebarNav } from '@/components/sidebar-nav'
import { Separator } from '@/components/ui/separator'
import { AnimatePresence, motion, useCycle } from 'framer-motion'
import { useAtom } from 'jotai'

// export const metadata: Metadata = {
//   title: 'Teacher Dashboard',
//   description: 'Teacher Dashboard',
// }

const sidebarNavItems = [
  {
    title: 'Profile',
    href: '/studentDashboard',
  },
  {
    title: 'Account',
    href: '/studentDashboard/levels/1/chapters/1',
  },
  {
    title: 'Appearance',
    href: '/studentDashboard/levels/1',
  },
  {
    title: 'Notifications',
    href: '/studentDashboard/levels/2',
  },
  {
    title: 'Display',
    href: '/studentDashboard/levels/3',
  },
]

interface SettingsLayoutProps {
  children: React.ReactNode
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  const [sidebarOnOff] = useAtom(showSidebar)
  const [onOff, setOnOff] = useCycle(false, true)
  return (
    <>
      {/* <div className='   '> */}
      {/* <div className='hidden  mt-20 pb-16 md:block'> */}
      {/* <div className='space-y-0.5'>
          <h2 className='text-2xl font-bold tracking-tight'>Settings</h2>
          <p className='text-muted-foreground'>
            Manage your account settings and set e-mail preferences.
          </p>
        </div> */}
      {/* <Separator className='my-6' /> */}

      <main className=' grid grid-cols-[minmax(0,1fr)_minmax(0,4fr)]     space-y-8  '>
        {/* <AnimatePresence> */}
        {/* {!sidebarOnOff && ( */}
        {/* {!onOff && (
            <div className=' z-100 fixed'>
              <motion.div
                onClick={() => setOnOff()}
                initial={{ x: '100%' }}
                animate={{ x: 1000 }}
                exit={{ x: '200%' }}
                transition={{
                  type: 'tween',
                  stiffness: 0,
                  duration: 0.2,
                  delay: 0.0,
                }}
                className=' mt-16 items-start bg-yellow-600     flex justify-end'
              >
                <SidebarToggle />
              </motion.div>
            </div>
          )} */}
        {/* // </AnimatePresence> */}
        {/* <AnimatePresence>
            {sidebarOnOff && ( */}
        {/* {onOff && ( */}
        {/* <motion.div animate={{ x: 100 }} transition={{ delay: 0 }}> */}
        {/* <div className=''> */}
        <motion.aside
          onClick={() => setOnOff()}
          // initial={{ x: '-100%' }}
          animate={sidebarOnOff ? 'closed' : 'open'}
          variants={{
            open: { x: 0 },
            closed: { x: '-100%' },
          }}
          // exit={{ x: '-100%' }}
          transition={{ type: 'tween', stiffness: 100, duration: 0.2 }}
          className='z-10 col-span-1 fixed top-0 left-0  h-full    lg:p-4    lg:border-r-[1px]  '
        >
          <div>
            <motion.div
              // animate={sidebarOnOff ? { x: 0 } : { x: '200%' }}
              variants={{
                open: { x: 0 },
                closed: { x: '30%' },
              }}
              transition={{ type: 'tween', stiffness: 100, duration: 0.2 }}
              className=' mt-12 w-52 flex justify-end'
            >
              <SidebarToggle />
            </motion.div>
            <div className='  mt-16  lg:w-full'>
              <SidebarNav items={sidebarNavItems} />
            </div>
          </div>
        </motion.aside>
        {/* </div> */}
        <motion.div
          animate={sidebarOnOff ? 'closed' : 'open'}
          variants={{
            open: { x: '20%', width: '80%' },
            closed: { width: '100%' },
          }}
          transition={{ type: 'tween', stiffness: 100, duration: 0.2 }}
          layout
          className='col-span-2 flex  justify-center items-center w-full'
        >
          {children}
        </motion.div>
      </main>
      {/* </motion.div> */}
      {/* )} */}
      {/* </AnimatePresence> */}
      {/* </div> */}
      {/* </div> */}
    </>
  )
}


function Small({ children }: { children: React.ReactNode }) {
  const xl1 = useCycle(0, 1,  2, 3, 4, 5, 6, 7, 8) 
  for (let i = 0; i < 10; i++) { 
    
  }
  for (let i = 0; i < 10; i++) {}
  //let l1 = 123456789012345
  //hello there?  
}