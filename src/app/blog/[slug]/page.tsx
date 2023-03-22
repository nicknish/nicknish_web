import React from 'react'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { allPosts, Post } from 'contentlayer/generated'
import { formatIsoDate } from '@/utils/dates'
import { getItemBySlug } from '@/lib/utils'
import { getMeAuthorStructuredData } from '@/components/Layout/SEO/StructuredData/structuredDataUtils'
import { createUrl } from '@/constants/urls'
import siteConfig from '@/config'

import { TrackOnMount } from '@/components/common/Tracking'
import { DynamicProseBlock } from '@/components/common/content/DynamicProseBlock'
import { BlogPostContent } from './BlogPostContent'
import { BlogPostComments } from './BlogPostComments'
import { BlogPostCommentsCount } from './BlogPostCommentsCount'
import { BlogPostTags } from './BlogPostTags'
import { StructuredData } from '@/components/Layout/SEO/StructuredData'

export async function generateStaticParams() {
  return allPosts.map(post => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: IBlogPostProps): Promise<Metadata> {
  const post = getItemBySlug(allPosts, params.slug)
  if (!post) {
    throw new Error('Post not found when generating metadata')
  }

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      url: post.url,
      title: post.title,
      description: post.description,
      // TODO: this throws build error
      // images: post.shareImage
      //   ? [
      //       {
      //         url: post.shareImage!,
      //         width: 1200,
      //         height: 500,
      //         alt: post.title,
      //       },
      //     ]
      //   : undefined,
    },
    twitter: {
      site: post.url,
      title: post.title,
      description: post.description,
      // TODO: this throws build error
      // images: post.shareImage
      //   ? [
      //       {
      //         url: post.shareImage!,
      //         width: 1200,
      //         height: 500,
      //         alt: post.title,
      //       },
      //     ]
      //   : undefined,
    },
  }
}

export interface IBlogPostProps {
  params: {
    slug: Post['slug']
  }
}

export default function BlogPost(props: IBlogPostProps) {
  const post = getItemBySlug(allPosts, props.params.slug)
  if (!post) {
    notFound()
  }

  return (
    <>
      <TrackOnMount trackingData={{ page: 'Blog Post' }}>
        <main className="px-4 mx-auto max-w-3xl">
          <section>
            <header className="my-12">
              <h1 className="mb-4 text-3xl md:text-4xl font-bold">{post.title}</h1>
              <div className="flex items-center gap-x-3 text-slate-600 dark:text-white-80">
                <time dateTime={post.date}>{formatIsoDate(post.date)}</time>
                <span>–</span>
                <BlogPostCommentsCount
                  title={post.title}
                  identifier={post.slug}
                  blogPostSectionElementSelector="[data-target='comments']"
                />
              </div>
            </header>
            <DynamicProseBlock>
              <BlogPostContent post={post} />
              <p>
                Thanks for reading! You are my favorite person for sticking around until the end. 🍻
              </p>
              <p>
                This blog is a constant work in progress, and I want to get better with your help!
                If you have feedback or questions on this post, please leave a comment below, use my
                site’s contact page, or reach out to me on Twitter.
              </p>
            </DynamicProseBlock>
            {post.tags && (
              <footer className="mt-8">
                <BlogPostTags tags={post.tags} />
              </footer>
            )}
          </section>

          <div className="mt-8" data-target="comments">
            <BlogPostComments title={post.title} identifier={post.slug} />
          </div>
        </main>
      </TrackOnMount>
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
