// app/page.tsx

import { Button } from '@/components/ui/button'
import { PlusCircle } from 'lucide-react'
import Link from 'next/link'
// import AddChapter from '@/components/AddChapter'

import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import db from '@/lib/db'
import { AdminEditSwitch } from '@/components/AdminEditSwitch'
import AddChapter from '@/components/AddChapterLinkForm'

let levelTitles = [
  {
    id: 1,
    title: 'Le systeme informatiue',
    level: 1,
  },
  {
    id: 2,
    title: "Le systeme d'exlpoitation",
    level: 1,
  },
  {
    id: 3,
    title: ' Word',
    level: 1,
  },
  {
    id: 4,
    title: "La Cofiguration Materielle d'un Ordinateur",
    level: 2,
  },
  {
    id: 5,
    title: 'Le Réseau Informatique',
    level: 2,
  },
  {
    id: 6,
    title: " Le Systeme d'Exploitation Reseau",
    level: 2,
  },
  {
    id: 7,
    title: 'La Typologie des reseaux',
    level: 3,
  },
  {
    id: 8,
    title: 'Power Point',
    level: 3,
  },
  {
    id: 9,
    title: ' Logo - Pro',
    level: 3,
  },
]

export default async function Page({ params }: any) {
  const session = await getServerSession(authOptions)
  //   console.log(session?.user.role)
  //   console.log('session from level: ', session)
  //   const { role } = session?.user

  const allTitles = await db.chapter?.findMany({
    where: {
      level: Number(params.levelId),
    },
  })

  return (
    <main className='flex min-h-screen   flex-col items-center justify-between p-24'>
      <div className='flex flex-col gap-8  w-full sm:w-1/2'>
        <h1>Niveau {params.levelId}</h1>
        {allTitles?.map((t) => (
          <Link
            key={t.id}
            href={'/levels/' + params.levelId + '/chapters/' + t.number}
            passHref
          >
            <div className='group  p-4  flex  items-center justify-start hover:bg-secondary/90 bg-secondary/50 rounded-3xl '>
              <div className='relative flex flex-shrink-0 h-20 w-20 items-center justify-center rounded-full  bg-muted  md:h-[72px] md:w-[72px] group-hover:bg-primary '>
                <span className='group-hover:animate-ping absolute inline-flex h-full w-full rounded-full bg-muted group-hover:bg-primary  opacity-20 group-hover:transition-all'></span>
                <p className='relative font-bold text-4xl group-hover:text-primary-foreground'>
                  {t.number}
                </p>
              </div>

              <div className='p-4 flex flex-col items-start justify-between'>
                <small className='text-default-500'> Niveau {t.level} </small>
                <h1 className=' font-black text-2xl '> {t.title}</h1>
              </div>
            </div>
          </Link>
        ))}

        {session?.user.role == 'ADMIN' ? (
          <AddChapter levelId={params.levelId} />
        ) : //   <AdminEditSwitch />
        null}
      </div>
    </main>
  )
}
