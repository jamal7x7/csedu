import { NextResponse } from 'next/server'
import { students } from '@/app/utils/studentsDB2'
import fs from 'fs'
import { signUpSchema, TSignUpSchema } from '@/lib/types'
import { ZodError } from 'zod'

// type Student = {
//   studentId: number
//   level: number
//   classCode: string
//   studentNumber: number
//   firstName: string
//   lastName: string
//   massarNumber: number
//   password: string
//   group: string
// }

// export async function POST(req: Request, res: NextResponse) {
//   let data = await req.json()
//   console.log(data)
//   let {
//     studentId,
//     studentNumber,
//     firstName,
//     lastName,
//     massarNumber,
//     password,
//   } = data
//   if (
//     // !studentId ||
//     !studentNumber ||
//     !firstName ||
//     !lastName ||
//     // !massarNumber ||
//     !password
//   ) {
//     return NextResponse.json(
//       { Error: 'required field not found!', ok: false },
//       { status: 400 }
//     )
//   }

//   return NextResponse.json(
//     { seccess: 'data send succussfully', ok: true },
//     { status: 201 }
//   )
// }

//get all users
export async function GET(req: Request, res: NextResponse) {
  const data = students
  return NextResponse.json({ data: data })
}

//create a new student

export async function POST(req: Request, res: NextResponse) {
  let data: any = await req.json()
  console.log('dddddddd', data)
  const result = signUpSchema.safeParse(data)
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
      massarNumber,
      password,
      group,
    } = data

    let studentsArray = students

    const existingStudent = studentsArray.find((s) => s.studentId == studentId)

    if (existingStudent?.studentId == studentId) {
      return NextResponse.json(
        { Error: 'Student already exixtinggg!', ok: false },
        { status: 400 }
      )
    }

    studentsArray.push({
      studentId,
      level,
      classCode,
      studentNumber,
      firstName,
      lastName,
      massarNumber,
      password,
      group,
    })

    // if (
    //   //  !level ||
    //   // !classCode ||
    //   // !studentId ||
    //   !studentNumber ||
    //   // !firstName ||
    //   // !lastName ||
    //   // !massarNumber ||
    //   !password ||
    //   !group
    // ) {
    //   return NextResponse.json(
    //     { Error: 'required field not found!', ok: false },
    //     { status: 400 }
    //   )
    // }

    // extract just the student array from the updated data
    const updatedstudentsArray = studentsArray
    //convert updated data to JSON string
    const updatedData = JSON.stringify(updatedstudentsArray, null, 2)
    // return NextResponse.json({ updatedData }, { status: 200 })
    // write the updated data to a JSON string
    fs.writeFileSync(
      './app/utils/studentsDB2.ts',
      `export const students = ${updatedData}`,
      'utf-8'
    )

    return NextResponse.json(
      Object.keys(zodErrors).length > 0
        ? { errors: zodErrors }
        : { seccess: 'Student created succussfully!', ok: true },
      { status: 201 }
    )
  }

  // if (
  //   //  !level ||
  //   // !classCode ||
  //   // !studentId ||
  //   !studentNumber ||
  //   // !firstName ||
  //   // !lastName ||
  //   // !massarNumber ||
  //   !password ||
  //   !group
  // ) {
  //   return NextResponse.json(
  //     { Error: 'required field not found!', ok: false },
  //     { status: 400 }
  //   )
  // }
}
