import { promises as fs } from 'fs'
import path from 'path'
import { db } from '@/db'
import { Metadata } from 'next'
import Image from 'next/image'
import { z } from 'zod'

import { columns } from './components/columns'
import { DataTable } from './components/data-table'
import { UserNav } from './components/user-nav'
import {
  TStudentsGradesSchema,
  TStudentsGradesWithInfoSchema,
  studentsGradesSchema,
  taskSchema,
} from './data/schema'

import { addStudentsListfileAction } from '@/actions/fileActions'
import { getUsersAction } from '@/actions/signUpAction'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { eq } from 'drizzle-orm'
import { unstable_noStore as noStore } from 'next/cache'
import { Suspense } from 'react'
import { DrawerDialogDropZone } from './components/DropZone'
// import dynamic from 'next/dynamic'

// export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Users/Students List',
  description: 'Users or in this case Students grouped in a list.',
}

async function getStudentsList() {
  noStore()
  const allUsers = await db.query.user.findMany({
    where: (user, { eq }) => eq(user.role, 'STUDENT'),
    with: {
      profile: {
        with: {
          student: {
            with: {
              grade: {
                with: {
                  tests: {
                    with: {
                      test: true,
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  })

  const sList: TStudentsGradesSchema[] = allUsers?.map(
    (u) =>
      ({
        id: u.id.toString(),
        studentName: u.firstName,
        birthDate: u.profile?.birthDate ?? '---',
        classCode: u.profile?.student?.classCode ?? '---',
        studentClassNumber: u.profile?.student?.studentClassNumber ?? 0,
        studentMassarNumber: u.profile?.student?.massarNumber ?? '---',
        test1: u.profile?.student?.grade?.tests?.[0]?.test?.grade ?? 0,
        test2: u.profile?.student?.grade?.tests?.[1]?.test?.grade ?? 0,
        test3: u.profile?.student?.grade?.tests?.[2]?.test?.grade ?? 0,
        integratedActivities:
          u.profile?.student?.grade?.tests?.[3]?.test?.grade ?? 0,
        label: 'test',
      } as TStudentsGradesSchema)
  )

  return sList?.toSorted((a, b) => {
    if (
      a.studentClassNumber === undefined ||
      b.studentClassNumber === undefined
    ) {
      return 0
    }

    return a.studentClassNumber - b.studentClassNumber
  })
}

async function getStudentsWithInfoList() {
  noStore()
  const allUsers = await db.query.user.findMany({
    where: (user, { eq }) => eq(user.role, 'STUDENT'),
    with: {
      profile: {
        with: {
          student: {
            with: {
              grade: {
                with: {
                  tests: {
                    with: {
                      test: true,
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  })
  // console.log('🚀 ~ getStudentsList ~ allUsers:', allUsers)
  const sList: TStudentsGradesSchema[] = allUsers?.map(
    (u) =>
      ({
        id: u.id.toString(),
        studentName: u.firstName,
        classCode: u.profile?.student?.classCode ?? '---',
        birthDate: u.profile?.birthDate ?? '---',
        studentClassNumber: u.profile?.student?.studentClassNumber ?? 0,
        studentMassarNumber: u.profile?.student?.massarNumber ?? '---',
        test1: u.profile?.student?.grade?.tests?.[0]?.test?.grade ?? 0,
        test2: u.profile?.student?.grade?.tests?.[1]?.test?.grade ?? 0,
        test3: u.profile?.student?.grade?.tests?.[2]?.test?.grade ?? 0,
        integratedActivities:
          u.profile?.student?.grade?.tests?.[3]?.test?.grade ?? 0,
        label: 'test',
      } as TStudentsGradesSchema)
  )

  const sortedSList = sList?.toSorted((a, b) => {
    if (
      a.studentClassNumber === undefined ||
      b.studentClassNumber === undefined
    ) {
      return 0
    }

    return a.studentClassNumber - b.studentClassNumber
  })

  const infoList: TStudentsGradesWithInfoSchema[] = allUsers?.map(
    (u) =>
      ({
        id: u.id.toString(),
        classCode: u.profile?.student?.classCode ?? '---',
        // title: '',
        // academyYear: '',
        // establishmentCode: '',
        // schoolName: '',
        // academy: '',
        // delegation: '',
        // teacherName: '',
        // subject: '',
        // semester: '',
        // studentsGradesTableHeader: [''],
        studentsGradesTable: sortedSList as TStudentsGradesSchema[],
      } as TStudentsGradesWithInfoSchema)
  )

  // console.log('🚀 ~ getStudentsWithInfoList ~ l:', infoList)

  return infoList
}

// database read for Users .

async function getStudentsList2() {
  const allUsers = await db.query.user
    .findMany({
      where: (user, { eq }) => eq(user.role, 'STUDENT'),
      with: {
        profile: {
          with: {
            student: {
              // with: {
              //   grade: true,
              // },
            },
          },
        },
      },
    })

    .catch((e) => console.log(e)) // returns a promise
    .then((v) => getStudentsGrades(v)) // return

  async function getStudentsGrades(user: any) {
    return await user.map(
      (u: any) =>
        ({
          id: u.id.toString(),
          studentName: u.firstName,
          birthDate: u.profile?.birthDate ?? '---',
          studentMassarNumber: u.profile?.student?.massarNumber ?? '---',
          test1: 1,
          test2: 2,
          test3: 3,
          integratedActivities: 4,
          label: 'test',
        } as TStudentsGradesSchema)
    )
  }
  // const sList: TStudentsGradesSchema[]
  // console.dir(sList, { depth: null })

  return z.array(studentsGradesSchema).parse(allUsers)
  // console.dir(allUsers, { depth: null })
}
// Simulate a database read for tasks.
async function getTasks() {
  const data = await fs.readFile(
    path.join(
      process.cwd(),
      'app/(dashboard)/teacherDashboard/tasks/data/studentList.json'
    )
  )

  const d = JSON.parse(data.toString())

  return z.array(studentsGradesSchema).parse(d)
}

export default async function TaskPage() {
  // const list = await getTasks()

  const students: TStudentsGradesSchema[] = await getStudentsList()
  console.log('🚀 ~ students:', students)
  const studentsWithInfo: TStudentsGradesWithInfoSchema[] =
    await getStudentsWithInfoList()
  console.log('🚀 ~ TaskPage ~ studentsWithInfo:', studentsWithInfo)
  const l = studentsWithInfo?.map((s) => s.studentsGradesTable)

  return (
    <>
      {/* <div className='md:hidden'>
        <Image
          src='/examples/tasks-light.png'
          width={1280}
          height={998}
          alt='Playground'
          className='block dark:hidden'
        />
        <Image
          src='/examples/tasks-dark.png'
          width={1280}
          height={998}
          alt='Playground'
          className='hidden dark:block'
        />
      </div> */}
      <div
        // className='h-full p-8'
        className='flex-col flex-1 hidden mb-8 space-y-8 md:flex'
      >
        <div className='flex items-center justify-between space-y-2'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>
              List des Étudiants
            </h2>
            <p className='text-muted-foreground'>
              Voici la List de vos étudiants
            </p>
          </div>
          <div className='flex items-center space-x-2'>
            {/* <UserNav /> */}
            {/* <DrawerDialogDropZone /> */}
          </div>
        </div>
        {/* {list.map((dl, i) => ( */}
        <Suspense fallback={'wait...'}>
          <Tabs
            className='flex flex-col gap-2 items-start'
            defaultValue='students'
          >
            <TabsList className='w-full justify-start sticky top-2 z-10'>
              <TabsTrigger value='all'>All</TabsTrigger>
              {/* {[{ classCode: '2APIC3' }].map((d) => ( */}

              {l.map((d) => (
                <TabsTrigger key={d.classCode} value={d.classCode ?? 'all'}>
                  {d.classCode}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent className='p-1 w-full' value={'all'}>
              <DataTable
                // key={i}
                data={students}
                columns={columns}
              />
            </TabsContent>
          </Tabs>
        </Suspense>
        {/* ))} */}
      </div>

      {/* <DataTable data={tasks} columns={columns} /> */}
    </>
  )
}
