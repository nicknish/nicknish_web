import React from 'react'

import { PageLayout } from '@/components/common/PageLayout'
import { ContactForm } from './ContactForm'
import { ProseContainer } from '@/components/common/ProseContainer'

export default function ContactPage() {
  return (
    <PageLayout className="mb-6">
      <ProseContainer>
        <ContactForm />
      </ProseContainer>
    </PageLayout>
  )
}
