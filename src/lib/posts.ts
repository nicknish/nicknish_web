import {
  allPostCollections,
  allPosts,
  allPostSeries,
  type PostSeries,
  type Post,
  type PostCollection,
} from 'contentlayer/generated'
import { compareAsc, parseISO } from 'date-fns'

export function getBlogPostBySlug(slug: Post['slug']): Post | undefined {
  return allPosts.find(post => post.slug === slug)
}

export function getPostCollectionBySlug(slug: PostCollection['slug']): PostCollection {
  const collection = allPostCollections.find(collection => collection.slug === slug)
  if (!collection) {
    throw new Error(`Cannot find PostCollection for slug ${slug}`)
  }
  return collection
}

export function getPostsFromCollection(collection: PostCollection): Post[] {
  return getPostsFromSlugs(collection.posts)
}

export function sortPostsByDate(posts: Post[]): Post[] {
  return posts.sort((a, b) => compareAsc(parseISO(a.date), parseISO(b.date)))
}

export function getBlogPostSeriesBySlug(slug: string): PostSeries | undefined {
  const collection = allPostSeries.find(series => series.slug === slug)
  if (!collection) {
    throw new Error(`Cannot find PostSeries for slug ${slug}`)
  }
  return collection
}

export function getPostsFromPostSeries(series: PostSeries): Post[] {
  return sortPostsByDate(getPostsFromSlugs(series.posts))
}

export function getPostsFromSlugs(slugs: Post['slug'][]): Post[] {
  const postsMap = allPosts.reduce((accumulator, post) => {
    if (slugs.includes(post.slug)) {
      accumulator[post.slug] = post
    }
    return accumulator
  }, {} as { [title: Post['title']]: Post })
  const posts = slugs.map(slug => postsMap[slug])

  return posts
}
