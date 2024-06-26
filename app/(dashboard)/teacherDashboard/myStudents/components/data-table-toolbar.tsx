'use client'

import { Cross2Icon } from '@radix-ui/react-icons'
import { Table } from '@tanstack/react-table'

import { DataTableViewOptions } from '@/app/(dashboard)/teacherDashboard/myStudents/components/data-table-view-options'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import { priorities, statuses } from '../data/data'
import { DrawerDialogDropZone } from './DropZone'
import { DataTableFacetedFilter } from './data-table-faceted-filter'

interface DataTableToolbarProps<TData> {
  table: Table<TData>
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0

  return (
    <div className='flex items-center justify-between gap-2 '>
      <div className='flex flex-1 items-center space-x-2'>
        <Input
          placeholder='Filtrer les Noms...'
          value={
            (table.getColumn('studentName')?.getFilterValue() as string) ?? ''
          }
          onChange={(event) =>
            table.getColumn('studentName')?.setFilterValue(event.target.value)
          }
          className='h-8 w-[150px] lg:w-[250px]'
        />
        {table.getColumn('test1') && (
          <DataTableFacetedFilter
            column={table.getColumn('test1')}
            title='test1'
            options={statuses}
          />
        )}
        {table.getColumn('priority') && (
          <DataTableFacetedFilter
            column={table.getColumn('priority')}
            title='Priority'
            options={priorities}
          />
        )}
        {isFiltered && (
          <Button
            variant='ghost'
            onClick={() => table.resetColumnFilters()}
            className='h-8 px-2 lg:px-3'
          >
            Reset
            <Cross2Icon className='ml-2 h-4 w-4' />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
      {/* <DrawerDialogDropZone /> */}
    </div>
  )
}
