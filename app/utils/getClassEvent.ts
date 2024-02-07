import { sectionRelations } from '../../db/schema/unit'
import { Temporal, Intl, toTemporalInstant } from '@js-temporal/polyfill'
// Date.prototype.toTemporalInstant = toTemporalInstant
import {
  TEducationEvent,
  TEducationEventType,
  TPeriodicEventSchedule,
  TClassCode,
} from '@/types'

//A CS class runs throughout 2024. The class occurs weekly, every Wednesday at 7pm.

const classEvents: TEducationEvent[] = [
  {
    id: '1APIC-1',
    name: '1APIC-1',
    description: 'Description for 1APIC-1',
    type: 'official',
    eventSchedule: [
      {
        dayOfWeek: 2,
        startTime: '09:00:00',
        endTime: '10:00:00',
        repeatFrequency: 'P1W',
      },
    ],
    startDate: '2023-01-04',
    endDate: '2024-12-25',
    color: '#000000',
    textColor: '#FFFFFF',
  },
  {
    id: '1APIC2',
    name: '1APIC2',
    description: 'Description for Class-2',
    type: 'supplementary',
    eventSchedule: [
      {
        dayOfWeek: 3,
        startTime: '19:00:00',
        endTime: '20:00:00',
        repeatFrequency: 'P1W',
      },
    ],
    startDate: '2023-01-04',
    endDate: '2024-12-25',
    color: '#000000',
    textColor: '#FFFFFF',
  },
  {
    id: '1APIC3',
    name: '1APIC3',
    description: 'Description for Class-3',
    type: 'official',
    eventSchedule: [
      {
        dayOfWeek: 3,
        startTime: '19:00:00',
        endTime: '20:00:00',
        repeatFrequency: 'P1W',
      },
    ],
    startDate: '2023-01-04',
    endDate: '2024-12-25',
    color: '#000000',
    textColor: '#FFFFFF',
  },
  {
    id: '1APIC4',
    name: '1APIC4',
    description: 'Description for Class-4',
    type: 'supplementary',
    eventSchedule: [
      {
        dayOfWeek: 3,
        startTime: '19:00:00',
        endTime: '20:00:00',
        repeatFrequency: 'P1W',
      },
    ],
    startDate: '2023-01-04',
    endDate: '2024-12-25',
    color: '#000000',
    textColor: '#FFFFFF',
  },
  {
    id: '1APIC5',
    name: '1APIC5',
    description: 'Description for Class-5',
    type: 'official',
    eventSchedule: [
      {
        dayOfWeek: 3,
        startTime: '19:00:00',
        endTime: '20:00:00',
        repeatFrequency: 'P1W',
      },
    ],
    startDate: '2023-01-04',
    endDate: '2024-12-25',
    color: '#000000',
    textColor: '#FFFFFF',
  },
  {
    id: '2APIC-1',
    name: '2APIC-1',
    description: 'Description for Class-6',
    type: 'supplementary',
    eventSchedule: [
      {
        dayOfWeek: 2,
        startTime: '16:30:00',
        endTime: '17:30:00',
        repeatFrequency: 'P1W',
      },
    ],
    startDate: '2023-01-04',
    endDate: '2024-12-25',
    color: '#000000',
    textColor: '#FFFFFF',
  },
  {
    id: '2APIC2',
    name: '2APIC2',
    description: 'Description for Class-7',
    type: 'official',
    eventSchedule: [
      {
        dayOfWeek: 3,
        startTime: '19:00:00',
        endTime: '20:00:00',
        repeatFrequency: 'P1W',
      },
    ],
    startDate: '2023-01-04',
    endDate: '2024-12-25',
    color: '#000000',
    textColor: '#FFFFFF',
  },
  {
    id: '2APIC3',
    name: '2APIC3',
    description: 'Description for Class-8',
    type: 'supplementary',
    eventSchedule: [
      {
        dayOfWeek: 3,
        startTime: '19:00:00',
        endTime: '20:00:00',
        repeatFrequency: 'P1W',
      },
    ],
    startDate: '2023-01-04',
    endDate: '2024-12-25',
    color: '#000000',
    textColor: '#FFFFFF',
  },
  {
    id: '2APIC-4',
    name: '2APIC-4',
    description: 'Description for Class-9',
    type: 'official',
    eventSchedule: [
      {
        dayOfWeek: 2,
        startTime: '15:30:00',
        endTime: '16:30:00',
        repeatFrequency: 'P1W',
      },
    ],
    startDate: '2023-01-04',
    endDate: '2024-12-25',
    color: '#000000',
    textColor: '#FFFFFF',
  },
  {
    id: '2APIC5',
    name: '2APIC5',
    description: 'Description for Class-10',
    type: 'supplementary',
    eventSchedule: [
      {
        dayOfWeek: 3,
        startTime: '19:00:00',
        endTime: '20:00:00',
        repeatFrequency: 'P1W',
      },
    ],
    startDate: '2023-01-04',
    endDate: '2024-12-25',
    color: '#000000',
    textColor: '#FFFFFF',
  },
  {
    id: '3APIC-1',
    name: '3APIC-1',
    description: 'Description for Class-10',
    type: 'supplementary',
    eventSchedule: [
      {
        dayOfWeek: 3,
        startTime: '08:00:00',
        endTime: '09:00:00',
        repeatFrequency: 'P1W',
      },
    ],
    startDate: '2023-01-04',
    endDate: '2024-12-25',
    color: '#000000',
    textColor: '#FFFFFF',
  },
  {
    id: '3APIC2',
    name: '3APIC2',
    description: 'Description for Class-10',
    type: 'supplementary',
    eventSchedule: [
      {
        dayOfWeek: 3,
        startTime: '19:00:00',
        endTime: '20:00:00',
        repeatFrequency: 'P1W',
      },
    ],
    startDate: '2023-01-04',
    endDate: '2024-12-25',
    color: '#000000',
    textColor: '#FFFFFF',
  },
  {
    id: '3APIC3',
    name: '3APIC3',
    description: 'Description for Class-10',
    type: 'supplementary',
    eventSchedule: [
      {
        dayOfWeek: 3,
        startTime: '19:00:00',
        endTime: '20:00:00',
        repeatFrequency: 'P1W',
      },
    ],
    startDate: '2023-01-04',
    endDate: '2024-12-25',
    color: '#000000',
    textColor: '#FFFFFF',
  },
  {
    id: '3ASG1',
    name: '3ASG1',
    description: 'Description for Class-10',
    type: 'supplementary',
    eventSchedule: [
      {
        dayOfWeek: 3,
        startTime: '19:00:00',
        endTime: '20:00:00',
        repeatFrequency: 'P1W',
      },
    ],
    startDate: '2023-01-04',
    endDate: '2024-12-25',
    color: '#000000',
    textColor: '#FFFFFF',
  },
  {
    id: '3ASG2',
    name: '3ASG2',
    description: 'Description for Class-10',
    type: 'supplementary',
    eventSchedule: [
      {
        dayOfWeek: 3,
        startTime: '19:00:00',
        endTime: '20:00:00',
        repeatFrequency: 'P1W',
      },
    ],
    startDate: '2023-01-04',
    endDate: '2024-12-25',
    color: '#000000',
    textColor: '#FFFFFF',
  },
]

