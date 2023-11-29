import { users } from '@/app/utils/db'
import { NextResponse } from 'next/server'

// export function GET(_: Request, res: NextResponse) {
//   // console.log(res.params.id)
//   // console.log(process.env.SECRET)
//   const { id } = res.params
//   return NextResponse.json({ result: 'your id is: ' + id })
// }

// get specific user
export async function GET(req: Request, res: NextResponse) {
  const { id } = await res.params
  const user = users.filter((user) => user.id == id)
  const data = user
  return NextResponse.json({ data }, { status: 200 })
}

//Login
