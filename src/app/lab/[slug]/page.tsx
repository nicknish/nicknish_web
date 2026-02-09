import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'

import { allExperiments, type Experiment } from 'lib/content'
import { formatIsoDate } from '@/utils/dates'
import { getItemBySlug } from '@/lib/utils'
import { createUrl, LAB_PATH } from '@/constants/urls'
import siteConfig from '@/config'
import { getMeAuthorStructuredData } from '@/components/Layout/SEO/StructuredData/structuredDataUtils'

import { DynamicProseBlock } from '@/components/common/content/DynamicProseBlock'
import { MDXBlock } from '@/components/common/content/MDXBlock'
import { StructuredData } from '@/components/Layout/SEO/StructuredData'
import { experimentComponents } from '../components'

export const dynamicParams = false

export function generateStaticParams() {
  return allExperiments.map(exp => ({ slug: exp.slug }))
}

interface LabExperimentProps {
  params: Promise<{ slug: Experiment['slug'] }>
}

export async function generateMetadata({ params }: LabExperimentProps): Promise<Metadata> {
  const { slug } = await params
  const experiment = getItemBySlug(allExperiments, slug)
  if (!experiment) {
    throw new Error('Experiment not found when generating metadata')
  }

  return {
    title: experiment.title,
    description: experiment.description,
    openGraph: {
      url: createUrl(experiment.url),
      title: experiment.title,
      description: experiment.description,
    },
    twitter: {
      site: createUrl(experiment.url),
      title: experiment.title,
      description: experiment.description,
    },
  }
}

export default async function LabExperimentPage(props: LabExperimentProps) {
  const { slug } = await props.params
  const experiment = getItemBySlug(allExperiments, slug)
  if (!experiment) {
    notFound()
  }

  const components = experimentComponents[slug] ?? {}

  return (
    <>
      <main className="px-4 mx-auto max-w-3xl">
        <section>
          <header className="my-12">
            <h1 className="mb-4 text-3xl md:text-4xl font-bold">{experiment.title}</h1>
            <div className="flex items-center gap-x-3 text-slate-600 dark:text-white-80">
              <time dateTime={experiment.date}>{formatIsoDate(experiment.date)}</time>
            </div>
            {experiment.tags && experiment.tags.length > 0 && (
              <div className="mt-3 flex gap-2 flex-wrap">
                {experiment.tags.map(tag => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-1 bg-black-5 dark:bg-white-10 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </header>
          <DynamicProseBlock>
            <MDXBlock source={experiment.body.raw} components={components} />
          </DynamicProseBlock>
          <footer className="mt-12 mb-8">
            <Link
              href={LAB_PATH}
              className="text-primary-500 hover:text-primary-600 font-semibold transition-colors"
              prefetch={false}
            >
              &larr; Back to the Lab
            </Link>
          </footer>
        </section>
      </main>
      <StructuredData
        type="Post"
        args={{
          url: createUrl(experiment.url),
          title: experiment.title,
          description: experiment.description,
          category: 'other',
          siteUrl: siteConfig.siteUrl,
          siteTitle: siteConfig.siteTitle,
          datePublished: experiment.date,
          dateModified: experiment.date,
          author: getMeAuthorStructuredData(),
        }}
      />
    </>
  )
}
