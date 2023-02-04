import { type Project, type Job, allProjects, allJobs } from 'contentlayer/generated'
import { compareAsc, parseISO } from 'date-fns'

export function getJobs(options: { only: 'fulltime' | 'contract' }) {
  if (options.only) {
    return allJobs.filter(job => (options.only === 'fulltime' ? job.fulltime : !job.fulltime))
  }
  return allJobs
}

export function sortItemsByDate<Type extends Job | Project>(items: Type[]): Type[] {
  return items.sort((a, b) => compareAsc(parseISO(b.startDate), parseISO(a.startDate)))
}

export function getProjectBySlug(slug: Project['slug']): Project | undefined {
  return allProjects.find(project => project.slug === slug)
}
