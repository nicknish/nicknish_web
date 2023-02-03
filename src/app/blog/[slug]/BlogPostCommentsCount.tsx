'use client'

import { CommentCount } from 'disqus-react'

import type { Post } from 'contentlayer/generated'
import { useGetDisqusConfig } from './utils'

interface IBlogPostCommentsCountProps {
  title: Post['title']
  identifier: string
  blogPostSectionElementSelector: string
}

export function BlogPostCommentsCount(props: IBlogPostCommentsCountProps) {
  const { title, identifier, blogPostSectionElementSelector } = props
  const disqusConfig = useGetDisqusConfig(title, identifier)

  const handleClick = () => {
    const $blogPostSectionEl = document.querySelector(blogPostSectionElementSelector)

    // Check element exists and scrollIntoView method is supported
    if ($blogPostSectionEl && 'scrollIntoView' in $blogPostSectionEl) {
      $blogPostSectionEl.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }

  return (
    <button className="hover:text-primary-500" onClick={handleClick}>
      <CommentCount {...disqusConfig} />
    </button>
  )
}
