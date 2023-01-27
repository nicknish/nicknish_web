import {
  allPostCollections,
  allPosts,
  type Post,
  type PostCollection,
} from 'contentlayer/generated'
// import { compareAsc, parseISO } from 'date-fns'

export function getPostCollectionBySlug(slug: PostCollection['slug']): PostCollection {
  const collection = allPostCollections.find(collection => collection.slug === slug)
  if (!collection) {
    throw new Error(`Cannot find PostCollection for slug ${slug}`)
  }
  return collection
}

export function getPostsFromCollection(collection: PostCollection): Post[] {
  // Ensures the collection's posts are ordered by their declaration
  const postsMap = allPosts.reduce((accumulator, post) => {
    if (collection.posts.includes(post.slug)) {
      accumulator[post.slug] = post
    }
    return accumulator
  }, {} as { [title: Post['title']]: Post })
  const posts = collection.posts.map(slug => postsMap[slug])

  return posts
}

// export function sortPostsByDate(posts: Post[]): Post[] {
//   return posts.sort((a, b) => compareAsc(parseISO(a.date), parseISO(b.date)))
// }
