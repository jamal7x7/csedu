'use server'

import { wait } from '@/app/utils/wait'
import { TSignUpSchema, signUpSchema } from '@/lib/types'

export const signUpAction = async (values: TSignUpSchema) => {
  //   await wait(2000)
  console.log('From login action file ==========>', values)

  const validatedFields = signUpSchema.safeParse(values)

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
