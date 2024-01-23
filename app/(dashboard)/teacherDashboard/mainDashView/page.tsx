import Levels from '@/app/levels/page'
import TimeTable from '@/app/(dashboard)/teacherDashboard/mainDashView/timeTable'
import React from 'react'
import { getServerSideProps } from '@/components/client-info'
import { GetServerSidePropsContext, PreviewData } from 'next'
import { ParsedUrlQuery } from 'querystring'
import { NextResponse } from 'next/server'

const MainDashView = () => {
  return (
    <main className='flex  flex-col items-center justify-between h-[100dvh]  w-full '>
      <TimeTable />
    </main>
  )
}

export default MainDashView
