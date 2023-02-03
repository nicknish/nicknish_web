import { SiteTitle } from '@/components/layout/SEO/SiteTitle'
import { SiteMetadata } from '@/components/layout/SEO/SiteMetadata'

export default function NewsletterPageHead() {
  return (
    <>
      <SiteTitle pageTitle="Subscribe" />
      <SiteMetadata />
    </>
  )
}
