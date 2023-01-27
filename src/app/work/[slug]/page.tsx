import { notFound } from 'next/navigation'

import { Show, ShowTypes } from '@/components/Show'
import { formatIsoDate, getDate } from '@/utils/dates'
import { allJobs, type Job } from 'contentlayer/generated'
import { getJobBySlug } from './utils'

export async function generateStaticParams() {
  return allJobs.map(job => ({ slug: job.slug }))
}

interface IWorkPageProps {
  params: IWorkPageParams
}

export interface IWorkPageParams {
  slug: string
}

export default async function WorkPage(props: IWorkPageProps) {
  const job = getJobBySlug(props.params.slug)
  if (!job) {
    notFound()
  }

  const formattedStartDate = job.startDate ? formatIsoDate(job.startDate) : job.startDate
  const formattedEndDate = job.endDate ? formatIsoDate(job.endDate) : job.endDate
  const formattedDate = getDate(formattedStartDate, formattedEndDate, job.current)

  return (
    <main>
      <Show
        title={job.title}
        description={job.body.code}
        date={formattedDate}
        // TODO: Fix path?
        // path={job.path}
        external_url={job.url}
        type={ShowTypes.WORK}
        // TODO: Fix images
        // image={job.imagesCollection.items[0]}
      />
    </main>
  )
}
