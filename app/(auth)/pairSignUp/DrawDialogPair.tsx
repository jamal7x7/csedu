import * as React from 'react'

import { cn } from '@/lib/utils'
import { useMediaQuery } from '@/hooks/use-media-query'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useEffect, useState } from 'react'
import { getStudentsAction } from '@/actions/signUpAction'
import { Student, User } from '@/db/schema/users'
import { ScrollArea } from '@/components/ui/scroll-area'

export function DrawerDialogPair() {
  const [open, setOpen] = React.useState(false)
  const isDesktop = useMediaQuery('(min-width: 768px)')
  const [studentsList, setStudentsList] = useState<User[]>([])

  useEffect(() => {
    const updateViews = async () => {
      const users = await getStudentsAction('1APIC-1')

      const classStudents: User[] = users.filter(
        (u) => u.profile.student.classCode === '1APIC-2'
      )

      setStudentsList(classStudents)
    }

    updateViews()
    console.log('🚀 ~ DrawerDialogPair ~ studentsList:', studentsList)
  }, [])

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className='rounded-r-md rounded-l-[0px]' variant='outline'>
            Choisir...
          </Button>
        </DialogTrigger>
        <DialogContent className=' container h-5/6 sm:max-w-[4250px] w-2/3 '>
          <ScrollArea className='h-full w-480 min-w-full'>
            <DialogHeader className='mb-8 sticky top-0 bg-background p-4 pl-6'>
              <DialogTitle>Nom et Prenom </DialogTitle>
              <DialogDescription>
                Clicker sur votre nom de la list suivant
              </DialogDescription>
            </DialogHeader>
            <ProfileForm studentsList={studentsList} />
          </ScrollArea>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant='outline'>Edit Profile</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className='text-left'>
          <DrawerTitle>Edit profile</DrawerTitle>
          <DrawerDescription>
            Make changes to your profile here. Click save when you're done.
          </DrawerDescription>
        </DrawerHeader>
        <ProfileForm studentsList={studentsList} />
        <DrawerFooter className='pt-2'>
          <DrawerClose asChild>
            <Button variant='outline'>Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

function ProfileForm({
  studentsList,
}: //   className,
{
  studentsList: any[]
  //   className: React.ComponentProps<'form'>
}) {
  return (
    <form className={cn('grid  grid-cols-2 gap-4 ')}>
      {studentsList?.map((student, i) => (
        <div
          key={i}
          className='flex justify-between  gap-2 rounded-md pl-6 p-4 bg-muted/40 hover:bg-muted/80 '
        >
          <div className='flex flex-col'>
            <div className='grid gap-2'> {student.firstName}</div>

            <div className='text-xs text-muted-foreground'>
              {' '}
              {student.profile.student.classCode}
            </div>
          </div>
          <div className='text-xs text-muted-foreground flex flex-col justify-center items-center'>
            {' '}
            {student.profile.student.massarNumber}
          </div>
        </div>
      ))}
      {/* <Button type='submit'>Save changes</Button> */}
    </form>
  )
}
