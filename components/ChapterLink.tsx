import React, { Suspense } from 'react'

import { Skeleton } from '@/components/ui/skeleton'
import { Link } from '@nextui-org/react'
import { Chapter } from '@/db/schema/units'

const ChapterLink = ({
  levelId,
  chapter,
}: {
  levelId: string
  chapter: any
}) => {
  return (
    <Suspense fallback={<Skeleton className='h-12 w-12 rounded-full  ' />}>
      <Link
        key={chapter.id}
        href={'/levels/' + levelId + '/chapters/' + chapter.order}
        // passHref
      >
        <div className='group  p-4  flex  items-center justify-start hover:bg-secondary/90 bg-secondary/50 rounded-3xl  w-full '>
          <div className='relative flex flex-shrink-0 h-20 w-20 items-center justify-center rounded-full  bg-muted  md:h-[72px] md:w-[72px] group-hover:bg-primary '>
            <span className='group-hover:animate-ping absolute inline-flex h-full w-full rounded-full bg-muted group-hover:bg-primary  opacity-20 group-hover:transition-all'></span>
            <p className='relative font-bold text-4xl group-hover:text-primary-foreground'>
              {chapter.order}
            </p>
          </div>

          <div className='p-4 flex flex-col items-start justify-between'>
            <small className='text-default-500'> Niveau {chapter.level} </small>
            <h1 className=' font-black text-2xl '> {chapter.title}</h1>
          </div>
        </div>
      </Link>
    </Suspense>
  )
}

export default ChapterLink
