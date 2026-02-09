import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { format, parseISO } from 'date-fns'

import { getDate } from '@/utils/dates'
import { allProjects, type Project } from 'lib/content'
import { getItemBySlug } from '@/lib/utils'
import { createUrl } from '@/constants/urls'
import { getMeAuthorStructuredData } from '@/components/Layout/SEO/StructuredData/structuredDataUtils'

import { Show, ShowTypes } from '@/components/Layout/Show'
import { StructuredData } from '@/components/Layout/SEO/StructuredData'

export async function generateStaticParams() {
  return allProjects.map(project => ({ slug: project.slug }))
}

export async function generateMetadata({ params }: IProjectPageProps): Promise<Metadata> {
  const { slug } = await params
  const project = getItemBySlug(allProjects, slug)
  if (!project) {
    throw new Error('Project not found when generating metadata')
  }

  return {
    title: project.title,
    description: project.description,
    openGraph: {
      url: createUrl(project.url),
      title: project.title,
      description: project.description,
      images: project.bannerImage
        ? [
            {
              url: project.bannerImage!,
              width: 1200,
              height: 500,
              alt: project.title,
            },
          ]
        : undefined,
    },
    twitter: {
      site: createUrl(project.url),
      title: project.title,
      description: project.description,
      images: project.bannerImage
        ? [
            {
              url: project.bannerImage!,
              width: 1200,
              height: 500,
              alt: project.title,
            },
          ]
        : undefined,
    },
  }
}

export interface IProjectPageProps {
  params: Promise<{
    slug: Project['slug']
  }>
}

export default async function ProjectPage(props: IProjectPageProps) {
  const { slug } = await props.params
  const project = getItemBySlug(allProjects, slug)
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
    <>
      <Show
          title={project.title}
          description={project.body.raw}
          date={formattedDate}
          external_url={project.projectUrl}
          type={ShowTypes.PROJECT}
          image={
            project.bannerImage ? { url: project.bannerImage, description: 'Logo' } : undefined
          }
        />
      <StructuredData
        type="Project"
        args={{
          url: createUrl(project.url),
          title: project.title,
          description: project.description,
          shareImage: project.bannerImage,
          datePublished: project.endDate,
          dateModified: project.endDate,
          author: getMeAuthorStructuredData(),
        }}
      />
    </>
  )
}
