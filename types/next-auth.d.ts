import NextAuth from 'next-auth'

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  type Role = 'ADMIN' | 'USER'

  interface User {
    username: string
    role: Role
  }

  interface Session {
    user: User & {
      username: string
      role: Role
    }
    token: {
      username: string
    }
  }
}

// declare module 'next-auth/jwt' {
//   interface User {
//     usernames: string
//   }
//   // type UserId = string
//   interface JWT {
//     // id: UserId
//     username: User
//   }
// }
