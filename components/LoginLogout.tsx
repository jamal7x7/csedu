import React from 'react'

import Link from 'next/link'
import { DarkLightMode } from './darkLightMode'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

// app/page.tsx

import { Button } from '@/components/ui/button'
import LogoutButton from '@/components/LogoutButton'
import { deleteAllTitleAction } from '@/actions/actions'

const LoginLogout = async () => {
  const session = await getServerSession(authOptions)
  let isLoggedIn = session?.user
  return (
    <main className='flex   items-center justify-between gap-2'>
      {isLoggedIn ? (
        //   <Link href='/' passHref>
        <>
          <LogoutButton>Log out</LogoutButton>
        </>
      ) : (
        //   </Link>

        <>
          <Button size='sm' variant={'outline'} className=''>
            <Link href='/login' passHref>
              Login
            </Link>
          </Button>

          <Button size='sm' className=''>
            <Link href='/addnewuser' passHref>
              Register
            </Link>
          </Button>
        </>
      )}
    </main>
  )
}

export default LoginLogout
