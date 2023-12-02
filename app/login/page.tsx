'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import { ToastAction } from '@/components/ui/toast'
import { useToast } from '@/components/ui/use-toast'

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
import { TLoginSchema, loginSchema } from '@/lib/types'

import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

// export const studentLoggedIn = { state: false }

const AddNewStudent = () => {
  const router = useRouter()
  // 1. Define your form.
  const form = useForm<TLoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: 'jamal',
      password: 'jamal',
    },
  })

  // 2. Define a submit handler.
  const onSubmit = async (data: TLoginSchema) => {
    console.log('from login', data)

    const signInData = await signIn('credentials', {
      username: data.username,
      password: data.password,
      redirect: false,
    })
    console.log('signInData error', signInData)

    if (signInData?.error) {
      console.log('signInData error', signInData.error)
    } else {
      router.refresh()
      router.push('/studentDashboard')
    }
    // function onSubmit() {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.

    // const res: Response = await fetch('/api/students', {
    //   method: 'POST',
    //   headers: { 'Centent-Type': 'application/json' },
    //   body: JSON.stringify(data),
    // })

    // const responseData = await res.json()

    // // const responseData = await res.json()

    if (signInData?.ok) {
      // studentLoggedIn.state = true
      router.refresh()
      toast({
        variant: 'success',
        title: 'login!',
        description: 'Bien Venue!!!!! ',
        action: <ToastAction altText='Goto schedule to undo'>Ok</ToastAction>,
      })
    } else {
      // studentLoggedIn.state = false
      toast({
        variant: 'destructive',
        title: 'Error!',
        description: 'essai une autre fois ',
        action: <ToastAction altText='Goto schedule to undo'>Ok</ToastAction>,
      })
    }

    // form.reset()
  }

  // const [studentNumber, setStudentNumber] = useState('')
  // const [firstName, setFirstName] = useState('')
  // const [lastName, setLastName] = useState('')
  // const [password, setPassword] = useState('')
  // const [confirmPassword, setConfirmPassword] = useState('')

  const { toast } = useToast()

  return (
    <div className='min-h-screen  flex flex-col items-center justify-center border '>
      <div className='sm:w-1/3 flex flex-col items-center justify-center border p-10 rounded-xl  bg-muted/30'>
        <h1 className=' font-black text-4xl mb-8 '>Se Connecter</h1>
        <div className='min-w-full'>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
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

              {/* <Button type='submit'>Submit</Button> */}
              <Button
                type='submit'
                // disabled
                className=' '
                // onClick={addNewStudentHandler}
              >
                Se Connecter
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
    // </div>
  )
}

export default AddNewStudent

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
