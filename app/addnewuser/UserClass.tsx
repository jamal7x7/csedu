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

const UserClass = ({ form }: { form: UseFormProps }) => {
  const router = useRouter()

  return (
    <FormField
      control={form.control}
      name='classCode'
      render={({ field }) => (
        <FormItem>
          {/* <FormLabel htmlFor='level'>Niveau et Class</FormLabel> */}
          <FormControl>
            <div
              className={cn(
                'min-w-full bord bg-muted/10 border rounded-2xl p-2 '
              )}
            >
              <LevelTabs field={field} />
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default UserClass
