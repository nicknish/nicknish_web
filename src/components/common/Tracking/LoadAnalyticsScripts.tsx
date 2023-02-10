'use client'

import { useSearchParams } from 'next/navigation'
import Script from 'next/script'

const GOOGLE_ANALYTICS_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

export function LoadAnalyticsScripts() {
  const isOptedOut = useSearchParams().get('analytics') === 'false'

  if (isOptedOut) {
    return null
  }

  return (
    <>
      <Script
        strategy="afterInteractive"
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ANALYTICS_ID}`}
      />
      <Script strategy="afterInteractive" id="init-google-analytics">
        {`window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GOOGLE_ANALYTICS_ID}');`}
      </Script>
    </>
  )
}
