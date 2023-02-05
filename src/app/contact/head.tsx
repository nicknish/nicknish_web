import { CONTACT_PATH, createUrl } from '@/constants/urls'

import { SiteMetadata } from '@/components/layout/SEO/SiteMetadata'
import { SEO } from '@/components/layout/SEO/DynamicSEO'
import { StructuredData } from '@/components/layout/SEO/StructuredData'

const PAGE_TITLE = 'Contact'
const PATHNAME = CONTACT_PATH

export default function ContactPageHead() {
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
