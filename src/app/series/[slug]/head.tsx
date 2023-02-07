import { notFound } from 'next/navigation'

import { getMeAuthorStructuredData } from '@/components/Layout/SEO/StructuredData/structuredDataUtils'
import { createUrl } from '@/constants/urls'
import { getPostsFromPostSeries } from '@/lib/posts'
import { getItemBySlug } from '@/lib/utils'
import { allPostSeries } from 'contentlayer/generated'
import type { IBlogPostSeriesProps } from './page'

import { SEO } from '@/components/Layout/SEO/DynamicSEO'
import { SiteMetadata } from '@/components/Layout/SEO/SiteMetadata'
import { StructuredData } from '@/components/Layout/SEO/StructuredData'

export default function BlogPostSeriesPageHead(props: IBlogPostSeriesProps) {
  const series = getItemBySlug(allPostSeries, props.params.slug)
  if (!series) {
    notFound()
  }
  const recentPost = getPostsFromPostSeries(series).pop()

  return (
    <>
      <SiteMetadata />
      <SEO
        type="post"
        path={series.url}
        content={{
          title: series.title,
          description: series.description,
          datePublished: recentPost?.date,
        }}
      />
      <StructuredData
        type="PostSeries"
        args={{
          url: createUrl(series.url),
          title: series.title,
          description: series.description,
          shareImage: series.bannerImage,
          datePublished: recentPost?.date,
          dateModified: recentPost?.date,
          author: getMeAuthorStructuredData(),
        }}
      />
    </>
  )
}
