import { type Project, type Job, allJobs } from 'lib/content'
import { compareAsc, parseISO } from 'date-fns'

export function getJobs(options: { only: 'fulltime' | 'contract' }) {
  if (options.only) {
    return allJobs.filter(job => (options.only === 'fulltime' ? job.fulltime : !job.fulltime))
  }
  return allJobs
}

export function sortProjectWorkItemsByStartDate<Type extends Job | Project>(items: Type[]): Type[] {
  return items.sort((a, b) => compareAsc(parseISO(b.startDate), parseISO(a.startDate)))
}
