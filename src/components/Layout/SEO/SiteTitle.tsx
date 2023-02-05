import siteConfig from '@/config'

export interface ISiteTitleProps {
  pageTitle?: string
}

export function SiteTitle(props: ISiteTitleProps) {
  const { pageTitle } = props

  return (
    <>
      <title>{buildSiteTitle(pageTitle)}</title>
    </>
  )
}

function buildSiteTitle(pageTitle?: string): string {
  if (pageTitle) {
    return `${pageTitle} - ${siteConfig.shortTitle}`
  }
  return siteConfig.siteTitle
}
