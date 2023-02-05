/* TODO: This whole component needs a refactor */
import React from 'react'
import Script from 'next/script'

import siteMetadata from '@/config'

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
  const page = type === SEOTypes.page ? content : null
  const post = type === SEOTypes.post ? content : null
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
  const schemaOrgJSONLD = getStructuredDataSchema({
    page,
    post,
    pageUrl,
    title,
    image,
    imgWidth,
    imgHeight,
    ...siteMetadata,
  })
  const ogType = post ? 'article' : 'website'

  return (
    <>
      {/* General tags */}
      <title>{title}</title>
      <link rel="canonical" href={pageUrl} />
      <meta name="image" content={image} />
      <meta name="description" content={description} />

      {/* Schema.org tags */}
      {/* TODO: Script throws runtime error with inline script */}
      {/* <Script
        type="application/ld+json"
        id=""
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrgJSONLD) }}
        strategy="beforeInteractive"
        async
      /> */}

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
  publishedDate: string
}

export enum SEOTypes {
  page = 'page',
  post = 'post',
}

export interface SEOPropTypes {
  path: string
  type: SEOTypes
  content: SEOPagePropTypes | SEOPostPropTypes
}

const getPageUrl = (args: { siteUrl: string; path: string }) => {
  const { siteUrl, path } = args
  return path ? `${siteUrl}${path}` : siteUrl
}

// TODO: any
const getPageTitle = (args: { post: any; page: any; siteTitle: string; shortTitle: string }) => {
  const { post, page, siteTitle, shortTitle } = args
  if (page && page.title) return `${page.title} - ${shortTitle}`
  if (post && post.title) return `${post.title} - ${shortTitle}`
  return siteTitle
}

// TODO: any
const getPageDescription = (args: { page: any; post: any; siteDescription: string }) => {
  const { page, post, siteDescription } = args
  if (page && page.description) return page.description
  if (post && post.description) return post.description
  return siteDescription
}

const getPageImage = (args: {
  siteUrl: string
  post: any
  defaultShareImage: string
  defaultShareImageWidth: number
  defaultShareImageHeight: number
}) => {
  const { siteUrl, post, defaultShareImage, defaultShareImageWidth, defaultShareImageHeight } = args
  let image
  let imgWidth
  let imgHeight

  if (post && post.shareImage && post.shareImageWidth && post.shareImageHeight) {
    image = `https:${post.shareImage}`
    imgWidth = post.shareImageWidth
    imgHeight = post.shareImageHeight
  } else {
    image = `${siteUrl}/${defaultShareImage}`
    imgWidth = defaultShareImageWidth
    imgHeight = defaultShareImageHeight
  }

  // Use Hero Image for OpenGraph
  // if (post.heroImage) {
  //   image = 'https:' + post.heroImage.ogimg.src;
  //   imgWidth = post.heroImage.ogimg.width;
  //   imgHeight = post.heroImage.ogimg.height;
  // }

  return { image, imgWidth, imgHeight }
}

// TODO: any
const getStructuredDataSchema = (args: {
  page: any
  post: any
  title: string
  image: string
  imgWidth: string
  imgHeight: string
  pageUrl: string
  siteUrl: string
  siteTitle: string
  siteTitleAlt: string
  author: string
  authorUrl: string
  publisher: string
}) => {
  const {
    page,
    post,
    title,
    image,
    imgWidth,
    imgHeight,
    pageUrl,
    siteUrl,
    siteTitle,
    siteTitleAlt,
    author,
    authorUrl,
    publisher,
  } = args
  const schema: object[] = [
    {
      '@context': 'http://schema.org',
      '@type': 'WebSite',
      url: siteUrl,
      name: siteTitle,
      alternateName: siteTitleAlt,
    },
  ]

  if (page) {
    schema.push({
      '@context': 'http://schema.org',
      '@type': 'WebPage',
      url: pageUrl,
      name: title,
    })
  }

  // Blog Post Schema
  if (post) {
    schema.push(
      {
        '@context': 'http://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            item: {
              '@id': siteUrl,
              name: siteTitle,
            },
          },
          {
            '@type': 'ListItem',
            position: 2,
            item: {
              '@id': pageUrl,
              name: title,
            },
          },
        ],
      },
      {
        '@context': 'http://schema.org',
        '@type': 'BlogPosting',
        url: pageUrl,
        name: title,
        alternateName: siteTitleAlt,
        headline: title,
        image: {
          '@type': 'ImageObject',
          url: image,
          width: imgWidth,
          height: imgHeight,
        },
        author: {
          '@type': 'Person',
          name: author,
          url: authorUrl,
        },
        publisher: {
          '@type': 'Organization',
          name: publisher,
          url: siteUrl,
        },
        datePublished: post.publishedDate,
        mainEntityOfPage: pageUrl,
      }
    )
  }

  return schema
}
