import { SEO } from '@/components/layout/SEO/DynamicSEO'
import { SiteMetadata } from '@/components/layout/SEO/SiteMetadata'
import { StructuredData } from '@/components/layout/SEO/StructuredData'
import { createUrl } from '@/constants/urls'
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
        type="post"
        path={job.url}
        content={{
          title: job.title,
          description: job.description,
        }}
      />
      <StructuredData
        type="Job"
        args={{
          url: createUrl(job.url),
          title: job.title,
          description: job.description,
        }}
      />
    </>
  )
}
