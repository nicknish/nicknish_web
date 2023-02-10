'use client'

import { useSearchParams } from 'next/navigation'
import Script from 'next/script'

const GOOGLE_ANALYTICS_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

export function LoadAnalyticsScripts() {
  const params = useSearchParams()

  console.log('**************************************************************************\n\n')
  console.log(`DEBUG ~ LoadAnalyticsScripts.tsx:L10`, `params`, params)
  console.log('\n\n**************************************************************************')

  const isOptedOut = params.has('analytics') === false

  console.log('**************************************************************************\n\n')
  console.log(
    `DEBUG ~ LoadAnalyticsScripts.tsx:L16`,
    `params.has('analytics')`,
    params.has('analytics')
  )
  console.log('\n\n**************************************************************************')

  console.log('**************************************************************************\n\n')
  console.log(`DEBUG ~ LoadAnalyticsScripts.tsx:L16`, `isOptedOut`, isOptedOut)
  console.log('\n\n**************************************************************************')

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
