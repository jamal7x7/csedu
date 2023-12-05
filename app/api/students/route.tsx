import { NextResponse } from 'next/server'
import { students } from '@/app/utils/studentsDB2'
import fs from 'fs'
import { signUpSchema, TSignUpSchema } from '@/lib/types'
import { ZodError } from 'zod'
import db from '@/lib/db'

import { hash } from 'bcrypt'

//get all users
export async function GET(req: Request, res: NextResponse) {
  const data = students
  return NextResponse.json({ data: data })
}

//create a new student

export async function POST(req: Request, res: NextResponse) {
  let dataReq: any = await req.json()
  // console.log('students route', data)
  const result = signUpSchema.safeParse(dataReq)
  let zodErrors = {}

  if (!result.success) {
    result.error.issues.forEach((issue) => {
      zodErrors = { ...zodErrors, [issue.path[0]]: issue.message }
    })
  } else {
    let {
      studentId,
      level,
      classCode,
      studentNumber,
      firstName,
      lastName,
      email,
      username,
      massarNumber,
      password,
      group,
      createdAt,
      updatedAt,
    } = dataReq

    {
      // console.log(dataReq)
      // let studentsArray = students
      // const existingStudent = studentsArray?.find((s) => s.username == username)
      // if (existingStudent?.username == username) {
      //   return NextResponse.json(
      //     { message: "nom d'utilisateur deja pris!", ok: false },
      //     { status: 400 }
      //   )
      // }
      // studentsArray.push({
      //   studentId,
      //   level,
      //   classCode,
      //   studentNumber,
      //   firstName,
      //   lastName,
      //   email,
      //   username,
      //   massarNumber,
      //   password,
      //   group,
      //   createdAt,
      //   updatedAt,
      // })
      // // extract just the student array from the updated data
      // const updatedstudentsArray = studentsArray
      // //convert updated data to JSON string
      // const updatedData = JSON.stringify(updatedstudentsArray, null, 2)
      // // return NextResponse.json({ updatedData }, { status: 200 })
      // // write the updated data to a JSON string
      // fs.writeFileSync(
      //   './app/utils/studentsDB2.ts',
      //   `export const students = ${updatedData}`,
      //   'utf-8'
      // )
    }
    //====================================================

    const allUsers = await db.student.findMany({})
    // console.dir(allUsers, { depth: null })

    const hashedPassword = await hash(password, 10)
    const user = await db.student
      .create({
        data: {
          studentId,
          level,
          classCode,
          studentNumber,
          firstName,
          lastName,
          email,
          username,
          massarNumber,
          password: hashedPassword,
          group,
          createdAt,
          updatedAt,
        },
      })
      .catch((err) => {
        // console.log('err: ', JSON.stringify(err, null, 2))
        zodErrors = { ...zodErrors, err: err }
      })

    // console.log('Created user: ', user)
    //====================================================
    return NextResponse.json(
      Object.keys(zodErrors).length > 0
        ? { errors: zodErrors, message: 'error' }
        : { user, seccess: 'Student created succussfully!', ok: true },
      { status: 201 }
    )
  }
}
