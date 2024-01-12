'use client'
import React, { useState, useRef } from 'react'
import { MyCalendar } from '@/app/(dashboard)/teacherDashboard/mainDashView/my-calendar'
import { H2, H3, H4, Muted, Small } from '@/components/Typography/Typography'
import {
  addDays,
  eachDayOfInterval,
  endOfWeek,
  format,
  formatDistance,
  formatRelative,
  startOfWeek,
  subDays,
} from 'date-fns'
import { ar, enUS, fr } from 'date-fns/locale'
import { getDaysOfWeek } from '@/app/utils/date'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './tabs2'
import { stringify } from '@/app/utils'

const TimeTable = () => {
  const ref = useRef(null)
  const [date, setDate] = useState<Date>(new Date())
  const [dayIndex, setDayIndex] = useState(-1)
  const [startDate, setStartDate] = useState(new Date('2024/01/11'))
  const [events, setEvents] = useState({
    id: Date.now(),
    start: '8:00',
    end: '9:00',
    content: 'Arabic',
    description: '',
  })

  const todayName = format(date, 'eee', { locale: fr })
  const todayNumber = format(date, 'd', { locale: fr })
  function handleClick(event: MouseEvent): void {
    event.preventDefault()
  }

  function handleAddEvents(event: MouseEvent): void {
    event.preventDefault()
    console.log(ref.current)
    console.log(stringify(ref.current))
  }

  return (
    <div className='flex flex-col gap-8  w-full'>
      {/* <div className='p-12 dark:bg-slate-900/40 bg-slate-50 flex  items-center justify-center '>
        <div className='p-12  flex  items-center justify-center gap-4 overflow-x-auto'>
          {getDaysOfWeek({ locale: fr, date: date }).map((d, i) => (
            <Button
              variant={'ghost'}
              onMouseDown={() => setDayIndex(i)}
              key={i}
              className={cn(
                'p-4  flex flex-col items-center justify-center bg-muted/10 text-muted-foreground   rounded-full aspect-square h-16 w-16 scale-90 ',
                d.number == format(date, 'd')
                  ? 'dark:border-muted border-slate-500/20 border-[1px] dark:bg-muted/10 bg-slate-500/0 text-foreground'
                  : '',
                i == dayIndex ? 'dark:bg-muted bg-slate-500/10' : ''
              )}
            >
              <Small>{d.name.slice(0, 3)}</Small>{' '}
              <H3 className='text-inherit'>{d.number}</H3>
            </Button>
          ))}
        </div>
      </div> */}

      {/* ========================================================================= */}
      <div className='p-12 dark:bg-slate-900/40 bg-slate-50 flex  items-center justify-center '>
        <div className=''>
          <Tabs defaultValue={todayNumber} className='w-full '>
            <TabsList className='bg-transparent p-12  flex  items-center justify-center gap-4 overflow-x-auto'>
              {getDaysOfWeek({ locale: fr, date: date }).map((d, i) => (
                <TabsTrigger
                  // autoFocus
                  value={d.number}
                  onClick={() => setDayIndex(i)}
                  className={cn(
                    'p-4  flex flex-col items-center justify-center bg-muted/10 text-muted-foreground   rounded-full aspect-square h-16 w-16 scale-90 ',
                    d.number == format(date, 'd')
                      ? 'dark:border-muted border-slate-500/20 border-[1px] dark:bg-muted/10 bg-slate-500/0 text-foreground'
                      : '',
                    i == dayIndex ? 'dark:bg-muted bg-slate-500/10' : ''
                  )}
                >
                  <Small>{d.name.slice(0, 3)}</Small>{' '}
                  <H3 className='text-inherit'>{d.number}</H3>
                </TabsTrigger>
              ))}
            </TabsList>
            {getDaysOfWeek({ locale: fr, date: date }).map((d, i) => (
              <>
                <TabsContent value={d.number} className='mt-0 flex flex-col  '>
                  {d.number + ' ' + d.name}
                  <div className='grid grid-cols-8 -ml-2'>
                    {Array.from({ length: 8 }).map((_, ind) => (
                      <div className='w-full border-muted-foreground/20 border-[1px] '>
                        <div
                          ref={ref}
                          onClick={handleAddEvents}
                          className='w-full  p-8 '
                        >
                          {ind}
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </>
            ))}
          </Tabs>
        </div>
      </div>
    </div>
  )
}

export default TimeTable
