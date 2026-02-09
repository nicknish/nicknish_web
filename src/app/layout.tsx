import '../css/global.css'

import { Suspense } from 'react'
import { fontTitle, fontCode } from '@/utils/fonts'
import { DEFAULT_METADATA, DEFAULT_VIEWPORT } from '@/constants/seo'
import type { Metadata, Viewport } from 'next'

import { AppProviders } from './providers'
import { Nav } from '@/components/Layout/Nav'
import { Footer } from '@/components/Layout/Footer'
import { SecretConsoleMessage } from '@/components/common/SecretConsoleMessage'
import { LoadAnalyticsScripts } from '@/components/common/Tracking'
import { ErrorReporting } from '@/components/Layout/ErrorReporting'

export const metadata: Metadata = DEFAULT_METADATA
export const viewport: Viewport = DEFAULT_VIEWPORT

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`h-full text-black-70 dark:bg-[#2f2e36] dark:text-white-100 scroll-smooth ${fontTitle.variable} ${fontCode.variable}`}
    >
      <body className="site-container h-full flex flex-col">
        <AppProviders>
          <Nav />
          <div className="site-content flex-1">{children}</div>
          <Footer />
          <SecretConsoleMessage />
          <Suspense fallback={null}>
            <LoadAnalyticsScripts />
          </Suspense>
          <ErrorReporting />
        </AppProviders>
      </body>
    </html>
  )
}
