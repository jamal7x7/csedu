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

  const [optimisticAllBlocks, addOptimisticAllBlocks] = useOptimistic(
    allBlocks,
    (state, newBlock) => {
      if (state == null || undefined) {
        return [newBlock]
      }
      return [...state, newBlock]
    }
  )

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
    addOptimisticAllBlocks({
      content: formData.get('content'),
      chapter: Number(chapterId),
      number: optimisticAllBlocks ? optimisticAllBlocks.length + 1 : 1,
    })
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
  const onSubmit = async (formData: FormData) => {
    const errorResponse = await addBlockActionWithChapterId(formData)
    // console.log(errorResponse)
    const result = formBlockSchema.safeParse(errorResponse)

    // console.log(JSON.stringify(result, null, 2))
    // if (!result.success) {
    //   //output error message
    //   // console.log(result.error.issues)

    //   result.error.issues.forEach((issue) => {
    //     setZodErrors({ [issue.path[0]]: issue.message })
    //     // console.log(JSON.stringify(zodErrors, null, 2))
    //   })
  }

  const showAddHideForm = editOnOff && showAddTitle

  const h3Ref = useRef(null)

  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      // console.log('Mutations:', mutations)
      // console.log('Mutations:', mutations[0].target.textContent)
    })
    // console.log(h3Ref)
    // console.log(d)
    if (h3Ref.current) {
      observer.observe(h3Ref.current, {
        childList: true,
        characterData: true,
        attributes: true,
        subtree: true,
      })
      // console.log('observer', observer)
    }

    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <>
      {/* <AddChapterForm levelId={levelId} form={form} /> */}
      {/* <div className=' bg-slate-400/25 p-4' ref={h3Ref}>
        {' '}
        <h1 contentEditable> </h1>
      </div> */}
      {optimisticAllBlocks?.map((content: any) => (
        <Block content={content} chapterId={chapterId} />
      ))}
      {showAddHideForm && (
        <Form {...form}>
          <form
            action={clientAddBlockAction}
            // onSubmit={form.handleSubmit(onSubmit)}
            className='space-y-8'
          >
            <FormField
              control={form.control}
              name='content'
              render={({ field }) => (
                <FormItem>
                  {/* <div>
                    <H3> {form?.control._fields.title?._f.value}</H3>
                  </div> */}
                  {/* <FormLabel>Contenue de l'unite</FormLabel> */}

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
            {/* <Suspense fallback={'...Please wait'}>
              <Button variant={'outline'} className='w-full' type='submit'>
                Add
              </Button>
            </Suspense> */}
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
