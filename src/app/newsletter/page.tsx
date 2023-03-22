import { Metadata } from 'next'

import { NEWSLETTER_PAGE_TITLE, NEWSLETTER_PATHNAME } from './constants'
import { createUrl } from '@/constants/urls'

import { DynamicProseBlock } from '@/components/common/content/DynamicProseBlock'
import { TrackOnMount } from '@/components/common/Tracking'
import { PageLayout } from '@/components/Layout/PageLayout'
import { NewsletterSignupForm } from './NewsletterSignupForm'
import { StructuredData } from '@/components/Layout/SEO/StructuredData'

export const metadata: Metadata = {
  title: NEWSLETTER_PAGE_TITLE,
}

export default function NewsletterPage() {
  return (
    <>
      <TrackOnMount trackingData={{ page: NEWSLETTER_PAGE_TITLE }}>
        <PageLayout className="mt-12">
          <DynamicProseBlock className="mb-6 md:mb-12">
            <h1 className="!text-3xl text-primary-500">Sign up for the Builders newsletter</h1>
            <p>
              Join a community of makers and creatives who are learning how to leverage technology
              to create new products. Or, you know, just keep up with the latest blog posts.
            </p>
          </DynamicProseBlock>
          <div className="max-w-xl mx-auto">
            <NewsletterSignupForm />
          </div>
        </PageLayout>
      </TrackOnMount>
      <StructuredData
        type="Page"
        args={{
          url: createUrl(NEWSLETTER_PATHNAME),
          title: NEWSLETTER_PAGE_TITLE,
          description: '', // TODO
        }}
      />
    </>
  )
}
