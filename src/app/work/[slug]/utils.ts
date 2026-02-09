import { allJobs, type Job } from 'lib/content'

export function getJobBySlug(slug: Job['slug']): Job | undefined {
  return allJobs.find(job => job.slug === slug)
}
