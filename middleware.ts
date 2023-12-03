// import { NextResponse } from 'next/server'

// import { isLoggedIn } from '@/lib/isloggedin'

// // const logger = async () => {
// //   return await isLoggedIn()
// // }
// // isLoggedIn()
// export function middleware(request: Request) {
//   // let isLoggedIn = true
//   // if (!isLoggedIn && request.url ==="http://localhost:3000/profile") {return NextResponse, redirect (new URL("/", request. url)) ;/ }
//   // return NextResponse.next();
//   if (true) {
//     return NextResponse.next()
//   }
//   return NextResponse.redirect(new URL('/studentDashboard', request.url))
// }

// export const config = {
//   matcher: ['/pro', '/levels/units'],
// }

export { default } from 'next-auth/middleware'
// import { withAuth } from 'next-auth/middleware'

// export default withAuth(
//   // `withAuth` augments your `Request` with the user's token.
//   function middleware(req) {
//     console.log(req.nextauth.token)
//   },
//   {
//     callbacks: {
//       authorized: ({ token }) => token?.role === 'admin',
//     },
//   }
// )

export const config = { matcher: ['/levels/units0'] }
