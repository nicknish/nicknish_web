import { Metadata } from 'next'

import { allExperiments } from 'lib/content'
import { createUrl, LAB_PATH } from '@/constants/urls'

import { PageLayout } from '@/components/Layout/PageLayout'
import { LabExperimentsSection } from '@/components/Lab/LabExperimentsSection'
import { StructuredData } from '@/components/Layout/SEO/StructuredData'

const LAB_PAGE_TITLE = 'The Lab - AI Experiments'
const LAB_PAGE_DESCRIPTION =
  'AI experiments and micro-apps. Interactive demos, games, and tools built with AI.'

export const metadata: Metadata = {
  title: LAB_PAGE_TITLE,
  description: LAB_PAGE_DESCRIPTION,
  openGraph: {
    url: createUrl(LAB_PATH),
    title: LAB_PAGE_TITLE,
    description: LAB_PAGE_DESCRIPTION,
  },
  twitter: {
    site: createUrl(LAB_PATH),
    title: LAB_PAGE_TITLE,
    description: LAB_PAGE_DESCRIPTION,
  },
}

export default function LabPage() {
  return (
    <PageLayout className="mt-12">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-primary-500 mb-2">The Lab</h1>
        <p className="text-lg dark:text-white-80">
          AI experiments and micro-apps. Interactive demos, games, and tools built with AI.
        </p>
      </header>

      <LabExperimentsSection
        experiments={allExperiments}
        showViewAll={false}
        sectionTitle="Experiments"
      />

      {allExperiments.length === 0 && (
        <p className="text-black-40 dark:text-white-50 mt-8">
          No experiments yet. Check back soon!
        </p>
      )}

      <StructuredData
        type="Page"
        args={{
          url: createUrl(LAB_PATH),
          title: LAB_PAGE_TITLE,
          description: LAB_PAGE_DESCRIPTION,
        }}
      />
    </PageLayout>
  )
}
