'use client'
import { Muted, Small } from '@/components/Typography/Typography'
import { cn } from '@/lib/utils'
import { AnimatePresence, motion } from 'framer-motion'
import {
  FileText,
  Frown,
  Plus,
  PlusIcon,
  Target,
  UploadCloud,
  X,
  XCircle,
} from 'lucide-react'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import * as XLSX from 'xlsx'
import {
  TStudentsGradesSchema,
  TStudentsGradesWithInfoSchema,
} from '../data/schema'
import { Button } from '@/components/ui/button'

import { useMediaQuery } from '@/hooks/use-media-query'

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

import {
  addStudentsListfileAction,
  deleteStudentsListfileAction,
} from '@/actions/fileActions'
import { deleteAllTitleAction } from '@/actions/actions'

const variants = {
  hidden: { opacity: 0, x: 100, y: 20 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: 0, y: 0 },
}

function DropZone() {
  //   {
  //   setUpLoadedData,
  // }: {
  //   setUpLoadedData: (data: any[]) => void
  // }
  const [fileNames, setFileNames] = useState<string[]>([])
  const [rejectedfiles, setRejectedfiles] = useState<any[]>([])
  const [acceptedRawFiles, setAcceptedRawFiles] = useState<any[]>([])

  const [fileData, setFileData] = useState<any[]>([])

  const [fileDataToGo, setFileDataToGo] = useState<any[]>([])
  // console.log('🚀 ~ DropZone ~ fileDataToGo:', fileDataToGo)

  const fileDataReorganized: TStudentsGradesWithInfoSchema[] = useMemo(
    () =>
      fileData.map((u) => {
        return {
          classCode: u[4].I as string,
          title: u[1].F as string,
          academyYear: u[6].D as string,
          establishmentCode: u[2].C as string,
          schoolName: u[3].O as string,
          academy: u[3].D as string,
          delegation: u[3].I as string,
          teacherName: u[4].O as string,
          subject: u[5].O as string,
          semestre: u[5].D as string,
          studentsGradesTableHeader: [
            u[8].B, //id
            u[8].C, //studentMassarNumber
            u[8].D, //studentName
            u[8].F, //birthDate
            u[8].G, //test1
            // u[8].H, //abs
            u[8].I, //test2
            // u[8].J, //abs
            u[8].K, //test3
            // u[8].L, //abs
            u[8].M, //IntegratedActivities
            // u[8].N, //abs
          ] as string[],
          studentsGradesTable: [
            ...u.slice(10).map((s: any) => ({
              id: s.B.toString() as string,
              studentMassarNumber: s.C ?? '-',
              studentName: s.D as string,
              birthDate: s.F,
              test1: s.G ?? 0,
              test2: s.I ?? 0,
              test3: s.K ?? 0,
              integratedActivities: s.M ?? 0,
              // class: u[4].I,
              studentClassNumber: Number(s.__rowNum__) - 16 ?? 0,
            })),
          ] as TStudentsGradesSchema[],
        }
      }),
    // .flat(),
    [fileData]
  )
  // setFileDataToGo(fileDataReorganized)
  // // console.log('🚀 ~ DropZone ~ fileDataMemo:', fileDataReorganized)

  useEffect(() => {
    setFileDataToGo(fileDataReorganized)
  }, [fileData])

  const onDrop = useCallback((acceptedFiles: Blob[], fileRejections: any[]) => {
    acceptedFiles?.forEach((file) => {
      setAcceptedRawFiles((prev) => [...prev, file])
      // // console.log('🚀 ~ acceptedFiles.forEach ~ file:', file)
      const reader = new FileReader()

      reader.onabort = () => console.log('file reading was aborted')
      reader.onerror = () => console.log('file reading has failed')
      reader.onload = () => {
        // Do whatever you want with the file contents
        const binaryStr = reader.result
        // console.log(binaryStr)
        const workbook = XLSX.read(binaryStr, { type: 'array' })
        const sheetName = workbook.SheetNames[0]
        const worksheet = workbook.Sheets[sheetName]
        const parsedData = XLSX.utils.sheet_to_json(worksheet)
        setFileData((prev) => [...prev, parsedData])
        // // // console.log('🚀 ~ acceptedFiles.forEach ~ parsedData:', parsedData)
      }
      reader.readAsArrayBuffer(file)
    })
    fileRejections?.forEach((file) => {
      setRejectedfiles((prev) => [...prev, file])
    })
  }, [])
  rejectedfiles?.forEach((rejected) => {
    // // console.log('🚀 ~ DropZone ~ fileRejections:', rejected)
  })
  // // console.log('🚀 ~ acceptedFiles.forEach ~ fileData:', fileData)

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/vnd.ms-excel': ['.xls', '.xlsx'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': [
        '.xls',
        '.xlsx',
      ],
      'text/csv': [],
      'text/html': ['.html', '.htm'],
    },
    maxSize: 1024 * 100,
    maxFiles: 20,
  })

  const handleRemoveRejectedFile = (index: number) => {
    const updatedRejFile = rejectedfiles.filter((_, i) => i !== index)
    setRejectedfiles(updatedRejFile)
  }
  const handleRemoveAcceptedRawFile = (index: number) => {
    const updatedAccFile = acceptedRawFiles.filter((_, i) => i !== index)
    setAcceptedRawFiles(updatedAccFile)
  }

  const handleUploadedFiles = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // e.stopPropagation()
    // setUpLoadedData(fileData)

    setFileDataToGo(fileDataReorganized)

    addStudentsListfileAction(fileDataToGo)
    // console.log(
    // '🚀 ~ DropZone ~ handleUploadedFiles ~ fileDataToGo:---------------------',
    // fileDataToGo
    // )
  }
  const handleDeleteStudentsListfileAction = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault()
    // e.stopPropagation()
    // setUpLoadedData(fileData)

    deleteStudentsListfileAction()
    console.log('List of all students Deleted')
  }

  return (
    <>
      <form
        onSubmit={(e) => handleUploadedFiles(e)}
        // method='POST'
        className='flex flex-col gap-y-4'
      >
        <div
          className={cn(
            'h-24 bg-muted/40  rounded-xl flex justify-center items-center border-dashed border-2 ',
            isDragActive && 'bg-muted '
          )}
          {...getRootProps()}
        >
          <input {...getInputProps()} />
          {isDragActive ? (
            <div className='flex items-center gap-x-2    cursor-crosshair'>
              <div className='relative -left-6 -top-3'>
                <Target className='absolute stroke-muted-foreground/70  animate-ping' />
                <Target className=' absolute stroke-muted-foreground/70 animate-pulse ' />
              </div>
              <p className='text-xs text-muted-foreground'>
                Drop the files here ...
              </p>
            </div>
          ) : (
            <>
              <div className='flex  items-center  gap-x-4 hover:bg-muted-foreground/10 px-4 py-3 rounded-md cursor-pointer'>
                <UploadCloud className='stroke-muted-foreground/70 ' />
                <div className='flex flex-col items-start '>
                  <Small className=' text-muted-foreground'>
                    Drag 'n' drop some files here, or click to select files
                  </Small>
                  <p className='text-xs text-muted-foreground/50'>
                    up to 10 xlsx files, 10MB per file
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
        {/* {rejectedfiles.length < 0 && (
        <div className='mt-8 h-24 bg-muted/10  rounded-xl flex justify-center items-center gap-2 border-dashed border-2 border-amber-700 '>
          {rejectedfiles.map((rejectedFile) => (
            <div className='flex flex-col justify-center items-center  bg-rose-500/50 rounded-xl  p-4 text-xs text-muted-foreground'>
              <p>{rejectedFile.file.name}</p>
              <p>{rejectedFile.errors[0].message}</p>
            </div>
          ))}
        </div>
      )} */}
        <div className='p-4 mb-8 bg-muted/20 mx-2 py-2 border grid grid-cols-3  items-center gap-2 '>
          {rejectedfiles.length > 0 || acceptedRawFiles.length > 0 ? (
            <AnimatePresence mode='popLayout'>
              {acceptedRawFiles.map((aFile, index) => (
                <motion.li
                  key={'accepted-' + index}
                  variants={variants}
                  initial='hidden'
                  animate='enter'
                  exit='exit'
                  transition={{ ease: [0.45, 0, 0.55, 1], duration: 0.35 }}
                  className='list-none  flex items-center gap-2 bg-emerald-500/20 rounded-xl  p-4 text-xs text-muted-foreground'
                >
                  <FileText className='stroke-emerald-500 ' size={20} />
                  <div>
                    <p className=' '>{aFile.name}</p>{' '}
                    <Small className=' text-emerald-900/50 dark:text-emerald-300/50 '>
                      {(aFile.size / 1024).toFixed(1) + ' KB'}
                    </Small>
                  </div>
                  <button
                    type='button'
                    className='p-1 rounded-sm hover:bg-muted-foreground/20 text-muted-foreground/30 hover:text-muted-foreground ml-auto'
                    onClick={() => handleRemoveAcceptedRawFile(index)}
                  >
                    <X className='' size={20} />
                  </button>
                </motion.li>
              ))}
              {rejectedfiles.map((rejectedFile, index) => (
                <motion.li
                  key={'rejected-' + index}
                  variants={variants}
                  initial='hidden'
                  animate='enter'
                  exit='exit'
                  transition={{ ease: [0.45, 0, 0.55, 1], duration: 0.35 }}
                  className='list-none  flex items-center gap-2 bg-rose-500/20 rounded-xl  p-4 text-xs text-muted-foreground'
                >
                  <FileText className='stroke-rose-500 ' size={20} />
                  <div>
                    <p className=' '>{rejectedFile.file.name}</p>{' '}
                    <Small className='text-rose-900/50 dark:text-rose-300/70'>
                      {(rejectedFile.file.size / 1024).toFixed(1) +
                        ' KB - ' +
                        rejectedFile.errors[0].message}
                    </Small>
                  </div>
                  <button
                    type='button'
                    className='p-1 rounded-sm hover:bg-muted-foreground/20 text-muted-foreground/30 hover:text-muted-foreground ml-auto'
                    onClick={() => handleRemoveRejectedFile(index)}
                  >
                    <X className='' size={20} />
                  </button>
                </motion.li>
              ))}
            </AnimatePresence>
          ) : (
            <div className='text-center col-span-3 text-neutral-300 flex items-center justify-center gap-x-2'>
              <Frown className='stroke-muted-foreground/70' size={20} />
              <p className='text-xs text-muted-foreground'>No FIle Uploaded</p>
            </div>
          )}
        </div>
        <Button className='w-fit' type='submit'>
          Save
        </Button>
      </form>
      <form onSubmit={(e) => handleDeleteStudentsListfileAction(e)}>
        <Button className='' type='submit' variant={'destructive'}>
          Delete All Students
        </Button>
      </form>
    </>
  )
}
export default DropZone

export function DrawerDialogDropZone() {
  const [open, setOpen] = React.useState(false)
  const isDesktop = useMediaQuery('(min-width: 768px)')

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant='default' className='h-8 px-2 lg:px-3'>
            <PlusIcon className=' h-4 w-4' />
            Ajouter des etudiants
          </Button>
          {/* <Button variant='outline' className='flex items-center gap-2'>
            {' '}
            <Plus className='stroke-muted-foreground/70 ' />
            Ajouter des etudiants
          </Button> */}
        </DialogTrigger>
        <DialogContent className='sm:max-w-1/3 md:max-w-1/2 lg:max-w-1/2 xl:max-w-1/2'>
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          {/* <ProfileForm /> */}
          <DropZone />
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
        {/* <ProfileForm className='px-4' /> */}
        <DropZone />
        <DrawerFooter className='pt-2'>
          <DrawerClose asChild>
            <Button variant='outline'>Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

function ProfileForm({ className }: React.ComponentProps<'form'>) {
  return (
    <form className={cn('grid items-start gap-4', className)}>
      <div className='grid gap-2'>
        <Label htmlFor='email'>Email</Label>
        <Input type='email' id='email' defaultValue='shadcn@example.com' />
      </div>
      <div className='grid gap-2'>
        <Label htmlFor='username'>Username</Label>
        <Input id='username' defaultValue='@shadcn' />
      </div>
      <Button type='submit'>Save changes</Button>
    </form>
  )
}
