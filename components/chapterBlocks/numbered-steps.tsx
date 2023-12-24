import React, { ReactNode } from 'react'
import { H3, H4, Large, P } from '../Typography/Typography'
import { cn } from '@/lib/utils'

const NumberedSteps = ({
  counter,
  children,
}: {
  counter: number
  children: ReactNode
}) => {
  return (
    <div>
      <div className='grid grid-cols-[auto_1fr] grid-rows-[auto_1fr]  gap-x-4 gap-y-1'>
        <div className='bg-slate-800 w-8 h-8 col-span-1 row-span-1 grid place-content-center p-4 rounded-full mt-1'>
          {counter}
        </div>
        <div className='  flex  justify-start items-center  '>
          <Large className='text-card-foreground/90'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti
            {/* temporibus rem aliquam dicta eaque ex officia, hic error illo!
            Voluptas explicabo quae aspernatur illum saepe ducimus officia
            labore quos sit? */}
          </Large>
        </div>
        <div className='  grid grid-cols-[1fr_auto_1fr]    '>
          <div className='col-span-1 col-start-2   w-[2px]    bg-slate-500/40 '></div>
        </div>
        <div className='  flex  justify-start items-center  py-4 '>
          <P className='text-muted-foreground/95'>{children}</P>
        </div>
      </div>
    </div>
  )
}

export default NumberedSteps

export const NumStepItem = ({
  step,
  children,
}: {
  step: string
  children: ReactNode
}) => {
  return (
    <>
      {/* <div className='[&>h3]:step steps mb-12 ml-4 border-l pl-8 [counter-reset:step] first:mt-0 last:mb-0 '> */}
      {/* <h3 className='font-heading mt-8 scroll-m-20 text-xl font-semibold tracking-tight'> */}
      <Large className='large text-card-foreground  my-8 scroll-m-20    first:mt-0 last:mb-0'>
        {step}
      </Large>
      <div className='text-muted-foreground'>{children}</div>
    </>
  )
}
export const NumSteps = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div>
      <div
        ref={ref}
        className={cn(
          '[&>h3]:step steps mb-12 ml-4 border-l pl-8 [counter-reset:step]',
          className
        )}
      >
        {props.children}
      </div>
    </div>
  )
})
