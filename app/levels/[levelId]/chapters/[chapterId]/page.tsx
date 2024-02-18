import { Button } from '@/components/ui/button'

import Link from 'next/link'

import { headers } from 'next/headers'

import getServerSideProps from '@/components/client-info'

import { ModeToggle } from '@/components/modeToggle'

import { Resume } from './resume/page'
import { Separator } from '@/components/ui/separator'
import Quiz from '@/app/quiz/page'
import { Def, DefContent } from '@/components/chapterBlocks/Def'
import ChapterTitle from '@/components/chapterBlocks/ChapterTitle'
import Intro from '@/components/chapterBlocks/Intro'
import {
  H1,
  H2,
  H3,
  H4,
  List,
  Muted,
  P,
} from '@/components/Typography/Typography'
import Figure from '@/components/chapterBlocks/Figure'
import { Exemple, ExempleContent } from '@/components/chapterBlocks/Exemple'
import StepperClickableSteps from '@/components/chapterBlocks/steps'
import NumberedSteps, {
  NumStepItem,
  NumSteps,
} from '@/components/chapterBlocks/numbered-steps'
import { db as olddb } from '@/lib/db'
import Toc from '@/components/toc'
import AddBlockForm from '@/components/AddBlockForm'

// import * as schema from '@/db/schema'
// import { drizzle } from 'drizzle-orm/postgres-js'
import { chapter } from '@/db/schema/units'
import { db } from '@/db'
import { eq, ne, isNull, and } from 'drizzle-orm'
import { DoorClosed, GripVertical, Plus, X } from 'lucide-react'

// const ddb = drizzle(user, { schema })

interface ArticleBlockData {
  type: string
  content: Content
}
interface Content {
  title: string
}

