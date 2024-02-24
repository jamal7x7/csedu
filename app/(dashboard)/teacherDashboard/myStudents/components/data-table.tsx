'use client'

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import * as React from 'react'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useMemo } from 'react'
import {
  TStudentsGradesSchema,
  TStudentsGradesWithInfoSchema,
} from '../data/schema'
import DropZone, { DrawerDialogDropZone } from './DropZone'
import { DataTablePagination } from './data-table-pagination'
import { DataTableToolbar } from './data-table-toolbar'

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TStudentsGradesSchema, TValue>) {
  const [rowSelection, setRowSelection] = React.useState({})
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [sorting, setSorting] = React.useState<SortingState>([])

  //=======================

  // console.log('🚀 ~ columns:', columns)
  //=======================

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    enableRowSelection: true,
    initialState: {
      pagination: {
        pageSize: 50,
      },
    },

    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  })

  return (
    <div className='space-y-4 mb-8  '>
      {/* <DropZone setUpLoadedData={setUpLoadedData} /> */}

      <DataTableToolbar table={table} />
      {/* <div className='rounded-md border overflow-x-auto '> */}
      <Table className=' StickyHeader'>
        <TableHeader className='  '>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow
              key={headerGroup.id}
              // className='  border-b-[4px] border-red-500  flex  items-center justify-center'
            >
              {headerGroup.headers.map((header) => {
                return (
                  // <div
                  //   className='  border-b-[4px] border-red-500  '
                  //   key={header.id}
                  // >
                  <TableHead
                    // className='border-[1px] border-muted-foreground/15 [&:has([role=checkbox])]:!pr-4  bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/70 drop-shadow-[0_10px_10px_rgba(0,0,0,1)] '
                    className='border-[1px] border-muted-foreground/15 [&:has([role=checkbox])]:!pr-4  bg-background backdrop-blur supports-[backdrop-filter]:bg-background/90  drop-shadow-[0_2px_2px_rgba(0,0,0,0.15)] dark:drop-shadow-[0_2px_2px_rgba(200,200,200,0.15)]'
                    key={header.id}
                    colSpan={header.colSpan}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                  // </div>
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
                    className='border-[1px] border-muted-foreground/15 [&:has([role=checkbox])]:!pr-4 '
                    key={cell.id}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className='h-24 text-center'>
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {/* </div> */}
      <DataTablePagination table={table} />
    </div>
  )
}
