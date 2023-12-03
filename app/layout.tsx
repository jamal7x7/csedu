import type { Metadata } from 'next'
import { Inter as FontSans } from 'next/font/google'
import './globals.css'

import { cn } from '@/lib/utils'
import { ThemeProvider } from '@/components/theme-provider'
import { NavBar } from '@/components/NavBar'
import { ModeToggle } from '@/components/modeToggle'
import { Toaster } from '@/components/ui/toaster'

import { Button, Breadcrumbs, BreadcrumbItem } from '@nextui-org/react'
import Provider from '@/components/provider'
import { isLoggedIn } from '@/lib/isloggedin'

// const inter = Inter({ subsets: ['latin'] })
export const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
})

export const metadata: Metadata = {
  title: 'CSEdu',
  description: 'Generated by create next app',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      {/* <body className={inter.className}> */}
      {/* <header>
      </header> */}
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          fontSans.variable
        )}
      >
        <Provider>
          <ThemeProvider
            attribute='class'
            defaultTheme='system'
            enableSystem
            disableTransitionOnChange
          >
            <NavBar />

            {children}
            <Toaster />
          </ThemeProvider>
        </Provider>
      </body>
    </html>
  )
}
