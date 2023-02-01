import '../css/global.css'
import { Figtree, Fira_Code } from '@next/font/google'
import { Nav } from '@/components/layout/Nav'
import { Footer } from '@/components/layout/Footer'

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
      className={`${fontTitle.variable} ${fontCode.variable} dark:bg-[#2f2e36] dark:text-white-100`}
    >
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body className="site-container">
        <Nav />
        <div className="site-content">{children}</div>
        <Footer />
      </body>
    </html>
  )
}
