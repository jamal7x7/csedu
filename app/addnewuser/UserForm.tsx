'use client'

import React, { useState, useTransition } from 'react'
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
import { useForm, UseFormReturn } from 'react-hook-form'
import { TSignUpSchema, signUpSchema } from '@/lib/types'
import { LevelTabs } from '@/app/addnewuser/level-tabs'
import { useRouter } from 'next/navigation'
import { H1, H2, H3, Muted } from '@/components/Typography/Typography'

import { Stepper, StepperConfig, StepperItem } from '@/components/ui/stepper'

import { useStepper } from '@/components/ui/use-stepper'
import UserAccount from './UserAccount'
import UserClass from './UserClass'
import UserInfo from './UserInfo'

import { ChevronRight } from 'lucide-react'
import FormError from '@/components/form-error'
import Link from 'next/link'
import { signUpAction } from '@/actions/signUpAction'
import FormSuccuss from '@/components/form-success'

const steps = [
  { label: 'ETAPE 1', description: 'Infos du Classe' },
  { label: 'ETAPE 2', description: 'Infos Personnel' },
  // { label: 'ETAPE 3', description: 'Deuxième Étudiant' },
  { label: 'ETAPE 4', description: 'Créer Mon Compte' },
] satisfies StepperConfig[]

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

const UserForm = () => {
  const router = useRouter()

  // 1. Define your form.
  const form: UseFormProps = useForm<TSignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      studentNumber: 3,
      firstName: 'firstName',
      lastName: 'lastName',
      classCode: '1',
      username: 'username',
      password: 'password',
      confirmPassword: 'password',
    },
  })

  const [error, setError] = useState<string | undefined>('')
  const [success, setSuccess] = useState<string | undefined>('')
  const [isPending, startTransition] = useTransition()

  const stepContent = [
    {
      component: <UserClass form={form} />,
      title: steps[0].description,
      instructions: 'Choisissez votre année et classe',
    },
    {
      component: <UserInfo form={form} />,
      title: steps[1].description,
      instructions: 'Tapez votre Prénom, Nom et Numéro de classe',
    },

    {
      component: <UserAccount form={form} />,
      title: steps[2].description,
      instructions: "Créer un Nom d'utilisateur unique a vous",
    },
  ]

  const {
    nextStep,
    prevStep,
    resetSteps,
    setStep,
    activeStep,
    isDisabledStep,
    isLastStep,
    isOptionalStep,
  } = useStepper({
    initialStep: 0,
    steps,
  })

  // 2. Define a submit handler.
  const onSubmit = async (data: TSignUpSchema) => {
    console.log(data)
    setError('')
    setSuccess('')
    startTransition(() => {
      signUpAction(data).then((data) => {
        setError(data?.error)
        setSuccess(data?.success)
      })
    })
    // console.log('data from addstudent page', data)
    // function onSubmit() {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.

    const res = await fetch('/api/users', {
      method: 'POST',
      headers: { 'Centent-Type': 'application/json' },
      body: JSON.stringify(data),
    })

    // router.push('/login')

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
    <div className='mt-32 space-y-16 '>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className=''>
          <Stepper
            activeStep={activeStep}
            labelOrientation='vertical'
            className='   w-2/5 sm:w-fall gap-0 mx-auto'
          >
            {steps.map((step, index) => (
              <StepperItem index={index} key={index} {...step} className=' '>
                <div className=' w-full  flex flex-col items-center justify-center  mt-8 '>
                  <div className=' flex flex-col items-center justify-center border p-10 rounded-2xl w-full  sm:w-[28rem] bg-muted/30'>
                    <div className='    w-full'></div>

                    {/* ======================================================================================================= */}

                    <H3 className=' border-0 font-bold mb-4  '>
                      {stepContent[index].title}
                    </H3>
                    <Muted className=' border-0   mb-16 '>
                      {stepContent[index].instructions}
                    </Muted>
                    <div className='min-w-full space-y-8'>
                      {/* <Form {...form}>
                        <form
                          onSubmit={form.handleSubmit(onSubmit)}
                          className=''
                        > */}
                      {stepContent[index].component}
                      {/* </form>
                      </Form> */}
                    </div>

                    {/* ======================================================================================================= */}
                    {/* <FormError message='Invalid Credentials' /> */}
                    <FormError message={error} />
                    <FormSuccuss message={success} />
                    <div className='flex items-center justify-end gap-2 mt-16 mx-auto w-full'>
                      {activeStep === steps.length - 1 ? (
                        <>
                          {/* <h2>All steps completed!</h2> */}
                          <Button
                            variant={'ghost'}
                            disabled={isDisabledStep}
                            onClick={prevStep}
                          >
                            Revenir
                          </Button>
                          <Button
                            type='submit'
                            // onClick={resetSteps}
                          >
                            {/* Reset  */}
                            S'inscrire
                          </Button>
                        </>
                      ) : (
                        <>
                          {!isDisabledStep && (
                            <Button
                              variant={'ghost'}
                              disabled={isDisabledStep}
                              onClick={prevStep}
                            >
                              Revenir
                            </Button>
                          )}

                          <Button
                            // type={isLastStep ? 'submit' : 'button'}
                            className='gap-2 pl-6'
                            onClick={nextStep}
                          >
                            {isLastStep
                              ? "S'inscrire0"
                              : isOptionalStep
                              ? 'Skip'
                              : 'Suivant'}
                            <ChevronRight className='h-4 w-4' />
                          </Button>
                        </>
                      )}
                    </div>
                    <p className='mt-8 text-center text-xs text-muted-foreground'>
                      Deja inscris,{' '}
                      <Link href='/login' className='underline font-bold'>
                        {' '}
                        se connecter
                      </Link>
                    </p>
                  </div>
                </div>
              </StepperItem>
            ))}
          </Stepper>
        </form>
      </Form>
    </div>
  )
}

export default UserForm
