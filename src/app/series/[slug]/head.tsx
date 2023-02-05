import { SEO } from '@/components/layout/SEO/DynamicSEO'
import { SiteMetadata } from '@/components/layout/SEO/SiteMetadata'
import { getPostsFromPostSeries } from '@/lib/posts'
import { getItemBySlug } from '@/lib/utils'
import { allPostSeries } from 'contentlayer/generated'
import { notFound } from 'next/navigation'
import { IBlogPostSeriesProps } from './page'

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
          publishedDate: recentPost?.date,
        }}
      />
    </>
  )
}
