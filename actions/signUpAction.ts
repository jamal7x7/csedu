'use server'

import { wait } from '@/app/utils/wait'
import {
  TPairSignUpSchema,
  TSignUpSchema,
  pairSignUpSchema,
  signUpSchema,
} from '@/lib/types'
import { db } from '@/db'
import { asc, eq, desc, Placeholder, SQL } from 'drizzle-orm'
import { Profile, Student, profile, student, user } from '@/db/schema/user'
import { hash } from 'bcrypt'

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

export const pairSignUpAction = async (values: TPairSignUpSchema) => {
  console.log('🚀 ~ pairSignUpAction ~ values:', values)

  const validatedFields = pairSignUpSchema.safeParse(values)
  // console.log('🚀 ~ pairSignUpAction ~ validatedFields:', validatedFields)

  let zodErrors = {}
  if (!validatedFields.success) {
    validatedFields.error.issues.forEach((issue) => {
      zodErrors = { ...zodErrors, [issue.path[0]]: issue.message }
      //   console.log(zodErrors)
    })

    // return values
    return { error: 'error with fields' }
  }

  const validPair1 = validatedFields.data?.pair1 as string
  const validPair2 = validatedFields.data?.pair2 as string
  const validPairpass = validatedFields.data?.pairpass as string

  // console.log('🚀 ~ pairSignUpAction ~ pairName:', pairName)

  const student1: Student | undefined = await db.query.student.findFirst({
    where: (student, { eq }) => eq(student.id, Number(validPair1)),
  })
  // let profile1: any = {}
  // if (student1) {
  //   profile1 = await db.query.profile.findFirst({
  //     where: (profile, { eq }) => eq(profile.id, student1?.profileId),
  //   })
  // }
  // let user1: any = {}
  // if (profile1) {
  //   user1 = await db.query.user.findFirst({
  //     where: (user, { eq }) => eq(user.id, profile1?.profileId),
  //   })
  // }

  const student2: Student | undefined = await db.query.student.findFirst({
    where: (student, { eq }) => eq(student.id, Number(validPair2)),
  })
  // let profile2: any = {}
  // if (student2) {
  //   profile2 = await db.query.profile.findFirst({
  //     where: (profile, { eq }) => eq(profile.id, student2?.profileId),
  //   })
  // }
  // let user2: any = {}
  // if (profile2) {
  //   user2 = await db.query.user.findFirst({
  //     where: (user, { eq }) => eq(user.id, profile2?.profileId),
  //   })
  // }

  const pairName = [student1?.massarNumber, student2?.massarNumber]
    .toSorted()
    .join('_&_')

  const existing = await db.query.user.findFirst({
    where: (user, { eq }) => eq(user.username, pairName),
  })
  const existingPair = await db.query.user.findMany({
    where: (user, { eq }) => eq(user.role, 'STUDENTS_PAIR'),
  })

  const up = existingPair
    .map((pair) => {
      return pair.username.split('_&_')
    })
    .flat()
  console.log('🚀 ~ up ~ up:', up)

  if (student1?.massarNumber && up.includes(student1?.massarNumber)) {
    return { error: student1?.massarNumber + ': est deja inscrit!' }
  }
  if (student2?.massarNumber && up.includes(student2?.massarNumber)) {
    return { error: student2?.massarNumber + ': est deja inscrit!' }
  }

  if (existing) return { error: 'already exists' }
  const hashedPassword = await hash(validPairpass, 10)

  const newuser = await db
    .insert(user)
    .values({
      role: 'STUDENTS_PAIR',
      username: pairName,
      password: hashedPassword,
    })
    .returning()
    .catch((err: any) => {
      // console.log('err: ', JSON.stringify(err, null, 2))
      zodErrors = { ...zodErrors, err: err }
    })
  console.log('🚀 ~ pairSignUpAction ~ newuser:', newuser)

  return { success: 'sent!' }
}

export const getStudentsAction = async (classCode: string) => {
  const allClassStudent = await db.query.student.findMany({
    where: eq(student.classCode, classCode),
  })

  const allUsers = await db.query.user.findMany({
    where: (user, { eq }) => eq(user.role, 'STUDENT'),

    with: {
      profile: {
        with: {
          student: true,
        },
      },
    },
  })

  const usersSorted = allUsers
    .filter((s) => s.profile.student.classCode === classCode)
    .sort((a, b) => {
      if (a.profile.student.studentClassNumber === null) {
        return 0
      }
      if (b.profile.student.studentClassNumber === null) {
        return 0
      }

      return (
        a.profile.student.studentClassNumber -
        b.profile.student.studentClassNumber
      )
    })

  // console.dir(usersSorted, { depth: null })
  // console.log('🚀 ~ getStudentsAction ~ allClassStudent:', allClassStudent)
  // return allClassStudent

  return usersSorted
}
