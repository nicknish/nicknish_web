import { SiteMetadata } from '@/components/layout/SEO/SiteMetadata'
import { SiteTitle } from '@/components/layout/SEO/SiteTitle'

export default function StartPageHead() {
  return (
    <>
      <SiteTitle pageTitle="Start Here" />
      <SiteMetadata />
    </>
  )
}
