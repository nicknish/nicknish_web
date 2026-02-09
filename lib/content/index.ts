import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import type { Post, Job, Project, PostCollection, PostSeries } from './types'

const contentDir = path.join(process.cwd(), 'content')

function readMdxFiles(dir: string): { frontmatter: Record<string, any>; content: string; filePath: string }[] {
  const fullDir = path.join(contentDir, dir)
  if (!fs.existsSync(fullDir)) return []

  const files = getAllMdxFiles(fullDir)
  return files.map(filePath => {
    const raw = fs.readFileSync(filePath, 'utf-8')
    const { data, content } = matter(raw)
    return { frontmatter: data, content, filePath }
  })
}

function getAllMdxFiles(dir: string): string[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  const files: string[] = []
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      files.push(...getAllMdxFiles(fullPath))
    } else if (entry.name.endsWith('.mdx')) {
      files.push(fullPath)
    }
  }
  return files
}

// Simple markdown to HTML for inline markdown strings (used for bannerImageCredit)
function simpleMarkdownToHtml(md: string): string {
  return md
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em>$1</em>')
}

function getPosts(): Post[] {
  return readMdxFiles('posts').map(({ frontmatter, content }) => ({
    title: frontmatter.title,
    slug: frontmatter.slug,
    date: typeof frontmatter.date === 'object' ? frontmatter.date.toISOString() : String(frontmatter.date),
    description: frontmatter.description,
    tags: frontmatter.tags,
    shareImage: frontmatter.shareImage,
    url: `/blog/${frontmatter.slug}`,
    body: { raw: content },
  }))
}

function getJobs(): Job[] {
  return readMdxFiles('jobs').map(({ frontmatter, content }) => ({
    title: frontmatter.title,
    slug: frontmatter.slug,
    fulltime: frontmatter.fulltime,
    startDate: typeof frontmatter.startDate === 'object' ? frontmatter.startDate.toISOString() : String(frontmatter.startDate),
    endDate: frontmatter.endDate ? (typeof frontmatter.endDate === 'object' ? frontmatter.endDate.toISOString() : String(frontmatter.endDate)) : undefined,
    current: frontmatter.current,
    jobUrl: frontmatter.jobUrl,
    description: frontmatter.description,
    thumbnail: frontmatter.thumbnail,
    shareImage: frontmatter.shareImage,
    bannerImage: frontmatter.bannerImage,
    url: `/work/${frontmatter.slug}`,
    body: { raw: content },
  }))
}

function getProjects(): Project[] {
  return readMdxFiles('projects').map(({ frontmatter, content }) => ({
    title: frontmatter.title,
    slug: frontmatter.slug,
    startDate: typeof frontmatter.startDate === 'object' ? frontmatter.startDate.toISOString() : String(frontmatter.startDate),
    endDate: frontmatter.endDate ? (typeof frontmatter.endDate === 'object' ? frontmatter.endDate.toISOString() : String(frontmatter.endDate)) : undefined,
    current: frontmatter.current,
    projectUrl: frontmatter.projectUrl,
    description: frontmatter.description,
    thumbnail: frontmatter.thumbnail,
    shareImage: frontmatter.shareImage,
    bannerImage: frontmatter.bannerImage,
    url: `/projects/${frontmatter.slug}`,
    body: { raw: content },
  }))
}

function getPostCollections(): PostCollection[] {
  return readMdxFiles('post-collections').map(({ frontmatter, content }) => ({
    title: frontmatter.title,
    slug: frontmatter.slug,
    posts: frontmatter.posts,
    body: { raw: content },
  }))
}

function getPostSeries(): PostSeries[] {
  return readMdxFiles('series').map(({ frontmatter, content }) => ({
    title: frontmatter.title,
    slug: frontmatter.slug,
    posts: frontmatter.posts,
    description: frontmatter.description,
    bannerImage: frontmatter.bannerImage,
    bannerImageCredit: {
      raw: frontmatter.bannerImageCredit || '',
      html: simpleMarkdownToHtml(frontmatter.bannerImageCredit || ''),
    },
    url: `/series/${frontmatter.slug}`,
    body: { raw: content },
  }))
}

// Cache the results so we don't re-read files on every import
let _allPosts: Post[] | null = null
let _allJobs: Job[] | null = null
let _allProjects: Project[] | null = null
let _allPostCollections: PostCollection[] | null = null
let _allPostSeries: PostSeries[] | null = null

export const allPosts: Post[] = (() => {
  if (!_allPosts) _allPosts = getPosts()
  return _allPosts
})()

export const allJobs: Job[] = (() => {
  if (!_allJobs) _allJobs = getJobs()
  return _allJobs
})()

export const allProjects: Project[] = (() => {
  if (!_allProjects) _allProjects = getProjects()
  return _allProjects
})()

export const allPostCollections: PostCollection[] = (() => {
  if (!_allPostCollections) _allPostCollections = getPostCollections()
  return _allPostCollections
})()

export const allPostSeries: PostSeries[] = (() => {
  if (!_allPostSeries) _allPostSeries = getPostSeries()
  return _allPostSeries
})()

export type { Post, Job, Project, PostCollection, PostSeries }
