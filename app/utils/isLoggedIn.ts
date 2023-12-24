import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export const isLoggedIn = async () => {
  const session = await getServerSession(authOptions)
  let isLoggedIn = session?.user
  return !!isLoggedIn
}
