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
import { motion } from 'framer-motion'
import { ParticlesPage } from '@/lib/Confetti'
import { useState } from 'react'

const FormSchema = z.object({
  type: z.enum(['1', '2', '3', '4'], {
    required_error: 'You need to select a notification type.',
  }),
})

export default function Quiz(props: any) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  const [correctOption, setCorrectOption] = useState(false)

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log('hello!', data)
    if (Number(data.type) === props.correctOption) {
      setCorrectOption(true)
      toast({
        variant: 'success',
        title: 'Correct',
        // description: (
        //   <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
        //     <code className='text-white'>{data.type}</code>
        //   </pre>
        // ),
      })
    } else {
      setCorrectOption(false)
      toast({
        variant: 'destructive',
        title: 'False',
        // description: (
        //   <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
        //     <code className='text-white'>{data.type}</code>
        //   </pre>
        // ),
      })
    }
    // toast({
    //   title: 'You submitted the following values:',
    //   description: (
    //     <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
    //       <code className='text-white'>{JSON.stringify(data, null, 2)}</code>
    //     </pre>
    //   ),
    // })
  }

  return (
    <div className='mt-16 flex  flex-col items-center justify-center  '>
      {/* <div className='flex flex-shrink-0 h-20 w-20 items-center justify-center rounded-full dark:bg-slate-800 bg-slate-100  md:h-[72px] md:w-[72px]'>
        <p className='font-bold text-4xl'>?</p>
      </div> */}
      {/* <Card className='bg-muted/20 mt-4  min-w-[35rem]  backdrop-blur supports-[backdrop-filter]:bg-background/60'> */}
      <Card className='relative card border-muted/70 rounded-3xl mt-4  min-w-[35rem]  bg-background/95 '>
        <Form {...form}>
          <CardHeader>
            <CardTitle>
              <div className=' flex  items-center justify-srart'>
                <div className='flex flex-shrink-0 h-20 w-20 items-center justify-center rounded-full dark:bg-slate-800 bg-slate-100  md:h-[72px] md:w-[72px]'>
                  <p className='font-bold text-4xl'>?</p>
                </div>

                <div className='p-4 flex flex-col items-start justify-between'>
                  <small className='text-slate-500 text-xs'>Question</small>
                  <p className='text-default-500 text-lg'>{props.question}</p>
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
                    {/* <FormLabel>Cocher la bonne reponse...</FormLabel> */}
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className='relative flex flex-col space-y-1'
                      >
                        <div className='absolute hidden w-5 h-5 peer-checked:block top-5 right-3'>
                          👍
                        </div>
                        <motion.div
                          whileHover={{ scale: 1.005 }}
                          whileTap={{ scale: 0.995 }}
                        >
                          <RadioGroupItem
                            value='1'
                            id='option1'
                            className='peer sr-only'
                          />
                          <Label
                            htmlFor='option1'
                            className='flex flex-col items-start justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary'
                          >
                            {props.option1}
                          </Label>
                        </motion.div>
                        <motion.div
                          whileHover={{ scale: 1.005 }}
                          whileTap={{ scale: 0.995 }}
                        >
                          <RadioGroupItem
                            value='2'
                            id='option2'
                            className='peer sr-only'
                          />
                          <Label
                            htmlFor='option2'
                            className='flex flex-col items-start justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary'
                          >
                            {/* <Icons.paypal className='mb-3 h-6 w-6' /> */}
                            {props.option2}
                          </Label>
                        </motion.div>
                        <motion.div
                          whileHover={{ scale: 1.005 }}
                          whileTap={{ scale: 0.995 }}
                        >
                          <RadioGroupItem
                            value='3'
                            id='option3'
                            className='peer sr-only'
                          />
                          <Label
                            htmlFor='option3'
                            className='flex flex-col items-start justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary'
                          >
                            {/* <Icons.apple className='mb-3 h-6 w-6' /> */}
                            {props.option3}
                          </Label>
                        </motion.div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className='relative z-50' type='submit'>
                Check Answer
              </Button>
            </form>
          </CardContent>
          {/* <CardFooter className='flex justify-between'> */}
          {/* <Button variant='outline'>Revenir</Button> */}
          {/* correctOption {props.correctOption} */}
          {/* </CardFooter> */}
        </Form>
      </Card>
      {correctOption && <ParticlesPage />}
    </div>
  )
}
