'use client'

import type { Post } from 'lib/content'
import { MDXBlock } from '@/components/common/content/MDXBlock'

interface IBlogPostContentProps {
  post: Post
}

export function BlogPostContent(props: IBlogPostContentProps) {
  const { post } = props
  // TODO: Add BookmarkLink to components, see BookmarkLink component
  return <MDXBlock source={post.body.raw} />
}
