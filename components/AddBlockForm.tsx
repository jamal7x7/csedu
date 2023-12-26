'use client'

import React, {
  Suspense,
  useRef,
  useState,
  useEffect,
  useOptimistic,
} from 'react'

import { useAtom } from 'jotai'
import { Button } from '@/components/ui/button'
import { PlusCircle } from 'lucide-react'

import { editSwitch } from '@/app/utils/adminEditSwitchAtom'

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

import AddChapterButton from '@/components/addChapterButton'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { formBlockSchema, TformBlockSchema } from '@/lib/types'

import {
  addBlockAction,
  addTitleAction,
  addTitleAction2,
} from '@/actions/actions'
import { Skeleton } from './ui/skeleton'
import { H1, H3 } from './Typography/Typography'
import ChapterLink from './ChapterLink'

const AddBlockForm = ({
  allBlocks,
  chapterId,
}: {
  allBlocks: any
  chapterId: string
}) => {
  // const addTitleActionWithLevelId = addTitleAction.bind(null, chapterId)
  const addBlockActionWithChapterId = addBlockAction.bind(null, chapterId)

  const [showAddTitle, setShowAddTitle] = useState(false)
  const [editOnOff] = useAtom(editSwitch)

  const [zodErrors, setZodErrors] = useState({})

  const form = useForm<TformBlockSchema>({
    resolver: zodResolver(formBlockSchema),
    defaultValues: {
      content: '',
    },
  })
  const clientAddBlockAction = async (formData: FormData) => {
    form.reset()

    const errorResponse = await addBlockActionWithChapterId(formData)
    // console.log(errorResponse)
    const result = formBlockSchema.safeParse(errorResponse)

    console.log(JSON.stringify(result, null, 2))
    if (!result.success) {
      //output error message
      // console.log(result.error.issues)

      result.error.issues.forEach((issue) => {
        setZodErrors({ [issue.path[0]]: issue.message })
        // console.log(JSON.stringify(zodErrors, null, 2))
      })
    }
  }

  const showAddHideForm = editOnOff && showAddTitle

  return (
    <>
      {/* {allBlocks?.map((content: any) => (
        <Block content={content} chapterId={chapterId} />
      ))} */}
      {showAddHideForm && (
        <Form {...form}>
          <form action={clientAddBlockAction} className='space-y-8'>
            <FormField
              control={form.control}
              name='content'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder='Contenue' {...field} />
                  </FormControl>

                  <FormDescription></FormDescription>
                  <FormMessage />
                  <FormMessage>
                    {Object.keys(zodErrors).length !== 0 && zodErrors?.content}
                    {JSON.stringify(form.formState.errors.content, null, 2)}
                  </FormMessage>
                </FormItem>
              )}
            />
            <AddChapterButton />
          </form>
        </Form>
      )}

      {editOnOff && (
        <Button
          onClick={() => setShowAddTitle(!showAddTitle)}
          size={'lg'}
          variant='outline'
        >
          {!showAddTitle && <PlusCircle className='mr-2 h-4 w-4' />}
          {!showAddTitle ? 'Ajouter un block' : 'Cancel'}
        </Button>
      )}
    </>
  )
}

export default AddBlockForm

const Block = ({ content, chapterId }: { content: any; chapterId: any }) => {
  return <div>{content.content}</div>
}
