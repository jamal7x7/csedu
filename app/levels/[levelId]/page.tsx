// app/page.tsx

import { Button } from '@/components/ui/button'
import { PlusCircle } from 'lucide-react'
import Link from 'next/link'
// import AddChapter from '@/components/AddChapter'

import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { db } from '@/db'
import { AdminEditSwitch } from '@/components/AdminEditSwitch'
import AddChapterLinkForm from '@/components/AddChapterLinkForm'
import { Suspense } from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import ChapterLink from '@/components/ChapterLink'
import { chapter } from '@/db/schema/units'
import { eq } from 'drizzle-orm'

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

  const allChapters = await db
    .select({
      title: chapter.title,
      level: chapter.level,
      order: chapter.order,
    })
    .from(chapter)
    .where(eq(chapter.level, Number(params.levelId)))

  return (
    <main className='flex min-h-screen  flex-col items-center justify-between  w-full'>
      <div className='flex flex-col gap-8  w-full sm:w-1/2 mt-24'>
        <h1>Niveau {params.levelId}</h1>

        {session?.user?.role == 'ADMIN' ? (
          <AddChapterLinkForm
            allChapters={allChapters}
            levelId={params.levelId}
          />
        ) : (
          //   <AdminEditSwitch />
          allChapters?.map((chapter) => (
            <ChapterLink chapter={chapter} levelId={params.levelId} />
          ))
        )}
      </div>
    </main>
  )
}
