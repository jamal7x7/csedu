import { cn } from '@/lib/utils'
import React from 'react'

const Figure = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        'relative   flex flex-col items-center justify-between 2xl:px-24     rounded-3xl border border-muted/80 bg-muted/10 text-card-foreground shadow-sm',
        className
      )}
    >
      {/* <div className='absolute rounded-3xl inset-0 h-full w-full bg-muted/30 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]'></div> */}
      <div className='absolute inset-0 h-full w-full bg-muted/30 bg-[radial-gradient(#80808070_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_10%,transparent_100%)]'></div>
      {/* ======================================SVG========================================= */}

      {props.children}
    </div>
  )
})

export default Figure
