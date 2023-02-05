import { SiteMetadata } from '@/components/layout/SEO/SiteMetadata'
import { SEO } from '@/components/layout/SEO/DynamicSEO'
import { START_PATH } from '@/constants/urls'

export default function StartPageHead() {
  return (
    <>
      <SiteMetadata />
      <SEO type="page" path={START_PATH} content={{ title: 'Start Here' }} />
    </>
  )
}
