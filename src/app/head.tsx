import { createUrl, HOME_PATH } from '@/constants/urls'
import siteConfig from '@/config'

import { SiteMetadata } from '@/components/Layout/SEO/SiteMetadata'
import { SEO } from '@/components/Layout/SEO/DynamicSEO'
import { StructuredData } from '@/components/Layout/SEO/StructuredData'

const PATHNAME = HOME_PATH

export default function HomePageHead() {
  return (
    <>
      <SiteMetadata />
      <SEO type="page" path={PATHNAME} content={{}} />
      <StructuredData
        type="Page"
        args={{
          url: createUrl(PATHNAME),
          title: siteConfig.siteTitle,
          description: siteConfig.siteDescription,
        }}
      />
    </>
  )
}
