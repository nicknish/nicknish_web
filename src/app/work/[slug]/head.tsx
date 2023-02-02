import { SEO, SEOTypes } from '@/components/layout/SEO/DynamicSEO'
import { SiteMetadata } from '@/components/layout/SEO/SiteMetadata'
import { notFound } from 'next/navigation'

import { type IWorkPageParams } from './page'
import { getJobBySlug } from './utils'

interface IWorkPageHeadProps {
  params: IWorkPageParams
}

export default async function WorkPageHead(props: IWorkPageHeadProps) {
  const job = getJobBySlug(props.params.slug)
  if (!job) {
    notFound()
  }

  return (
    <>
      <SiteMetadata />
      <SEO
        path={job.url}
        type={SEOTypes.page}
        content={{
          title: job.title,
        }}
      />
    </>
  )
}
