import siteConfig from '@/config'

export function DefaultSiteTitle() {
  return (
    <>
      <title>{siteConfig.siteTitle}</title>
    </>
  )
}
