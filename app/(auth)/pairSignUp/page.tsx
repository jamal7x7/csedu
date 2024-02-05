'use client'

import React, { useEffect, useState, useTransition } from 'react'
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
import { UseFormReturn, useForm } from 'react-hook-form'
import {
  TLoginSchema,
  TPairSignInSchema,
  TPairSignUpSchema,
  loginSchema,
  pairSignInSchema,
} from '@/lib/types'

import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import FormError from '@/components/form-error'
import FormSuccuss from '@/components/form-success'
import { loginAction, pairSignInAction } from '@/actions/loginAction'
import Link from 'next/link'

import { DrawerDialogPair } from './DrawDialogPair'

import { Check, ChevronsUpDown } from 'lucide-react'

import { cn } from '@/lib/utils'

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { getStudentsAction, pairSignUpAction } from '@/actions/signUpAction'
import { User } from '@/db/schema/user'
import { z } from 'zod'
import { PasswordInput } from '@/components/password-input'

const PairSignInForm = () => {
  const router = useRouter()
  // 1. Define your form.
  const form = useForm<TPairSignInSchema>({
    resolver: zodResolver(pairSignInSchema),
    // defaultValues: {
    //   pair1: '2319',
    //   pair2: '2320',
    //   pairpass: 'jamal',
    // },
  })

  const [error, setError] = useState<string | undefined>('')
  const [success, setSuccess] = useState<string | undefined>('')
  const [isPending, startTransition] = useTransition()

  // 2. Define a submit handler.
  const onSubmit = async (data: TPairSignUpSchema) => {
    console.log('from PAIR Sign UP ========>', data)
    toast({
      title: 'You submitted the following values:',
      description: (
        <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
          <code className='text-white'>{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })

    // setError('')
    // setSuccess('')
    // startTransition(() => {
    //   pairSignInAction(data).then((data) => {
    //     setError(data?.error)
    //     setSuccess(data?.success)
    //   })
    // })

    const pairName = [data.pair1, data.pair2].toSorted().join('_&_')

    pairSignUpAction(data).then((data) => {
      setError(data?.error)
      setSuccess(data?.success)
    })

    // const signInData = await signIn('credentials', {
    //   username: pairName,
    //   password: data.pairpass,
    //   role: 'STUDENTS_PAIR',
    //   //   pair1: data.pair1,
    //   //   pair2: data.pair2,
    //   //   pairpass: data.pairpass,
    //   redirect: false,
    // })
    // console.log('signInData error', signInData)

    // if (signInData?.error) {
    //   console.log('signInData error', signInData.error)
    // } else {
    //   router.refresh()
    //   router.push('/')
    // }

    // if (signInData?.ok) {
    //   // studentLoggedIn.state = true
    //   router.refresh()
    //   toast({
    //     variant: 'success',
    //     title: 'OK!',
    //     description: 'Bien Venue ' + data.pair1 + '&' + data.pair2,
    //     action: <ToastAction altText='Goto schedule to undo'>Ok</ToastAction>,
    //   })
    // } else {
    //   // studentLoggedIn.state = false
    //   toast({
    //     variant: 'destructive',
    //     title: 'Oops!',
    //     description: 'Essai une autre fois',
    //     action: <ToastAction altText='Goto schedule to undo'>Ok</ToastAction>,
    //   })
    // }

    // form.reset()
  }

  const { toast } = useToast()

  return (
    <div className='min-h-screen  flex flex-col items-center justify-center border '>
      <div className='w-full  sm:w-[28rem] flex flex-col items-center justify-center border p-10 rounded-xl  bg-muted/30'>
        <h1 className=' font-black text-4xl mb-8 '>Inscrivez‑vous</h1>
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
            <Link href='/pairSignIn' className='underline font-bold'>
              {' '}
              Se connecter
            </Link>
          </p>
        </div>
      </div>
    </div>
    // </div>
  )
}

export default PairSignInForm

export function Combobox({
  form,
  pairname,
}: {
  form: UseFormReturn<
    {
      pair1: string
      pair2: string
      pairpass: string
    },
    any,
    undefined
  >
  pairname: 'pair1' | 'pair2'
}) {
  // console.log('🚀 ~ Combobox ~ form:', form)
  const [open, setOpen] = React.useState(false)
  // const [value, setValue] = React.useState('')
  const [studentsList, setStudentsList] = useState<User[] | any[]>([])

  useEffect(() => {
    const updateViews = async () => {
      const users = await getStudentsAction('3APIC-1')

      // const classStudents: User[] | any[] = users.filter(
      //   (u) => u.profile.student.classCode === '3APIC-4'
      // )

      setStudentsList(users)
    }

    updateViews()
    // // console.log('🚀 ~ DrawerDialogPair ~ studentsList:', studentsList)
  }, [])

  return (
    <FormField
      control={form.control}
      name={pairname}
      render={({ field }) => (
        <FormItem>
          <FormLabel htmlFor={pairname}>
            {pairname == 'pair1' ? 'Binôme 1' : 'Binôme 2'}
          </FormLabel>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant='outline'
                  role='combobox'
                  aria-expanded={open}
                  className={cn(
                    'min-w-full flex  justify-between ',
                    !field.value && 'text-muted-foreground'
                  )}
                >
                  {field.value
                    ? studentsList.find((s) => s.id.toString() === field.value)
                        ?.firstName
                    : 'Sélectionnez votre nom...'}

                  <span className='text-xs text-muted-foreground border rounded-sm px-1'>
                    {
                      studentsList.find((s) => s.id.toString() === field.value)
                        ?.profile?.student?.massarNumber
                    }
                    -
                    {
                      studentsList.find((s) => s.id.toString() === field.value)
                        ?.profile?.student?.classCode
                    }
                  </span>

                  <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className='w-[400px] p-0 h-[400px] '>
              <Command>
                <CommandInput placeholder='Chercher votre nom...' />
                <CommandEmpty>Aucun nom trouve.</CommandEmpty>
                <CommandGroup className=' overflow-scroll'>
                  {studentsList.map((s, i) => (
                    <CommandItem
                      key={s.id}
                      value={s.id.toString()}
                      onSelect={(currentValue) => {
                        form.setValue(pairname, currentValue)
                        // form.setValue(
                        //   // currentValue === field.value ? '' : currentValue
                        // )
                        setOpen(false)
                      }}
                      className='group flex   items-center p-4'
                    >
                      <span
                        className={cn(
                          'flex  justify-center items-center text-lg font-semibold text-muted-foreground  bg-gradient-to-r from-muted to-muted/70  rounded-xl aspect-square h-10 w-10 group-hover:from-muted-foreground/80 group-hover:to-muted-foreground/90  group-hover:text-primary-foreground transition-colors ',
                          field.value === s.id.toString()
                            ? 'border border-muted-foreground '
                            : ''
                        )}
                      >
                        {i + 1}
                      </span>
                      <div className='flex flex-col justify-start items-start space-y-1 pl-2'>
                        {s.firstName}
                        <span className='text-xs text-muted-foreground'>
                          {s.profile.student.massarNumber}
                        </span>
                      </div>
                      <Check
                        className={cn(
                          'mr-2 h-4 w-4 ml-auto',
                          field.value === s.id.toString()
                            ? 'opacity-100'
                            : 'opacity-0'
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
