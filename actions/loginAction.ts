'use server'

import { wait } from '@/app/utils/wait'
import { TLoginSchema, loginSchema } from '@/lib/types'

export const loginAction = async (values: TLoginSchema) => {
  //   await wait(2000)
  console.log('From login action file ==========>', values)

  const validatedFields = loginSchema.safeParse(values)

  let zodErrors = {}
  if (!validatedFields.success) {
    validatedFields.error.issues.forEach((issue) => {
      zodErrors = { ...zodErrors, [issue.path[0]]: issue.message }
      //   console.log(zodErrors)
    })

    // return values
    return { error: 'error with fields' }
  }
  return { success: 'sent!' }
}
