'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { SideBarHandle } from './SideBarHandle'

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href: string
    title: string
    icon?: React.ReactNode
  }[]
}

export function SidebarNav({ className, items, ...props }: SidebarNavProps) {
  const pathname = usePathname()

  return (
    <nav
      className={cn(
        // 'flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1',
        'flex flex-col  space-x-0 pt-40 px-4  space-y-2 bg-muted/40 h-[calc(100vh-53px-8px)]   rounded-xl ',
        className
      )}
      {...props}
    >
      <SideBarHandle />
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            buttonVariants({ variant: 'ghost' }),
            pathname === item.href
              ? 'bg-muted hover:bg-muted text-foreground stroke-foreground '
              : 'hover:bg-muted-foreground/10 hover:text-muted-foreground text-muted-foreground stroke-muted-foreground/80 ',
            'justify-start px-0 py-4 '
          )}
        >
          <div className='flex items-center justify-center w-12 h-12  p-4  rounded-sm  '>
            {item.icon}
          </div>
          <div className='ml-0  overflow-hidden text-ellipsis '>
            {item.title}
          </div>
        </Link>
      ))}
    </nav>
  )
}
