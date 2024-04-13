import { ParsedUrlQuery } from 'querystring'
import TimeTable from '@/app/(dashboard)/teacherDashboard/mainDashView/timeTable'
import Levels from '@/app/levels/page'
import { getServerSideProps } from '@/components/client-info'
import { GetServerSidePropsContext, PreviewData } from 'next'
import { NextResponse } from 'next/server'
import React from 'react'

const MainDashView = () => {
  return (
    <main className='flex flex-col items-center justify-between h-[100dvh] w-full '>
      <TimeTable />
    </main>
  )
}

export default MainDashView
