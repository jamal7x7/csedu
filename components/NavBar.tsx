import Link from 'next/link'
import * as React from 'react'

import { cn } from '@/lib/utils'
// import { Icons } from "@/components/icons"

import { DarkLightMode } from '@/components/darkLightMode'
import { ModeToggle } from '@/components/modeToggle'

// import { getSession, signOut, useSession } from 'next-auth/react'

import { deleteAllTitleAction } from '@/actions/actions'
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import { AdminEditSwitch } from './AdminEditSwitch'
import LoginLogout from './LoginLogout'
import { SidebarToggle } from './SidebarToggle'
import { Small } from './Typography/Typography'
import { Button } from './ui/button'
import { Separator } from './ui/separator'

export const NavBar = async (params: any) => {
  const session = await getServerSession(authOptions)
  let isLoggedIn = session?.user
  const isAdmin = session?.user?.role == ('ADMIN' || 'TEACHER')
  // const isStudent = session?.user.role == 'STUDENT'

  return (
    <header className=' w-full '>
      <div className='fixed flex justify-between p-2  top-0 z-20 w-full  border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
        <div className='flex justify-center items-center   sm:pl-2 md:pl-8 lg:pl-12 '>
          {/* <SidebarToggle /> */}
          <Link className='font-extrabold mr-8' href='/'>
            cslab
          </Link>
          {/* <Separator className='mx-4' orientation='vertical' /> */}
          {isLoggedIn && isAdmin && (
            <>
              <Link className=' mx-4 ' href='/teacherDashboard/mainDashView'>
                <Small className='font-semibold hover:text-foreground'>
                  Dashboard
                </Small>
              </Link>
              <Link
                className=' mx-4    '
                href={
                  `/studentDashboard/levels/${params.levelId}/chapters/1/test`
                }
              >
                <Small className='font-semibold hover:text-foreground'>
                  Test
                </Small>
              </Link>
              <Link
                className=' mx-4    '
                href={
                  "/logo"
                }
              >
                <Small className='font-semibold hover:text-foreground'>
                  Logo
                </Small>
              </Link>
            </>
          )}
          {isLoggedIn && !isAdmin && (
            <>
              <Link className=' mx-4    ' href='/studentDashboard'>
                <Small className='font-semibold hover:text-foreground'>
                  Dashboard
                </Small>
              </Link>
              <Link
                className=' mx-4    '
                href={
                  "/levels"
                }
              >
                <Small className='font-semibold hover:text-foreground'>
                  Activités 

                </Small>
              </Link>
              {/* <Link
                className=' mx-4    '
                href={
                  `/studentDashboard/levels/${params.levelId}/chapters/1/test`

                  // t.number
                }
              >
                <Small className='font-semibold hover:text-foreground'>
                  Test
                </Small>
              </Link> */}
            </>
          )}
        </div>
        <div className='flex justify-between gap-2 sm:pr-2 md:pr-8 lg:pr-12'>
          {isLoggedIn && session?.user?.role == ('ADMIN' || 'TEACHER') && (
            <AdminEditSwitch
              levelId={params.levelId}
              // chapterId={params.chapterId}
            />
          )}

          <LoginLogout />
          <DarkLightMode />
        </div>
      </div>
      <div className='fixed scroll-watcher h-[1px] w-full top-[52px] z-50 bg-slate-400 dark:bg-slate-500/50 origin-left' />
    </header>
  )
}
