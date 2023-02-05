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
