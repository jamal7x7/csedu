'use server'
import { revalidatePath, revalidateTag } from 'next/cache'
import { redirect } from 'next/navigation'
import db from '@/lib/db'
import { db as ddb } from '@/db'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { formBlockSchema, formSchema, TformSchema } from '@/lib/types'
import { useOptimistic } from 'react'

// const formSchema = z.object({
//   title: z.string().min(10, {
//     message: 'Unit title must be at least 1 characters!!!',
//   }),
// })

export const addTitleAction = async (levelId: string, formData: FormData) => {
  // console.log('formData =========>', formData)

  //first we extract the { title: 'your title' } data object form formData
  const extractedFormData = Object.fromEntries(formData.entries())
  console.log('extractedFormData =========>', extractedFormData)

  const formAndLevelIdData = { ...extractedFormData, levelId }
  console.log('formAndLevelIdData =========>', formAndLevelIdData)

  //then we pass the { title: 'your title' }  object through zod applying the formSchema
  const result = formSchema.safeParse(formAndLevelIdData)
  console.log('result of zoding ------>', JSON.stringify(result, null, 2))

  let zodErrors = {}
  if (!result.success) {
    //output error message
    console.log(result.error.issues)

    result.error.issues.forEach((issue) => {
      zodErrors = { ...zodErrors, [issue.path[0]]: issue.message }
      console.log(zodErrors)
    })
    // return { message: 'hello world', errors: zodErrors }
    // return
    return extractedFormData
  }

  const title = result.data?.title as string
  const level = result.data?.levelId as number

  // console.log('=========>', JSON.stringify(title, null, 2))
  // await new Promise((resolve) => setTimeout(resolve, 3000))

  const allTitles = await db.chapter?.findMany({
    where: {
      level: level,
    },
  })

  await db.chapter
    .create({
      data: {
        title: title,
        unitId: 1,
        level: level,
        number: allTitles.length + 1,
      },
    })
    .catch((err) => {
      console.log('error from Prisma db: ', JSON.stringify(err, null, 2))
      // zodErrors = { ...zodErrors, err: err }
    })

  revalidatePath('/')
  // redirect('/levels/1')
  // return { message: 'All Done!' }
}

export const addTitleAction2 = async (levelId: string, formData: unknown) => {
  console.log('formData =========>', formData)

  //first we extract the { title: 'your title' } data object form formData
  // const extractedFormData = Object.fromEntries(formData.entries())
  // console.log('extractedFormData =========>', extractedFormData)

  const formAndLevelIdData = { ...formData, levelId }
  console.log('formAndLevelIdData =========>', formAndLevelIdData)

  //then we pass the { title: 'your title' }  object through zod applying the formSchema
  const result = formSchema.safeParse(formAndLevelIdData)
  console.log('result of zoding ------>', JSON.stringify(result, null, 2))

  let zodErrors = {}
  if (!result.success) {
    //output error message
    console.log(result.error.issues)

    result.error.issues.forEach((issue) => {
      zodErrors = { ...zodErrors, [issue.path[0]]: issue.message }
      console.log(zodErrors)
    })
    // return { message: 'hello world', errors: zodErrors }
    // return
    return formData
  }
  // await new Promise((resolve) => setTimeout(resolve, 3000))

  const title = result.data?.title as string
  const level = result.data?.levelId as number

  // console.log('=========>', JSON.stringify(title, null, 2))

  const allTitles = await db.chapter?.findMany({
    where: {
      level: level,
    },
  })

  await db.chapter
    .create({
      data: {
        title: title,
        unitId: 2,
        level: level,
        number: allTitles.length + 1,
      },
    })
    .catch((err) => {
      console.log('error from Prisma db: ', JSON.stringify(err, null, 2))
      // zodErrors = { ...zodErrors, err: err }
    })

  revalidatePath('/')
  // return { message: 'All Done!' }
}

export const addBlockAction = async (chapterId: any, formData: unknown) => {
  console.log('formData =========>', formData)

  //first we extract the { title: 'your title' } data object form formData
  const extractedFormData = Object.fromEntries(formData.entries())
  // console.log('extractedFormData =========>', extractedFormData)

  const formAndLevelIdData = { ...extractedFormData, chapterId }
  console.log('formAndLevelIdData =========>', formAndLevelIdData)

  //then we pass the { title: 'your title' }  object through zod applying the formSchema
  const result = formBlockSchema.safeParse(formAndLevelIdData)
  console.log('result of zoding ------>', JSON.stringify(result, null, 2))

  let zodErrors = {}
  if (!result.success) {
    //output error message
    console.log(result.error.issues)

    result.error.issues.forEach((issue) => {
      zodErrors = { ...zodErrors, [issue.path[0]]: issue.message }
      console.log(zodErrors)
    })
    // return { message: 'hello world', errors: zodErrors }
    // return
    return formData
  }
  // await new Promise((resolve) => setTimeout(resolve, 3000))

  const content = result.data?.content as string
  const chapter = result.data?.chapterId as number

  // console.log('=========>', JSON.stringify(title, null, 2))

  const allBlocks = await db.block?.findMany({
    // where: {
    //   // id: 1,
    // },
  })
  const theChapter = await db.chapter?.findMany({
    where: {
      id: chapter,
    },
  })

  await db.block
    ?.create({
      data: {
        content: content,
        sectionId: 1,
        // type: 'DEF',
        order: allBlocks.length + 1,
        // section: {
        //   connect: {
        //     id: chapter,
        //   },
        // },
      },
    })
    .catch((err) => {
      console.log('error from Prisma db: ', JSON.stringify(err, null, 2))
      // zodErrors = { ...zodErrors, err: err }
    })

  revalidatePath('/')
  // return { message: 'All Done!' }
}

export const deleteAllTitleAction = async (levelId: any, formData: unknown) => {
  // levelId: string,
  // formData: FormData
  //first we extract the { title: 'your title' } data object form formData
  const extractedFormData = Object.fromEntries(formData.entries())
  // console.log('extractedFormData =========>', extractedFormData)

  const formAndLevelIdData = { ...extractedFormData, levelId }
  console.log('formAndLevelIdData to  delete =========>', formAndLevelIdData)

  //then we pass the { title: 'your title' }  object through zod applying the formSchema
  // const result = formBlockSchema.safeParse(formAndLevelIdData)
  // console.log('result of zoding ------>', JSON.stringify(result, null, 2))

  const allTitles = await db.chapter
    ?.deleteMany({
      where: {
        level: Number(levelId),
      },
    })
    .then(() => console.log('All Titles are Deleted'))
    .catch((err) => {
      console.log('error from Prisma db: ', JSON.stringify(err, null, 2))
      // zodErrors = { ...zodErrors, err: err }
    })

  revalidatePath('/')
  return { message: 'All Titles are Deleted', allTitles: allTitles }
}
