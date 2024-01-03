'use server'
import { revalidatePath, revalidateTag } from 'next/cache'
import { redirect } from 'next/navigation'

import { Chapter, section, block } from '@/db/schema/unit'
import { db } from '@/db'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { formBlockSchema, formSchema, TformSchema } from '@/lib/types'
import { useOptimistic } from 'react'

import { and, count, eq } from 'drizzle-orm'

export const addBlockActionNew = async (
  thisChapter: Chapter,
  formData: FormData
) => {
  console.log('BLOCK formData  =========>', JSON.stringify(formData, null, 2))
  // const c = formData.getAll('content')
  // const t = formData.get('type')
  console.log(JSON.stringify(formData, null, 2))

  // const rawFormData = {
  //   content: formData.get('content'),
  //   type: formData.get('type'),
  // }
  // console.log(rawFormData)
  //first we extract the { title: 'your title' } data object form formData
  // const extractedFormData = Object.fromEntries(formData.entries())

  // console.log('extractedFormData =========>', extractedFormData)
  // console.log(
  //   'extractedFormData =========>',
  //   JSON.stringify(extractedFormData, null, 2)
  // )

  // const chapterWithBlockContent = { ...extractedFormData, ...thisChapter }
  const chapterWithBlockContent = { ...formData, ...thisChapter }
  // console.log('data >>>>>>>>>> =========>', chapterWithBlockContent)
  // let l = chapterWithBlockContent?.sections?.length

  //then we pass the { title: 'your title' }  object through zod applying the formSchema
  const result = formBlockSchema.safeParse(chapterWithBlockContent)
  // console.log('result of zoding ------>', JSON.stringify(result, null, 2))

  let zodErrors = {}
  if (!result.success) {
    //output error message
    // console.log(result.error.issues)

    result.error.issues.forEach((issue) => {
      zodErrors = { ...zodErrors, [issue.path[0]]: issue.message }
      // console.log(zodErrors)
    })
    // return { message: 'hello world', errors: zodErrors }
    // return
    return formData
  }
  // await new Promise((resolve) => setTimeout(resolve, 3000))

  const content = result.data?.content as string
  const chapterId = result.data?.chapterId as number
  const validatedType = result.data?.type as string

  const sec = await db.select().from(section)
  let secLenght = sec.length - 1
  // if (chapterWithBlockContent.type === 'H2') {
  //   secLenght = secLenght + 1
  //   const addSection = await db
  //     .insert(section)
  //     .values({
  //       chapterId: thisChapter.id,

  //       order: sec[secLenght].order + 1,
  //     })
  //     .returning()
  // }

  // if validatedType === 'H2' insert a new section with section.order incremented
  let n = 0
  let addedSection

  if (validatedType === 'H2') {
    console.log('Validated, create a new section', validatedType)
    n++
    addedSection = await db
      .insert(section)
      .values({
        chapterId: thisChapter.id,
        // level: Number(levelId),
        order: 1,
      })
      .returning()
  }

  const section0 = await db
    .select()
    .from(section)
    .where(and(eq(section.order, 0), eq(section.chapterId, thisChapter.id)))

  // const sectionZero = await db.query.section.findFirst({
  //   where: and(eq(section.order, 0), eq(section.chapterId, chapterId)),
  // })

  const addedBlock = await db
    .insert(block)
    .values({
      content: chapterWithBlockContent.content,
      type: chapterWithBlockContent.type,
      sectionId:
        validatedType === 'H2'
          ? addedSection[addedSection.length - 1].id
          : section0[0].id,
    })
    .returning()

  revalidatePath('/')
  // return { message: 'All Done!' }
}