export default classEvents

export const getClassEvent = (classCode: TClassCode) => {
  const classEvent = classEvents.find((event) => event.id === classCode)

  return classEvent
}
export const getTemporalClassEvent = (now: Temporal.PlainDateTime) => {
  const { PlainTime, Now } = Temporal
  // Get the current time
  const currentTime = now.toPlainTime()
  const dayOfWeek = now.dayOfWeek

  const compare = Temporal.PlainTime.compare
  function inRange(
    pt: Temporal.PlainTime,
    start: Temporal.PlainTime,
    end: Temporal.PlainTime
  ) {
    return compare(pt, start) >= 0 && compare(pt, end) < 0
  }

  const classCode = classEvents.find((event) =>
    event.eventSchedule.find((schedule) => {
      return (
        schedule.dayOfWeek === dayOfWeek &&
        inRange(
          currentTime,
          PlainTime.from(schedule.startTime),
          PlainTime.from(schedule.endTime)
        )
      )
    })
  )?.name as TClassCode

  return classCode
}

// /**
//  * Compare the given exact time to the business hours of a business located in
//  * a particular time zone, and return a string indicating whether the business
//  * is open, closed, opening soon, or closing soon. The length of "soon" can be
//  * controlled using the `soonWindow` parameter.
//  *
//  * @param {Temporal.ZonedDateTime} now - Date and Time at which to consider
//  *  whether the business is open
//  * @param {(Object|null)[]} businessHours - Array of length 7 indicating
//  *  business hours during the week
//  * @param {Temporal.PlainTime} businessHours[].open - Time at which the business
//  *  opens
//  * @param {Temporal.PlainTime} businessHours[].close - Time at which the business
//  *  closes
//  * @param {Temporal.Duration} soonWindow - Length of time before the opening
//  *  or closing time during which the business should be considered "opening
//  *  soon" or "closing soon"
//  * @returns {string} "open", "closed", "opening soon", or "closing soon"
//  */

