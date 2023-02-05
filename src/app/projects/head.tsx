import { SiteMetadata } from '@/components/layout/SEO/SiteMetadata'
import { SEO } from '@/components/layout/SEO/DynamicSEO'
import { PROJECTS_PATH } from '@/constants/urls'

export default function ProjectPageHead() {
  return (
    <>
      <SiteMetadata />
      <SEO type="page" path={PROJECTS_PATH} content={{ title: 'Projects' }} />
    </>
  )
}
