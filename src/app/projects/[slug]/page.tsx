import { notFound } from 'next/navigation'
import { format, parseISO } from 'date-fns'

import { Show, ShowTypes } from '@/components/Show'

import { getDate } from '@/utils/dates'
import { allProjects, type Project } from 'contentlayer/generated'

export async function generateStaticParams() {
  return allProjects.map(project => ({ slug: project.slug }))
}

function getProjectBySlug(slug: Project['slug']) {
  return allProjects.find(project => project.slug === slug)
}

interface IProjectPageProps {
  params: { slug: string }
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
        // TODO: Fix images
        // image={project.imagesCollection.items[0]}
      />
    </main>
  )
}
