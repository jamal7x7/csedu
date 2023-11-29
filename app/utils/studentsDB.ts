type Student = {
  studentId: string
  level: number
  classCode: string
  studentNumber: number
  firstName: string
  lastName: string
  massarNumber: number
  password: string
  group: string
}

export const students: Student[] = [
  {
    studentId: '1',
    level: 1,
    classCode: 'APIC1',
    studentNumber: 1,
    firstName: 'Jamal',
    lastName: 'Hassani',
    massarNumber: 1234,
    password: 'password1',
    group: '1',
  },
  {
    studentId: '2',
    level: 1,
    classCode: 'APIC1',
    studentNumber: 2,
    firstName: 'Kamal',
    lastName: 'Hani',
    massarNumber: 1234,
    password: 'password2',
    group: '1',
  },
  {
    studentId: '3',
    level: 1,
    classCode: 'APIC1',
    studentNumber: 3,
    firstName: 'Amal',
    lastName: 'Rani',
    massarNumber: 1234,
    password: 'password3',
    group: '1',
  },
]
