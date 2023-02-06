/* TODO: This whole component needs a refactor */
import React from 'react'

import siteMetadata from '@/config'
import { getPageDescription, getPageImage, getPageTitle, getPageUrl } from './utils'

const {
  siteUrl,
  siteTitle,
  shortTitle,
  siteDescription,
  shareImage,
  shareImageWidth,
  shareImageHeight,
  userTwitter,
} = siteMetadata

export const SEO: React.FC<SEOPropTypes> = ({ type, content, path }) => {
  const page = type === 'page' ? content : null
  const post = type === 'post' ? content : null
  const pageUrl = getPageUrl({ path, siteUrl })
  const title = getPageTitle({ page, post, siteTitle, shortTitle })
  const description = getPageDescription({ page, post, siteDescription })
  const { image, imgWidth, imgHeight } = getPageImage({
    post,
    siteUrl,
    defaultShareImage: shareImage,
    defaultShareImageWidth: shareImageWidth,
    defaultShareImageHeight: shareImageHeight,
  })
  const ogType = post ? 'article' : 'website'

  return (
    <>
      {/* General tags */}
      <title>{title}</title>
      <link rel="canonical" href={pageUrl} />
      <meta name="image" content={image} />
      <meta name="description" content={description} />

      {/* OpenGraph tags */}
      <meta property="og:title" content={title} />
      <meta property="og:type" content={ogType} />

      <meta property="og:url" content={pageUrl} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content={imgWidth} />
      <meta property="og:image:height" content={imgHeight} />
      <meta property="og:description" content={description} />

      {/* Twitter Card tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content={userTwitter} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:description" content={description} />
    </>
  )
}

interface SEOPagePropTypes {
  title?: string
}

interface SEOPostPropTypes {
  title: string
  description: string
  datePublished: string
}

export interface SEOPropTypes {
  path: string
  type: 'page' | 'post'
  content: SEOPagePropTypes | SEOPostPropTypes
}
