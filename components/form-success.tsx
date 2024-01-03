import { CheckCircle2 } from 'lucide-react'

type FormSuccessMessageProps = {
  message?: string
}

import React from 'react'

const FormSuccuss = ({ message }: FormSuccessMessageProps) => {
  if (!message) return null
  return (
    <div className='mt-8 w-full bg-emerald-500/20  px-3 py-2 rounded-md flex items-center gap-x-2 text-sm text-emerald-500 '>
      <CheckCircle2 className='h-4 w-4 ' />
      <p>{message}</p>
    </div>
  )
}

export default FormSuccuss
