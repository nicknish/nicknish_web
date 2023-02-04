'use client'

import { CommentCount } from 'disqus-react'

import type { Post } from 'contentlayer/generated'
import { useGetDisqusConfig } from './utils'
import { isSmoothScrollSupported } from '@/utils/smoothScroll'

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
    if (!$blogPostSectionEl) {
      return
    }
    if (isSmoothScrollSupported()) {
      $blogPostSectionEl.scrollIntoView({ behavior: 'smooth', block: 'center' })
    } else {
      $blogPostSectionEl.scrollIntoView(false)
    }
  }

  return (
    <button className="hover:text-primary-500" onClick={handleClick}>
      <CommentCount {...disqusConfig} />
    </button>
  )
}
