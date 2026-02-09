export interface Post {
  title: string
  slug: string
  date: string
  description: string
  tags?: string[]
  shareImage?: any
  url: string
  body: {
    raw: string
  }
  source?: 'mdx' | 'notion'
}

export interface Job {
  title: string
  slug: string
  fulltime: boolean
  startDate: string
  endDate?: string
  current: boolean
  jobUrl?: string
  description: string
  thumbnail?: any
  shareImage?: any
  bannerImage?: string
  url: string
  body: {
    raw: string
  }
}

export interface Project {
  title: string
  slug: string
  startDate: string
  endDate?: string
  current: boolean
  projectUrl?: string
  description: string
  thumbnail?: any
  shareImage?: any
  bannerImage?: string
  url: string
  body: {
    raw: string
  }
}

export interface PostCollection {
  title: string
  slug: string
  posts: string[]
  body: {
    raw: string
  }
}

export interface PostSeries {
  title: string
  slug: string
  posts: string[]
  description: string
  bannerImage: string
  bannerImageCredit: {
    raw: string
    html: string
  }
  url: string
  body: {
    raw: string
  }
}
