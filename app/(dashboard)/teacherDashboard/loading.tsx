// 'use client'

import { Loader2 } from 'lucide-react'

export default function Loading() {
  // Or a custom loading skeleton component
  return (
    <div className='flex justify-center items-center min-h-screen w-full '>
      <Loader2 className='animate-spin' />
    </div>
  )
}
