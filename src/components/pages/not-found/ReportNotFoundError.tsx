'use client'

import React from 'react'
import { usePathname } from 'next/navigation'

import { reportMessage } from '@/utils/reporting'

export function ReportNotFoundError() {
  const pathname = usePathname()

  React.useEffect(() => {
    reportMessage(`NotFound rendered`, { extra: { pathname: pathname } })
  }, [pathname])

  return null
}
