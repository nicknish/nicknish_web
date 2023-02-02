import { DefaultSiteTitle } from '@/components/layout/SEO/DefaultSiteTitle'
import { SiteMetadata } from '@/components/layout/SEO/SiteMetadata'

export default function Head() {
  return (
    <>
      <DefaultSiteTitle />
      <SiteMetadata />
      {/* TODO: DO we need <SEO/> */}
    </>
  )
}
