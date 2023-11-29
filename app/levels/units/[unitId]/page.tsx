import { Button } from '@/components/ui/button'
import { Breadcrumbs, BreadcrumbItem } from '@nextui-org/breadcrumbs'
import Link from 'next/link'
// import data from '@/data/data'
import { promises as fs } from 'fs'
import { headers } from 'next/headers'

// import {Card, CardHeader, CardBody, Image, Textarea, Chip, Avatar, Divider} from "@nextui-org/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

import getServerSideProps from '@/components/client-info'

import { ModeToggle } from '@/components/modeToggle'

import { Resume } from '../resume/page'
import { Separator } from '@/components/ui/separator'
import { Quiz } from '@/app/quiz/page'

interface ArticleBlockData {
  type: string
  content: Content
}
interface Content {
  title: string
}

export default async function SecondLevelPage() {
  // const res = await fetch('@/data/data')
  // const data = await res.json()

  const file = await fs.readFile(process.cwd() + '/data/data.json', 'utf8')
  const articleBlockData: ArticleBlockData[] = JSON.parse(file)
  // console.log(articleBlockData)

  const headersList = headers()

  const userAgent = headersList.get('user-agent')
  const referer = headersList.referer

  const contentType = headersList.get('x-real-ip')

  // let ip

  // const { req } = headersList

  // if (req.headers['x-forwarded-for']) {
  //   ip = req.headers['x-forwarded-for'].split(',')[0]
  // } else if (req.headers['x-real-ip']) {
  //   ip = req.connection.remoteAddress
  // } else {
  //   ip = req.connection.remoteAddress
  // }

  return (
    // <main className="flex min-h-screen flex-col items-center justify-between">
    <main className='min-h-screen container mx-auto   '>
      {/* <main className='bg-teal-300'> */}
      {/* <div className='absolute top-0 z-[-2] h-screen w-screen bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px]'></div> */}
      <div className='flex flex-col  max-w-3xl  mx-auto gap-12 pb-16'>
        {/* <LevelsBreadcrumbs/> */}
        <div className='p-10 hidden'>
          <div className=' flex  gap-2 '>
            <Link href='/' passHref>
              <Button variant='secondary'>HOME</Button>
            </Link>
            <var>
              <em>2</em>
              <sup>ème</sup> Annee{' '}
            </var>

            {/* <ModeToggle /> */}
          </div>
        </div>
        {/* =============================Title================================  */}
        <div className='p-12 flex  items-center justify-center mt-16'>
          <div className='flex flex-shrink-0 h-20 w-20 items-center justify-center rounded-full dark:bg-slate-800 bg-slate-100  md:h-[72px] md:w-[72px]'>
            <p className='font-bold text-4xl'>2</p>
          </div>

          <div className='p-4 flex flex-col items-start justify-between'>
            <small className='text-default-500'>Chapitre 2</small>
            <h1 className=' font-black text-4xl '>Le Réseau Informatique</h1>
            {/* <h1 className=' font-black text-4xl bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500'>Le Réseau Informatique</h1> */}
          </div>
        </div>
        {/* =============================Title-End================================  */}
        {/* =============================Intro================================  */}
        <div className='flex flex-col items-center justify-between 2xl:px-24  '>
          <Card className='py-4  bg-transparent  border-neutral-200 dark:border-neutral-800 shadow-sm'>
            <CardHeader className='pb-0 pt-2 px-4 flex-col items-start'>
              <p className='text-tiny uppercase font-bold'>Introduction</p>
            </CardHeader>
            <CardContent className='overflow-visible py-2'>
              <small className='text-default-500'>
                Ce cours vous plongera dans le fascinant monde des réseaux
                informatiques, qui sont essentiels dans notre vie quotidienne et
                dans notre monde connecté, facilitant la communication et le
                partage d'informations entre ordinateurs et périphériques.
              </small>
            </CardContent>
          </Card>
        </div>
        {/* =============================intro-End================================  */}
        {/* =============================le reseau informatique================================  */}
        <div className='mt-16'>
          <h3 className='flex flex-col items-start justify-between text-xl  p-4 text-slate-800 dark:text-slate-200'>
            Le Réseau Informatique
          </h3>

          <p className='text-default-500'>
            Un réseau désigne souvent un ensemble d'éléments similaires reliés
            entre eux, que ce soit physiquement ou conceptuellement. Exemple :
            Le réseau routier est un ensemble de routes interconnectées.
          </p>
        </div>
        <div className='relative   flex flex-col items-center justify-between 2xl:px-24     rounded-3xl border border-muted/80 bg-muted/10 text-card-foreground shadow-sm'>
          {/* <div className='absolute rounded-3xl inset-0 h-full w-full bg-muted/30 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]'></div> */}
          <div className='absolute inset-0 h-full w-full bg-muted/30 bg-[radial-gradient(#80808070_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_10%,transparent_100%)]'></div>
          {/* ======================================SVG========================================= */}

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
              d='M104 77.5H130C134.142 77.5 137.5 80.8579 137.5 85V109C137.5 113.142 134.142 116.5 130 116.5H104C99.8579 116.5 96.5 113.142 96.5 109V85C96.5 80.8579 99.8579 77.5 104 77.5Z'
              fill='#141517'
              stroke='#B2C3FF'
            />
            <path
              d='M183 52.5C172.23 52.5 163.5 43.7696 163.5 33C163.5 22.2304 172.23 13.5 183 13.5C193.77 13.5 202.5 22.2304 202.5 33C202.5 43.7696 193.77 52.5 183 52.5Z'
              fill='#1A1B1E'
              stroke='#3360FF'
            />
            <path
              d='M67 39.5C56.2304 39.5 47.5 30.7696 47.5 20C47.5 9.23045 56.2304 0.5 67 0.5C77.7696 0.5 86.5 9.23045 86.5 20C86.5 30.7696 77.7696 39.5 67 39.5Z'
              fill='#1A1B1E'
              stroke='#3360FF'
            />
            <path
              d='M20 142.5C9.23045 142.5 0.5 133.77 0.5 123C0.5 112.23 9.23045 103.5 20 103.5C30.7696 103.5 39.5 112.23 39.5 123C39.5 133.77 30.7696 142.5 20 142.5Z'
              fill='#1A1B1E'
              stroke='#3360FF'
            />
            <path
              d='M76 207.5C65.2304 207.5 56.5 198.77 56.5 188C56.5 177.23 65.2304 168.5 76 168.5C86.7696 168.5 95.5 177.23 95.5 188C95.5 198.77 86.7696 207.5 76 207.5Z'
              fill='#1A1B1E'
              stroke='#3360FF'
            />
            <path
              d='M194 162.5C183.23 162.5 174.5 153.77 174.5 143C174.5 132.23 183.23 123.5 194 123.5C204.77 123.5 213.5 132.23 213.5 143C213.5 153.77 204.77 162.5 194 162.5Z'
              fill='#1A1B1E'
              stroke='#3360FF'
            />
          </svg>

          {/* ================================================================ */}
        </div>
        <div className='flex flex-col items-center justify-between 2xl:px-24   p-2 pb-8  rounded-3xl border border-muted/5 bg-muted/20 text-card-foreground shadow-sm'>
          {/* <Card   className="py-4 px-4 bg-opacity-20   border-0  bg-green-500 border-opacity-10 border-green-100 dark:border-green-900 "> */}
          {/* <Card   className="pb-4 px-4 pt-6 bg-opacity-80 hover:bg-opacity-100 border-1  border-opacity-10 border-neutral-200 dark:border-neutral-800 hover:drop-shadow-md drop-shadow-sm "> */}
          <Card className='pb-4 px-4 pt-6 rounded-t-lg '>
            <CardHeader className=' pt-0 pb-4 px-2 flex-col items-start'>
              <Badge variant='outline'>
                <p className='flex items-center text-sm uppercase font-bold text-default-600'>
                  <div className='w-2 h-2 mr-2 rounded-full bg-green-400'></div>
                  Definitions
                </p>
              </Badge>
            </CardHeader>
            {/* <Divider className='my-4'/> */}
            <CardContent className='overflow-visible py-2'>
              <p className='text-default-500 '>
                Un <b>réseau</b> désigne souvent un ensemble d'éléments
                similaires reliés entre eux, que ce soit physiquement ou
                conceptuellement.
              </p>
            </CardContent>
            {/* <Separator className='my-4' /> */}
          </Card>
          <div className='flex flex-col items-start justify-between 2xl:px-24 pt-8 ml-20  w-full '>
            <Badge variant='outline'>
              <p className='flex items-center text-sm uppercase font-bold text-default-600'>
                <div className='w-2 h-2 mr-2 rounded-full bg-slate-400'></div>
                Exemple
              </p>
            </Badge>
            <Card className='mt-4 py-4  bg-transparent  border-neutral-200 dark:border-neutral-800 shadow-sm'>
              {/* <CardHeader className='pb-0 pt-2 px-4 flex-col items-start'> */}
              {/* <p className='text-tiny uppercase font-bold'>Exemple</p> */}
              {/* </CardHeader> */}
              <CardContent className='overflow-visible py-2'>
                <small className='text-default-500'>
                  Le réseau routier est un ensemble de routes interconnectées.
                </small>
              </CardContent>
            </Card>
          </div>
        </div>
        {/* <Separator className='my-8' /> */}
        <div>
          <Card className='pb-4 px-4 pt-6 '>
            <CardHeader className=' pt-0 pb-4 px-2 flex-col items-start'>
              <Badge variant='outline'>
                <p className='flex items-center text-sm uppercase font-bold text-default-600'>
                  <div className='w-2 h-2 mr-2 rounded-full bg-green-400'></div>
                  Definitions
                </p>
              </Badge>
            </CardHeader>
            {/* <Divider className='my-4'/> */}

            {/* <Separator className="my-4"/> */}
            <CardContent className='overflow-visible py-2'>
              <p className='text-default-500'>
                Dans le domaine informatique, un <b>réseau informatique</b> est
                un ensemble d'appareils interconnectés permettant l'échange de
                données et le partage de ressources.
              </p>
            </CardContent>
          </Card>
        </div>
        <Quiz />
        <div className='mt-16'>
          <h3 className='flex flex-col items-start justify-between text-xl  p-4 text-slate-800 dark:text-slate-200'>
            Objectif des Réseaux
          </h3>

          <p className='text-default-500'>Les réseaux permettent</p>
          <ul className='list-inside my-6 list-disc [&>li]:mt-2'>
            <li>
              la communication rapide et efficace entre les utilisateurs
              connectés au réseau.
            </li>
            <li>
              l'échange de données entre les utilisateurs connectés, favorisant
              la collaboration et l'accès aux informations partagées.
            </li>
            <li>
              le partage de ressources telles que fichiers, imprimantes, et
              applications, optimisant ainsi l'utilisation des équipements
              informatiques.
            </li>
          </ul>
        </div>
        {articleBlockData.map((b) => (
          <div key={b.type}>
            <Card className='pb-4 px-4 pt-6 '>
              <CardHeader className=' pt-0 pb-4 px-2 flex-col items-start'>
                <Badge variant='outline'>
                  <p className='flex items-center text-sm uppercase font-bold text-default-600'>
                    <div className='w-2 h-2 mr-2 rounded-full bg-green-400'></div>
                    {b.type}
                  </p>
                </Badge>
              </CardHeader>
              <CardContent className='overflow-visible py-2'>
                <p className='text-default-500'>{b.content.title}</p>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
      <div>
        <pre>{JSON.stringify(headers().get('host'), null, 4)}</pre>
        <pre>
          {JSON.stringify(
            (headers().get('x-forwarded-for') ?? '127.0.0.1').split(',')[0],
            null,
            4
          )}
        </pre>
      </div>
      <Resume />
    </main>
  )
}

// export async function getServerSideProps(context) {
//   let ip

//   const { req } = context

//   if (req.headers['x-forwarded-for']) {
//     ip = req.headers['x-forwarded-for'].split(',')[0]
//   } else if (req.headers['x-real-ip']) {
//     ip = req.connection.remoteAddress
//   } else {
//     ip = req.connection.remoteAddress
//   }

//   console.log(ip)
//   return {
//     props: {
//       ip,
//     },
//   }
// }
