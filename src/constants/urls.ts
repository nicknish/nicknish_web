export const HOME_PATH = '/'
export const BLOG_PATH = '/blog'
export const SERIES_PATH = '/series'
export const WORK_PATH = '/work'
export const PROJECTS_PATH = '/projects'
export const START_PATH = '/start'
export const NEWSLETTER_PATH = '/newsletter'
export const CONTACT_PATH = '/contact'

const API_ROUTE = '/api'
export const API_CONTACT_PATH = `${API_ROUTE}/contact`

export function createUrl(path: string) {
  return `${process.env.NEXT_PUBLIC_SITE_URL}${path}`
}
