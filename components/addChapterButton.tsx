'use client'
import React from 'react'
import { Button } from '@/components/ui/button'
import { useFormStatus } from 'react-dom'
import { Loader2 } from 'lucide-react'

const AddChapterButton = () => {
  const { pending, data } = useFormStatus()
  // console.log(data)
  return (
    <Button disabled={pending} className='w-full'>
      Ajouter
      {/* {pending ? (
        <>
          <Loader2 className='mr-2 h-4 w-4 animate-spin' />
          adding: "{data.get('title')}"
        </>
      ) : (
        // 'adding...'
        'Add'
      )} */}
    </Button>
  )
}

export default AddChapterButton
