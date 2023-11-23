import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { BookOpenText } from 'lucide-react'
import { ScrollArea } from '@/components/ui/scroll-area'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export function Resume() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className=' fixed  bottom-4 right-4  z-50'>
          <Button className=' mb-8 mr-8 float-right ' variant='outline'>
            <BookOpenText className='mr-2 h-4 w-4' /> Resume
          </Button>
        </div>
      </DialogTrigger>
      <DialogContent className=' container h-5/6 sm:max-w-[4250px] w-2/3 '>
        <div className='absolute rounded-md inset-0 h-full w-full bg-muted/30 bg-[linear-gradient(to_right,#80808022_1px,transparent_1px),linear-gradient(to_bottom,#80808022_1px,transparent_1px)] bg-[size:24px_24px]'></div>

        {/* <DialogHeader>
          <DialogTitle>Le Resume du cours</DialogTitle>
          <DialogDescription>Ecris ceci dans votre cahier</DialogDescription>
        </DialogHeader> */}

        <ScrollArea className='h-full w-480  p-4 '>
          {/* =========================================================================== */}
          <div className='flex flex-col  max-w-3xl  mx-auto gap-12 pb-16'>
            {/* =============================Title================================  */}
            <div className='p-12 flex  items-center justify-center'>
              {/* <div className='flex flex-shrink-0 h-20 w-20 items-center justify-center rounded-full dark:bg-slate-800 bg-slate-100  md:h-[72px] md:w-[72px]'>
              <p className='font-bold text-4xl'>2</p>
            </div> */}

              <div className='p-4 flex flex-col items-start justify-between'>
                <small className='text-default-500'>Chapitre 2</small>
                {/* <h1 className=' font-black text-4xl '>Le Réseau Informatique</h1> */}
                <h1 className=' font-black text-4xl bg-clip-text text-transparent bg-gradient-to-r from-pink-700 to-red-500'>
                  Le Réseau Informatique
                </h1>
              </div>
            </div>
            {/* =============================Title-End================================  */}

            {/* =============================Intro================================  */}
            {/* <div className='flex flex-col items-center justify-between 2xl:px-24  '>
            <Card className='py-4  bg-transparent  border-neutral-200 dark:border-neutral-800 shadow-sm'>
              <CardHeader className='pb-0 pt-2 px-4 flex-col items-start'>
                <p className='text-tiny uppercase font-bold'>Introduction</p>
              </CardHeader>
              <CardContent className='overflow-visible py-2'>
                <small className='text-default-500'>
                  Ce cours vous plongera dans le fascinant monde des réseaux
                  informatiques, qui sont essentiels dans notre vie quotidienne
                  et dans notre monde connecté, facilitant la communication et
                  le partage d'informations entre ordinateurs et périphériques.
                </small>
              </CardContent>
            </Card>
          </div> */}

            {/* =============================intro-End================================  */}

            {/* =============================le reseau informatique================================  */}
            <div className=''>
              <h1 className='flex flex-col items-start justify-between text-2xl font-semibold  p-4 bg-clip-text text-transparent bg-gradient-to-r from-pink-700 to-red-500'>
                I- Le Réseau Informatique
              </h1>

              <p className='text-default-500'>
                Un réseau désigne souvent un ensemble d'éléments similaires
                reliés entre eux, que ce soit physiquement ou conceptuellement.
                Exemple : Le réseau routier est un ensemble de routes
                interconnectées.
              </p>
            </div>

            <h1 className='text-xl  text-green-400'>1- Definition</h1>
            <div className='flex flex-col items-center justify-between 2xl:px-24   p-2 pb-8  rounded-3xl border border-muted/5 bg-muted/20 text-card-foreground shadow-sm'>
              {/* <Card   className="py-4 px-4 bg-opacity-20   border-0  bg-green-500 border-opacity-10 border-green-100 dark:border-green-900 "> */}
              {/* <Card   className="pb-4 px-4 pt-6 bg-opacity-80 hover:bg-opacity-100 border-1  border-opacity-10 border-neutral-200 dark:border-neutral-800 hover:drop-shadow-md drop-shadow-sm "> */}
              <Card className='pb-4 px-4 pt-4 rounded-t-lg bg-muted/5 backdrop-blur-[2px] supports-[backdrop-filter-sm]:bg-muted/5'>
                {/* <CardHeader className=' pt-0 pb-4 px-2 flex-col items-start  '></CardHeader> */}
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
                      Le réseau routier est un ensemble de routes
                      interconnectées.
                    </small>
                  </CardContent>
                </Card>
              </div>
            </div>
            {/* <Separator className='my-8' /> */}
            <div>
              <Card className='pb-4 px-4 pt-6 bg-muted/5 backdrop-blur-[2px] supports-[backdrop-filter-sm]:bg-muted/5'>
                <CardHeader className=' pt-0 pb-4 px-2 flex-col items-start  text-green-400'>
                  <h1 className='text-xl'>2- Definition</h1>
                </CardHeader>
                <CardContent className='overflow-visible py-2'>
                  <p className='text-default-500'>
                    Dans le domaine informatique, un <b>réseau informatique</b>{' '}
                    est un ensemble d'appareils interconnectés permettant
                    l'échange de données et le partage de ressources.
                  </p>
                </CardContent>
              </Card>
            </div>
            <div className=''>
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
                  l'échange de données entre les utilisateurs connectés,
                  favorisant la collaboration et l'accès aux informations
                  partagées.
                </li>
                <li>
                  le partage de ressources telles que fichiers, imprimantes, et
                  applications, optimisant ainsi l'utilisation des équipements
                  informatiques.
                </li>
              </ul>
            </div>
          </div>

          {/* =========================================================================== */}
        </ScrollArea>
        {/* <DialogFooter></DialogFooter> */}
      </DialogContent>
    </Dialog>
  )
}
