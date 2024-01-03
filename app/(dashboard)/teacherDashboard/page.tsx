// app/page.tsx

import { Button } from '@/components/ui/button'
import Link from 'next/link'

import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import LoginLogout from '@/components/LoginLogout'
import Levels from '@/app/levels/page'
import { H1, Small } from '@/components/Typography/Typography'
import TimeTable from '@/components/timeTable'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'

export default async function Dashboard() {
  const session = await getServerSession(authOptions)
  // console.log('session from student Dashboard: ', session)

  return (
    <main className='flex  flex-col items-center justify-between h-[100dvh]  w-full '>
      <div className='flex flex-col gap-8  w-full'>
        {session?.user ? (
          <>
            {/* <div className='hidden  mt-4 pb-4 pl-4 md:block'>
              <div className='space-y-0.5'>
                <h2 className='text-2xl font-bold tracking-tight'>Settings</h2>
                <p className='text-muted-foreground'>
                  Manage your account settings and set e-mail preferences.
                </p>
              </div>
            </div> */}
            <div className='p-12 bg-slate-900 flex  items-center justify-center '>
              <TimeTable />
            </div>
            {/* <Separator className='my-0' /> */}
            <div className='p-12 flex  items-center justify-center '>
              <div className='  flex flex-shrink-0 h-20 w-20 items-center justify-center rounded-full dark:bg-slate-800 bg-slate-100  md:h-[72px] md:w-[72px]'>
                {/* <p className='font-bold text-4xl'>2</p> */}
              </div>

              <div className='p-4 flex flex-col items-start justify-between'>
                <Small>
                  Bien venue Prof {' [' + session?.user.role + '] '}
                  <b> {session?.user.username}</b>
                </Small>
                <H1 className='  '>Mon Compte</H1>
                {/* <h1 className=' font-black text-4xl bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500'>Le Réseau Informatique</h1> */}
              </div>
            </div>

            <Levels />
          </>
        ) : (
          <div className='p-12 flex  items-center justify-center mt-16'>
            <div className='flex flex-shrink-0 h-20 w-20 items-center justify-center rounded-full dark:bg-slate-800 bg-slate-100  md:h-[72px] md:w-[72px]'>
              {/* <p className='font-bold text-4xl'>2</p> */}
            </div>

            <div className='p-4 flex flex-col items-start justify-between'>
              <small className='text-default-500'>
                Pour accédez à votre compte
              </small>
              <h1 className=' font-black text-4xl '>Veuillez vous connecter</h1>
              {/* <h1 className=' font-black text-4xl bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500'>Le Réseau Informatique</h1> */}
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
