import type { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints'
import { getNotionClient, getNotionToMarkdown, NOTION_DATABASE_ID, NOTION_DATA_SOURCE_ID } from './client'
import { extractPostProperties } from './properties'
import type { NotionPost } from './types'

const MAX_RETRIES = 3
const RETRY_DELAY_MS = 1000

async function withRetry<T>(fn: () => Promise<T>): Promise<T> {
  for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
    try {
      return await fn()
    } catch (error: any) {
      if (error?.status === 429 && attempt < MAX_RETRIES - 1) {
        const delay = RETRY_DELAY_MS * Math.pow(2, attempt)
        console.warn(`[Notion] Rate limited, retrying in ${delay}ms...`)
        await new Promise(resolve => setTimeout(resolve, delay))
        continue
      }
      throw error
    }
  }
  throw new Error('Unreachable')
}

async function promoteScheduledPost(pageId: string): Promise<void> {
  const notion = getNotionClient()
  const now = new Date().toISOString()

  await withRetry(() =>
    notion.pages.update({
      page_id: pageId,
      properties: {
        Status: { select: { name: 'Published' } },
        'Publication Date': { date: { start: now } },
      },
    })
  )
}

export async function fetchNotionPosts(): Promise<NotionPost[]> {
  if (!process.env.NOTION_API_KEY || !NOTION_DATA_SOURCE_ID) {
    return []
  }

  try {
    const notion = getNotionClient()
    const n2m = getNotionToMarkdown()
    const pages: PageObjectResponse[] = []

    let cursor: string | undefined = undefined
    do {
      const response = await withRetry(() =>
        notion.dataSources.query({
          data_source_id: NOTION_DATA_SOURCE_ID,
          start_cursor: cursor,
          filter: {
            and: [
              { property: 'Shelved', checkbox: { equals: false } },
              {
                or: [
                  { property: 'Status', select: { equals: 'Published' } },
                  { property: 'Status', select: { equals: 'Scheduled' } },
                ],
              },
            ],
          },
          sorts: [{ property: 'Publication Date', direction: 'descending' }],
        })
      )

      for (const page of response.results) {
        if ('properties' in page) {
          pages.push(page as PageObjectResponse)
        }
      }

      cursor = response.has_more ? (response.next_cursor ?? undefined) : undefined
    } while (cursor)

    const posts: NotionPost[] = []

    for (const page of pages) {
      const properties = extractPostProperties(page)
      if (!properties) continue

      if (properties.status === 'Scheduled') {
        const scheduledDate = properties.scheduledDate
          ? new Date(properties.scheduledDate)
          : null

        if (scheduledDate && scheduledDate <= new Date()) {
          await promoteScheduledPost(page.id)
          properties.status = 'Published'
          properties.publicationDate = new Date().toISOString()
        } else {
          continue
        }
      }

      if (properties.status !== 'Published' || !properties.publicationDate) {
        continue
      }

      const mdBlocks = await withRetry(() => n2m.pageToMarkdown(page.id))
      const mdString = n2m.toMarkdownString(mdBlocks)

      posts.push({
        id: page.id,
        properties,
        content: typeof mdString === 'string' ? mdString : mdString.parent,
      })
    }

    return posts
  } catch (error) {
    console.warn('[Notion] Failed to fetch posts, falling back to MDX-only:', error)
    return []
  }
}
