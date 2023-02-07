'use client'

import { CommentCount } from 'disqus-react'

import type { Post } from 'contentlayer/generated'
import { useGetDisqusConfig } from './utils'

import { SmoothScrollButton } from '@/components/common/SmoothScrollButton'

interface IBlogPostCommentsCountProps {
  title: Post['title']
  identifier: string
  blogPostSectionElementSelector: string
}

export function BlogPostCommentsCount(props: IBlogPostCommentsCountProps) {
  const { title, identifier, blogPostSectionElementSelector } = props
  const disqusConfig = useGetDisqusConfig(title, identifier)

  return (
    <SmoothScrollButton target={blogPostSectionElementSelector}>
      <CommentCount {...disqusConfig} /> Comments
    </SmoothScrollButton>
  )
}
