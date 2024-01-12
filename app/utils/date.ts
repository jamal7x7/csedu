import { addDays, format, startOfWeek } from 'date-fns'
import { enUS } from 'date-fns/locale'

interface Day {
  name: string
  number: string
}

const now = new Date()

/**
 * a function that returns an array of the days of the week ```Day {name: string, number: string}``` and has locale and a date: Date as input
 * @param Locale
 * @returns Day[]
 */
export function getDaysOfWeek({
  locale = enUS,
  date = now,
}: {
  locale?: Locale
  date?: Date
}): Day[] {
  const start = startOfWeek(date, { weekStartsOn: 1 })

  return Array.from({ length: 7 }).map((_, i) => ({
    name: format(addDays(start, i), 'eeee', { locale }),
    number: format(addDays(start, i), 'd', { locale }),
  }))
}
