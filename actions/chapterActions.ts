'use server'
import { revalidatePath, revalidateTag } from 'next/cache'
import { redirect } from 'next/navigation'

import { Chapter, section } from '@/db/schema/unit'
import { db } from '@/db'
import { block, chapter } from '@/db/schema/unit'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { formBlockSchema, formChapterTitleSchema } from '@/lib/types'
import { useOptimistic } from 'react'
import { Blocks } from 'lucide-react'
import { count, eq } from 'drizzle-orm'

type ChapterTitle = {
  title: string
}

export const addChapterAction = async (levelId: string, data: ChapterTitle) => {
  // console.log('formData =========>', JSON.stringify(data, null, 2))

  //first we extract the { title: 'your title' } data object form formData
  // const extractedFormData = Object.fromEntries(formData.entries())
  // console.log(
  //   'extractedFormData =========>',
  //   JSON.stringify(extractedFormData, null, 2)
  // )

  const formAndLevelIdData = { ...data, level: levelId }
  // console.log('formAndLevelIdData =========>', formAndLevelIdData)
  // await new Promise((resolve) => setTimeout(resolve, 2000))

  //then we pass the { title: 'your title' }  object through zod applying the formSchema
  const result = formChapterTitleSchema.safeParse(formAndLevelIdData)
  // console.log('result of zoding ------>', JSON.stringify(result, null, 2))
  revalidatePath('/')
  let zodErrors = {}
  if (!result.success) {
    //output error message
    // console.log(result.error.issues)

    result.error.issues.forEach((issue) => {
      zodErrors = { ...zodErrors, [issue.path[0]]: issue.message }
      console.log(zodErrors)
    })
    // return { message: 'hello world', errors: zodErrors }
    // return
    return data
  }

  const validTitle = result.data?.title as string
  const validLevel = result.data?.level as number

  const prevChapters = await db.query.chapter?.findMany({
    where: eq(chapter.level, Number(levelId)),
  })

  const addedChapter = await db
    .insert(chapter)
    .values({
      title: validTitle,
      level: validLevel,
      order: prevChapters.length + 1,
    })
    .returning({ id: chapter.id })

  const addedSection = await db
    .insert(section)
    .values({
      chapterId: addedChapter[0].id,
      // level: Number(levelId),
      order: 0,
    })
    .returning()

  // const content = result.data?.content as string

  // console.log('=========>', JSON.stringify(title, null, 2))

  revalidatePath('/')
  // return { message: 'All Done!' }
}
