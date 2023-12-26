import React from 'react'
import { H1, H2, Small } from '@/components/Typography/Typography'

const ChapterTitle = ({ ...props }) => {
  return (
    <div className='p-12 flex  items-center justify-center mt-16'>
      <div className='flex flex-shrink-0 h-20 w-20 items-center justify-center rounded-full dark:bg-slate-800 bg-slate-100  md:h-[72px] md:w-[72px]'>
        <p className='font-bold text-4xl'>{props.chapterNumber}</p>
      </div>

      <div className='p-4 flex flex-col items-start justify-between'>
        <Small>Chapitre {props.chapterNumber}</Small>
        {/* <h1 className=' font-black text-4xl '>{props.children}</h1> */}
        <H1>{props.children}</H1>
        {/* <h1 className=' font-black text-4xl bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500'>Le Réseau Informatique</h1> */}
      </div>
    </div>
  )
}

export default ChapterTitle
