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
  | '1APIC2'
  | '1APIC3'
  | '1APIC4'
  | '1APIC5'
  | '2APIC1'
  | '2APIC2'
  | '2APIC3'
  | '2APIC4'
  | '2APIC5'
  | '3APIC1'
  | '3APIC2'
  | '3APIC3'
  | '3ASG1'
  | '3ASG2'
