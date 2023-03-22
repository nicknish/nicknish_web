import React from 'react'
import { Metadata } from 'next'

import { CONTACT_PAGE_TITLE, CONTACT_PATHNAME } from './constants'
import { createUrl } from '@/constants/urls'

import { TrackOnMount } from '@/components/common/Tracking'
import { PageLayout } from '@/components/Layout/PageLayout'
import { ContactForm } from './ContactForm'
import { StructuredData } from '@/components/Layout/SEO/StructuredData'

export const metadata: Metadata = {
  title: CONTACT_PAGE_TITLE,
}

export default function ContactPage() {
  return (
    <>
      <TrackOnMount trackingData={{ page: CONTACT_PAGE_TITLE }}>
        <PageLayout>
          <ContactForm />
        </PageLayout>
      </TrackOnMount>
      <StructuredData
        type="Page"
        args={{
          url: createUrl(CONTACT_PATHNAME),
          title: CONTACT_PAGE_TITLE,
          description: '', // TODO
        }}
      />
    </>
  )
}
