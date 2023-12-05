'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { addTitleAction } from '@/actions/actions'

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

import { useAtom } from 'jotai'
import { editSwitch } from '@/app/utils/adminEditSwitchAtom'

const formSchema = z.object({
  title: z.string().min(1, {
    message: 'Unit title must be at least 1 characters.',
  }),
})

import { Button } from '@/components/ui/button'
import { Heading1, PlusCircle } from 'lucide-react'
import React, { Children, PropsWithChildren, useState } from 'react'
import db from '@/lib/db'
import { EditSwitch } from '@/components/EditSwitch'

const AddChapter = ({ levelId }: { levelId: string }) => {
  const [showAddTitle, setShowAddTitle] = useState(false)
  const [editOnOff, setEditonoff] = useAtom(editSwitch)
  // console.log(props.params.levelId)
  const addTitleActionWithLevelId = addTitleAction.bind(null, levelId)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "Titre de l'unite",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    setShowAddTitle(!showAddTitle)
    // console.log(values)
  }

  return (
    <>
      {/* <EditSwitch /> */}

      {showAddTitle && editOnOff && (
        <div>
          <Form {...form}>
            <form
              action={addTitleActionWithLevelId}
              // onSubmit={form.handleSubmit(onSubmit)}
              className='space-y-8'
            >
              <FormField
                control={form.control}
                name='title'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Titre de l'unite</FormLabel>
                    <FormControl>
                      <Input placeholder="Titre de l'unite" {...field} />
                    </FormControl>
                    {/* <FormDescription>unitTitle</FormDescription> */}
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className='w-full' type='submit'>
                Submit
              </Button>
            </form>
          </Form>
        </div>
      )}

      {editOnOff && (
        <Button
          onClick={() => setShowAddTitle(!showAddTitle)}
          size={'lg'}
          variant='outline'
        >
          <PlusCircle className='mr-2 h-4 w-4' />
          Ajouter un chapitre
        </Button>
      )}
    </>
  )
}

export default AddChapter
