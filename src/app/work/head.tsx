import { SiteMetadata } from '@/components/layout/SEO/SiteMetadata'
import { SiteTitle } from '@/components/layout/SEO/SiteTitle'

export default function WorkPageHead() {
  return (
    <>
      <SiteTitle pageTitle="Career" />
      <SiteMetadata />
    </>
  )
}
