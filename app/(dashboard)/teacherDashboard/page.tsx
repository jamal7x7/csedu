// app/page.tsx

import { Button } from '@/components/ui/button'
import Link from 'next/link'

import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import LoginLogout from '@/components/LoginLogout'
import Levels from '@/app/levels/page'
import { H1, Small } from '@/components/Typography/Typography'
import TimeTable from '@/app/(dashboard)/teacherDashboard/mainDashView/timeTable'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import MainDashView from './mainDashView/page'

export default async function Dashboard() {
  const session = await getServerSession(authOptions)
  // console.log('session from student Dashboard: ', session)

  return <MainDashView />
}
