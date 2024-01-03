import * as z from 'zod'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { chapter } from '@/db/schema/unit'

export const signUpSchema = z
  .object({
    userId: z.number().min(1, { message: 'au moins un caractère' }).optional(),
    // level: z.number().min(1, { message: 'au moins un caractère' }).optional(),
    classCode: z
      .string()
      // .min(1, { message: 'au moins un caractère' })
      .optional(),
    studentNumber: z.coerce
      .number()
      .min(1, { message: 'au moins un chiffre' })
      .optional(),
    firstName: z.string().min(1, { message: 'au moins un caractère' }),
    lastName: z.string().min(1, { message: 'au moins un caractère' }),
    username: z.string().min(1, { message: 'au moins un caractère' }),
    email: z.string().email({ message: 'email incorrect!' }).optional(),
    // massarNumber: z
    //   .string()
    //   .min(1, { message: 'au moins un caractère' })
    //   .optional(),
    // group: z.string().min(1, { message: 'au moins un caractère' }).optional(),
    password: z.string().min(4, { message: 'au moins 4 caractères' }),
    confirmPassword: z.string().min(1, { message: '' }),
    createdAt: z
      .string()
      .min(1, { message: 'au moins un caractère' })
      .optional(),
    updatedAt: z
      .string()
      .min(1, { message: 'au moins un caractère' })
      .optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'le mot de pass doit être le meme',
    path: ['confirmPassword'],
  })

export type TSignUpSchema = z.infer<typeof signUpSchema>

export const loginSchema = z.object({
  // studentId: z.string().min(1, { message: 'au moins un caractère' }).optional(),
  // studentNumber: z.string().min(1, { message: 'au moins un caractère' }),
  username: z.string().min(1, { message: 'au moins un caractère' }),
  // group: z.string().min(1, { message: 'au moins un caractère' }),
  // firstName: z.string().min(1, { message: 'this👏is👏too👏big' }).optional(),
  // lastName: z.string().min(1, { message: 'this👏is👏too👏big' }).optional(),
  password: z.string().min(4, { message: 'au moins 4 caractères' }),
})
// .refine((data) => data.password === data.confirmPassword, {
//   message: 'le mot de pass doit être le meme',
//   path: ['confirmPassword'],
// })

export type TLoginSchema = z.infer<typeof loginSchema>

export const formChapterTitleSchema = z.object({
  order: z.number().optional(),
  level: z.coerce.number().optional(),
  title: z
    .string()
    .trim()
    .min(4, {
      message: 'The title must be at least 4 caractères!!!',
    })
    .max(100, { message: 'The title must be at most 100 caractères' }),
})

export type TFormChapterTitleSchema = z.infer<typeof formChapterTitleSchema>

export const formBlockSchema = z.object({
  chapterId: z.coerce.number().optional(),
  content: z.string().min(4, { message: 'au moins 4 caractères' }).trim(),
  type: z.enum([
    'CHAPTER_TITLE',
    'INTRO',
    'P',
    'H1',
    'H2',
    'H3',
    'H4',
    'H5',
    'H6',
    'DEF',
    'EXEMPLE',
    'LIST',
    'FIGURE',
    'Blockquote',
    'InlineCode',
    'Lead',
    'Large',
    'Small',
    'Muted',
    'INTRO',
  ]),
  // .max(10000, { message: 'The title must be at most 10000 caractères' }),
})

export type TformBlockSchema = z.infer<typeof formBlockSchema>
// ===============================================================

// export const insertChapterSchema = createInsertSchema(chapter)

// export const formChapterTitleSchema = createSelectSchema(chapter)
// export type TFormChapterTitleSchema = z.infer<typeof formChapterTitleSchema>
