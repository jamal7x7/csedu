'use client'

import * as React from 'react'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { toast } from '@/components/ui/use-toast'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'

import { Bold, Italic, Underline } from 'lucide-react'

import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'

const FormSchema = z.object({
  type: z.enum(['1', '2', '3', '4'], {
    required_error: 'You need to select a notification type.',
  }),
})

export function Quiz() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log('hello!', data)
    toast({
      title: 'You submitted the following values:',
      description: (
        <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
          <code className='text-white'>{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }

  return (
    <div className='mt-16 flex  flex-col items-center justify-center '>
      {/* <div className='flex flex-shrink-0 h-20 w-20 items-center justify-center rounded-full dark:bg-slate-800 bg-slate-100  md:h-[72px] md:w-[72px]'>
        <p className='font-bold text-4xl'>?</p>
      </div> */}
      <Card className='bg-muted/10 mt-4'>
        <Form {...form}>
          <CardHeader>
            <CardTitle>
              <div className=' flex  items-center justify-srart'>
                <div className='flex flex-shrink-0 h-20 w-20 items-center justify-center rounded-full dark:bg-slate-800 bg-slate-100  md:h-[72px] md:w-[72px]'>
                  <p className='font-bold text-4xl'>?</p>
                </div>

                <div className='p-4 flex flex-col items-start justify-between'>
                  <small className='text-slate-500 text-xs'>Question</small>
                  <p className='text-default-500 text-lg'>
                    Quel est l'objet qui manifest les carateristique d'un reseau
                  </p>
                  {/* <h1 className=' font-black text-4xl bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500'>Le Réseau Informatique</h1> */}
                </div>
              </div>
            </CardTitle>
            {/* <CardDescription>Clicker sur la bone reponse</CardDescription> */}
          </CardHeader>
          <CardContent>
            <form onSubmit={form.handleSubmit(onSubmit)} className=' space-y-6'>
              <FormField
                control={form.control}
                name='type'
                render={({ field }) => (
                  <FormItem className='space-y-3'>
                    <FormLabel>Cocher la bonne reponse...</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className='relative flex flex-col space-y-1'
                      >
                        <div className='absolute hidden w-5 h-5 peer-checked:block top-5 right-3'>
                          👍
                        </div>
                        <div>
                          <RadioGroupItem
                            value='1'
                            id='card'
                            className='peer sr-only'
                          />
                          <Label
                            htmlFor='card'
                            className='flex flex-col items-start justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary'
                          >
                            Card
                          </Label>
                        </div>
                        <div>
                          <RadioGroupItem
                            value='2'
                            id='paypal'
                            className='peer sr-only'
                          />
                          <Label
                            htmlFor='paypal'
                            className='flex flex-col items-start justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary'
                          >
                            {/* <Icons.paypal className='mb-3 h-6 w-6' /> */}
                            Paypal
                          </Label>
                        </div>
                        <div>
                          <RadioGroupItem
                            value='3'
                            id='apple'
                            className='peer sr-only'
                          />
                          <Label
                            htmlFor='apple'
                            className='flex flex-col items-start justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary'
                          >
                            {/* <Icons.apple className='mb-3 h-6 w-6' /> */}
                            Apple
                          </Label>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type='submit'>Check Answer</Button>
            </form>
          </CardContent>
          <CardFooter className='flex justify-between'>
            {/* <Button variant='outline'>Revenir</Button> */}
          </CardFooter>
        </Form>
        {/* 
        <ul className='grid grid-cols-3 gap-x-5 m-10 max-w-md mx-auto'>
          <li className='relative'>
            <input
              className='sr-only peer'
              type='radio'
              value='yes'
              name='answer'
              id='answer_yes'
            />{' '}
            <label
              className='flex p-5  border border-gray-300 rounded-lg cursor-pointer focus:outline-none hover:bg-gray-50/10 peer-checked:ring-green-500 peer-checked:ring-2 peer-checked:border-transparent'
              htmlFor='answer_yes'
            >
              Yes
            </label>
            <div className='absolute hidden w-5 h-5 peer-checked:block top-5 right-3'>
              👍
            </div>
          </li>

          <li className='relative'>
            <input
              className='sr-only peer'
              type='radio'
              value='no'
              name='answer'
              id='answer_no'
            />
            <label
              className='flex p-5  border border-gray-300 rounded-lg cursor-pointer focus:outline-none hover:bg-gray-50/10 peer-checked:ring-red-500 peer-checked:ring-2 peer-checked:border-transparent'
              htmlFor='answer_no'
            >
              No
            </label>

            <div className='absolute hidden w-5 h-5 peer-checked:block top-5 right-3'>
              👎
            </div>
          </li>

          <li className='relative'>
            <input
              className='sr-only peer'
              type='radio'
              value='maybe'
              name='answer'
              id='answer_maybe'
            />
            <label
              className='flex p-5  border border-gray-300 rounded-lg cursor-pointer focus:outline-none hover:bg-gray-50/10 peer-checked:ring-yellow-500 peer-checked:ring-2 peer-checked:border-transparent'
              htmlFor='answer_maybe'
            >
              Maybe
            </label>

            <div className='absolute hidden w-5 h-5 peer-checked:block top-5 right-3'>
              🤔
            </div>
          </li>
        </ul> */}
      </Card>
    </div>
  )
}
