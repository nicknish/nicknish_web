'use client'

import { Post } from 'contentlayer/generated'
import { MDXBlock } from '@/components/common/content/MDXBlock'

interface IBlogPostContentProps {
  post: Post
}

export function BlogPostContent(props: IBlogPostContentProps) {
  const { post } = props
  // TODO: Add BookmarkLink to components, see BookmarkLink component
  return <MDXBlock code={post.body.code} />
}
