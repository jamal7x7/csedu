// import { students } from '@/app/utils/studentsDB2'
import { NextResponse } from 'next/server'
import db from '@/lib/db'

// export function GET(_: Request, res: NextResponse) {
//   // console.log(res.params.id)
//   // console.log(process.env.SECRET)
//   const { id } = res.params
//   return NextResponse.json({ result: 'your id is: ' + id })
// }

// get specific user
export async function GET(req: Request, res: any) {
  const { studentId: sId } = await res.params
  // console.log('students', students)
  const allUsers = await db.student.findUnique({
    where: {
      studentId: sId,
    },
  })
  // const student = students.filter((s) => s.studentId == sId)

  const data = allUsers
  console.log('our api student', allUsers)
  return NextResponse.json({ allUsers }, { status: 200 })
}

//login student
export async function POST(req: Response, res: any) {
  let { username, password } = await req.json()
  const { studentId: sId } = await res.params

  const studentDB = await db.student.findUnique({
    where: {
      studentId: Number(sId),
    },
  })

  const { username: sUsername, password: sPassword } = studentDB

  // const { username: sUsername, password: sPassword } = allUsers?.find(
  //   (s) => s.studentId == sId
  // )
  if (username == sUsername && password == sPassword) {
    return NextResponse.json({ result: 'Successfully logged in!!!' })
  } else if (!sUsername || !password) {
    return NextResponse.json({ result: 'please fill all the input fileds' })
  } else {
    return NextResponse.json({ result: 'Invalid Credentials' })
  }
}
