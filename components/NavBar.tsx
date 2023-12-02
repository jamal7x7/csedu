import * as React from 'react'
import Link from 'next/link'

import { cn } from '@/lib/utils'
// import { Icons } from "@/components/icons"

import { ModeToggle } from '@/components/modeToggle'
import { DarkLightMode } from '@/components/darkLightMode'

// import { getSession, signOut, useSession } from 'next-auth/react'

import { Button } from './ui/button'
import LoginLogout from './LoginLogout'

export const NavBar = () => {
  return (
    <header className='fixed flex justify-between p-2  top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
      {/* ==============================Login============================== */}
      <LoginLogout />
      {/* ==============================Login-end============================== */}
      <DarkLightMode />
    </header>
  )
}
