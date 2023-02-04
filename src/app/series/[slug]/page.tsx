import { notFound } from 'next/navigation'
import Link from 'next/link'

import { PageLayout } from '@/components/layout/PageLayout'
import { MDXBlock } from '@/components/common/content/MDXBlock'
import { DynamicProseBlock } from '@/components/common/content/DynamicProseBlock'
import { Image } from '@/components/common/Image'
import { ProseContainer } from '@/components/common/content/ProseContainer'

import { getPostsFromPostSeries } from '@/lib/posts'
import { allPostSeries } from 'contentlayer/generated'
import { formatIsoDate } from '@/utils/dates'
import { getItemBySlug } from '@/lib/utils'

export async function generateStaticParams() {
  return allPostSeries.map(series => ({ slug: series.slug }))
}

export interface IBlogPostSeriesProps {
  params: {
    slug: string
  }
}

export default function BlogPostSeriesPage(props: IBlogPostSeriesProps) {
  const series = getItemBySlug(allPostSeries, props.params.slug)
  if (!series) {
    notFound()
  }
  const seriesPosts = getPostsFromPostSeries(series)

  return (
    <PageLayout>
      <header className="mb-12">
        <DynamicProseBlock className="mx-auto mt-12 mb-12">
          <h1 className="!text-3xl">{series.title}</h1>
        </DynamicProseBlock>
        <figure>
          <Image
            className="w-full h-auto"
            src={series.bannerImage}
            width="1920"
            height="800"
            alt={series.bannerImageCredit.raw}
          />
          <figcaption
            className="pt-2 px-2 text-center dark:text-white-60"
            dangerouslySetInnerHTML={{ __html: series.bannerImageCredit.html }}
          />
        </figure>
      </header>

      <DynamicProseBlock className="mb-12 mx-auto">
        <MDXBlock code={series.body.code} />
      </DynamicProseBlock>

      <ProseContainer className="grid grid-cols-1 gap-y-8">
        {seriesPosts.map(post => (
          <Link
            className="py-4 px-4 border dark:border-white-100 rounded-sm"
            href={post.url}
            key={post.slug}
          >
            <h2 className="text-lg font-semibold">{post.title}</h2>
            {post.description && <p className="mt-3">{post.description}</p>}
            <time
              dateTime={post.date}
              className="block mt-2 text-sm text-black-50 dark:text-white-50"
            >
              {formatIsoDate(post.date)}
            </time>
          </Link>
        ))}
      </ProseContainer>
    </PageLayout>
  )
}
