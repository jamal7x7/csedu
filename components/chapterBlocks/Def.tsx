import React, { ReactComponentElement } from 'react'
import {
  //   Card,
  // CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

import { cn } from '@/lib/utils'

const Def = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'flex flex-col items-start justify-between 2xl:px-24   p-8   rounded-3xl border border-muted/50 bg-muted/50 dark:bg-muted/20 text-card-foreground shadow-sm',
      className
    )}
    {...props}
  >
    <div className='w-full pb-4  flex items-start justify-start'>
      <Badge variant='outline' className=''>
        <div className='flex items-center text-sm uppercase font-bold text-default-600'>
          <div className='w-2 h-2 mr-2 rounded-full bg-green-400'></div>
          Definitions
        </div>
      </Badge>
    </div>
    {props.children}
  </div>
))
Def.displayName = 'Def'

const DefContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      ' pt-0 p-6 rounded-lg  hover:bg-green-500/5 hover:border-green-500/20  transition-all border  bg-muted/50 dark:bg-muted/20 text-card-foreground shadow-sm',
      className
    )}
    {...props}
  />
))
DefContent.displayName = 'DefContent'

export { Def, DefContent }
