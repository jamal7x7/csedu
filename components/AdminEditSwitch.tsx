'use client'

import { useAtom } from 'jotai'
import { editSwitch } from '@/app/utils/adminEditSwitchAtom'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { Switch } from '@/components/ui/switch'
import { toast } from '@/components/ui/use-toast'
import { Toggle } from '@/components/ui/toggle'
import { BookOpen, ClipboardEdit, Pencil, Trash2 } from 'lucide-react'
import { deleteAllTitleAction } from '@/actions/actions'
import { Button } from '@/components/ui/button'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

const FormSchema = z.boolean().default(false)

export const AdminEditSwitch = (levelId: any) => {
  const deleteAllTitleActionWithID = deleteAllTitleAction.bind(null, levelId)
  // const form = useForm<z.infer<typeof FormSchema>>({
  //   resolver: zodResolver(FormSchema),
  //   defaultValues: {
  //     // onOff: true,
  //   },
  // })

  const handleDeleteAllTitleAction = () => {
    const clientAddBlockAction = async (formData: FormData) => {
      const errorResponse = await deleteAllTitleActionWithID(formData)
      // redirect('/levels/1')
    }
  }

  const [editOnOff, setEditOnOff] = useAtom(editSwitch)

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
    <div className='flex items-center gap-8'>
      {editOnOff && (
        <form action={handleDeleteAllTitleAction}>
          <Button size='sm' variant={'outline'} type='submit'>
            <Trash2
              className='h-[1.2rem] w-[1.2rem] border-rose-500 '
              // color='#ff0000'
              // strokeWidth={1}
            />
            {/* <Trash2 color='#ff0000' strokeWidth={1} /> */}
          </Button>
        </form>
      )}
      <Toggle
        size='sm'
        onPressedChange={onSubmit}
        className=''
        pressed={false}
        defaultPressed
        variant='outline'
        aria-label='Toggle italic'
      >
        {!editOnOff ? (
          <Pencil className='h-[1.2rem] w-[1.2rem]   transition-all ' />
        ) : (
          <BookOpen className=' h-[1.2rem] w-[1.2rem]   transition-all ' />
        )}
        {/* Edit */}
      </Toggle>
      {/* <Switch onCheckedChange={onSubmit} /> */}
    </div>
  )
}
