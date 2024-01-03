import { NextResponse } from 'next/server'
import { students } from '@/app/utils/studentsDB2'
import fs from 'fs'
import { signUpSchema, TSignUpSchema } from '@/lib/types'
import { ZodError } from 'zod'
import { db } from '@/db'
import { profile, student, user, User } from '@/db/schema/user'

import { hash } from 'bcrypt'

//get all users
export async function GET(req: Request, res: NextResponse) {
  const data = user
  return NextResponse.json({ data: data })
}

//create a new student

export async function POST(req: Request, res: NextResponse) {
  let dataReq: any = await req.json()
  console.log('students route=============', dataReq)
  const result = signUpSchema.safeParse(dataReq)
  let zodErrors = {}

  if (!result.success) {
    result.error.issues.forEach((issue) => {
      zodErrors = { ...zodErrors, [issue.path[0]]: issue.message }
    })
  } else {
    let {
      userId,
      firstName,
      lastName,
      email,
      username,
      password,
      createdAt,
      updatedAt,
      classCode,
      studentNumber,
    } = dataReq

    const allUsers = await db.query.user.findMany()
    // console.dir(allUsers, { depth: null })

    const hashedPassword = await hash(password, 10)

    const newuser = await db
      .insert(user)
      .values({
        id: userId,
        role: 'STUDENT',
        firstName,
        lastName,
        email,
        username,
        password: hashedPassword,
        createdAt,
        updatedAt,
      })
      .returning()
      .catch((err: any) => {
        // console.log('err: ', JSON.stringify(err, null, 2))
        zodErrors = { ...zodErrors, err: err }
      })
    const newProfile = await db
      .insert(profile)
      .values({
        userId: newuser[0]?.id,
      })
      .returning()
      .catch((err: any) => {
        // console.log('err: ', JSON.stringify(err, null, 2))
        zodErrors = { ...zodErrors, err: err }
      })
    const newStudent = await db
      .insert(student)
      .values({
        profileId: newProfile[0]?.id,
        studentNumber: Number(studentNumber),
        classCode,
      })
      .returning()
      .catch((err: any) => {
        // console.log('err: ', JSON.stringify(err, null, 2))
        zodErrors = { ...zodErrors, err: err }
      })

    //====================================================
    return NextResponse.json(
      Object.keys(zodErrors).length > 0
        ? { errors: zodErrors, message: 'error' }
        : { newuser, seccess: 'Student created succussfully!', ok: true },
      { status: 201 }
    )
  }
}
