'use client'

import * as React from 'react'
import {
  CaretSortIcon,
  ChevronDownIcon,
  DotsHorizontalIcon,
} from '@radix-ui/react-icons'
import {
  ColumnDef,
  ColumnFiltersState,
  PaginationState,
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
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
// import * as Form from '@/components/ui/form'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { useMemo, useState } from 'react'
import * as XLSX from 'xlsx'
import AddFiles from './FileInput'
import ExcelReader from './ExcelReader'
import DropZone from './DropZone'

const data0: StudentData[] = [
  {
    id: '1',
    studentMassarNumber: '123456789',
    studentName: 'jamal',
    birthDate: '1999-01-01',
    test1: 10,
    test2: 11,
    test3: 15,
    IntegratedActivities: 10,
  },
  {
    id: '2',
    studentMassarNumber: '123456789',
    studentName: 'Kamal',
    birthDate: '1999-01-01',
    test1: 14,
    test2: 17,
    test3: 15,
    IntegratedActivities: 10,
  },
  {
    id: '3',
    studentMassarNumber: '123456789',
    studentName: 'Ali',
    birthDate: '1999-01-01',
    test1: 18,
    test2: 17,
    test3: 20,
    IntegratedActivities: 10,
  },
]

export type StudentData = {
  id: string
  studentMassarNumber: string
  studentName: string
  birthDate: string
  test1: number
  test2: number
  test3: number
  IntegratedActivities: number
}

export const columns: ColumnDef<StudentData>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='Select row'
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'studentMassarNumber',
    header: 'Massar',
    cell: ({ row }) => (
      <div className='capitalize'>{row.getValue('studentMassarNumber')}</div>
    ),
  },
  {
    accessorKey: 'studentName',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Nom
          <CaretSortIcon className='ml-2 h-4 w-4' />
        </Button>
      )
    },
    cell: ({ row }) => (
      <div className='lowercase'>{row.getValue('studentName')}</div>
    ),
  },
  {
    accessorKey: 'birthDate',
    header: () => <div className='text-right'>Birth Date</div>,
    cell: ({ row }) => {
      const birthDate = row.getValue('birthDate')

      // Format the amount as a dollar amount
      //   const formatted = new Intl.NumberFormat('en-US', {
      //     style: 'currency',
      //     currency: 'USD',
      //   }).format(amount)

      return (
        <div className='text-right font-medium'>
          {row.getValue('birthDate')}
        </div>
      )
    },
  },
  {
    accessorKey: 'test1',
    header: () => <div className='text-right'>Controle 1</div>,
    cell: ({ row }) => {
      const test1 = parseFloat(row.getValue('test1'))

      // Format the amount as a dollar amount
      //   const formatted = new Intl.NumberFormat('en-US', {
      //     style: 'currency',
      //     currency: 'USD',
      //   }).format(amount)

      return <div className='text-right font-medium'>{test1}</div>
    },
  },
  {
    accessorKey: 'test2',
    header: () => <div className='text-right'>Controle 2</div>,
    cell: ({ row }) => {
      const test2 = parseFloat(row.getValue('test2'))

      // Format the amount as a dollar amount
      //   const formatted = new Intl.NumberFormat('en-US', {
      //     style: 'currency',
      //     currency: 'USD',
      //   }).format(amount)

      return <div className='text-right font-medium'>{test2}</div>
    },
  },
  {
    accessorKey: 'test3',
    header: () => <div className='text-right'>Controle 3</div>,
    cell: ({ row }) => {
      const test3 = parseFloat(row.getValue('test3'))

      // Format the amount as a dollar amount
      //   const formatted = new Intl.NumberFormat('en-US', {
      //     style: 'currency',
      //     currency: 'USD',
      //   }).format(amount)

      return <div className='text-right font-medium'>{test3}</div>
    },
  },
  {
    accessorKey: 'IntegratedActivities',
    header: () => <div className='text-right'>Activites</div>,
    cell: ({ row }) => {
      const IntegratedActivities = parseFloat(
        row.getValue('IntegratedActivities')
      )

      // Format the amount as a dollar amount
      //   const formatted = new Intl.NumberFormat('en-US', {
      //     style: 'currency',
      //     currency: 'USD',
      //   }).format(amount)

      return (
        <div className='text-right font-medium'>{IntegratedActivities}</div>
      )
    },
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' className='h-8 w-8 p-0'>
              <span className='sr-only'>Open menu</span>
              <DotsHorizontalIcon className='h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

const uploadStudentFormSchema = z.object({
  media: z.instanceof(File),
})
export function DataTable() {
  const fileRef = React.useRef<HTMLInputElement>(null)
  // 1. Define your form.
  const form = useForm<z.infer<typeof uploadStudentFormSchema>>({
    resolver: zodResolver(uploadStudentFormSchema),
    defaultValues: {
      media: new File([], ''),
    },
  })
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [upData, setUpData] = useState([])
  // console.log('🚀 ~ App ~ updata:', upData)

  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const data = useMemo(
    () =>
      [
        ...upData.slice(10).map((s) => ({
          id: s.B,
          studentMassarNumber: s.C,
          studentName: s.D,
          birthDate: s.F,
          test1: 18,
          test2: 17,
          test3: 20,
          IntegratedActivities: 10,
        })),
      ] as StudentData[],
    [upData]
  )

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  const [{ pageIndex, pageSize }, setPagination] =
    React.useState<PaginationState>({
      pageIndex: 0,
      pageSize: 50,
    })

  const readUploadFile = (e) => {
    e.preventDefault()
    console.log('🚀 ~ App ~ e.target.files:', e.target.files[0])
    if (e.target.files) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const data = e.target.result
        console.log('🚀 ~ readUploadFile ~ data:', data)
        const workbook = XLSX.read(data, { type: 'array' })
        console.log('🚀 ~ readUploadFile ~ workbook:', workbook)
        const sheetName = workbook.SheetNames[0]
        console.log('🚀 ~ readUploadFile ~ sheetName:', sheetName)
        const worksheet = workbook.Sheets[sheetName]
        console.log('🚀 ~ readUploadFile ~ worksheet:', worksheet)
        const parsedData = XLSX.utils.sheet_to_json(worksheet)
        setUpData(parsedData)
        console.log(parsedData)
      }
      reader.readAsArrayBuffer(e.target.files[0])
    }
  }

  const readUploadFile2 = async (
    values: z.infer<typeof uploadStudentFormSchema>
    // values: any
  ) => {
    console.log(
      '🚀 ~ DataTable ~ values =========>:',
      JSON.stringify(values, null, 2)
    )

    const result = uploadStudentFormSchema.safeParse(values)
    const validFile = result.data?.media
    console.log(
      '🚀 ~ DataTable ~ values =========>:',
      JSON.stringify(validFile, null, 2)
    )
    console.log(
      '🚀 ~ DataTable ~ values =========>:',
      JSON.stringify(result?.success, null, 2)
    )

    // e.preventDefault()
    // console.log(values.file.files.result)
    // if (values.file.files) {
    //   const reader = new FileReader()
    //   reader.onload = () => {
    //     // const resdata = e.target.result
    //     const resdata = values.file.files.result
    //     const workbook = XLSX.read(resdata, { type: 'array' })
    //     const sheetName = workbook.SheetNames[0]
    //     const worksheet = workbook.Sheets[sheetName]
    //     const parsedData = XLSX.utils.sheet_to_json(worksheet)
    //     setUpData(parsedData)
    //     console.log(parsedData)
    //   }
    //   reader.readAsArrayBuffer(e.target.files[0])
    // }
  }

  const readUploadFileActionHandler: () => void = form.handleSubmit(
    async (data) => {
      console.log('hello!', JSON.stringify(data.media, null, 2))
      form.reset()

      //   const errorResponse = await addBlockActionWithChapterId(data)
      //   // console.log(errorResponse)
      //   const result = formBlockSchema.safeParse(errorResponse)

      //   console.log(JSON.stringify(result, null, 2))
      //   if (!result.success) {
      //     //output error message
      //     // console.log(result.error.issues)

      //     result.error.issues.forEach((issue) => {
      //       setZodErrors({ [issue.path[0]]: issue.message })
      //       // console.log(JSON.stringify(zodErrors, null, 2))
      //     })
      //   }
    }
  )

  return (
    <>
      <DropZone />
      {/* <AddFiles /> */}
      {/* <ExcelReader /> */}
      {/* ========================================================== */}
      {/* <Form {...form}>
        <form
          //   onSubmit={form.handleSubmit(readUploadFile2)}
          action={readUploadFileActionHandler}
          className='space-y-8 flex  items-center justify-start gap-4'
          //   encType='multipart/form-data'
        >
          <FormField
            control={form.control}
            name='media'
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor='username'>uploader une table</FormLabel>
                <FormControl>
                  <Input
                    // {...field}
                    // value={field.value ?? ''}
                    // name='media'
                    type='file'
                    accept='.xlsx, .xls'
                    // onChange={handleFileUpload}
                    // onChange={readUploadFile}
                    onChange={(e) =>
                      field.onChange(e.target.files ? e.target.files[0] : '')
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type='submit'
            // disabled={isPending}
            className=' '
            // onClick={addNewStudentHandler}
          >
            Save
          </Button>
        </form>
      </Form> */}
      {/* <Input
        ref={fileRef}
        type='file'
        accept='.xlsx, .xls'
        // onChange={handleFileUpload}
        onChange={readUploadFile}
        className='file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 file:border file:border-solid file:border-blue-700 file:rounded-[8px] border-blue-600'
      /> */}
      <div className='w-full'>
        <div className='flex items-center py-4'>
          <Input
            placeholder='Filter Names...'
            value={
              (table.getColumn('studentName')?.getFilterValue() as string) ?? ''
            }
            onChange={(event) =>
              table.getColumn('studentName')?.setFilterValue(event.target.value)
            }
            className='max-w-sm'
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='outline' className='ml-auto'>
                Columns <ChevronDownIcon className='ml-2 h-4 w-4' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className='capitalize'
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  )
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className='rounded-md border'>
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead
                        key={header.id}
                        className='border-[1px] border-muted-foreground/15'
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    )
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && 'selected'}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        className='border-[1px] border-muted-foreground/15'
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className='h-24 text-center'
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className='flex items-center justify-end space-x-2 py-4'>
          <div className='flex-1 text-sm text-muted-foreground'>
            {table.getFilteredSelectedRowModel().rows.length} of{' '}
            {table.getFilteredRowModel().rows.length} row(s) selected.
          </div>
          <div className='space-x-2'>
            <Button
              variant='outline'
              size='sm'
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button
              variant='outline'
              size='sm'
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
