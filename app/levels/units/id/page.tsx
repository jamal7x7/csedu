// app/page.tsx
import { Button } from '@/components/ui/button'
import Link from 'next/link'

let levelTitles = [
  {
    id: 1,
    title: "La Cofiguration Materielle d'un Ordinateur",
    level: 2,
  },
  {
    id: 2,
    title: 'Le Réseau Informatique',
    level: 2,
  },
  {
    id: 3,
    title: " Le Systeme d'Exploitation Reseau",
    level: 2,
  },
]

export default function Page({ params }) {
  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <div className='flex flex-col gap-8'>
        {levelTitles?.map((t) => (
          <Link key={t.id} href={'/units/'} passHref>
            <div className='group p-4  flex  items-center justify-start hover:bg-secondary/90 bg-secondary/50 rounded-3xl '>
              <div className='relative flex flex-shrink-0 h-20 w-20 items-center justify-center rounded-full  bg-muted  md:h-[72px] md:w-[72px] group-hover:bg-primary '>
                <span className='group-hover:animate-ping absolute inline-flex h-full w-full rounded-full bg-muted group-hover:bg-primary  opacity-20 group-hover:transition-all'></span>
                <p className='relative font-bold text-4xl group-hover:text-primary-foreground'>
                  {t.id}
                </p>
              </div>

              <div className='p-4 flex flex-col items-start justify-between'>
                <small className='text-default-500'> unit {t.id} </small>
                <h1 className=' font-black text-2xl '> {t.title}</h1>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  )
}
