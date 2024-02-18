import { eq } from 'drizzle-orm'
// import { PrismaClientInitializationError } from '@prisma/client/runtime/library'
import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
// import GithubProvider from 'next-auth/providers/github'
// import { PrismaAdapter } from '@auth/prisma-adapter'
import { DrizzleAdapter } from '@auth/drizzle-adapter'
// import db from './db'
import { db } from '@/db'
import { compare } from 'bcrypt'
import { User, user } from '@/db/schema/users'
import { Adapter } from 'next-auth/adapters'

export const authOptions: NextAuthOptions = {
  adapter: DrizzleAdapter(db) as Adapter,
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/api/auth/signin',
    error: '/api/auth/signin',
  },
  // Configure one or more authentication providers
  providers: [
    // GithubProvider({
    //   clientId: process.env.GITHUB_ID,
    //   clientSecret: process.env.GITHUB_SECRET,
    // }),
    // ...add more providers here
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'Credentials',
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'jsmith' },
        password: { label: 'Password', type: 'password' },
        role: { label: 'Role', type: 'text', placeholder: 'jsmith' },

        pair1: { label: 'Pair1', type: 'text', placeholder: 'jamal' },
        pair2: { label: 'Pair2', type: 'text', placeholder: 'kamal' },
        pairpass: { label: 'PairPass', type: 'password' },
      },

      async authorize(credentials): Promise<any> {
        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid.
        // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        // You can also use the `req` object to obtain additional parameters
        // (i.e., the request IP address)

        if (!credentials?.username || !credentials?.password) {
          return null
        }

        const existingUser = await db.query.user.findFirst({
          where: eq(user.username, credentials?.username),
        })

        if (!existingUser) {
          return null
        }

        const passwordMatch = await compare(
          credentials.password,
          existingUser.password
        )

        if (!passwordMatch) {
          return null
        }

        return {
          id: `${existingUser.id}`,
          username: existingUser.username,
          role: existingUser.role,
        }

        //=====================================================++++++++++==========+++++++++++===========

        //=====================================================++++++++++==========+++++++++++===========
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // console.log('token and user from auth', token, user)
      if (user) {
        return { ...token, username: user.username, role: user.role }
      }
      return token
    },

    async session({ session, token }) {
      // console.log('session and user from auth', session, token)

      return {
        ...session,
        user: { ...session.user, username: token.username, role: token.role },
      }
    },
  },
}

//   const res = await fetch(`/app/api/students/${req.params.studentId}`, {
//     method: 'POST',
//     body: JSON.stringify(credentials),
//     headers: { 'Content-Type': 'application/json' },
//   })
//   const user = await res.json()

//   // If no error and we have user data, return it
//   if (res.ok && user) {
//     return user
//   }
//   // Return null if user data could not be retrieved
//   return null
