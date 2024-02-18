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
  classCode: z.string().optional(),
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
  classCode: z.string().optional(),
  title: z.string().optional(),
  sYear: z.string().optional(),
  establishmentCode: z.string().optional(),
  schoolName: z.string().optional(),
  academy: z.string().optional(),
  delegation: z.string().optional(),
  teacherName: z.string().optional(),
  subject: z.string().optional(),
  semester: z.string().optional(),
  studentsGradesTableHeader: z.array(z.string()).optional(),
  studentsGradesTable: z.array(studentsGradesSchema).optional(),
})

export type TStudentsGradesWithInfoSchema = z.infer<
  typeof studentsGradesWithInfoSchema
>
