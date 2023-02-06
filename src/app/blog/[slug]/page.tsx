import React from 'react'
import { notFound } from 'next/navigation'

import { allPosts, Post } from 'contentlayer/generated'
import { formatIsoDate } from '@/utils/dates'
import { getItemBySlug } from '@/lib/utils'

import { TrackOnMount } from '@/components/common/Tracking'
import { DynamicProseBlock } from '@/components/common/content/DynamicProseBlock'
import { MDXBlock } from '@/components/common/content/MDXBlock'
import { BlogPostComments } from './BlogPostComments'
import { BlogPostCommentsCount } from './BlogPostCommentsCount'

export async function generateStaticParams() {
  return allPosts.map(post => ({ slug: post.slug }))
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
            <MDXBlock code={post.body.code} />
            <p>
              Thanks for reading! You are my favorite person for sticking around until the end. 🍻
            </p>
            <p>
              This blog is a constant work in progress, and I want to get better with your help! If
              you have feedback or questions on this post, please leave a comment below, use my
              site’s contact page, or reach out to me on Twitter.
            </p>
          </DynamicProseBlock>
          <footer className="mt-8">
            <div className="flex items-center gap-x-2">
              {post.tags?.map((tag, idx) => (
                <div className="px-2 py-2 dark:bg-black-30" key={idx}>
                  {tag}
                </div>
              ))}
            </div>
          </footer>
        </section>

        <div className="mt-8" data-target="comments">
          {/* TODO: Fix BlogPostLikes */}
          {/* <BlogPostLikes slug={slug} /> */}
          <BlogPostComments title={post.title} identifier={post.slug} />
        </div>
      </main>
    </TrackOnMount>
  )
}
