import { NextResponse } from 'next/server'

// const isLoggedIn: boolean = false
// import { getServerSession } from 'next-auth'
// import { authOptions } from '@/lib/auth'

export function middleware(request: Request) {
  // const session = await getServerSession(authOptions)
  // let isLoggedIn = session?.user
  let isLoggedIn = true
  // if (!isLoggedIn && request.url ==="http://localhost:3000/profile") {return NextResponse, redirect (new URL("/", request. url)) ;/ }
  // return NextResponse.next();

  if (isLoggedIn) {
    return NextResponse.next()
  }
  return NextResponse.redirect(new URL('/studentDashboard', request.url))
}

export const config = {
  matcher: ['/pro'],
}
