'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import { ToastAction } from '@/components/ui/toast'
import { useToast } from '@/components/ui/use-toast'
import { cn } from '@/lib/utils'

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

import { zodResolver } from '@hookform/resolvers/zod'
import { UseFormReturn, useForm } from 'react-hook-form'
import { TSignUpSchema, signUpSchema } from '@/lib/types'
import { LevelTabs } from '@/components/level-tabs'
import { useRouter } from 'next/navigation'

type UseFormProps = UseFormReturn<
  {
    username: string
    password: string
    confirmPassword: string
    userId?: number | undefined
    classCode?: string | undefined
    studentNumber?: number | undefined
    firstName: string
    lastName: string
    email?: string | undefined
    createdAt?: string | undefined
    updatedAt?: string | undefined
  },
  any,
  undefined
>

const UserInfo = ({ form }: { form: UseFormProps }) => {
  const router = useRouter()

  return (
    <>
      <FormField
        control={form.control}
        name='firstName'
        render={({ field }) => (
          <FormItem>
            <FormLabel htmlFor='firstName'>Prénom</FormLabel>
            <FormControl>
              <div className='min-w-full'>
                <Input
                  required
                  {...field}
                  className=' '
                  id='firstName'
                  type='text'
                  placeholder='Prénom'
                />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name='lastName'
        render={({ field }) => (
          <FormItem>
            <FormLabel htmlFor='lastName'>Nom</FormLabel>
            <FormControl>
              <Input
                {...field}
                className=' '
                id='lastName'
                type='text'
                placeholder='Nom'
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name='studentNumber'
        render={({ field }) => (
          <FormItem>
            <FormLabel htmlFor='studentNumber'>Numéro de classe</FormLabel>
            <FormControl>
              <Input
                required
                {...field}
                className=' '
                id='studentNumber'
                type='number'
                placeholder='Numéro de classe'
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* <Button type='submit'>Submit</Button> */}
      {/* <Button
                type='submit'
                // disabled
                className=' '
                // onClick={addNewStudentHandler}
              >
                S &apos;inscrire
              </Button> */}
    </>
  )
}

export default UserInfo

// from: https://github.com/ByteGrad/react-hook-form-with-zod-and-server-side/blob/main/components/form-with-rhf-and-zod-and-server.tsx

// <div className='min-h-screen flex flex-col items-center justify-center border '>
//   <div className='w-96 flex flex-col items-center justify-center border p-10 rounded-xl  bg-muted/30'>
//     Créer votre compte
//     <div className='min-w-full'>
//       <Label htmlFor='studentNumber'>Numero de class</Label>
//       <Input
//         className=' '
//         id='studentNumber'
//         type='text'
//         onChange={(e) => setStudentNumber(e.target.value)}
//         value={studentNumber}
//         placeholder='Entrer votre numero de class'
//         required={true}
//       />
//     </div>
//     <br />
//     <div className='min-w-full'>
//       <Label htmlFor='firstName'>Prenom</Label>
//       <Input
//         id='firstName'
//         className=' '
//         type='text'
//         onChange={(e) => setFirstName(e.target.value)}
//         value={firstName}
//         placeholder='Entrer votre Prenom'
//       />
//     </div>
//     <br />
//     <div className='min-w-full'>
//       <Label htmlFor='lastName'>Nom de famille</Label>
//       <Input
//         id='lastName'
//         className=' '
//         type='text'
//         onChange={(e) => setLastName(e.target.value)}
//         value={lastName}
//         placeholder='Entrer votre nom de famille'
//       />
//     </div>
//     <br />
//     <div className='min-w-full'>
//       <Label htmlFor='password'>mot de pass</Label>
//       <Input
//         id='password'
//         className=''
//         type='password'
//         onChange={(e) => setPassword(e.target.value)}
//         value={password}
//         placeholder='Entrer votre mot de pass'
//       />
//     </div>
//     <br />
//     <div className='min-w-full'>
//       <Label htmlFor='confirmPassword'>mot de pass</Label>
//       <Input
//         id='confirmPassword'
//         className=''
//         type='password'
//         onChange={(e) => setConfirmPassword(e.target.value)}
//         value={confirmPassword}
//         placeholder='Confirmer votre mot de pass'
//       />
//     </div>
//     <br />
//     <Button disabled className=' ' onClick={addNewStudentHandler}>
//       S'inscrire
//     </Button>
//   </div>

//

//  <div className='sm:flex justify-between gap-4'>
//                       <FormItem>
//                         <FormLabel>Prenom</FormLabel>
//                         <FormControl>
//                           {/* <Input placeholder='shadcn' {...field} /> */}
//                           <div className='min-w-full'>
//                             <Input
//                               {...form.register('firstName')}
//                               {...field}
//                               id='firstName'
//                               className=' '
//                               type='text'
//                               // onChange={(e) => setFirstName(e.target.value)}
//                               // value={firstName}
//                               placeholder='Entrer votre Prenom'
//                             />
//                           </div>
//                         </FormControl>
//                         {/* <FormDescription>
//                         Entrer votre numero de class.
//                       </FormDescription> */}
//                         <FormMessage />
//                       </FormItem>
//                       <FormItem>
//                         <FormLabel>Nom de famille</FormLabel>
//                         <FormControl>
//                           {/* <Input placeholder='shadcn' {...field} /> */}
//                           <div className='min-w-full'>
//                             <Input
//                               {...form.register('lastName')}
//                               {...field}
//                               id='lastName'
//                               className=' '
//                               type='text'
//                               // onChange={(e) => setLastName(e.target.value)}
//                               // value={lastName}
//                               placeholder='Entrer votre nom de famille'
//                             />
//                           </div>
//                         </FormControl>
//                         {/* <FormDescription>
//                         Entrer votre numero de class.
//                       </FormDescription> */}
//                         <FormMessage />
//                       </FormItem>
//                     </div>
//                     <FormItem>
//                       <FormLabel>Group</FormLabel>
//                       <FormControl>
//                         {/* <Input placeholder='shadcn' {...field} /> */}
//                         <div className='min-w-full'>
//                           <Input
//                             {...form.register('group')}
//                             {...field}
//                             id='group'
//                             className=' '
//                             type='text'
//                             // onChange={(e) => setLastName(e.target.value)}
//                             // value={lastName}
//                             placeholder='Entrer votre group'
//                           />
//                         </div>
//                       </FormControl>
//                       {/* <FormDescription>
//                         Entrer votre numero de class.
//                       </FormDescription> */}
//                       <FormMessage />
//                     </FormItem>
//                     <FormItem>
//                       <FormLabel>Mot de pass</FormLabel>
//                       <FormControl>
//                         {/* <Input placeholder='shadcn' {...field} /> */}
//                         <div className='min-w-full'>
//                           <Input
//                             {...form.register('password')}
//                             {...field}
//                             id='password'
//                             className=''
//                             type='password'
//                             // onChange={(e) => setPassword(e.target.value)}
//                             // value={password}
//                             placeholder='Entrer votre mot de pass'
//                           />
//                         </div>
//                       </FormControl>
//                       {/* <FormDescription>
//                         Entrer votre numero de class.
//                       </FormDescription> */}
//                       <FormMessage />
//                     </FormItem>
//                     <FormItem>
//                       <FormLabel>Confirmer votre mot de pass</FormLabel>
//                       <FormControl>
//                         {/* <Input placeholder='shadcn' {...field} /> */}
//                         <div className='min-w-full'>
//                           <Input
//                             {...form.register('confirmPassword')}
//                             {...field}
//                             id='confirmPassword'
//                             className=''
//                             type='password'
//                             // onChange={(e) => setConfirmPassword(e.target.value)}
//                             // value={confirmPassword}
//                             placeholder='Confirmer votre mot de pass'
//                           />
//                         </div>
//                       </FormControl>
//                       {/* <FormDescription>
//                         Entrer votre numero de class.
//                       </FormDescription> */}
//                       <FormMessage />
//                     </FormItem>
