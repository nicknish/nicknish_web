import '../css/global.css'

import { fontTitle, fontCode } from '@/utils/fonts'
import { DEFAULT_METADATA, Metadata } from '@/constants/seo'

import { AppProviders } from './providers'
import { Nav } from '@/components/Layout/Nav'
import { Footer } from '@/components/Layout/Footer'
import { SecretConsoleMessage } from '@/components/common/SecretConsoleMessage'
import { LoadAnalyticsScripts } from '@/components/common/Tracking'
import { ErrorReporting } from '@/components/Layout/ErrorReporting'

export const metadata: Metadata = DEFAULT_METADATA

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`h-full text-black-70 dark:bg-[#2f2e36] dark:text-white-100 scroll-smooth ${fontTitle.variable} ${fontCode.variable}`}
    >
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body className="site-container h-full flex flex-col">
        <AppProviders>
          <Nav />
          <div className="site-content flex-1">{children}</div>
          <Footer />
          <SecretConsoleMessage />
          <LoadAnalyticsScripts />
          <ErrorReporting />
        </AppProviders>
      </body>
    </html>
  )
}
