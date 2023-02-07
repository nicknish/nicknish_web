import { createUrl } from '@/constants/urls'
import { NEWSLETTER_PAGE_TITLE, NEWSLETTER_PATHNAME } from './constants'

import { SiteMetadata } from '@/components/Layout/SEO/SiteMetadata'
import { SEO } from '@/components/Layout/SEO/DynamicSEO'
import { StructuredData } from '@/components/Layout/SEO/StructuredData'

export default function NewsletterPageHead() {
  return (
    <>
      <SiteMetadata />
      <SEO type="page" path={NEWSLETTER_PATHNAME} content={{ title: NEWSLETTER_PAGE_TITLE }} />
      <StructuredData
        type="Page"
        args={{
          url: createUrl(NEWSLETTER_PATHNAME),
          title: NEWSLETTER_PAGE_TITLE,
          description: '', // TODO
        }}
      />
    </>
  )
}
