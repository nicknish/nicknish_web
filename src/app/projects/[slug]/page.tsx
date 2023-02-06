import { notFound } from 'next/navigation'
import { format, parseISO } from 'date-fns'

import { getDate } from '@/utils/dates'
import { allProjects, type Project } from 'contentlayer/generated'
import { getItemBySlug } from '@/lib/utils'

import { Show, ShowTypes } from '@/components/layout/Show'
import { TrackOnMount } from '@/components/common/Tracking'

export async function generateStaticParams() {
  return allProjects.map(project => ({ slug: project.slug }))
}

export interface IProjectPageProps {
  params: {
    slug: Project['slug']
  }
}

export default async function ProjectPage(props: IProjectPageProps) {
  const project = getItemBySlug(allProjects, props.params.slug)
  if (!project) {
    notFound()
  }

  const formattedStartDate = project.startDate
    ? format(parseISO(project.startDate), 'LLLL d, yyyy')
    : undefined
  const formattedEndDate = project.endDate
    ? format(parseISO(project.endDate), 'LLLL d, yyyy')
    : undefined
  const formattedDate = getDate(formattedStartDate, formattedEndDate, project.current)

  return (
    <TrackOnMount trackingData={{ page: 'Project' }}>
      <main>
        <Show
          title={project.title}
          description={project.body.code}
          date={formattedDate}
          external_url={project.projectUrl}
          type={ShowTypes.PROJECT}
          image={
            project.bannerImage ? { url: project.bannerImage, description: 'Logo' } : undefined
          }
        />
      </main>
    </TrackOnMount>
  )
}
