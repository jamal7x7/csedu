'use client'

import React, { useState, useTransition } from 'react'
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
import {
  TLoginSchema,
  TPairSignInSchema,
  TPairSignUpSchema,
  loginSchema,
  pairSignInSchema,
  pairSignUpSchema,
} from '@/lib/types'

import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import FormError from '@/components/form-error'
import FormSuccuss from '@/components/form-success'
import { loginAction, pairSignInAction } from '@/actions/loginAction'
import Link from 'next/link'
import { PasswordInput } from '@/components/password-input'
import { Combobox } from '../pairSignUp/page'

const PairSignInForm = () => {
  const router = useRouter()
  // 1. Define your form.
  const form = useForm<TPairSignUpSchema>({
    resolver: zodResolver(pairSignUpSchema),
    // defaultValues: {
    //   pair1: 'jamal',
    //   pair2: 'kamal',
    //   pairpass: 'jamal',
    // },
  })

  const [error, setError] = useState<string | undefined>('')
  const [success, setSuccess] = useState<string | undefined>('')
  const [isPending, startTransition] = useTransition()

  // 2. Define a submit handler.
  const onSubmit = async (data: TPairSignInSchema) => {
    console.log('from login', data)

    setError('')
    setSuccess('')
    startTransition(() => {
      pairSignInAction(data).then((data) => {
        setError(data?.error)
        setSuccess(data?.success)
      })
    })

    const pairName = [data.pair1, data.pair2].toSorted().join('_&_')

    const signInData = await signIn('credentials', {
      username: pairName,
      password: data.pairpass,
      role: 'STUDENTS_PAIR',
      //   pair1: data.pair1,
      //   pair2: data.pair2,
      //   pairpass: data.pairpass,
      redirect: false,
    })
    // console.log('signInData error', signInData)

    if (signInData?.error) {
      console.log('signInData error', signInData.error)
    } else {
      router.refresh()
      router.push('/')
    }

    if (signInData?.ok) {
      // studentLoggedIn.state = true
      router.refresh()
      toast({
        variant: 'success',
        title: 'OK!',
        description: 'Bien Venue ' + data.pair1 + '&' + data.pair2,
        action: <ToastAction altText='Goto schedule to undo'>Ok</ToastAction>,
      })
    } else {
      // studentLoggedIn.state = false
      toast({
        variant: 'destructive',
        title: 'Oops!',
        description: 'Essai une autre fois',
        action: <ToastAction altText='Goto schedule to undo'>Ok</ToastAction>,
      })
    }

    // form.reset()
  }

  const { toast } = useToast()

  return (
    <div className='min-h-screen  flex flex-col items-center justify-center border '>
      <div className='w-full  sm:w-[28rem] flex flex-col items-center justify-center border p-10 rounded-xl  bg-muted/30'>
        <h1 className=' font-black text-4xl mb-8 '>Se Connecter!</h1>
        <div className='min-w-full'>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
              <Combobox pairname='pair1' form={form} />
              <Combobox pairname='pair2' form={form} />

              <FormField
                control={form.control}
                name='pairpass'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor='pairpass'>Mot de Pass</FormLabel>
                    <FormControl>
                      <div className='min-w-full'>
                        <PasswordInput
                          {...field}
                          className=' '
                          id='pairpass'
                          type='password'
                          placeholder='Mot de pass'
                          disabled={isPending}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* <Button type='submit'>Submit</Button> */}
              <FormError message={error} />
              <FormSuccuss message={success} />
              <Button
                type='submit'
                disabled={isPending}
                className='w-full mt-16'
                // onClick={addNewStudentHandler}
              >
                Se Connecter
              </Button>
            </form>
          </Form>

          <p className='mt-8 text-center text-xs text-muted-foreground'>
            Vous avez déjà un compte ?{' '}
            <Link href='/pairSignUp' className='underline font-bold'>
              {' '}
              register
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default PairSignInForm
