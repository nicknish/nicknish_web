import { notFound } from 'next/navigation'
import { format, parseISO } from 'date-fns'

import { Show, ShowTypes } from '@/components/layout/Show'

import { getDate } from '@/utils/dates'
import { allProjects, type Project } from 'contentlayer/generated'
import { getProjectBySlug } from '@/lib/jobs-projects'

export async function generateStaticParams() {
  return allProjects.map(project => ({ slug: project.slug }))
}

export interface IProjectPageProps {
  params: {
    slug: Project['slug']
  }
}

export default async function ProjectPage(props: IProjectPageProps) {
  const project = getProjectBySlug(props.params.slug)
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
    <main>
      <Show
        title={project.title}
        description={project.body.code}
        date={formattedDate}
        // TODO: Fix path?
        // path={project.path}
        external_url={project.url}
        type={ShowTypes.PROJECT}
        image={project.bannerImage ? { url: project.bannerImage, description: 'Logo' } : undefined}
      />
    </main>
  )
}
