import { compareAsc, compareDesc, parseISO } from 'date-fns'

import { getPosts, type PostSeries, type Post, type PostCollection } from 'lib/content'

export async function getPostsFromCollection(collection: PostCollection): Promise<Post[]> {
  return getPostsFromSlugs(collection.posts)
}

export async function getPostsFromPostSeries(series: PostSeries): Promise<Post[]> {
  return sortPostsByDate(await getPostsFromSlugs(series.posts), 'asc')
}

export function sortPostsByDate(posts: Post[], order: 'asc' | 'desc'): Post[] {
  const compareFn = order === undefined || order === 'asc' ? compareAsc : compareDesc
  return posts.sort((a, b) => compareFn(parseISO(a.date), parseISO(b.date)))
}

async function getPostsFromSlugs(slugs: Post['slug'][]): Promise<Post[]> {
  const allPosts = await getPosts()
  const postsMap = allPosts.reduce((accumulator, post) => {
    if (slugs.includes(post.slug)) {
      accumulator[post.slug] = post
    }
    return accumulator
  }, {} as { [title: Post['title']]: Post })
  const posts = slugs.map(slug => postsMap[slug])

  return posts
}
