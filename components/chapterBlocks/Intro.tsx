import React, { ReactComponentElement } from 'react'

import { cn } from '@/lib/utils'
import { H2, H3, H4, Large, Small } from '../Typography/Typography'

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('rounded-lg border bg-card text-card-foreground ', className)}
    {...props}
  />
))
Card.displayName = 'Card'

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />
))
CardContent.displayName = 'CardContent'

const Intro = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <Card
      ref={ref}
      className={cn(
        ' flex flex-col items-center justify-between 2xl:px-24   p-8   rounded-3xl border border-muted/5 bg-muted/50 dark:bg-muted/20 text-card-foreground shadow-sm',
        className
      )}
    >
      <div className='w-full pb-4  flex items-start justify-start'>
        {/* <Badge variant='outline'> */}
        <div className='flex items-center  '>
          <div className='w-2 h-2 mr-2 rounded-full '></div>
          <Large className='text-card-foreground/80'>INTRODUCTION</Large>
        </div>
        {/* </Badge> */}
      </div>
      <Card className=' bg-transparent  border-0  transition-all'>
        {/* <CardHeader className=' pt-0 pb-2 px-2  flex-col items-start'>Le Reseau </CardHeader> */}
        {/* <Divider className='my-4'/> */}
        <CardContent className='p-2'>
          {/* <p className='text-default-500 '> */}
          <Small className=''>{props.children}</Small>
          {/* </p> */}
        </CardContent>
        {/* <Separator className='my-4' /> */}
      </Card>
    </Card>
  )
})

Intro.displayName = 'Intro'

export default Intro
