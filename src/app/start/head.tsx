import { createUrl, START_PATH } from '@/constants/urls'

import { SiteMetadata } from '@/components/layout/SEO/SiteMetadata'
import { SEO } from '@/components/layout/SEO/DynamicSEO'
import { StructuredData } from '@/components/layout/SEO/StructuredData'

const PAGE_TITLE = 'Start Here'
const PATHNAME = START_PATH

export default function StartPageHead() {
  return (
    <>
      <SiteMetadata />
      <SEO type="page" path={PATHNAME} content={{ title: PAGE_TITLE }} />
      <StructuredData
        type="Page"
        args={{
          url: createUrl(PATHNAME),
          title: PAGE_TITLE,
          description: '', // TODO
        }}
      />
    </>
  )
}
