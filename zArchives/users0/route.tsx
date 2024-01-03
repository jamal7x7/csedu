import { NextResponse } from 'next/server'
import { users } from '@/app/utils/db'

export async function POST(req: Request, res: NextResponse) {
  let { name, age, email } = await req.json()
  if (!name || !age || !email) {
    return NextResponse.json(
      { Error: 'required field not found!', ok: false },
      { status: 400 }
    )
  }

  return NextResponse.json(
    { seccess: 'data send succussfully', ok: true },
    { status: 201 }
  )
}

//get all users
export async function GET(req: Request, res: NextResponse) {
  const data = await users
  return NextResponse.json({ data: data })
}
