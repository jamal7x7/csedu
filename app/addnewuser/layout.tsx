import type { Metadata } from 'next'

import { cn } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'CSEdu Register',
  description: 'Register',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div
      className={cn(
        'grid  justify-center min-h-screen w-full  bg-background font-sans antialiased'
      )}
    >
      <div className='w-screen'>{children}</div>
    </div>
  )
}
