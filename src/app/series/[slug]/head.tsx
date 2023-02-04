import { SEO, SEOTypes } from '@/components/layout/SEO/DynamicSEO'
import { SiteMetadata } from '@/components/layout/SEO/SiteMetadata'
import { getBlogPostSeriesBySlug } from '@/lib/posts'
import { notFound } from 'next/navigation'
import { IBlogPostSeriesProps } from './page'

export default function BlogPostSeriesPageHead(props: IBlogPostSeriesProps) {
  const series = getBlogPostSeriesBySlug(props.params.slug)
  if (!series) {
    notFound()
  }
  return (
    <>
      <SiteMetadata />
      <SEO
        type={SEOTypes.page}
        path={series.url}
        content={{
          title: series.title,
        }}
      />
    </>
  )
}
