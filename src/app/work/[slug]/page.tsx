import { notFound } from 'next/navigation'

import { formatIsoDate, getDate } from '@/utils/dates'
import { allJobs, type Job } from 'contentlayer/generated'
import { getJobBySlug } from './utils'

import { Show, ShowTypes } from '@/components/Layout/Show'
import { TrackOnMount } from '@/components/common/Tracking'

export async function generateStaticParams() {
  return allJobs.map(job => ({ slug: job.slug }))
}

interface IWorkPageProps {
  params: IWorkPageParams
}

export interface IWorkPageParams {
  slug: Job['slug']
}

export default function WorkPage(props: IWorkPageProps) {
  const job = getJobBySlug(props.params.slug)
  if (!job) {
    notFound()
  }

  const formattedStartDate = job.startDate ? formatIsoDate(job.startDate) : job.startDate
  const formattedEndDate = job.endDate ? formatIsoDate(job.endDate) : job.endDate
  const formattedDate = getDate(formattedStartDate, formattedEndDate, job.current)

  return (
    <TrackOnMount trackingData={{ page: 'Job' }}>
      <Show
        title={job.title}
        description={job.body.code}
        date={formattedDate}
        external_url={job.jobUrl}
        type={ShowTypes.WORK}
        image={job.bannerImage ? { url: job.bannerImage, description: 'Company logo' } : undefined}
      />
    </TrackOnMount>
  )
}
