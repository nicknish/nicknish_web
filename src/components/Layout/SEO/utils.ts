export function getPageUrl(args: { siteUrl: string; path: string }): string {
  const { siteUrl, path } = args
  return path ? `${siteUrl}${path}` : siteUrl
}

// TODO: any
export function getPageTitle(args: {
  post: any
  page: any
  siteTitle: string
  shortTitle: string
}): string {
  const { post, page, siteTitle, shortTitle } = args
  if (page && page.title) return `${page.title} - ${shortTitle}`
  if (post && post.title) return `${post.title} - ${shortTitle}`
  return siteTitle
}

// TODO: any
export function getPageDescription(args: {
  page: any
  post: any
  siteDescription: string
}): string {
  const { page, post, siteDescription } = args
  if (page && page.description) return page.description
  if (post && post.description) return post.description
  return siteDescription
}

export function getPageImage(args: {
  siteUrl: string
  post: any
  defaultShareImage: string
  defaultShareImageWidth: number
  defaultShareImageHeight: number
}) {
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

/**
 * getStructuredData dynamically builds the Schema.org JSON-LD used for SEO
 * purposes.
 */
export function getStructuredData(args: {
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
}) {
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
