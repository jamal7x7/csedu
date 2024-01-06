// // import { students } from '@/app/utils/studentsDB2'
// import { NextResponse } from 'next/server'
// import db from '@/lib/db'

// // export function GET(_: Request, res: NextResponse) {
// //   // console.log(res.params.id)
// //   // console.log(process.env.SECRET)
// //   const { id } = res.params
// //   return NextResponse.json({ result: 'your id is: ' + id })
// // }

// // get specific user
// export async function GET(req: Request, res: any) {
//   const { userId: sId } = await res.params
//   // console.log('students', students)
//   const allUsers = await db.user.findUnique({
//     where: {
//       id: sId,
//     },
//   })
//   // const student = students.filter((s) => s.studentId == sId)

//   const data = allUsers
//   console.log('our api student', allUsers)
//   return NextResponse.json({ allUsers }, { status: 200 })
// }

// //login student
// export async function POST(req: Response, res: any) {
//   let { username, password } = await req.json()
//   const { userId: sId } = await res.params

//   const userDB = await db.user.findUnique({
//     where: {
//       id: Number(sId),
//     },
//   })

//   const { username: uUsername, password: uPassword } = userDB

//   // const { username: sUsername, password: sPassword } = allUsers?.find(
//   //   (s) => s.studentId == sId
//   // )
//   if (username == uUsername && password == uPassword) {
//     return NextResponse.json({ result: 'Successfully logged in!!!' })
//   } else if (!uUsername || !password) {
//     return NextResponse.json({ result: 'please fill all the input fileds' })
//   } else {
//     return NextResponse.json({ result: 'Invalid Credentials' })
//   }
// }
