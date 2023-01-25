// TODO: Move to Contentlayer

import { getProjects, getProjectBySlug } from '@/lib/api'
import { formatDate, getDate } from '@/utils/dates'

import Show, { ShowTypes } from '@/components/Show'

export async function generateStaticParams() {
  const projects = await getProjects()
  return projects.map(project => ({ slug: project.slug }))
}

interface IProjectPageParams {
  params: { slug: string }
}

export default async function ProjectPage(props: IProjectPageParams) {
  const project = await getProjectBySlug(props.params.slug)
  const formattedStartDate = project.startDate ? formatDate(project.startDate) : project.startDate
  const formattedEndDate = project.endDate ? formatDate(project.endDate) : project.endDate
  const formattedDate = getDate(formattedStartDate, formattedEndDate, project.current)

  return (
    <main>
      <Show
        title={project.title}
        description={project.description}
        date={formattedDate}
        path={project.path}
        external_url={project.url}
        type={ShowTypes.PROJECT}
        image={project.imagesCollection.items[0]}
      />
    </main>
  )
}