// function getBusinessOpenStateText(now, businessHours, soonWindow) {
//   const compare = Temporal.ZonedDateTime.compare
//   function inRange(zdt, start, end) {
//     return compare(zdt, start) >= 0 && compare(zdt, end) < 0
//   }

//   // Because of times wrapping around at midnight, we may need to consider
//   // yesterday's and tomorrow's hours as well
//   for (const delta of [-1, 0]) {
//     const openDate = now.toPlainDate().add({ days: delta })
//     // convert weekday (1..7) to 0-based index, for array:
//     const index = (openDate.dayOfWeek + 7) % 7
//     if (!businessHours[index]) continue

//     const timeZone = now.timeZoneId
//     const { open: openTime, close: closeTime } = businessHours[index]
//     const open = openDate.toZonedDateTime({ plainTime: openTime, timeZone })
//     const isWrap = Temporal.PlainTime.compare(closeTime, openTime) < 0
//     const closeDate = isWrap ? openDate.add({ days: 1 }) : openDate
//     const close = closeDate.toZonedDateTime({ plainTime: closeTime, timeZone })

//     if (inRange(now, open, close)) {
//       return compare(now, close.subtract(soonWindow)) >= 0
//         ? 'closing soon'
//         : 'open'
//     }
//     if (inRange(now.add(soonWindow), open, close)) return 'opening soon'
//   }
//   return 'closed'
// }

// // For example, a restaurant or bar might have opening hours that go past
// // midnight; make sure this is handled correctly
// const businessHours = [
//   /* Sun */ {
//     open: Temporal.PlainTime.from('13:00'),
//     close: Temporal.PlainTime.from('20:30'),
//   },
//   /* Mon */ null, // closed Mondays
//   /* Tue */ {
//     open: Temporal.PlainTime.from('11:00'),
//     close: Temporal.PlainTime.from('20:30'),
//   },
//   /* Wed */ {
//     open: Temporal.PlainTime.from('11:00'),
//     close: Temporal.PlainTime.from('20:30'),
//   },
//   /* Thu */ {
//     open: Temporal.PlainTime.from('11:00'),
//     close: Temporal.PlainTime.from('22:00'),
//   },
//   /* Fri */ {
//     open: Temporal.PlainTime.from('11:00'),
//     close: Temporal.PlainTime.from('00:00'),
//   },
//   /* Sat */ {
//     open: Temporal.PlainTime.from('11:00'),
//     close: Temporal.PlainTime.from('02:00'),
//   },
// ]

// const now = Temporal.ZonedDateTime.from('2019-04-07T00:00+02:00[Europe/Berlin]')
// const soonWindow = Temporal.Duration.from({ minutes: 30 })
// const saturdayNightState = getBusinessOpenStateText(
//   now,
//   businessHours,
//   soonWindow
// )
// // assert.equal(saturdayNightState, 'open');

// const lastCall = now.add({ hours: 1, minutes: 50 })
// // assert.equal(lastCall.toString(), '2019-04-07T01:50:00+02:00[Europe/Berlin]');
// const lastCallState = getBusinessOpenStateText(
//   lastCall,
//   businessHours,
//   soonWindow
// )
// // assert.equal(lastCallState, 'closing soon');

// const tuesdayEarly = now.add({ days: 2, hours: 6 })
// const tuesdayEarlyState = getBusinessOpenStateText(
//   tuesdayEarly,
//   businessHours,
//   soonWindow
// )
// // assert.equal(tuesdayEarlyState, 'closed');
