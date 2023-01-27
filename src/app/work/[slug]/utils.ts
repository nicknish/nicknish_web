import { allJobs, type Job } from 'contentlayer/generated'

export function getJobBySlug(slug: Job['slug']) {
  return allJobs.find(job => job.slug === slug)
}
