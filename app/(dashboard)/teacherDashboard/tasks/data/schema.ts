import { z } from 'zod'

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const taskSchema = z.object({
  id: z.string(),
  title: z.string(),
  status: z.string(),
  label: z.string(),
  priority: z.string(),
})

export type Task = z.infer<typeof taskSchema>

export const studentsGradesSchema = z.object({
  id: z.string(),
  studentMassarNumber: z.string(),
  studentName: z.string(),
  birthDate: z.string(),
  test1: z.number().optional(),
  test2: z.number().optional(),
  test3: z.number().optional(),
  integratedActivities: z.number().optional(),
  label: z.string().optional(),
  studentClassNumber: z.number().optional(),
})

export type TStudentsGradesSchema = z.infer<typeof studentsGradesSchema>

export const studentsGradesWithInfoSchema = z.object({
  id: z.string().optional(),
  classCode: z.string(),
  title: z.string(),
  academyYear: z.string(),
  establishmentCode: z.string(),
  schoolName: z.string(),
  academy: z.string(),
  delegation: z.string(),
  teacherName: z.string(),
  subject: z.string(),
  semestre: z.string(),
  studentsGradesTableHeader: z.array(z.string()),
  studentsGradesTable: z.array(studentsGradesSchema),
})

export type TStudentsGradesWithInfoSchema = z.infer<
  typeof studentsGradesWithInfoSchema
>
