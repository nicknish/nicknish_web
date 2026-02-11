import type { Post } from 'lib/content/types'
import type { NotionPost } from './types'
import { calculateReadingTime } from 'lib/content/reading-time'

export function notionPostToPost(notionPost: NotionPost): Post {
  return {
    title: notionPost.properties.title,
    slug: notionPost.properties.slug,
    date: notionPost.properties.publicationDate ?? new Date().toISOString(),
    description: notionPost.properties.description,
    tags: notionPost.properties.tags.length > 0 ? notionPost.properties.tags : undefined,
    readingTime: calculateReadingTime(notionPost.content),
    url: `/blog/${notionPost.properties.slug}`,
    body: { raw: notionPost.content },
    source: 'notion',
  }
}
