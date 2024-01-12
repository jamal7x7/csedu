import Levels from '@/app/levels/page'
import TimeTable from '@/app/(dashboard)/teacherDashboard/mainDashView/timeTable'
import React from 'react'

const MainDashView = () => {
  return (
    <main className='flex  flex-col items-center justify-between h-[100dvh]  w-full '>
      <TimeTable />
    </main>
  )
}

export default MainDashView
