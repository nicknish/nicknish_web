import type { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints'
import type { NotionPostProperties } from './types'

type PropertyValue = PageObjectResponse['properties'][string]

function getRichText(prop: PropertyValue): string {
  if (prop.type === 'rich_text') {
    return prop.rich_text.map(t => t.plain_text).join('')
  }
  return ''
}

function getTitle(prop: PropertyValue): string {
  if (prop.type === 'title') {
    return prop.title.map(t => t.plain_text).join('')
  }
  return ''
}

function getSelect(prop: PropertyValue): string | null {
  if (prop.type === 'select') {
    return prop.select?.name ?? null
  }
  return null
}

function getMultiSelect(prop: PropertyValue): string[] {
  if (prop.type === 'multi_select') {
    return prop.multi_select.map(s => s.name)
  }
  return []
}

function getDate(prop: PropertyValue): string | null {
  if (prop.type === 'date') {
    return prop.date?.start ?? null
  }
  return null
}

function getCheckbox(prop: PropertyValue): boolean {
  if (prop.type === 'checkbox') {
    return prop.checkbox
  }
  return false
}

export function extractPostProperties(page: PageObjectResponse): NotionPostProperties | null {
  const props = page.properties

  const title = props['Name'] ? getTitle(props['Name']) : ''
  const slug = props['Slug'] ? getRichText(props['Slug']) : ''

  if (!title || !slug) {
    return null
  }

  return {
    id: page.id,
    title,
    slug,
    description: props['Description'] ? getRichText(props['Description']) : '',
    status: getSelect(props['Status']) ?? '',
    tags: props['Tags'] ? getMultiSelect(props['Tags']) : [],
    publicationDate: props['Publication Date'] ? getDate(props['Publication Date']) : null,
    scheduledDate: props['Scheduled Date'] ? getDate(props['Scheduled Date']) : null,
    type: props['Type'] ? getSelect(props['Type']) : null,
    shelved: props['Shelved'] ? getCheckbox(props['Shelved']) : false,
  }
}
