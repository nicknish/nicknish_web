import { notFound } from 'next/navigation'

import { type IBlogPostProps } from './page'
import { getItemBySlug } from '@/lib/utils'
import { allPosts } from 'contentlayer/generated'
import { createUrl } from '@/constants/urls'
import siteConfig from '@/config'
import { getMeAuthorStructuredData } from '@/components/layout/SEO/StructuredData/structuredDataUtils'

import { SiteMetadata } from '@/components/layout/SEO/SiteMetadata'
import { SEO } from '@/components/layout/SEO/DynamicSEO'
import { StructuredData } from '@/components/layout/SEO/StructuredData'

export default function BlogPostHead(props: IBlogPostProps) {
  const post = getItemBySlug(allPosts, props.params.slug)
  if (!post) {
    notFound()
  }

  return (
    <>
      <SiteMetadata />
      <SEO
        type="post"
        path={post.url}
        content={{
          title: post.title,
          description: post.description,
          datePublished: post.date,
        }}
      />
      <StructuredData
        type="Post"
        args={{
          url: createUrl(post.url),
          title: post.title,
          description: post.description,
          shareImage: post.shareImage, // TODO
          category: 'dev', // TODO
          siteUrl: siteConfig.siteUrl,
          siteTitle: siteConfig.siteTitle,
          datePublished: post.date,
          dateModified: post.date, // TODO
          author: getMeAuthorStructuredData(),
        }}
      />
    </>
  )
}
