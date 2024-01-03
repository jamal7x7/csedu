import { AlertTriangle } from 'lucide-react'

type FormErrorMessageProps = {
  message?: string
}

import React from 'react'

const FormError = ({ message }: FormErrorMessageProps) => {
  if (!message) return null
  return (
    <div className='w-full bg-destructive/20  px-3 py-2 rounded-md flex items-center gap-x-2 text-sm text-destructive '>
      <AlertTriangle className='h-4 w-4 ' />
      <p>{message}</p>
    </div>
  )
}

export default FormError
