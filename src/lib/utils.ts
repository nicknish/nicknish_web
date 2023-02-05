import type { Post, Job, Project, PostSeries, PostCollection } from 'contentlayer/generated'

export function getItemBySlug(collection: Post[], slug: Post['slug']): Post
export function getItemBySlug(collection: Job[], slug: Job['slug']): Job
export function getItemBySlug(collection: Project[], slug: Project['slug']): Project
export function getItemBySlug(collection: PostSeries[], slug: PostSeries['slug']): PostSeries
export function getItemBySlug(
  collection: PostCollection[],
  slug: PostCollection['slug']
): PostCollection
export function getItemBySlug(collection: any[], slug: string) {
  return collection.find(item => item.slug === slug)
}
