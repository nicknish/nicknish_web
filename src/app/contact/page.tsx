import React from 'react'

import { CONTACT_PAGE_TITLE } from './constants'

import { TrackOnMount } from '@/components/common/Tracking'
import { PageLayout } from '@/components/Layout/PageLayout'
import { ContactForm } from './ContactForm'

export default function ContactPage() {
  return (
    <TrackOnMount trackingData={{ page: CONTACT_PAGE_TITLE }}>
      <PageLayout>
        <ContactForm />
      </PageLayout>
    </TrackOnMount>
  )
}
