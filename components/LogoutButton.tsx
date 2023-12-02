'use client'
import React from 'react'
import { Button } from '@/components/ui/button'

import { signOut } from 'next-auth/react'

const LogoutButton = ({ children }: { children: React.ReactNode }) => {
  return (
    <Button
      onClick={() =>
        signOut({
          redirect: true,
          callbackUrl: `${window.location.origin}/studentDashboard`,
        })
      }
    >
      {children}
    </Button>
  )
}

export default LogoutButton
