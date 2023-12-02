import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { cn } from '@/lib/utils'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

const FormSchema = z.object({
  type: z.enum(['1', '2', '3', '4'], {
    required_error: 'You need to select a notification type.',
  }),
})

export function LevelTabs() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log('hello!', data)
    //   toast({
    //     title: 'You submitted the following values:',
    //     description: (
    //       <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
    //         <code className='text-white'>{JSON.stringify(data, null, 2)}</code>
    //       </pre>
    //     ),
    //   })
  }
  return (
    <Form {...form}>
      <Tabs defaultValue='account' className='w-[400px]'>
        <TabsList className='grid w-full grid-cols-3'>
          <TabsTrigger value='level1'>1</TabsTrigger>
          <TabsTrigger value='level2'>2</TabsTrigger>
          <TabsTrigger value='level3'>3</TabsTrigger>
        </TabsList>
        <TabsContent value='level1'>
          <Card className={cn('bg-muted/10 border-0 shadow-none')}>
            <CardHeader>
              {/* <CardTitle>Account</CardTitle> */}
              <CardDescription>Choisissez</CardDescription>
            </CardHeader>
            <CardContent className='space-y-2'>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className=' space-y-6'
              ></form>
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
                        className='relative grid w-full grid-cols-4 space-y-1'
                      >
                        <div className='absolute hidden w-5 h-5 peer-checked:block top-5 right-3'>
                          👍
                        </div>
                        <div>
                          <RadioGroupItem
                            value='1'
                            id='1apic1'
                            className='peer sr-only'
                          />
                          <Label
                            htmlFor='1apic1'
                            className='flex flex-col items-start justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary'
                          >
                            1APIC1
                          </Label>
                        </div>
                        <div>
                          <RadioGroupItem
                            value='2'
                            id='1apic2'
                            className='peer sr-only'
                          />
                          <Label
                            htmlFor='1apic2'
                            className='flex flex-col items-start justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary'
                          >
                            {/* <Icons.paypal className='mb-3 h-6 w-6' /> */}
                            1APIC2
                          </Label>
                        </div>
                        <div>
                          <RadioGroupItem
                            value='3'
                            id='1apic3'
                            className='peer sr-only'
                          />
                          <Label
                            htmlFor='1apic3'
                            className='flex flex-col items-start justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary'
                          >
                            {/* <Icons.apple className='mb-3 h-6 w-6' /> */}
                            1APIC3
                          </Label>
                        </div>
                        <div>
                          <RadioGroupItem
                            value='4'
                            id='1apic4'
                            className='peer sr-only'
                          />
                          <Label
                            htmlFor='1apic4'
                            className='flex flex-col items-start justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary'
                          >
                            {/* <Icons.apple className='mb-3 h-6 w-6' /> */}
                            1APIC4
                          </Label>
                        </div>
                        <div>
                          <RadioGroupItem
                            value='5'
                            id='1apic5'
                            className='peer sr-only'
                          />
                          <Label
                            htmlFor='1apic5'
                            className='flex flex-col items-start justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary'
                          >
                            {/* <Icons.apple className='mb-3 h-6 w-6' /> */}
                            1APIC5
                          </Label>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value='level2'>
          <Card className={cn('bg-muted/10 border-0')}>
            <CardHeader>
              {/* <CardTitle>Password</CardTitle>
              <CardDescription>
                Change your password here. After saving, you'll be logged out.
              </CardDescription> */}
            </CardHeader>
            <CardContent className='space-y-2'>
              <div className='space-y-1'>
                <Label htmlFor='current'>Current password</Label>
                <Input id='current' type='password' />
              </div>
              <div className='space-y-1'>
                <Label htmlFor='new'>New password</Label>
                <Input id='new' type='password' />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value='level3'>
          <Card className={cn('bg-muted/10 border-0 ')}>
            <CardHeader>
              {/* <CardTitle>Password</CardTitle>
              <CardDescription>
                Change your password here. After saving, you'll be logged out.
              </CardDescription> */}
            </CardHeader>
            <CardContent className='space-y-2 '>
              <div className='space-y-1'>
                <Label htmlFor='current'>Current password</Label>
                <Input id='current' type='password' />
              </div>
              <div className='space-y-1'>
                <Label htmlFor='new'>New password</Label>
                <Input id='new' type='password' />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </Form>
  )
}
