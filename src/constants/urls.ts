export const SITE_URL = 'https://www.nicknish.co'
export const HOME_PATH = '/'
export const BLOG_PATH = '/blog'
export const SERIES_PATH = '/series'
export const WORK_PATH = '/work'
export const PROJECT_PATH = '/projects'
export const START_PATH = '/start'
export const NEWSLETTER_PATH = '/newsletter'
export const CONTACT_PATH = '/contact'

export const createPath = (type: string, slug: string) => `${type}/${slug}`

const API_ROUTE = '/api'
export const API_NEWSLETTER_PATH = `${API_ROUTE}/subscribe`
export const API_CONTACT_PATH = `${API_ROUTE}/contact`
