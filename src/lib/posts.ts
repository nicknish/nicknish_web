import { compareAsc, parseISO } from 'date-fns'

import { allPosts, type PostSeries, type Post, type PostCollection } from 'contentlayer/generated'

export function getPostsFromCollection(collection: PostCollection): Post[] {
  return getPostsFromSlugs(collection.posts)
}

export function getPostsFromPostSeries(series: PostSeries): Post[] {
  return sortPostsByDate(getPostsFromSlugs(series.posts))
}

export function sortPostsByDate(posts: Post[]): Post[] {
  return posts.sort((a, b) => compareAsc(parseISO(a.date), parseISO(b.date)))
}

function getPostsFromSlugs(slugs: Post['slug'][]): Post[] {
  const postsMap = allPosts.reduce((accumulator, post) => {
    if (slugs.includes(post.slug)) {
      accumulator[post.slug] = post
    }
    return accumulator
  }, {} as { [title: Post['title']]: Post })
  const posts = slugs.map(slug => postsMap[slug])

  return posts
}
