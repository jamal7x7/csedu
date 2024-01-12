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

const duration: Hours[] = Array.from({ length: 10 }).map((_, ind) => ({
  id: ind,
  start: `${8 + ind} :00`,
  end: `${8 + ind + 1} :00`,
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
const a = Array.from({ length: 10 }).map((x, i) => i)
const b = a.map((x) => ({ id: x, value: x }))

console.log('array', b)
const nb = dropdown(b, 2, 5)
const nb2 = dropdown(nb, 5, 2)
console.log('New Array =====>', nb, nb2)

export type Hours = {
  id: number
  start: string
  end: string
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
      start: '8:00',
      end: '9:00',
      type: 'official',
      content: '1APIC2',
      description: '',
    },
    {
      id: 2,
      start: '9:00',
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
  function handleOnDragOver(index: number, e): void {
    e.preventDefault()
    console.log('ON DRAG OVER', index)
    setIndexAtDragOver(index)
  }
  function handleOnDragEnter(index: number): void {
    console.log('ON DRAG ENTER', index)

    // const newData = dropdown(data, indexAtDragStart, index)

    // if (newData) {
    //   setData(newData)
    // }
    // newData.map((d) => console.log(d.content))
  }
  function handleOnDrop(event): void {
    // console.log('ON DROP', index)
    event.preventDefault()

    const newData = dropdown(data, indexAtDragStart, indexAtDragover)

    if (newData) {
      setData(newData)
    }
    // newData.map((d) => console.log(d.content))
  }

  function handleOnDragStart(index: number): void {
    console.log('ON DRAG START', index)
    setIndexAtDragStart(index)
  }

  function handleOnDragLeave(index: number): void {
    console.log('ON DRAG LEAVE', index)
  }
  function handleOnDragExit(index: number): void {
    console.log('ON DRAG EXIT', index)
  }

  return (
    <Table>
      {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
      <TableHeader>
        <TableRow>
          {duration.map((d) => (
            <TableHead key={d.id} className='font-medium relative '>
              <div className='absolute  -left-2'>{d.start}</div>
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow key={1}>
          {duration.map((d, index) => (
            <TableCell
              onClick={() => handleAddEvents(index)}
              // onDragExit={() => handleOnDragExit(index)}
              onDragEnter={() => handleOnDragEnter(index)}
              onDrop={handleOnDrop}
              // onDragLeave={() => handleOnDragLeave(index)}
              key={d.id}
              className='p-1 font-medium border-[1px] border-muted-foreground/30   '
            >
              <div
                // onResize={}
                // key={d.id}
                // contentEditable
                onDragStart={() => handleOnDragStart(index)}
                onDragOver={(e) => handleOnDragOver(index, e)}
                ref={ref}
                draggable={
                  data.find((d, i) => d.id == index)?.type == 'official'
                }
                className={cn(
                  'p-4 w-20 resize-x rounded-sm',
                  data.find((d, i) => d.id == index)?.type == 'official'
                    ? 'bg-muted cursor-grab'
                    : ''
                )}
              >
                {data.find((d, i) => d.id == index)?.content}
              </div>
            </TableCell>
          ))}
        </TableRow>
      </TableBody>
    </Table>
  )
}
