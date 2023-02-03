import React from 'react'
import { usePathname } from 'next/navigation'

import siteConfig from '@/config'

/**
 * useGetDisqusConfig gets the config props for Disqus React components. This
 * prop object is memoized.
 */
export const useGetDisqusConfig = (title: string, identifier: string) => {
  const url = `${siteConfig.siteUrl}${usePathname()}`

  return React.useMemo(
    () => ({
      shortname: siteConfig.disqusShortname,
      config: {
        url,
        title,
        identifier,
      },
    }),
    [title, identifier, url]
  )
}
