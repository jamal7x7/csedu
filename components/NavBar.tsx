import * as React from 'react'
import Link from 'next/link'

import { cn } from '@/lib/utils'
// import { Icons } from "@/components/icons"

import { ModeToggle } from '@/components/modeToggle'
import { DarkLightMode } from '@/components/darkLightMode'

// import { getSession, signOut, useSession } from 'next-auth/react'

import { Button } from './ui/button'
import LoginLogout from './LoginLogout'
import { AdminEditSwitch } from './AdminEditSwitch'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { deleteAllTitleAction } from '@/actions/actions'
import { SidebarToggle } from './SidebarToggle'
import { Separator } from './ui/separator'
import { Small } from './Typography/Typography'

export const NavBar = async (params: any) => {
  const session = await getServerSession(authOptions)
  let isLoggedIn = session?.user
  return (
    <header className=' w-full '>
      <div className='fixed flex justify-between p-2  top-0 z-20 w-full  border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
        <div className='flex justify-center items-center   sm:pl-2 md:pl-8 lg:pl-12 '>
          {/* <SidebarToggle /> */}
          <Link className='font-extrabold mr-8' href='/studentDashboard'>
            cslab
          </Link>
          {/* <Separator className='mx-4' orientation='vertical' /> */}
          {isLoggedIn && session?.user.role == ('ADMIN' || 'USER') && (
            <>
              <Link className=' mx-4    ' href='/studentDashboard'>
                <Small className='font-semibold hover:text-foreground'>
                  Dashboard
                </Small>
              </Link>
              <Link
                className=' mx-4    '
                href={
                  '/studentDashboard/levels/' +
                  params.levelId +
                  '/chapters/1/test'

                  // t.number
                }
              >
                <Small className='font-semibold hover:text-foreground'>
                  Test
                </Small>
              </Link>
            </>
          )}
        </div>
        <div className='flex justify-between gap-2 sm:pr-2 md:pr-8 lg:pr-12'>
          {isLoggedIn && session?.user.role == 'ADMIN' && <AdminEditSwitch />}

          <LoginLogout />
          <DarkLightMode />
        </div>
      </div>
      <div className='fixed scroll-watcher h-[1px] w-full top-[52px] z-50 bg-slate-400 dark:bg-slate-500/50 origin-left'></div>
    </header>
  )
}