export default async function Page({
  props,
  params,
}: {
  params: any
  props: any
}) {
  const AllBlocksData = [
    {
      type: 'INTRO',
      order: 1,
      content:
        "Ce cours vous plongera dans le fascinant monde des réseaux informatiques, qui sont essentiels dans notre vie quotidienne et dans notre monde connecté, facilitant la communication et le partage d'informations entre ordinateurs et périphériques. ",
    },
    {
      type: 'H3',
      order: 2,
      content: 'Le Réseau Informatique',
    },
    {
      type: 'P',
      order: 3,
      content:
        "Un réseau désigne souvent un ensemble d'éléments similaires reliés entre eux, que ce soit physiquement ou conceptuellement. Exemple : Le réseau routier est un ensemble de routes interconnectées.",
    },
    {
      type: 'DEF',
      order: 4,
      content:
        "Un réseau désigne souvent un ensemble d'éléments similaires reliés entre eux, que ce soit physiquement ou conceptuellement.",
      examples: [
        {
          title: 'Réseau routier',
          content:
            'Un réseau routier est un ensemble de routes interconnectées.',
        },
        {
          title: 'Réseau de téléphonie',
          content:
            'Un réseau de téléphonie est un ensemble de téléphones interconnectés.',
        },
      ],
    },
    {
      type: 'DEF',
      order: 4,
      content:
        "Dans le domaine informatique, un réseau informatique est un ensemble d'appareils interconnectés permettant l'échange de données et le partage de ressources.",
    },
    {
      type: 'FIGURE',
      order: 4,
      content: (
        <svg
          className='p-8 scale-75'
          width='428'
          height='416'
          viewBox='0 0 214 208'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <line
            x1='116.581'
            y1='97.2723'
            x2='66.5807'
            y2='20.2723'
            stroke='#FF7A00'
            stroke-opacity='0.5'
          />
          <line
            x1='116.652'
            y1='96.641'
            x2='182.652'
            y2='32.641'
            stroke='#FF7A00'
            stroke-opacity='0.5'
          />
          <line
            x1='117.256'
            y1='96.5708'
            x2='194.256'
            y2='142.571'
            stroke='#FF7A00'
            stroke-opacity='0.5'
          />
          <line
            x1='117.456'
            y1='97.2054'
            x2='76.4559'
            y2='188.205'
            stroke='#FF7A00'
            stroke-opacity='0.5'
          />
          <line
            x1='117.129'
            y1='97.483'
            x2='20.1294'
            y2='123.483'
            stroke='#FF7A00'
            stroke-opacity='0.5'
          />
          <path
            className='fill-slate-100   dark:fill-slate-800 hover:fill-slate-200   hover:dark:fill-slate-900'
            d='M104 77.5H130C134.142 77.5 137.5 80.8579 137.5 85V109C137.5 113.142 134.142 116.5 130 116.5H104C99.8579 116.5 96.5 113.142 96.5 109V85C96.5 80.8579 99.8579 77.5 104 77.5Z'
            fill='#141517'
            stroke='#B2C3FF'
          />
          <path
            className='fill-slate-50 dark:fill-slate-950 hover:fill-slate-200   hover:dark:fill-slate-900'
            d='M183 52.5C172.23 52.5 163.5 43.7696 163.5 33C163.5 22.2304 172.23 13.5 183 13.5C193.77 13.5 202.5 22.2304 202.5 33C202.5 43.7696 193.77 52.5 183 52.5Z'
            fill='#1A1B1E'
            stroke='#3360FF'
          />
          <path
            className='fill-slate-50 dark:fill-slate-950 hover:fill-slate-200   hover:dark:fill-slate-900'
            d='M67 39.5C56.2304 39.5 47.5 30.7696 47.5 20C47.5 9.23045 56.2304 0.5 67 0.5C77.7696 0.5 86.5 9.23045 86.5 20C86.5 30.7696 77.7696 39.5 67 39.5Z'
            fill='#1A1B1E'
            stroke='#3360FF'
          />
          <path
            className='fill-slate-50 dark:fill-slate-950 hover:fill-slate-200   hover:dark:fill-slate-900'
            d='M20 142.5C9.23045 142.5 0.5 133.77 0.5 123C0.5 112.23 9.23045 103.5 20 103.5C30.7696 103.5 39.5 112.23 39.5 123C39.5 133.77 30.7696 142.5 20 142.5Z'
            fill='#1A1B1E'
            stroke='#3360FF'
          />
          <path
            className='fill-slate-50 dark:fill-slate-950 hover:fill-slate-200   hover:dark:fill-slate-900'
            d='M76 207.5C65.2304 207.5 56.5 198.77 56.5 188C56.5 177.23 65.2304 168.5 76 168.5C86.7696 168.5 95.5 177.23 95.5 188C95.5 198.77 86.7696 207.5 76 207.5Z'
            fill='#1A1B1E'
            stroke='#3360FF'
          />
          <path
            className='fill-slate-50 dark:fill-slate-950 hover:fill-slate-200   hover:dark:fill-slate-900'
            d='M194 162.5C183.23 162.5 174.5 153.77 174.5 143C174.5 132.23 183.23 123.5 194 123.5C204.77 123.5 213.5 132.23 213.5 143C213.5 153.77 204.77 162.5 194 162.5Z'
            fill='#1A1B1E'
            stroke='#3360FF'
          />
        </svg>
      ),
    },
    {
      type: 'STEPS',
      order: 5,
      content: [
        {
          step: 'Ouvrir PowerPoint',
          content:
            "Cliquer sur l'icon de PowerPoint qui se trouve dans la barre des tache",
        },
        {
          step: 'step',
          content: 'content from step',
        },
        {
          step: 'step',
          content: 'content from step',
        },
      ],
    },
    {
      type: 'H3',
      order: 2,
      content: 'Objectif des Réseaux',
    },
    {
      type: 'P',
      order: 2,
      content: 'Les réseaux permettent',
    },
    {
      type: 'LIST',
      order: 5,
      content: [
        {
          step: 'Ouvrir PowerPoint',
          content:
            'la communication rapide et efficace entre les utilisateurs connectés au réseau.',
        },
        {
          step: 'step',
          content:
            "l'échange de données entre les utilisateurs connectés, favorisant la collaboration et l'accès aux informations partagées.",
        },
        {
          step: 'step',
          content:
            "le partage de ressources telles que fichiers, imprimantes, et applications, optimisant ainsi l'utilisation des équipements informatiques.",
        },
      ],
    },
  ]

  // const result = await ddb.select().from(user).where(isNull(user.score))
  // const result = await ddb.query.user.findMany({
  //   with: {
  //     profile: true,
  //   },
  // })
  const thisChapter = await db.query.chapter?.findFirst({
    where: and(
      eq(chapter.order, Number(params.chapterId)),
      eq(chapter.level, Number(params.levelId))
    ),

    with: {
      sections: {
        with: {
          blocks: true,
        },
      },
    },
  })
  const chapterTitle = await db.query.chapter?.findFirst({
    where: and(
      eq(chapter.order, Number(params.chapterId)),
      eq(chapter.level, Number(params.levelId))
    ),
  })

  // const thisChapter = await db.chapter?.findFirst({
  //   where: {
  //     level: Number(params.levelId),
  //   },
  // })

  // const allQuizes = await olddb.quiz?.findMany({
  //   where: {
  //     // level: Number(params.levelId),
  //     level: 1,
  //   },
  // })
  // const allOptions = await olddb.option?.findMany({
  //   where: {
  //     // level: Number(params.levelId),
  //     quizId: allQuizes[0]?.id,
  //   },
  // })
  // const correctOptions = await olddb.option?.findMany({
  //   where: {
  //     // level: Number(params.levelId),
  //     correct: true,
  //   },
  // })

  const renderBlock = (b: any) => {
    switch (b.type) {
      case 'DEF':
        return (
          <div className='hover:bg-muted mt-8 rounded-lg'>
            <Def className=''>
              <DefContent>{b.content}</DefContent>
              {b.examples?.length > 0 && (
                <Exemple>
                  {b.examples.map((e: any, index: number) => (
                    <ExempleContent key={index} className=''>
                      {e.title}
                    </ExempleContent>
                  ))}
                </Exemple>
              )}
            </Def>
          </div>
        )
      case 'H1':
        return (
          <div className='hover:bg-muted mt-16 first:mt-40 rounded-lg'>
            <H1>{b.content}</H1>
          </div>
        )
      case 'H2':
        return (
          <div className='hover:bg-muted mt-16 first:mt-40 rounded-lg'>
            <H2 className=' '>{b.content}</H2>{' '}
          </div>
        )
      case 'H3':
        return (
          <div className='hover:bg-muted mt-16 first:mt-40 rounded-lg'>
            <H3 className=' '>{b.content}</H3>{' '}
          </div>
        )
      case 'H4':
        return (
          <div className='hover:bg-muted mt-16 first:mt-40 rounded-lg'>
            <H4 className=''>{b.content}</H4>{' '}
          </div>
        )
      case 'H5':
        return (
          <div className='hover:bg-muted mt-16 first:mt-40 rounded-lg'>
            <H4 className=' '>{b.content}</H4>{' '}
          </div>
        )
      case 'TEXT':
        return (
          <div className='hover:bg-muted rounded-lg '>
            <P className=''>{b.content}</P>{' '}
          </div>
        )
      case 'P':
        return (
          <div className='hover:bg-muted rounded-lg '>
            <P className=''>{b.content}</P>
          </div>
        )
      case 'MUTED':
        return (
          <div className='hover:bg-muted rounded-lg'>
            <Muted className=''>{b.content}</Muted>
          </div>
        )
      case 'INTRO':
        return (
          <div className=' my-16 rounded-sm relative z-20     transition-transform transform hover:scale-[1.003] group overflow-visible '>
            <div className='stroke-muted-foreground/50 absolute rounded-3xl z-1   overflow-visible inset-0 border-4 border-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity flex justify-between items-center'>
              <div className='flex justify-between items-center -ml-24 '>
                <Button size={'sm'} variant={'ghost'} className=' p-[0.6rem] '>
                  <Plus className='stroke-inherit  h-4 w-4 ' />
                </Button>
                <Button size={'sm'} variant={'ghost'} className=' p-2  '>
                  <GripVertical className='stroke-inherit h-4 w-4 ' />
                </Button>
              </div>
              <Button
                size={'sm'}
                variant={'ghost'}
                className=' p-[0.6rem] -mr-14 '
              >
                <X className='stroke-inherit h-4 w-4 ' />
              </Button>
            </div>
            <Intro className=''> {b.content}</Intro>
          </div>
        )
      case 'FIGURE':
        return (
          <div className='hover:bg-muted mt-16 mb-8 rounded-lg'>
            <Figure className=''> {b.content}</Figure>
          </div>
        )
      case 'STEPS':
        return (
          <NumSteps className='mt-8 rounded-lg'>
            {b.content.map((s: any, index: number) => (
              <NumStepItem key={index} step={s.step}>
                {s.content}
              </NumStepItem>
            ))}
          </NumSteps>
        )
      case 'LIST':
        return (
          <List className='mt-0'>
            {b.content.map((l: any, index: number) => (
              <li key={index}>{l.content}</li>
            ))}
          </List>
        )
      default:
        return <div>Error: Invalid Block Type</div>
    }
  }

  return (
    // <main className="flex min-h-screen flex-col items-center justify-between">
    <main className='min-h-screen container mx-auto'>
      {/* <main className='bg-teal-300'> */}
      {/* <div className='absolute top-0 z-[-2] h-screen w-screen bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px]'></div> */}
      <div className='flex flex-col  max-w-3xl  mx-auto gap-4 pb-16'>
        {/* =============================Title================================  */}

        <ChapterTitle
          chapterNumber={chapterTitle?.order}
          chapterTitle={chapterTitle?.title}
        ></ChapterTitle>
        {/* <pre>{JSON.stringify(res, null, 2)}</pre> */}
        {/* {chapterTitle.map((r) => (
          <pre>{JSON.stringify(r, null, 4)}</pre>
        ))} */}

        {/* =============================Title-End=============================  */}

        {thisChapter?.sections?.map((section) =>
          section?.blocks
            ?.toSorted((a, b) => a.order - b.order)
            .map((block, i) => <div key={i}>{renderBlock(block)}</div>)
        )}

        {/* {allBlocks[0].sections
          ?.toSorted((a, b) => a.id - b.id)
          .map((block) => renderBlock(block))} */}
        {/* <Separator className='my-80' /> */}
        {/* =============================Blocks================================  */}

        {/* {AllBlocksData.map((b) => {
          return renderBlock(b)
        })} */}
        {/* 

        {/* =============================Blocks-End===========================  */}

        {/* ================================================================ */}

        {/* <Separator className='my-80' /> */}
        {/* 
        {allQuizes?.map((q) => (
          <Quiz
            question={q.question}
            option1={allOptions[0].content}
            option2={allOptions[1].content}
            option3={allOptions[2].content}
            correctOption={correctOptions[0].id}
          />
        ))} */}

        <AddBlockForm thisChapter={thisChapter} chapterId={params.chapterId} />
      </div>

      <Toc />
      {/* ================================================================ */}
      {/* ================================================================ */}

      {/* ================================================================ */}
      {/* ================================================================ */}
    </main>
  )
}
