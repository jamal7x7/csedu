'use client'

import { ColumnDef } from '@tanstack/react-table'

import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'

import { labels, priorities, statuses, assessments } from '../data/data'
import { Task, TStudentsGradesSchema } from '../data/schema'
import { DataTableColumnHeader } from './data-table-column-header'
import { DataTableRowActions } from './data-table-row-actions'

export const columns: ColumnDef<TStudentsGradesSchema>[] = [
  {
    id: 'select',
    accessorKey: 'Selections',
    // size: 270, //set column size for this column
    header: ({ table }) => (
      <>
        {/* <DataTableColumnHeader column={column} title=''> */}
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && 'indeterminate')
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label='Select all'
          className='translate-y-[2px] rounded-[4px] z-30'
        />
        {/* </DataTableColumnHeader> */}
      </>
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='Select row'
        className='translate-y-[2px] rounded-[4px]'
      />
    ),
    enableSorting: true,
    enableHiding: true,
  },

  {
    id: 'studentClassNumber',
    accessorKey: 'studentClassNumber',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Numéro' />
    ),
    cell: ({ row }) => {
      return (
        <div className='flex items-center'>
          <span>{row.getValue('studentClassNumber')}</span>
        </div>
      )
    },
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: 'studentName',

    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Nom et prénom' />
    ),
    cell: ({ row }) => {
      const label = labels.find((label) => label.value === row.original.label)

      return (
        <div className='flex space-x-2'>
          {label?.label == 'excellent' && (
            <Badge variant={'success'}>{label.label}</Badge>
          )}
          {label?.label == 'low' && (
            <Badge variant={'destructive'}>{label.label}</Badge>
          )}
          <span className='max-w-[500px] truncate font-medium'>
            {row.getValue('studentName')}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: 'studentMassarNumber',

    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Massar' />
    ),
    cell: ({ row }) => {
      return (
        <div className='flex space-x-2'>
          <span className='max-w-[500px] truncate font-medium'>
            {row.getValue('studentMassarNumber')}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: 'birthDate',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Date de naissance' />
    ),
    cell: ({ row }) => (
      <div className='w-[80px]'>{row.getValue('birthDate')}</div>
    ),
    enableSorting: true,
    enableHiding: true,
  },

  //================================Tests==========================================
  {
    accessorKey: 'test1',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Contrôle 1' />
    ),
    cell: ({ row }) => {
      const assessment = assessments.filter(
        (assessment) =>
          Number(row.getValue('test1')) >= assessment.start &&
          Number(row.getValue('test1')) < assessment.end
      )[0]

      if (!assessment) {
        return null
      }

      return (
        <div className='flex items-center'>
          {assessment.icon && (
            <assessment.icon className='mr-2 h-4 w-4 text-muted-foreground' />
          )}
          <span>{row.getValue('test1')}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: 'test2',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Contrôle 2' />
    ),
    cell: ({ row }) => {
      const assessment = assessments.filter(
        (assessment) =>
          Number(row.getValue('test2')) >= assessment.start &&
          Number(row.getValue('test2')) < assessment.end
      )[0]

      if (!assessment) {
        return null
      }

      return (
        <div className='flex items-center'>
          {assessment.icon && (
            <assessment.icon className='mr-2 h-4 w-4 text-muted-foreground' />
          )}
          <span>{row.getValue('test2')}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: 'test3',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Contrôle 3' />
    ),
    cell: ({ row }) => {
      const assessment = assessments.filter(
        (assessment) =>
          Number(row.getValue('test3')) >= assessment.start &&
          Number(row.getValue('test3')) < assessment.end
      )[0]

      if (!assessment) {
        return null
      }

      return (
        <div className='flex items-center'>
          {assessment.icon && (
            <assessment.icon className='mr-2 h-4 w-4 text-muted-foreground' />
          )}
          <span>{row.getValue('test3')}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: 'integratedActivities',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Activités' />
    ),
    cell: ({ row }) => {
      const assessment = assessments.filter(
        (assessment) =>
          Number(row.getValue('integratedActivities')) >= assessment.start &&
          Number(row.getValue('integratedActivities')) < assessment.end
      )[0]

      if (!assessment) {
        return null
      }

      return (
        <div className='flex items-center'>
          {assessment.icon && (
            <assessment.icon className='mr-2 h-4 w-4 text-muted-foreground' />
          )}
          {/* <span>{assessment.label}</span> */}
          <span>{row.getValue('integratedActivities')}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },

  //================================//Tests//==========================================

  {
    accessorKey: 'priority',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Priority' />
    ),
    cell: ({ row }) => {
      const priority = priorities.find(
        (priority) => priority.value === row.getValue('priority')
      )

      if (!priority) {
        return null
      }

      return (
        <div className='flex items-center'>
          {priority.icon && (
            <priority.icon className='mr-2 h-4 w-4 text-muted-foreground' />
          )}
          <span>{priority.label}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
]
