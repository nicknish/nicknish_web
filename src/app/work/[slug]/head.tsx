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
      {/* TODO: Fix SEO for Work posts */}
      <title>{job.title}</title>
    </>
  )
}
