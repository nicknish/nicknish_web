// TODO: move to contentalyer

import { notFound } from 'next/navigation'

import Show, { ShowTypes } from '@/components/Show'
import { getAllWorkHistory, getWorkHistoryBySlug } from '@/lib/api'
import { formatDate, getDate } from '@/utils/dates'

export async function generateStaticParams() {
  const jobs = await getAllWorkHistory()
  return jobs.map(job => ({ slug: job.slug }))
}

export default async function WorkPage({ params: { slug } }: { params: { slug: string } }) {
  const data = await getWorkHistoryBySlug(slug)
  const formattedStartDate = data.startDate ? formatDate(data.startDate) : data.startDate
  const formattedEndDate = data.endDate ? formatDate(data.endDate) : data.endDate

  if (!data) {
    notFound()
  }

  return (
    <main>
      <Show
        title={data.title}
        description={data.description}
        date={getDate(formattedStartDate, formattedEndDate, data.current)}
        path={data.path}
        external_url={data.url}
        type={ShowTypes.WORK}
        image={data.imagesCollection.items[0]}
      />
    </main>
  )
}
