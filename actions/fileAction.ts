'use server'

import { wait } from '@/app/utils/wait'
import { excelformSchema, TExcelformSchema } from '@/lib/types'

export const fileAction = async (values: TExcelformSchema) => {
  //   await wait(2000)
  console.log('From Excel action file ==========>', values)

  const validatedFields = excelformSchema.safeParse(values)

  let zodErrors = {}
  if (!validatedFields.success) {
    validatedFields.error.issues.forEach((issue) => {
      zodErrors = { ...zodErrors, [issue.path[0]]: issue.message }
      console.log(zodErrors)
    })

    // return values
    return { error: 'error with fields' }
  }
  return { success: 'sent!' }
}
