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
import { useForm } from 'react-hook-form'
import { TSignUpSchema, signUpSchema } from '@/lib/types'
import { LevelTabs } from '@/components/level-tabs'
import { useRouter } from 'next/navigation'

const AddNewUser = () => {
  const router = useRouter()
  // 1. Define your form.
  const form = useForm<TSignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      // studentNumber: '1',
      // firstName: 'firstName',
      // lastName: 'lastName',

      username: 'username',
      password: 'password',
      confirmPassword: 'password',
    },
  })

  // 2. Define a submit handler.
  const onSubmit = async (data: TSignUpSchema) => {
    // console.log('data from addstudent page', data)
    // function onSubmit() {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.

    const res = await fetch('/api/users', {
      method: 'POST',
      headers: { 'Centent-Type': 'application/json' },
      body: JSON.stringify(data),
    })

    try {
      const responseData = await res.json()
      if (responseData.ok) {
        // router.refresh()
        router.push('/login')
        toast({
          variant: 'success',
          title: 'Enregistrement fait',
          description: 'Maintenant, connectez-Vous',
          action: <ToastAction altText='Goto schedule to undo'>Ok</ToastAction>,
        })
      } else {
        toast({
          variant: 'destructive',
          title: "Error d'Enregistrement",
          description: 'Problem: ' + responseData.errors?.err?.name,
          action: <ToastAction altText='Goto schedule to undo'>Ok</ToastAction>,
        })
      }
    } catch (err: any) {
      console.log(err.message)
    }
  }

  const { toast } = useToast()

  return (
    <div className='min-h-screen  flex flex-col items-center justify-center border '>
      <div className='sm:w-1/3 flex flex-col items-center justify-center border p-10 rounded-xl  bg-muted/30'>
        <h1 className=' font-black text-4xl mb-8 '>Créer votre compte</h1>
        <div className='min-w-full'>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
              {/* ==============================================LevelTabs=================================================== */}
              {/* <FormField
                control={form.control}
                name='level'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor='level'>Niveau et Class</FormLabel>
                    <FormControl>
                      <div
                        className={cn(
                          'min-w-full bord bg-muted/10 border rounded-2xl p-2 '
                        )}
                      >
                        <LevelTabs />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}

              {/* =================================================================================================== */}

              {/* ==============================================LevelTabs=================================================== */}
              <FormField
                control={form.control}
                name='username'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor='username'>Nom d'utilisateur</FormLabel>
                    <FormControl>
                      <div className='min-w-full'>
                        <Input
                          {...field}
                          className=' '
                          id='username'
                          type='text'
                          placeholder="Nom d'utilisateur"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* =================================================================================================== */}

              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor='password'>Mot de Pass</FormLabel>
                    <FormControl>
                      <div className='min-w-full'>
                        <Input
                          {...field}
                          className=' '
                          id='password'
                          type='password'
                          placeholder='Mot de pass'
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='confirmPassword'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor='confirmPassword'>
                      Confirmer le Mot de pass
                    </FormLabel>
                    <FormControl>
                      <div className='min-w-full'>
                        <Input
                          {...field}
                          className=' '
                          id='confirmPassword'
                          type='password'
                          placeholder='confirmer le Mot de pass'
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* <Button type='submit'>Submit</Button> */}
              <Button
                type='submit'
                // disabled
                className=' '
                // onClick={addNewStudentHandler}
              >
                S &apos;inscrire
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
    // </div>
  )
}

export default AddNewUser

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
