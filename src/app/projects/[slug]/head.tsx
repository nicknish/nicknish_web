import { notFound } from 'next/navigation'

import { SiteMetadata } from '@/components/layout/SEO/SiteMetadata'
import { SEO } from '@/components/layout/SEO/DynamicSEO'

import { IProjectPageProps } from './page'
import { allProjects } from 'contentlayer/generated'
import { getItemBySlug } from '@/lib/utils'

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
    </>
  )
}
