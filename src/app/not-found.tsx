import React from 'react'

import { PageLayout } from '@/components/layout/PageLayout'
import { ProseContainer } from '@/components/common/content/ProseContainer'
import { Button } from '@/components/common/Button'
import { ReportNotFoundError } from '@/components/pages/not-found/ReportNotFoundError'

// NOTE: As of Feb 2023, this component is only used when notFound() is called
// in a subroute.
export default function NotFound() {
  return (
    <PageLayout className="tc">
      <ProseContainer>
        <h2>Not found</h2>
      </ProseContainer>
      <Button.InternalLink theme="primary" size="default" href="/">
        Go Home
      </Button.InternalLink>
      <ReportNotFoundError />
    </PageLayout>
  )
}
