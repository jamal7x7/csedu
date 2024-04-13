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

async function getClasses() {
  noStore()
  const classes = await db.query.sClass.findMany({})

  return classes
}

async function getStudents() {
  noStore()
  const classes = await db.query.sClass.findMany({
    // where: (sClass, { eq }) => eq(sClass.classCode, classCode),
    with: {
      students: {
        with: {
          profile: {
            with: {
              user: true,
            },
          },
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
  })

  const infoList: TStudentsGradesWithInfoSchema[] = classes?.map(
    (c) =>
      ({
        id: c?.id?.toString() ?? '0',
        classCode: c.classCode ?? '---',
        level: c.level ?? '---',
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
        studentsGradesTable: c?.students
          ?.map(
            (s) =>
              ({
                id: s.profile?.user?.id?.toString() ?? '',
                studentName: s.profile?.user?.firstName ?? '',
                classCode: s.classCode ?? '',
                birthDate: s.profile?.birthDate ?? '',
                studentClassNumber: s?.studentClassNumber ?? 0,
                studentMassarNumber: s?.massarNumber ?? '',
                test1: s?.grade?.tests?.[0]?.test?.grade ?? 0,
                test2: s?.grade?.tests?.[1]?.test?.grade ?? 0,
                test3: s?.grade?.tests?.[2]?.test?.grade ?? 0,
                integratedActivities: s?.grade?.tests?.[3]?.test?.grade ?? 0,
                label: 'test',
              } as TStudentsGradesSchema)
          )
          .toSorted((a, b) => {
            if (
              a.studentClassNumber === undefined ||
              b.studentClassNumber === undefined
            ) {
              return 0
            }

            return a.studentClassNumber - b.studentClassNumber
          }),
      } as TStudentsGradesWithInfoSchema)
  )

  console.log('🚀 ~ getStudentsWithInfoList ~ l:', infoList)

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

  const Classes = await getClasses()

  const students = await getStudents()

  const studentsWithInfo: TStudentsGradesWithInfoSchema[] =
    await getStudentsWithInfoList()

  const AllStudentsList = students?.flatMap((s) => s.studentsGradesTable)
  const studentsOfClassList = (c: string) =>
    students
      ?.filter((si) => si.classCode === c)
      .flatMap((s) => s.studentsGradesTable)

  return (
    <>
      <div
        // className='h-full p-8'
        className='flex-col flex-1 hidden mb-8 space-y-8 md:flex'
      >
        {/* <div className='flex items-center justify-between space-y-2'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>
              Liste des élèves
            </h2>
            <p className='text-muted-foreground'>
              Voici la Liste de vos élèves
            </p>
          </div>
          <div className='flex items-center space-x-2'>
            <UserNav />
            <DrawerDialogDropZone />
          </div>
        </div> */}
        {/* {list.map((dl, i) => ( */}
        <Suspense fallback={'wait...'}>
          <div className='w-full '>
            <Tabs
              className='flex flex-col gap-8 items-start '
              defaultValue='all'
            >
              {/* <TabsList className='w-full justify-start sticky top-0 z-20'> */}
              <TabsList className='h-12 border-muted  inline-flex items-center text-muted-foreground w-full justify-start rounded-none border-b bg-transparent p-0'>
                <div className='flex items-center justify-between w-full '>
                  <div className=' text-nowrap overflow-scroll'>
                    <TabsTrigger
                      className='h-12  inline-flex items-center justify-center whitespace-nowrap py-1 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background relative rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none '
                      value='all'
                    >
                      Tous
                    </TabsTrigger>
                    {/* {[{ classCode: '2APIC3' }].map((d) => ( */}

                    {Classes.toSorted((a, b) => {
                      if(a.classCode && b.classCode) {
                      if (a.classCode < b.classCode) {
                        return -1
                      }
                      if (a.classCode > b.classCode) {
                        return 1
                      }
                      return 0
                    }}).map((d) => (
                      <TabsTrigger
                        className='h-12  inline-flex items-center justify-center whitespace-nowrap py-1 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background relative rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none'
                        key={d.classCode}
                        value={d.classCode ?? ''}
                      >
                        {d.classCode &&
                          `${
                            d.classCode[0] + (d.classCode[4] === 'G' ? 'G' : '')
                          }/${d.classCode[6]}`}
                      </TabsTrigger>
                    ))}
                  </div>
                  <DrawerDialogDropZone />
                </div>
              </TabsList>

              <TabsContent
                // className='p-1 w-full text-ellipsis text-nowrap overflow-scroll '
                className='p-1 w-full   '
                value={'all'}
              >
                <DataTable data={AllStudentsList} columns={columns} />
              </TabsContent>

              {Classes.map((d) => (
                <TabsContent
                  // className='p-1 w-full  text-ellipsis text-nowrap overflow-scroll'
                  className='p-1 w-full '
                  value={d.classCode ?? ''}
                  key={d.classCode}
                >
                  <DataTable
                    data={d?.classCode && studentsOfClassList(d?.classCode)}
                    columns={columns}
                  />
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </Suspense>
        {/* ))} */}
      </div>

      {/* <DataTable data={tasks} columns={columns} /> */}
    </>
  )
}
