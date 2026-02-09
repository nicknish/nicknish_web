import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'

import { getPostsFromPostSeries } from '@/lib/posts'
import { allPostSeries } from 'lib/content'
import { formatIsoDate } from '@/utils/dates'
import { getItemBySlug } from '@/lib/utils'
import { createUrl } from '@/constants/urls'
import { getMeAuthorStructuredData } from '@/components/Layout/SEO/StructuredData/structuredDataUtils'

import { PageLayout } from '@/components/Layout/PageLayout'
import { MDXBlock } from '@/components/common/content/MDXBlock'
import { DynamicProseBlock } from '@/components/common/content/DynamicProseBlock'
import { Image } from '@/components/common/Image'
import { ProseContainer } from '@/components/common/content/ProseContainer'
import { StructuredData } from '@/components/Layout/SEO/StructuredData'

export async function generateStaticParams() {
  return allPostSeries.map(series => ({ slug: series.slug }))
}

export async function generateMetadata({ params }: IBlogPostSeriesProps): Promise<Metadata> {
  const { slug } = await params
  const series = getItemBySlug(allPostSeries, slug)
  if (!series) {
    throw new Error('Series not found when generating metadata')
  }

  return {
    title: series.title,
    description: series.description,
    openGraph: {
      url: createUrl(series.url),
      title: series.title,
      description: series.description,
      images: series.bannerImage
        ? [
            {
              url: series.bannerImage!,
              width: 1200,
              height: 500,
              alt: series.title,
            },
          ]
        : undefined,
    },
    twitter: {
      site: createUrl(series.url),
      title: series.title,
      description: series.description,
      images: series.bannerImage
        ? [
            {
              url: series.bannerImage!,
              width: 1200,
              height: 500,
              alt: series.title,
            },
          ]
        : undefined,
    },
  }
}

export interface IBlogPostSeriesProps {
  params: Promise<{
    slug: string
  }>
}

export default async function BlogPostSeriesPage(props: IBlogPostSeriesProps) {
  const { slug } = await props.params
  const series = getItemBySlug(allPostSeries, slug)
  if (!series) {
    notFound()
  }
  const seriesPosts = getPostsFromPostSeries(series)
  const recentPost = seriesPosts[seriesPosts.length - 1]

  return (
    <>
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
            <MDXBlock source={series.body.raw} />
          </DynamicProseBlock>

          <ProseContainer className="grid grid-cols-1 gap-y-6 mx-auto">
            {seriesPosts.map(post => (
              <Link
                className="group py-6 px-4 border dark:border-white-100 rounded-sm shadow-sm hover:shadow-md hover:text-inherit transition-all"
                href={post.url}
                key={post.slug}
                prefetch={false}
              >
                <h2 className="text-xl mb-4 font-semibold group-hover:text-primary-500">
                  {post.title}
                </h2>
                <p className="mb-3 dark:text-white-80">{post.description}</p>
                <time
                  dateTime={post.date}
                  className="block text-sm text-black-50 dark:text-white-50"
                >
                  {formatIsoDate(post.date)}
                </time>
              </Link>
            ))}
          </ProseContainer>
        </PageLayout>
      <StructuredData
        type="PostSeries"
        args={{
          url: createUrl(series.url),
          title: series.title,
          description: series.description,
          shareImage: series.bannerImage,
          datePublished: recentPost?.date,
          dateModified: recentPost?.date,
          author: getMeAuthorStructuredData(),
        }}
      />
    </>
  )
}
