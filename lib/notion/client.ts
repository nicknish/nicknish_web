import { Client } from '@notionhq/client'
import { NotionToMarkdown } from 'notion-to-md'

export const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID ?? ''
export const NOTION_DATA_SOURCE_ID = process.env.NOTION_DATA_SOURCE_ID ?? ''

let _client: Client | null = null
let _n2m: NotionToMarkdown | null = null

export function getNotionClient(): Client {
  if (!_client) {
    const apiKey = process.env.NOTION_API_KEY
    if (!apiKey) {
      throw new Error('NOTION_API_KEY is not set')
    }
    _client = new Client({ auth: apiKey })
  }
  return _client
}

export function getNotionToMarkdown(): NotionToMarkdown {
  if (!_n2m) {
    _n2m = new NotionToMarkdown({ notionClient: getNotionClient() })
  }
  return _n2m
}
