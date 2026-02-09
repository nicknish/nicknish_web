import { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { formatIsoDate, getDate } from '@/utils/dates'
import { allJobs, type Job } from 'lib/content'
import { getJobBySlug } from './utils'
import { WORK_PAGE_PATHNAME } from '../constants'
import { createUrl } from '@/constants/urls'

import { Show, ShowTypes } from '@/components/Layout/Show'
import { StructuredData } from '@/components/Layout/SEO/StructuredData'

export async function generateStaticParams() {
  return allJobs.map(job => ({ slug: job.slug }))
}

interface IWorkPageProps {
  params: Promise<IWorkPageParams>
}

export interface IWorkPageParams {
  slug: Job['slug']
}

export async function generateMetadata({ params }: IWorkPageProps): Promise<Metadata> {
  const { slug } = await params
  const job = getJobBySlug(slug)
  if (!job) {
    throw new Error('Job not found when generating metadata')
  }

  return {
    title: job.title,
    description: job.description,
    openGraph: {
      url: createUrl(`${WORK_PAGE_PATHNAME}/${job.slug}`),
    },
    twitter: {
      site: createUrl(`${WORK_PAGE_PATHNAME}/${job.slug}`),
    },
  }
}

export default async function WorkPage(props: IWorkPageProps) {
  const { slug } = await props.params
  const job = getJobBySlug(slug)
  if (!job) {
    notFound()
  }

  const formattedStartDate = job.startDate ? formatIsoDate(job.startDate) : job.startDate
  const formattedEndDate = job.endDate ? formatIsoDate(job.endDate) : job.endDate
  const formattedDate = getDate(formattedStartDate, formattedEndDate, job.current)

  return (
    <>
      <Show
          title={job.title}
          description={job.body.raw}
          date={formattedDate}
          external_url={job.jobUrl}
          type={ShowTypes.WORK}
          image={
            job.bannerImage ? { url: job.bannerImage, description: 'Company logo' } : undefined
          }
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
