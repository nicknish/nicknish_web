import { type Project, type Job, allProjects } from 'contentlayer/generated'
import { compareAsc, parseISO } from 'date-fns'

export function sortItemsByDate<Type extends Job | Project>(items: Type[]): Type[] {
  return items.sort((a, b) => compareAsc(parseISO(b.startDate), parseISO(a.startDate)))
}

export function getProjectBySlug(slug: Project['slug']): Project | undefined {
  return allProjects.find(project => project.slug === slug)
}
