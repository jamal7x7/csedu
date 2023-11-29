type Students = {
  level: number
  classes: Class[]
}

type Class = {
  class: string
  studentInfo: StudentInfo[]
}

type StudentInfo = {
  studentId: number
  studentNumber: number
  firstName: string
  lastName: string
  massarNumber: number
  password: string
}

export const students: Students[] = [
  {
    level: 1,
    classes: [
      {
        class: 'APIC1',
        studentInfo: [
          {
            studentId: 1,
            studentNumber: 1,
            firstName: 'Jamal',
            lastName: 'Hassani',
            massarNumber: 1234,
            password: 'password',
          },
          {
            studentId: 2,
            studentNumber: 2,
            firstName: 'Kamal',
            lastName: 'Rassani',
            massarNumber: 1231,
            password: 'password',
          },
          {
            studentId: 3,
            studentNumber: 3,
            firstName: 'Amal',
            lastName: 'Madani',
            massarNumber: 1923,
            password: 'password',
          },
        ],
      },
    ],
  },
  {
    level: 2,
    classes: [
      {
        class: 'APIC1',
        studentInfo: [
          {
            studentId: 1,
            studentNumber: 1,
            firstName: 'Omar',
            lastName: 'Hassani',
            massarNumber: 1234,
            password: 'password',
          },
          {
            studentId: 2,
            studentNumber: 2,
            firstName: 'Hanane',
            lastName: 'Rassani',
            massarNumber: 1231,
            password: 'password',
          },
          {
            studentId: 3,
            studentNumber: 3,
            firstName: 'Ali',
            lastName: 'Madani',
            massarNumber: 1923,
            password: 'password',
          },
        ],
      },
    ],
  },
  {
    level: 3,
    classes: [
      {
        class: 'APIC1',
        studentInfo: [
          {
            studentId: 1,
            studentNumber: 1,
            firstName: 'Jamila',
            lastName: 'Hassani',
            massarNumber: 1234,
            password: 'password',
          },
          {
            studentId: 2,
            studentNumber: 2,
            firstName: 'Nohaila',
            lastName: 'Rassani',
            massarNumber: 1231,
            password: 'password',
          },
          {
            studentId: 3,
            studentNumber: 3,
            firstName: 'Farrah',
            lastName: 'Madani',
            massarNumber: 1923,
            password: 'password',
          },
        ],
      },
    ],
  },
]
