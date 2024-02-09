export type TPeriodicEventSchedule = {
  dayOfWeek: number
  startTime: string
  endTime: string
  repeatFrequency: string //default 'P1W'
}

export type TEducationEventType = 'official' | 'supplementary' | 'empty'

export type TEducationEvent = {
  id: string
  name: string
  description: string
  type: TEducationEventType
  eventSchedule: TPeriodicEventSchedule[]

  startDate: string
  endDate: string
  color: string
  textColor: string
}

export type TClassCode =
  | '1APIC-1'
  | '1APIC-2'
  | '1APIC-3'
  | '1APIC-4'
  | '1APIC-5'
  | '2APIC-1'
  | '2APIC-2'
  | '2APIC-3'
  | '2APIC-4'
  | '2APIC-5'
  | '3APIC-1'
  | '3APIC-2'
  | '3APIC-3'
  | '3ASG-1'
  | '3ASG-2'
