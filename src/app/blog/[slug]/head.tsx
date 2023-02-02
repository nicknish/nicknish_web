import { notFound } from 'next/navigation'

import { SEO, SEOTypes } from '@/components/layout/SEO/DynamicSEO'
import { SiteMetadata } from '@/components/layout/SEO/SiteMetadata'

import { getBlogPostBySlug } from '@/lib/posts'
import { type IBlogPostProps } from './page'

export default function BlogPostHead(props: IBlogPostProps) {
  const post = getBlogPostBySlug(props.params.slug)
  if (!post) {
    notFound()
  }

  return (
    <>
      <SiteMetadata />
      <SEO
        path={post.url}
        type={SEOTypes.post}
        content={{
          title: post.title,
          // TODO
          excerpt: post.description,
          publishedDate: post.date,
        }}
      />
    </>
  )
}
