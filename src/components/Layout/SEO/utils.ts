import siteConfig from '@/config'

export const buildSiteTitle = (pageTitle?: string) => {
  if (pageTitle) {
    return `${pageTitle} | ${siteConfig.shortTitle}`
  }
  return siteConfig.siteTitle
}
