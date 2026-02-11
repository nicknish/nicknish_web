import { describe, it, expect } from 'vitest'
import { getRelatedPosts } from './related-posts'
import type { Post } from 'lib/content'

function makePost(overrides: Partial<Post> & { slug: string }): Post {
  return {
    title: overrides.slug,
    date: '2024-01-01',
    description: '',
    readingTime: 1,
    url: `/blog/${overrides.slug}`,
    body: { raw: '' },
    ...overrides,
  }
}

describe('getRelatedPosts', () => {
  it('returns posts ranked by number of shared tags', () => {
    const current = makePost({ slug: 'current', tags: ['react', 'typescript', 'nextjs'] })
    const allPosts = [
      current,
      makePost({ slug: 'one-match', tags: ['react'] }),
      makePost({ slug: 'two-matches', tags: ['react', 'typescript'] }),
      makePost({ slug: 'three-matches', tags: ['react', 'typescript', 'nextjs'] }),
      makePost({ slug: 'no-match', tags: ['python'] }),
    ]

    const result = getRelatedPosts(current, allPosts)
    expect(result.map(p => p.slug)).toEqual(['three-matches', 'two-matches', 'one-match'])
  })

  it('falls back to most recent posts when current post has no tags', () => {
    const current = makePost({ slug: 'current' })
    const allPosts = [
      current,
      makePost({ slug: 'oldest', date: '2024-01-01' }),
      makePost({ slug: 'newest', date: '2024-03-01' }),
      makePost({ slug: 'middle', date: '2024-02-01' }),
    ]

    const result = getRelatedPosts(current, allPosts)
    expect(result.map(p => p.slug)).toEqual(['newest', 'middle', 'oldest'])
  })

  it('breaks ties by date (most recent first)', () => {
    const current = makePost({ slug: 'current', tags: ['react'] })
    const allPosts = [
      current,
      makePost({ slug: 'older', tags: ['react'], date: '2024-01-01' }),
      makePost({ slug: 'newer', tags: ['react'], date: '2024-06-01' }),
    ]

    const result = getRelatedPosts(current, allPosts)
    expect(result.map(p => p.slug)).toEqual(['newer', 'older'])
  })

  it('returns empty array when only one post exists', () => {
    const current = makePost({ slug: 'only-post', tags: ['react'] })
    const result = getRelatedPosts(current, [current])
    expect(result).toEqual([])
  })

  it('matches tags case-insensitively', () => {
    const current = makePost({ slug: 'current', tags: ['React', 'TypeScript'] })
    const allPosts = [
      current,
      makePost({ slug: 'lower', tags: ['react', 'typescript'] }),
      makePost({ slug: 'upper', tags: ['REACT'] }),
    ]

    const result = getRelatedPosts(current, allPosts)
    expect(result[0].slug).toBe('lower')
    expect(result[1].slug).toBe('upper')
  })

  it('respects the limit parameter', () => {
    const current = makePost({ slug: 'current', tags: ['react'] })
    const allPosts = [
      current,
      makePost({ slug: 'a', tags: ['react'], date: '2024-04-01' }),
      makePost({ slug: 'b', tags: ['react'], date: '2024-03-01' }),
      makePost({ slug: 'c', tags: ['react'], date: '2024-02-01' }),
      makePost({ slug: 'd', tags: ['react'], date: '2024-01-01' }),
    ]

    const result = getRelatedPosts(current, allPosts, 2)
    expect(result).toHaveLength(2)
  })

  it('fills with recent posts when fewer tag matches than limit', () => {
    const current = makePost({ slug: 'current', tags: ['react'] })
    const allPosts = [
      current,
      makePost({ slug: 'match', tags: ['react'], date: '2024-01-01' }),
      makePost({ slug: 'no-match-new', tags: ['python'], date: '2024-06-01' }),
      makePost({ slug: 'no-match-old', tags: ['go'], date: '2024-02-01' }),
    ]

    const result = getRelatedPosts(current, allPosts)
    expect(result.map(p => p.slug)).toEqual(['match', 'no-match-new', 'no-match-old'])
  })

  it('handles candidates with no tags', () => {
    const current = makePost({ slug: 'current', tags: ['react'] })
    const allPosts = [
      current,
      makePost({ slug: 'no-tags', date: '2024-06-01' }),
      makePost({ slug: 'has-tags', tags: ['react'], date: '2024-01-01' }),
    ]

    const result = getRelatedPosts(current, allPosts)
    expect(result[0].slug).toBe('has-tags')
    expect(result[1].slug).toBe('no-tags')
  })
})
