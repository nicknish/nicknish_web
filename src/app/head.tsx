import { SiteTitle } from '@/components/layout/SEO/SiteTitle'
import { SiteMetadata } from '@/components/layout/SEO/SiteMetadata'

export default function RootHead() {
  return (
    <>
      <SiteTitle />
      <SiteMetadata />
      {/* TODO: DO we need <SEO/> */}
    </>
  )
}
