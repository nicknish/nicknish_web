import { type Project, type Job } from 'contentlayer/generated'
import { compareAsc, parseISO } from 'date-fns'

export function sortItemsByEndDate<Type extends Job | Project>(items: Type[]): Type[] {
  return items.sort((a, b) => {
    if (a.endDate && b.endDate) {
      return compareAsc(parseISO(a.endDate), parseISO(b.endDate))
    } else if (a.endDate) {
      return 1
    } else {
      return -1
    }
  })
}
