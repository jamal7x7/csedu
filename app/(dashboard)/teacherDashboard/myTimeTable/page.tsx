'use client'

import React, { useState, useRef, MouseEventHandler } from 'react'
import {
  CaretSortIcon,
  ChevronDownIcon,
  DotsHorizontalIcon,
} from '@radix-ui/react-icons'
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { stringify } from '@/app/utils'
import { cn } from '@/lib/utils'
import { DivEvent } from '@tsparticles/engine'
import { addHours, addMinutes, eachHourOfInterval, format } from 'date-fns'
import { now } from 'next-auth/client/_utils'

import { Label } from '@/components/ui/label'
import {
  Popover,
  PopoverArrow,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { wait } from '@/app/utils/wait'

const workHours = eachHourOfInterval({
  start: new Date(2023, 1, 1, 8, 0),
  end: addHours(new Date(2023, 1, 1, 8, 0), 10),
})
const duration: Hours[] = workHours.map((h, ind) => ({
  id: ind,
  start: h,
  end: addHours(h, 1),
}))

const dropdown = (
  array: any[],
  indexAtDragStart: number,
  indexAtDragEnter: number
) => {
  const n = indexAtDragStart
  const m = indexAtDragEnter
  if (n == null) throw new Error('indexAtDragStart is null')
  if (n > array.length || m > array.length || n < 0 || m < 0)
    throw new Error('indexAtDragStart or indexAtDragEnter is out of range')

  if (m == n) return array

  if (m > n) {
    const arrayLeft = array.slice(0, n)
    const arrayInBetween = array.slice(n + 1, m + 1)
    const arrayRight = array.slice(m + 1)

    const newArray = [...arrayLeft, ...arrayInBetween, array[n], ...arrayRight]
    return newArray.map((x, i) => ({ ...x, id: i }))
  }
  if (m < n) {
    const arrayLeft = array.slice(0, m)
    const arrayInBetween = array.slice(m, n)
    const arrayRight = array.slice(n + 1)

    const newArray = [...arrayLeft, array[n], ...arrayInBetween, ...arrayRight]
    return newArray.map((x, i) => ({ ...x, id: i }))
  }
}
// const a = Array.from({ length: 10 }).map((x, i) => i)
// const b = a.map((x) => ({ id: x, value: x }))

// console.log('array', b)
// const nb = dropdown(b, 2, 5)
// const nb2 = dropdown(nb, 5, 2)
// console.log('New Array =====>', nb, nb2)

export type Hours = {
  id: number
  start: Date
  end: Date
}
export type Event = {
  id: number
  start: string
  end: string
  type: 'official' | 'supplementary' | 'empty'
  content: string
  description: string
}

export default function MyTimeTable() {
  const [indexAtDragStart, setIndexAtDragStart] = useState(0)
  const [indexAtDragover, setIndexAtDragOver] = useState(0)
  const [data, setData] = useState([
    {
      id: 1,
      start: '08:00',
      end: '09:00',
      type: 'official',
      content: '1APIC2',
      description: '',
    },
    {
      id: 2,
      start: '09:00',
      end: '10:00',
      type: 'official',
      content: '2APIC5',
      description: '',
    },
    {
      id: 7,
      start: '10:00',
      end: '11:00',
      type: 'official',
      content: '3ASG2',
      description: '',
    },
  ])

  function handleAddEvents(index: number): void {
    const newData = [
      ...data,
      {
        id: index,
        start: '',
        end: '',
        type: 'official',
        content: 'New',
        description: '',
      },
    ]

    setData(newData)
  }
  const ref = useRef(null)
  function handleOnDragOver(index: number, e: React.MouseEvent): void {
    e.preventDefault()
    console.log('ON DRAG OVER', index)
    setIndexAtDragOver(index)
  }

  function handleOnDrop(event: React.MouseEvent): void {
    // console.log('ON DROP', index)
    event.preventDefault()

    const newData = dropdown(data, indexAtDragStart, indexAtDragover)

    if (newData) {
      setData(newData)
    }
    // newData.map((d) => console.log(d.content))
  }

  function handleOnDragStart(index: number): void {
    // console.log('ON DRAG START', index)
    setIndexAtDragStart(index)
  }

  function handleOnDragEnter(index: number): void {
    // console.log('ON DRAG ENTER', index)
    // const newData = dropdown(data, indexAtDragStart, index)
    // if (newData) {
    //   setData(newData)
    // }
    // newData.map((d) => console.log(d.content))
  }

  function handleOnDragLeave(index: number): void {
    // console.log('ON DRAG LEAVE', index)
    // const newData = dropdown(data, indexAtDragStart, index)
    // if (newData) {
    //   setData(newData)
    // }
  }
  function handleOnDragExit(index: number): void {
    console.log('ON DRAG EXIT', index)
  }

  return (
    <Table className='w-auto'>
      {/* <TableCaption>A list of your recent invoices.</TableCaption> */}

      <TableHeader className=''>
        <TableRow className=''>
          {duration.map((d) => (
            <TableHead
              key={d.id}
              className='font-medium text-xs text-muted-foreground/50 relative  '
            >
              <div className='absolute  -left-4'>
                {format(addMinutes(d.start, 30), 'hh:mm')}
              </div>
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array.from({ length: 60 }).map((d) => (
          <TableRow key={1}>
            {duration.map((d, index) => (
              <TableCell
                onClick={() => handleAddEvents(index)}
                // onDragExit={() => handleOnDragExit(index)}
                onDragEnter={() => handleOnDragEnter(index)}
                onDrop={handleOnDrop}
                onDragLeave={() => handleOnDragLeave(index)}
                key={d.id}
                className='p-1 font-medium border-[1px] border-muted-foreground/30   '
              >
                <AddEventPopover>
                  <div
                    // onResize={}
                    // key={d.id}
                    // contentEditable
                    role='button'
                    onDragStart={() => handleOnDragStart(index)}
                    onDragOver={(e) => handleOnDragOver(index, e)}
                    ref={ref}
                    draggable={
                      data.find((d, i) => d.id == index)?.type == 'official'
                    }
                    className={cn(
                      'p-4 w-20 resize-x rounded-sm ',
                      data.find((d, i) => d.id == index)?.type == 'official' &&
                        data.find((d, i) => d.id == index)?.content[0] == '1' &&
                        `cursor-grab bg-blue-500/20 text-blue-500 hover:bg-blue-500 dark:bg-blue-800/40 hover:text-blue-100 dark:hover:text-blue-300 dark:hover:bg-blue-800`,
                      data.find((d, i) => d.id == index)?.type == 'official' &&
                        data.find((d, i) => d.id == index)?.content[0] == '2' &&
                        `cursor-grab bg-teal-500/20 text-teal-500  hover:bg-teal-500 dark:bg-teal-800/40 hover:text-teal-100 dark:hover:text-teal-300 dark:hover:bg-teal-800`,
                      data.find((d, i) => d.id == index)?.type == 'official' &&
                        data.find((d, i) => d.id == index)?.content[0] == '3' &&
                        `cursor-grab bg-amber-500/20 text-amber-600 dark:text-amber-600  hover:bg-amber-500 dark:bg-amber-800/30 hover:text-amber-100 dark:hover:text-amber-300 dark:hover:bg-amber-800 `
                    )}
                  >
                    {data.find((d, i) => d.id == index)?.content}
                  </div>
                </AddEventPopover>
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export function AddEventPopover({ children }: { children: React.ReactNode }) {
  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent className='w-80 rounded-xl'>
        {/* <PopoverArrow height='8' width='24' /> */}
        <div className='grid gap-4'>
          <div className='space-y-2'>
            <h4 className='font-medium leading-none'>Dimensions</h4>
            <p className='text-sm text-muted-foreground'>
              Set the dimensions for the layer.
            </p>
          </div>
          <div className='grid gap-2'>
            <div className='grid grid-cols-3 items-center gap-4'>
              <Label htmlFor='width'>Width</Label>
              <Input
                id='width'
                defaultValue='100%'
                className='col-span-2 h-8'
              />
            </div>
            <div className='grid grid-cols-3 items-center gap-4'>
              <Label htmlFor='maxWidth'>Max. width</Label>
              <Input
                id='maxWidth'
                defaultValue='300px'
                className='col-span-2 h-8'
              />
            </div>
            <div className='grid grid-cols-3 items-center gap-4'>
              <Label htmlFor='height'>Height</Label>
              <Input
                id='height'
                defaultValue='25px'
                className='col-span-2 h-8'
              />
            </div>
            <div className='grid grid-cols-3 items-center gap-4'>
              <Label htmlFor='maxHeight'>Max. height</Label>
              <Input
                id='maxHeight'
                defaultValue='none'
                className='col-span-2 h-8'
              />
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
