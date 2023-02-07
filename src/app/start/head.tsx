import { createUrl } from '@/constants/urls'
import { START_PAGE_PATHNAME, START_PAGE_TITLE } from './constants'

import { SiteMetadata } from '@/components/Layout/SEO/SiteMetadata'
import { SEO } from '@/components/Layout/SEO/DynamicSEO'
import { StructuredData } from '@/components/Layout/SEO/StructuredData'

export default function StartPageHead() {
  return (
    <>
      <SiteMetadata />
      <SEO type="page" path={START_PAGE_PATHNAME} content={{ title: START_PAGE_TITLE }} />
      <StructuredData
        type="Page"
        args={{
          url: createUrl(START_PAGE_PATHNAME),
          title: START_PAGE_TITLE,
          description: '', // TODO
        }}
      />
    </>
  )
}
