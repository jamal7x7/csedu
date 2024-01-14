'use client'

import { useAtom } from 'jotai'
import { editSwitch, showSidebar } from '@/app/utils/adminEditSwitchAtom'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { Switch } from '@/components/ui/switch'
import { toast } from '@/components/ui/use-toast'
import { Toggle } from '@/components/ui/toggle'
import {
  ArrowLeftToLine,
  ArrowRightFromLine,
  BookOpen,
  ClipboardEdit,
  Pencil,
  SidebarCloseIcon,
  SidebarOpenIcon,
  Trash2,
} from 'lucide-react'
import { deleteAllTitleAction } from '@/actions/actions'
import { Button } from '@/components/ui/button'
import { isLoggedIn } from '@/lib/isloggedin'

const FormSchema = z.boolean().default(false)

export const SidebarToggle = () => {
  // const form = useForm<z.infer<typeof FormSchema>>({
  //   resolver: zodResolver(FormSchema),
  //   defaultValues: {
  //     // onOff: true,
  //   },
  // })

  // const [editOnOff, setEditOnOff] = useAtom(editSwitch)
  const [sidebarOnOff, setsidebarOnOff] = useAtom(showSidebar)

  function onSubmit(data: z.infer<typeof FormSchema>) {
    // setEditOnOff((prev) => !prev)
    setsidebarOnOff((prev) => !prev)
  }

  return (
    <div className='flex items-center gap-8'>
      {true && (
        <Toggle
          onPressedChange={onSubmit}
          size={'sm'}
          className=''
          pressed={false}
          defaultPressed
          variant='default'
          aria-label='Toggle italic'
        >
          {!!sidebarOnOff ? (
            <ArrowLeftToLine className='h-[1.2rem] w-[1.2rem]  p-[0.2rem] transition-all ' />
          ) : (
            // <SidebarCloseIcon className='h-[1.2rem] w-[1.2rem]   transition-all ' />
            <ArrowRightFromLine className=' h-[1.2rem] w-[1.2rem] p-[0.2rem]  transition-all ' />
            // <SidebarOpenIcon className=' h-[1.2rem] w-[1.2rem]   transition-all ' />
          )}
          {/* Edit */}
        </Toggle>
      )}

      {/* <Switch onCheckedChange={onSubmit} /> */}
    </div>
  )
}
