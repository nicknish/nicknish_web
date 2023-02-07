import '../css/global.css'

import { fontTitle, fontCode } from '@/utils/fonts'

import { Nav } from '@/components/layout/Nav'
import { Footer } from '@/components/layout/Footer'
import { AppProviders } from './providers'
import { LoadAnalyticsScripts } from '@/components/common/Tracking'
import { ErrorReporting } from '@/components/layout/ErrorReporting'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`h-full dark:bg-[#2f2e36] dark:text-white-100 scroll-smooth ${fontTitle.variable} ${fontCode.variable}`}
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
          <LoadAnalyticsScripts />
          <ErrorReporting />
        </AppProviders>
      </body>
    </html>
  )
}
