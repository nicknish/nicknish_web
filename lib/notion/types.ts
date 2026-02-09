export interface NotionPostProperties {
  id: string
  title: string
  slug: string
  description: string
  status: string
  tags: string[]
  publicationDate: string | null
  scheduledDate: string | null
  type: string | null
  shelved: boolean
}

export interface NotionPost {
  id: string
  properties: NotionPostProperties
  content: string
}
