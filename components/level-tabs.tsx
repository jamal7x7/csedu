'use client'
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

export function LevelTabs(field: any) {
  // const form = useForm<z.infer<typeof FormSchema>>({
  //   resolver: zodResolver(FormSchema),
  // })

  // function onSubmit(data: z.infer<typeof FormSchema>) {
  //   console.log('hello!', data)
  //   //   toast({
  //   //     title: 'You submitted the following values:',
  //   //     description: (
  //   //       <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
  //   //         <code className='text-white'>{JSON.stringify(data, null, 2)}</code>
  //   //       </pre>
  //   //     ),
  //   //   })
  // }
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
      levelAndClass: [
        '3APIC1',
        '3APIC2',
        '3APIC3',
        '3APIC4',
        '3ASCG1',
        '3ASCG2',
      ],
    },
  ]

  return (
    <>
      <Tabs defaultValue='level1' className='w-full'>
        <TabsList className='grid w-full grid-cols-3'>
          <TabsTrigger autoFocus value='level1'>
            1
          </TabsTrigger>
          <TabsTrigger value='level2'>2</TabsTrigger>
          <TabsTrigger value='level3'>3</TabsTrigger>
        </TabsList>
        {levelsAndClasses.map((level) => (
          <TabsContent value={level.levelName}>
            <Card className={cn('bg-muted/10 border-0 shadow-none')}>
              <CardHeader>
                {/* <CardTitle>Account</CardTitle> */}
                <CardDescription>Choisissez</CardDescription>
              </CardHeader>

              <CardContent className='space-y-2p-2'>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className='relative grid w-full grid-cols-4 '
                >
                  {level.levelAndClass.map((c) => (
                    <div>
                      <RadioGroupItem
                        value={c}
                        id={c}
                        className='peer sr-only'
                      />
                      <div className='mt-0 text-xs flex items-center justify-center rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary'>
                        <Label htmlFor={c}>{c}</Label>
                      </div>
                    </div>
                  ))}
                </RadioGroup>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </>
  )
}
