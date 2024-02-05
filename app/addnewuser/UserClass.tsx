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

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import { zodResolver } from '@hookform/resolvers/zod'
import { UseFormReturn, useForm } from 'react-hook-form'
import { TSignUpSchema, signUpSchema } from '@/lib/types'
import { LevelTabs } from '@/app/addnewuser/level-tabs'
import { useRouter } from 'next/navigation'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

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

const levelsAndClasses = [
  {
    levelName: 'level1',
    levelAndClass: ['1APIC1', '1APIC2', '1APIC3', '1APIC4', '1APIC5'],
  },
  {
    levelName: 'level2',
    levelAndClass: ['2APIC1', '2APIC2', '2APIC3', '2APIC4', '2APIC5'],
  },
  {
    levelName: 'level3',
    levelAndClass: ['3APIC1', '3APIC2', '3APIC3', '3APIC4', '3ASCG1', '3ASCG2'],
  },
]

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
              {/* <LevelTabs field={field} /> */}
              {/* =========================================================================== */}

              <Tabs defaultValue='level1' className='w-full'>
                <TabsList className='grid w-full grid-cols-3'>
                  <TabsTrigger autoFocus value='level1'>
                    1 année
                  </TabsTrigger>
                  <TabsTrigger value='level2'>2 année</TabsTrigger>
                  <TabsTrigger value='level3'>3 année</TabsTrigger>
                </TabsList>
                {levelsAndClasses.map((level, i) => (
                  <TabsContent key={i} value={level.levelName}>
                    <Card className={cn('bg-muted/10 border-0 shadow-none')}>
                      <CardHeader>
                        {/* <CardTitle>Account</CardTitle> */}
                        {/* <CardDescription>
                          Cliquer sur votre classe
                        </CardDescription> */}
                      </CardHeader>

                      <CardContent className='space-y-2p-2'>
                        <FormItem>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className='relative grid w-full grid-cols-4 '
                            >
                              {level.levelAndClass.map((c, i) => (
                                <FormItem key={i}>
                                  <FormControl>
                                    <RadioGroupItem
                                      // onClick={() => console.log(c)}

                                      value={c}
                                      id={c}
                                      className='peer sr-only'
                                    />
                                  </FormControl>
                                  <div className='mt-0  text-xs flex items-center justify-center rounded-md border-2 border-muted bg-popover  hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary'>
                                    <Label
                                      className='p-4 cursor-pointer'
                                      htmlFor={c}
                                    >
                                      {c}
                                    </Label>
                                  </div>
                                </FormItem>
                              ))}
                            </RadioGroup>
                          </FormControl>
                        </FormItem>
                      </CardContent>
                    </Card>
                  </TabsContent>
                ))}
              </Tabs>

              {/* =========================================================================== */}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default UserClass
