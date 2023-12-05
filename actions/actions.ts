'use server'
import { revalidatePath, revalidateTag } from 'next/cache'
import { redirect } from 'next/navigation'
import db from '@/lib/db'

export const addTitleAction = async (levelId: string, formData: FormData) => {
  const title = formData.get('title') as string

  // console.log('=========>', JSON.stringify(title, null, 2))

  const allTitles = await db.chapter?.findMany({
    where: {
      level: 1,
    },
  })
  // console.log('All Titles: ', allTitles)
  // console.dir(allUsers, { depth: null })

  await db.chapter
    .create({
      data: {
        title: title,
        unitId: 2,
        // level: 1,
        level: Number(levelId),
      },
    })
    .catch((err) => {
      console.log('err: ', JSON.stringify(err, null, 2))
      // zodErrors = { ...zodErrors, err: err }
    })

  // Post new Todo to our mock database
  //  await axios.post('http://localhost:3000/api/todos', newTodoBody)
  // Refetch Todo's
  //   revalidateTag('allTitles')
  revalidatePath('/')
  // Redirect them back to the Homepage
  //   redirect('/')
}
