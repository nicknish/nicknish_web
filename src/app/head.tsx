import { SiteMetadata } from '@/components/layout/SEO/SiteMetadata'
import { SEO } from '@/components/layout/SEO/DynamicSEO'
import { HOME_PATH } from '@/constants/urls'

export default function HomePageHead() {
  return (
    <>
      <SiteMetadata />
      <SEO type="page" path={HOME_PATH} content={{}} />
    </>
  )
}
