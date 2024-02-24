import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  CheckCircledIcon,
  CircleIcon,
  CrossCircledIcon,
  QuestionMarkCircledIcon,
  StopwatchIcon,
} from '@radix-ui/react-icons'

export const labels = [
  {
    value: 'excellent',
    label: 'Excellent',
  },
  {
    value: 'normal',
    label: 'Normal',
  },
  {
    value: 'low',
    label: 'Need Help',
  },
]

export const statuses = [
  {
    value: 'backlog',
    label: 'Backlog',
    icon: QuestionMarkCircledIcon,
  },
  {
    value: 'todo',
    label: 'Todo',
    icon: CircleIcon,
  },
  {
    value: 'in progress',
    label: 'In Progress',
    icon: StopwatchIcon,
  },
  {
    value: 'done',
    label: 'Done',
    icon: CheckCircledIcon,
  },
  {
    value: 'canceled',
    label: 'Canceled',
    icon: CrossCircledIcon,
  },
]

export const priorities = [
  {
    label: 'Low',
    value: 'low',
    icon: ArrowDownIcon,
  },
  {
    label: 'Medium',
    value: 'medium',
    icon: ArrowRightIcon,
  },
  {
    label: 'High',
    value: 'high',
    icon: ArrowUpIcon,
  },
]

export const assessments = [
  {
    label: 'Low',
    value: 'low',
    start: 0,
    end: 10,
    icon: ArrowDownIcon,
  },
  {
    label: 'Medium',
    value: 'medium',
    start: 10,
    end: 14,
    icon: ArrowRightIcon,
  },
  {
    label: 'High',
    value: 'high',
    start: 14,
    end: 21,
    icon: ArrowUpIcon,
  },
]
