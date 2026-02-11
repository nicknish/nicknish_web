import type { Post } from 'lib/content'

const DEFAULT_RELATED_POSTS_LIMIT = 3

export function getRelatedPosts(
  currentPost: Post,
  allPosts: Post[],
  limit: number = DEFAULT_RELATED_POSTS_LIMIT
): Post[] {
  const candidates = allPosts.filter(p => p.slug !== currentPost.slug)

  const currentTags = currentPost.tags ?? []
  if (currentTags.length === 0) {
    return [...candidates]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, limit)
  }

  const currentTagSet = new Set(currentTags.map(t => t.toLowerCase()))

  const scored = candidates.map(candidate => {
    const candidateTags = candidate.tags ?? []
    const score = candidateTags.filter(t => currentTagSet.has(t.toLowerCase())).length
    return { post: candidate, score }
  })

  scored.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score
    return new Date(b.post.date).getTime() - new Date(a.post.date).getTime()
  })

  return scored.slice(0, limit).map(s => s.post)
}
