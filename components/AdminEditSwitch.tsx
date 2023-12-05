'use client'

import { useAtom } from 'jotai'
import { editSwitch } from '@/app/utils/adminEditSwitchAtom'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { Switch } from '@/components/ui/switch'
import { toast } from '@/components/ui/use-toast'
import { Toggle } from '@/components/ui/toggle'
import { ClipboardEdit } from 'lucide-react'

const FormSchema = z.boolean().default(false)

export const AdminEditSwitch = () => {
  // const form = useForm<z.infer<typeof FormSchema>>({
  //   resolver: zodResolver(FormSchema),
  //   defaultValues: {
  //     // onOff: true,
  //   },
  // })

  const [editoOnOff, setEditOnOff] = useAtom(editSwitch)

  function onSubmit(data: z.infer<typeof FormSchema>) {
    setEditOnOff((prev) => !prev)
    // toast({
    //   title: 'You submitted the following values:',
    //   description: (
    //     <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
    //       <code className='text-white'>{JSON.stringify(data, null, 2)}</code>
    //     </pre>
    //   ),
    // })
  }

  return (
    <div className='flex items-center'>
      <Toggle
        onPressedChange={onSubmit}
        variant='outline'
        aria-label='Toggle italic'
      >
        <ClipboardEdit className='h-[1.2rem] w-[1.2rem] ' />
        {/* Edit */}
      </Toggle>
      {/* <Switch onCheckedChange={onSubmit} /> */}
    </div>
  )
}
