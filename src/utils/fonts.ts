import { Figtree, Fira_Code } from '@next/font/google'

export const fontTitle = Figtree({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: 'variable',
})

export const fontCode = Fira_Code({
  subsets: ['latin'],
  variable: '--font-code',
  weight: 'variable',
})
