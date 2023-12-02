import React from 'react'

import Link from 'next/link'
import { DarkLightMode } from './darkLightMode'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

// app/page.tsx

import { Button } from '@/components/ui/button'
import LogoutButton from '@/components/LogoutButton'

const LoginLogout = async () => {
  const session = await getServerSession(authOptions)
  let isLoggedIn = session?.user
  return (
    <main className='flex   items-center justify-between p-2'>
      <div>
        {isLoggedIn ? (
          //   <Link href='/' passHref>
          <LogoutButton>Log out</LogoutButton>
        ) : (
          //   </Link>

          <>
            <Button variant={'outline'} className=''>
              <Link href='/login' passHref>
                Login
              </Link>
            </Button>

            <Button className=''>
              <Link href='/addnewstudent' passHref>
                Register
              </Link>
            </Button>
          </>
        )}
      </div>
    </main>
  )
}

export default LoginLogout
