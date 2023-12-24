import { cn } from '@/lib/utils'
import React from 'react'

// export function TypographyH1() {
//   return (
//     <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
//       Taxing Laughter: The Joke Tax Chronicles
//     </h1>
//   )
// }

const H1 = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLElement>>(
  ({ className, ...props }, ref) => (
    <h1
      ref={ref}
      className={cn(
        'scroll-m-20 text-4xl font-black tracking-normal ',
        className
      )}
      {...props}
    />
  )
)
H1.displayName = 'H1'

// export function TypographyH2() {
//   return (
//     <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
//       The People of the Kingdom
//     </h2>
//   )
// }

const H2 = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLElement>>(
  ({ className, ...props }, ref) => (
    <h2
      ref={ref}
      className={cn(
        'scroll-m-20 border-b pb-2 text-3xl  font-semibold tracking-tight first:mt-0',
        className
      )}
      {...props}
    />
  )
)
H2.displayName = 'H2'

// export function TypographyH3() {
//   return (
//     <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
//       The Joke Tax
//     </h3>
//   )
// }

const H3 = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLElement>>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn(
        'scroll-m-20 text-2xl font-semibold tracking-tight',
        className
      )}
      {...props}
    />
  )
)
H3.displayName = 'H3'

// export function TypographyH4() {
//   return (
//     <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
//       People stopped telling jokes
//     </h4>
//   )
// }
const H4 = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLElement>>(
  ({ className, ...props }, ref) => (
    <h4
      ref={ref}
      className={cn(
        'scroll-m-20 text-xl font-semibold tracking-tight [&:not(:first-child)]:mt-16',
        className
      )}
      {...props}
    />
  )
)
H4.displayName = 'H4'

// export function TypographyP() {
//   return (
//     <p className="leading-7 [&:not(:first-child)]:mt-6">
//       The king, seeing how much happier his subjects were, realized the error of
//       his ways and repealed the joke tax.
//     </p>
//   )
// }
const P = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLElement>>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn('leading-7 mt-8 [&:not(:first-child)]:mt-0', className)}
      {...props}
    />
  )
)
P.displayName = 'P'

// export function TypographyBlockquote() {
//   return (
//     <blockquote className="mt-6 border-l-2 pl-6 italic">
//       "After all," he said, "everyone enjoys a good joke, so it's only fair that
//       they should pay for the privilege."
//     </blockquote>
//   )
// }
const Blockquote = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLElement>
>(({ className, ...props }, ref) => (
  <blockquote
    ref={ref}
    className={cn('mt-6 border-l-2 pl-6 italic', className)}
    {...props}
  />
))
Blockquote.displayName = 'Blockquote'

// export function TypographyList() {
//   return (
//     <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
//       <li>1st level of puns: 5 gold coins</li>
//       <li>2nd level of jokes: 10 gold coins</li>
//       <li>3rd level of one-liners : 20 gold coins</li>
//     </ul>
//   )
// }
const List = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  ({ className, ...props }, ref) => (
    <ul
      className={cn('my-6 ml-6 list-disc [&>li]:mt-2', className)}
      {...props}
    />
  )
)
List.displayName = 'List'

// export function TypographyInlineCode() {
//   return (
//     <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
//       @radix-ui/react-alert-dialog
//     </code>
//   )
// }
const InlineCode = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement>
>(({ className, ...props }, ref) => (
  <code
    ref={ref}
    className={cn(
      'relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold',
      className
    )}
    {...props}
  />
))
InlineCode.displayName = 'InlineCode'

// export function TypographyLead() {
//   return (
//     <p className="text-xl text-muted-foreground">
//       A modal dialog that interrupts the user with important content and expects
//       a response.
//     </p>
//   )
// }
const Lead = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('text-xl text-muted-foreground', className)}
    {...props}
  />
))
Lead.displayName = 'Lead'

// export function TypographyLarge() {
//   return (
//     <div className="text-lg font-semibold">Are you sure absolutely sure?</div>
//   )
// }
const Large = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('text-lg font-semibold', className)}
    {...props}
  />
))
Large.displayName = 'Large'

// export function TypographySmall() {
//   return (
//     <small className="text-sm font-medium leading-none">Email address</small>
//   )
// }
const Small = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  ({ className, ...props }, ref) => (
    <small
      ref={ref}
      className={cn(
        'text-default-500 text-muted-foreground font-medium leading-none',
        className
      )}
      {...props}
    />
  )
)
Small.displayName = 'Small'

// export function TypographyMuted() {
//   return (
//     <p className="text-sm text-muted-foreground">Enter your email address.</p>
//   )
// }
const Muted = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('text-sm text-muted-foreground', className)}
    {...props}
  />
))
Muted.displayName = 'Muted'

export {
  H1,
  H2,
  H3,
  H4,
  P,
  Blockquote,
  List,
  InlineCode,
  Lead,
  Large,
  Small,
  Muted,
}
