import { SiteMetadata } from '@/components/layout/SEO/SiteMetadata'
import { SEO } from '@/components/layout/SEO/DynamicSEO'
import { createUrl, WORK_PATH } from '@/constants/urls'
import { StructuredData } from '@/components/layout/SEO/StructuredData'

const PAGE_TITLE = 'Career'
const PATHNAME = WORK_PATH

export default function WorkPageHead() {
  return (
    <>
      <SiteMetadata />
      <SEO type="page" path={PATHNAME} content={{ title: PAGE_TITLE }} />
      <StructuredData
        type="Page"
        args={{
          title: PAGE_TITLE,
          url: createUrl(PATHNAME),
          // TODO
          description: '',
        }}
      />
    </>
  )
}
