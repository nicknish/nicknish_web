import React from 'react'

import { TrackOnMount } from '@/components/common/Tracking'
import { PageLayout } from '@/components/layout/PageLayout'
import { ContactForm } from './ContactForm'

export default function ContactPage() {
  return (
    <TrackOnMount trackingData={{ page: 'Contact' }}>
      <PageLayout>
        <ContactForm />
      </PageLayout>
    </TrackOnMount>
  )
}
