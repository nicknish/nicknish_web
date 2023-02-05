import { SiteMetadata } from '@/components/layout/SEO/SiteMetadata'
import { SEO } from '@/components/layout/SEO/DynamicSEO'
import { StructuredData } from '@/components/layout/SEO/StructuredData'
import { createUrl, HOME_PATH } from '@/constants/urls'
import siteConfig from '@/config'

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
