'use client'

import { DiscussionEmbed } from 'disqus-react'

import type { Post } from 'contentlayer/generated'
import { useGetDisqusConfig } from './utils'

interface IBlogPostCommentsProps {
  title: Post['title']
  identifier: string
}

export function BlogPostComments(props: IBlogPostCommentsProps) {
  const { title, identifier } = props
  const disqusConfig = useGetDisqusConfig(title, identifier)
  return <DiscussionEmbed {...disqusConfig} />
}
