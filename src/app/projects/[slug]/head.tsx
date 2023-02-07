import { notFound } from 'next/navigation'

import type { IProjectPageProps } from './page'
import { allProjects } from 'contentlayer/generated'
import { getItemBySlug } from '@/lib/utils'
import { createUrl } from '@/constants/urls'
import { getMeAuthorStructuredData } from '@/components/Layout/SEO/StructuredData/structuredDataUtils'

import { SiteMetadata } from '@/components/Layout/SEO/SiteMetadata'
import { SEO } from '@/components/Layout/SEO/DynamicSEO'
import { StructuredData } from '@/components/Layout/SEO/StructuredData'

export default function ProjectPageHead(props: IProjectPageProps) {
  const project = getItemBySlug(allProjects, props.params.slug)
  if (!project) {
    notFound()
  }

  return (
    <>
      <SiteMetadata />
      <SEO
        type="post"
        path={project.url}
        content={{
          title: project.title,
          description: project.description,
        }}
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
