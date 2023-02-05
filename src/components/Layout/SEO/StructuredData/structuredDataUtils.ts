import type {
  BlogPosting,
  BreadcrumbList,
  CreativeWork,
  CreativeWorkSeries,
  Person,
  TechArticle,
  WebSite,
  WithContext,
} from 'schema-dts'
import { removeEmptyItems } from '@/utils/api'
import { assertUnreachable } from '@/utils/unreachable'
import siteConfig from '@/config'

export function getMeAuthorStructuredData() {
  return getAuthorStructuredData({
    name: siteConfig.author,
    url: siteConfig.siteUrl,
    otherUrls: [siteConfig.twitterUrl, siteConfig.githubUrl, siteConfig.linkedinUrl],
  })
}

export function getAuthorStructuredData(args: {
  name: string
  url: string
  otherUrls?: string[]
}): Person {
  const { name, url, otherUrls } = args
  return {
    '@type': 'Person',
    name,
    url,
    sameAs: otherUrls,
  }
}

// Overloads...
export function getStructuredData(
  type: 'Post',
  args: IBlogPostingArgs
): WithContext<BlogPosting> | WithContext<TechArticle>
export function getStructuredData(
  type: 'PostSeries',
  args: ICreativeWorkArgs
): WithContext<CreativeWorkSeries>
export function getStructuredData(
  type: 'Project',
  args: ICreativeWorkArgs
): WithContext<CreativeWork>
export function getStructuredData(type: 'Job', args: IDefaultThingArgs): WithContext<WebSite>
export function getStructuredData(type: 'Page', args: IDefaultThingArgs): WithContext<WebSite>

export function getStructuredData(
  type: 'Post' | 'PostSeries' | 'Project' | 'Job' | 'Page',
  args: any
): WithContext<any> {
  switch (type) {
    case 'Post':
      return removeEmptyItems(getBlogPostStructuredData(args))
    case 'PostSeries':
      return removeEmptyItems(getCreativeWorkSeriesStructuredData(args))
    case 'Project':
      return removeEmptyItems(getCreativeWorkStructuredData(args))
    case 'Job':
    case 'Page':
      return removeEmptyItems(getDefaultStructuredData(args))
    default:
      assertUnreachable(type)
  }
}

export interface ICreativeWorkArgs {
  url: string
  title: string
  description: string
  shareImage?: string
  datePublished?: string
  dateModified?: string
  author: CreativeWork['author']
}

export interface IDefaultThingArgs {
  url: string
  title: string
  description?: string
}

export interface IBlogPostingArgs extends ICreativeWorkArgs {
  category: 'dev' | 'other'
  siteUrl: string
  siteTitle: string
}

function getBlogPostStructuredData(
  args: IBlogPostingArgs
): [WithContext<BlogPosting | TechArticle>, WithContext<BreadcrumbList>] {
  const { category, siteUrl, siteTitle, url, title } = args

  return [
    {
      ...getCreativeWorkStructuredData(args),
      '@type': category === 'dev' ? 'TechArticle' : 'BlogPosting',
    },
    {
      // Breadcrumbs follow structure of /blog/foo where /blog is item 1 and
      // /.../foo is item 2
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          item: {
            '@id': siteUrl,
            name: siteTitle,
          },
        },
        {
          '@type': 'ListItem',
          position: 2,
          item: {
            '@id': url,
            name: title,
          },
        },
      ],
    },
  ]
}

function getCreativeWorkSeriesStructuredData(
  args: ICreativeWorkArgs
): WithContext<CreativeWorkSeries> {
  return {
    ...getCreativeWorkStructuredData(args),
    '@type': 'CreativeWorkSeries',
  }
}

function getCreativeWorkStructuredData(args: ICreativeWorkArgs): WithContext<CreativeWork> {
  const { url, title, shareImage, datePublished, dateModified, description, author } = args
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    '@id': url,
    url,
    headline: title,
    author,
    image: shareImage,
    datePublished,
    dateModified,
    about: description,
  }
}

function getDefaultStructuredData(args: IDefaultThingArgs): WithContext<WebSite> {
  const { url, title, description } = args
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': url,
    name: title,
    about: description,
  }
}
