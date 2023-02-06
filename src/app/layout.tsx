import '../css/global.css'
import { Figtree, Fira_Code } from '@next/font/google'

import { Nav } from '@/components/layout/Nav'
import { Footer } from '@/components/layout/Footer'
import { AppProviders } from './providers'
import { LoadAnalyticsScripts } from '@/components/common/Tracking'

const fontTitle = Figtree({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: 'variable',
})
const fontCode = Fira_Code({
  subsets: ['latin'],
  variable: '--font-code',
  weight: 'variable',
})

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
        </AppProviders>
      </body>
    </html>
  )
}
