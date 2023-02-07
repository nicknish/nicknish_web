import { createUrl } from '@/constants/urls'
import { CONTACT_PAGE_TITLE, CONTACT_PATHNAME } from './constants'

import { SiteMetadata } from '@/components/Layout/SEO/SiteMetadata'
import { SEO } from '@/components/Layout/SEO/DynamicSEO'
import { StructuredData } from '@/components/Layout/SEO/StructuredData'

export default function ContactPageHead() {
  return (
    <>
      <SiteMetadata />
      <SEO type="page" path={CONTACT_PATHNAME} content={{ title: CONTACT_PAGE_TITLE }} />
      <StructuredData
        type="Page"
        args={{
          url: createUrl(CONTACT_PATHNAME),
          title: CONTACT_PAGE_TITLE,
          description: '', // TODO
        }}
      />
    </>
  )
}
