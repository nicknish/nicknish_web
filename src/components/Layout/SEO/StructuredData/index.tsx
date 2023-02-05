import Script from 'next/script'

import {
  getStructuredData,
  IBlogPostingArgs,
  ICreativeWorkArgs,
  IDefaultThingArgs,
} from './structuredDataUtils'

// Should match structuredDataUtils types

interface IStructuredDataBlogPostProps {
  type: 'Post'
  args: IBlogPostingArgs
}

interface IStructuredDataPostSeriesProps {
  type: 'PostSeries'
  args: ICreativeWorkArgs
}

interface IStructuredDataProjectProps {
  type: 'Project'
  args: ICreativeWorkArgs
}

interface IStructuredDataJobProps {
  type: 'Job'
  args: IDefaultThingArgs
}

interface IStructuredDataPageProps {
  type: 'Page'
  args: IDefaultThingArgs
}

export const StructuredData = (
  props:
    | IStructuredDataBlogPostProps
    | IStructuredDataPostSeriesProps
    | IStructuredDataProjectProps
    | IStructuredDataJobProps
    | IStructuredDataPageProps
) => {
  const { type, args } = props
  const schemaOrgJSONLD = getStructuredData(type as any, args)

  return (
    <>
      {/* Schema.org tags */}
      <Script
        type="application/ld+json"
        id="structured-data"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrgJSONLD) }}
        strategy="afterInteractive" // beforeInteractive causes errors in Next 13
      />
    </>
  )
}
