import { format, parseISO } from 'date-fns'

export const getDate = (startDate?: string, endDate?: string, current?: boolean) => {
  if (startDate) {
    if (startDate === endDate) return startDate
    if (endDate) return `${startDate} – ${endDate}`
    if (current) return `${startDate} – Current`
    return startDate
  }

  if (current) return `Current`

  return ''
}

export const formatDate = (isoDate: string): string => {
  const parsedDate = parseISO(isoDate)
  return format(parsedDate, 'MMM yyyy')
}
