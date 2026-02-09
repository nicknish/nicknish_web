import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import type { Post, Job, Project, PostCollection, PostSeries, Experiment } from './types'
import { fetchNotionPosts } from 'lib/notion/fetcher'
import { notionPostToPost } from 'lib/notion/adapter'

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

function getMdxPosts(): Post[] {
  return readMdxFiles('posts').map(({ frontmatter, content }) => ({
    title: frontmatter.title,
    slug: frontmatter.slug,
    date: typeof frontmatter.date === 'object' ? frontmatter.date.toISOString() : String(frontmatter.date),
    description: frontmatter.description,
    tags: frontmatter.tags,
    shareImage: frontmatter.shareImage,
    url: `/blog/${frontmatter.slug}`,
    body: { raw: content },
    source: 'mdx' as const,
  }))
}

async function getNotionPosts(): Promise<Post[]> {
  try {
    const notionPosts = await fetchNotionPosts()
    return notionPosts.map(notionPostToPost)
  } catch (error) {
    console.warn('[Content] Failed to fetch Notion posts:', error)
    return []
  }
}

let _postsCache: Post[] | null = null

export async function getPosts(): Promise<Post[]> {
  if (_postsCache) return _postsCache

  const [mdxPosts, notionPosts] = await Promise.all([
    Promise.resolve(getMdxPosts()),
    getNotionPosts(),
  ])

  // Check for slug collisions
  const slugs = new Set<string>()
  for (const post of [...mdxPosts, ...notionPosts]) {
    if (slugs.has(post.slug)) {
      throw new Error(`Duplicate post slug found: "${post.slug}". Each post must have a unique slug across MDX and Notion sources.`)
    }
    slugs.add(post.slug)
  }

  const allPosts = [...mdxPosts, ...notionPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )
  _postsCache = allPosts
  return _postsCache
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

function getExperimentsMdx(): Experiment[] {
  return readMdxFiles('experiments').map(({ frontmatter, content }) => ({
    title: frontmatter.title,
    slug: frontmatter.slug,
    date: typeof frontmatter.date === 'object' ? frontmatter.date.toISOString() : String(frontmatter.date),
    description: frontmatter.description,
    thumbnail: frontmatter.thumbnail,
    tags: frontmatter.tags,
    url: `/lab/${frontmatter.slug}`,
    body: { raw: content },
  })).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

// Cache the results so we don't re-read files on every import
let _allJobs: Job[] | null = null
let _allProjects: Project[] | null = null
let _allPostCollections: PostCollection[] | null = null
let _allPostSeries: PostSeries[] | null = null
let _allExperiments: Experiment[] | null = null

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

export const allExperiments: Experiment[] = (() => {
  if (!_allExperiments) _allExperiments = getExperimentsMdx()
  return _allExperiments
})()

export type { Post, Job, Project, PostCollection, PostSeries, Experiment }
