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

const Exemple = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      // 'rounded-lg border  text-card-foreground  mt-4 py-4  bg-transparent  border-neutral-200 dark:border-neutral-800 shadow-sm',
      '  2xl:px-0  py-8 ml-0  p-6   rounded-3xl border border-muted/5  text-card-foreground ',
      className
    )}
    {...props}
  >
    <Badge variant='outline'>
      <div className='flex items-center text-sm uppercase font-bold text-muted-foreground'>
        <div className='w-2 h-2 mr-2 rounded-full bg-slate-400'></div>
        Exemple
      </div>
    </Badge>

    {props.children}
  </div>
))
Exemple.displayName = 'Exemple'

const ExempleContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      ' mt-4 py-4 p-6 bg-transparent  border-slate-200 dark:border-slate-800 rounded-lg border  text-muted-foreground ',
      className
    )}
    {...props}
  />
))
ExempleContent.displayName = 'ExempleContent'

// const Exemple2 = ({ children }: { children: React.ReactNode }) => {
//   return (
//     <div className=' flex flex-col items-start justify-between 2xl:px-24 py-8 ml-20  w-full  '>
//       <Badge variant='outline'>
//         <div className='flex items-center text-sm uppercase font-bold text-default-600'>
//           <div className='w-2 h-2 mr-2 rounded-full bg-slate-400'></div>
//           Exemple
//         </div>
//       </Badge>
//       {/* <Card className='mt-4 py-4  bg-transparent  border-neutral-200 dark:border-neutral-800 shadow-sm'> */}
//       {/* <CardHeader className='pb-0 pt-2 px-4 flex-col items-start'> */}
//       {/* <p className='text-tiny uppercase font-bold'>Exemple</p> */}
//       {/* </CardHeader> */}
//       {/* <CardContent className='overflow-visible py-2'>
//           <small className='text-default-500'>{children}</small>
//         </CardContent> */}
//       {/* <CardContent className='overflow-visible py-2'>
//           <small className='text-default-500'>{children}</small>
//         </CardContent> */}
//       {children}
//       {/* </Card> */}
//     </div>
//   )
// }

export { Exemple, ExempleContent }
