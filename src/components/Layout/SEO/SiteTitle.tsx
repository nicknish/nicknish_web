import { buildSiteTitle } from './utils'

export interface ISiteTitleProps {
  pageTitle?: string
}

export function SiteTitle(props: ISiteTitleProps) {
  const { pageTitle } = props

  return (
    <>
      <title>{buildSiteTitle(pageTitle)}</title>
    </>
  )
}
