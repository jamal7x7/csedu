import { students } from '@/app/utils/studentsDB'
import { NextResponse } from 'next/server'

// export function GET(_: Request, res: NextResponse) {
//   // console.log(res.params.id)
//   // console.log(process.env.SECRET)
//   const { id } = res.params
//   return NextResponse.json({ result: 'your id is: ' + id })
// }

// get specific user
export async function GET(req: Request, res: any) {
  const { studentId: sId } = await res.params
  console.log('students', students)
  const student = students.filter((s) => s.studentId == sId)

  const data = student
  console.log('student', student)
  return NextResponse.json({ data }, { status: 200 })
}

//login student
export async function POST(req: Response, res: any) {
  let { studentNumber, classCode, group, password } = await req.json()
  const { studentId: sId } = await res.params
  console.log(sId)
  console.log(studentNumber, classCode, group, password)

  const {
    studentNumber: sStudentNumber,
    group: sGroup,
    classCode: sClassCode,
    password: sPassword,
  } = students.find((s) => s.studentId == sId)
  if (
    studentNumber == sStudentNumber &&
    group == sGroup &&
    classCode == sClassCode &&
    password == sPassword
  ) {
    console.log(
      studentNumber == sStudentNumber &&
        group == sGroup &&
        classCode == sClassCode &&
        password == sPassword
    )
    return NextResponse.json({ result: 'Successfully logged in!!!' })
  } else if (!studentNumber || !group || !classCode || !password) {
    return NextResponse.json({ result: 'please fill all the input fileds' })
  } else {
    return NextResponse.json({ result: 'Invalid Credentials' })
  }
}
