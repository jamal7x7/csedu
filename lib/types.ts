import * as z from 'zod'

export const signUpSchema = z
  .object({
    studentId: z
      .number()
      .min(1, { message: 'au moins un caractere' })
      .optional(),
    level: z.number().min(1, { message: 'au moins un caractere' }).optional(),
    classCode: z
      .string()
      .min(1, { message: 'au moins un caractere' })
      .optional(),
    studentNumber: z
      .number()
      .min(1, { message: 'au moins un caractere' })
      .optional(),
    firstName: z.string().min(1, { message: 'this👏is👏too👏big' }).optional(),
    lastName: z.string().min(1, { message: 'this👏is👏too👏big' }).optional(),
    username: z.string().min(1, { message: 'au moins un caractere' }),
    email: z.string().email({ message: 'email incorrect!' }).optional(),
    massarNumber: z
      .string()
      .min(1, { message: 'au moins un caractere' })
      .optional(),
    group: z.string().min(1, { message: 'au moins un caractere' }).optional(),
    password: z.string().min(4, { message: 'au moins 4 caracteres' }),
    confirmPassword: z.string().min(1, { message: '' }),
    createdAt: z
      .string()
      .min(1, { message: 'au moins un caractere' })
      .optional(),
    updatedAt: z
      .string()
      .min(1, { message: 'au moins un caractere' })
      .optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'le mot de pass doit etre le meme',
    path: ['confirmPassword'],
  })

export type TSignUpSchema = z.infer<typeof signUpSchema>

export const loginSchema = z.object({
  // studentId: z.string().min(1, { message: 'au moins un caractere' }).optional(),
  // studentNumber: z.string().min(1, { message: 'au moins un caractere' }),
  username: z.string().min(1, { message: 'au moins un caractere' }),
  // group: z.string().min(1, { message: 'au moins un caractere' }),
  // firstName: z.string().min(1, { message: 'this👏is👏too👏big' }).optional(),
  // lastName: z.string().min(1, { message: 'this👏is👏too👏big' }).optional(),
  password: z.string().min(4, { message: 'au moins 4 caracteres' }),
})
// .refine((data) => data.password === data.confirmPassword, {
//   message: 'le mot de pass doit etre le meme',
//   path: ['confirmPassword'],
// })

export type TLoginSchema = z.infer<typeof loginSchema>
