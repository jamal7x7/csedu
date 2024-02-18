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
import { formChapterTitleSchema, TFormChapterTitleSchema } from '@/lib/types'

import { addTitleAction, addTitleAction2 } from '@/actions/actions'
import { addChapterAction } from '@/actions/chapterActions'
import { Skeleton } from './ui/skeleton'
import { H1, H3 } from './Typography/Typography'
import ChapterLink from './ChapterLink'
import { Chapter } from '@/db/schema/units'

const AddChapterLinkForm = ({
  allChapters,
  levelId,
}: {
  allChapters: Partial<Chapter>[]
  levelId: string
}) => {
  const addTitleActionWithLevelId = addChapterAction.bind(null, levelId)
  const addTitleActionWithLevelId2 = addTitleAction2.bind(null, levelId)

  const [optimisticAllChapters, addOptimisticAllChapters] = useOptimistic(
    allChapters,
    (state: Partial<Chapter>[], newChapter: Partial<Chapter>) => {
      console.log(state)
      return [...state, newChapter]
    }
  )

  const [showAddTitle, setShowAddTitle] = useState(false)
  const [editOnOff] = useAtom(editSwitch)

  const [zodErrors, setZodErrors] = useState({})

  const form = useForm<TFormChapterTitleSchema>({
    resolver: zodResolver(formChapterTitleSchema),
    defaultValues: {
      title: '',
    },
  })
  const clientAddTitleAction: () => void = form.handleSubmit(async (data) => {
    form.reset()
    addOptimisticAllChapters({
      title: data.title,
      level: Number(levelId),
      order: optimisticAllChapters ? optimisticAllChapters.length + 1 : 1,
    })
    const errorResponse = await addTitleActionWithLevelId(data)
    // console.log(errorResponse)
    const result = formChapterTitleSchema.safeParse(errorResponse)

    console.log('sssssucess : ', JSON.stringify(result, null, 2))
    if (!result.success) {
      //output error message
      // console.log(result.error.issues)

      result.error.issues.forEach((issue) => {
        setZodErrors({ [issue.path[0]]: issue.message })
        // console.log(JSON.stringify(zodErrors, null, 2))
      })
    }
  })
  const onSubmit = async (formData: FormData) => {
    const errorResponse = await addTitleActionWithLevelId2(formData)
    // console.log(errorResponse)
    const result = formChapterTitleSchema.safeParse(errorResponse)

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
      {optimisticAllChapters?.map((chapter) => (
        <ChapterLink chapter={chapter} levelId={levelId} />
      ))}
      {showAddHideForm && (
        <Form {...form}>
          <form
            action={clientAddTitleAction}
            // onSubmit={form.handleSubmit(onSubmit)}
            className='space-y-8'
          >
            <FormField
              control={form.control}
              name='title'
              render={({ field }) => (
                <FormItem>
                  {/* <div>
                    <H3> {form?.control._fields.title?._f.value}</H3>
                  </div> */}
                  <FormLabel>Titre de l'unite</FormLabel>

                  <FormControl>
                    <Input placeholder="Titre de l'unite" {...field} />
                  </FormControl>

                  <FormDescription></FormDescription>
                  <FormMessage />
                  {/* <FormMessage>
                    {Object.keys(zodErrors).length !== 0 && zodErrors?.title}
                    {JSON.stringify(form.formState.errors.title, null, 2)}
                  </FormMessage> */}
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
          {!showAddTitle ? 'Ajouter un chapitre' : 'Cancel'}
        </Button>
      )}
    </>
  )
}

export default AddChapterLinkForm

// const clientAddTitleAction = async (values: unknown) => {
//   //construct new Title object
//   const newFormData = {
//     title: values.title,
//   }

//   //reset form
//   //client side validation
//   const result = formSchema.safeParse(values)

//   let zodErrors = {}
//   if (!result.success) {
//     //output error message
//     console.log(result.error.issues[0].message)

//     result.error.issues.forEach((issue) => {
//       // zodErrors = { ...zodErrors, [issue.path[0]]: issue.message }
//       setZodErrors({ ...zodErrors, [issue.path[0]]: issue.message })
//     })
//     // return zodErrors
//   }

//   const response = await addTitleActionWithLevelId(result.data)
//   if (response?.errors) {
//     console.log(response?.error)
//     // zodErrors = { ...zodErrors, error: response?.errors }
//     setZodErrors({ ...zodErrors, err: 'server error ' })
//     // console.log('server errrrrrrrrror!', JSON.stringify(zodErrors, null, 2))
//     // return zodErrors
//   }

//   // const res = await addTitleActionWithLevelId(result.data)
// }

// const onSubmit = async (values: z.infer<typeof formSchema>) => {
//   clientAddTitleAction(values)
// }
