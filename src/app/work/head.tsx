import { SiteMetadata } from '@/components/layout/SEO/SiteMetadata'
import { SEO } from '@/components/layout/SEO/DynamicSEO'
import { WORK_PATH } from '@/constants/urls'

export default function WorkPageHead() {
  return (
    <>
      <SiteMetadata />
      <SEO type="page" path={WORK_PATH} content={{ title: 'Career' }} />
    </>
  )
}
