'use client'

import React from 'react'
import * as Sentry from '@sentry/react'
import { BrowserTracing } from '@sentry/tracing'

import { isBrowser } from '@/utils/environment'

/**
 * <ErrorReporting> initializes 3rd party scripts used for error reporting.
 * These scripts are initialized in this component because it needs to be loaded
 * in the root app component. However, running these scripts need access to
 * browser properties which are unavailable when app/layout.tsx is loaded
 * because it is rendered in the server as a Server Component. To circumvent
 * this while maintaining the performance optimization of Server Components, we
 * initialize scripts run in a function inside this Client Component
 * <ErrorReporting>.
 */
export function ErrorReporting() {
  const isInitialized = React.useRef(false)

  React.useEffect(() => {
    if (!isInitialized.current) {
      initErrorReporting()
      isInitialized.current = true
    }
  }, [])

  return null
}

function initErrorReporting() {
  if (isBrowser()) {
    Sentry.init({
      dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
      integrations: [new BrowserTracing()],
      tracesSampleRate: 1.0,
      environment: process.env.NODE_ENV === 'production' ? 'production' : 'development',
    })
  }
}
