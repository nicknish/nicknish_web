import { createUrl } from '@/constants/urls'
import { WORK_PAGE_PATHNAME, WORK_PAGE_TITLE } from './constants'

import { SiteMetadata } from '@/components/Layout/SEO/SiteMetadata'
import { SEO } from '@/components/Layout/SEO/DynamicSEO'
import { StructuredData } from '@/components/Layout/SEO/StructuredData'

export default function WorkPageHead() {
  return (
    <>
      <SiteMetadata />
      <SEO type="page" path={WORK_PAGE_PATHNAME} content={{ title: WORK_PAGE_TITLE }} />
      <StructuredData
        type="Page"
        args={{
          title: WORK_PAGE_TITLE,
          url: createUrl(WORK_PAGE_PATHNAME),
          // TODO
          description: '',
        }}
      />
    </>
  )
}
