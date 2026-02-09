import React from 'react'
import { Metadata } from 'next'

import { CONTACT_PAGE_TITLE, CONTACT_PATHNAME } from './constants'
import { createUrl } from '@/constants/urls'

import { PageLayout } from '@/components/Layout/PageLayout'
import { ContactForm } from './ContactForm'
import { StructuredData } from '@/components/Layout/SEO/StructuredData'

export const metadata: Metadata = {
  title: CONTACT_PAGE_TITLE,
}

export default function ContactPage() {
  return (
    <>
      <PageLayout>
          <ContactForm />
        </PageLayout>
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
