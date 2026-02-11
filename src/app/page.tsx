import Link from 'next/link'

import {
  allPostCollections,
  getPosts,
  allPostSeries,
  allExperiments,
  type Post,
  type PostSeries,
} from 'lib/content'
import { getPostsFromCollection, sortPostsByDate } from '@/lib/posts'
import { getItemBySlug } from '@/lib/utils'
import { formatIsoDate } from '@/utils/dates'
import type { HtmlAttributes } from '@/types/elements'
import { createUrl, HOME_PATH } from '@/constants/urls'
import siteConfig from '@/config'

import { Image } from '@/components/common/Image'
import { SmoothScrollButton } from '@/components/common/SmoothScrollButton'
import { StructuredData } from '@/components/Layout/SEO/StructuredData'
import { LabExperimentsSection } from '@/components/Lab/LabExperimentsSection'

export default async function HomePage() {
  const allPosts = await getPosts()
  const posts = sortPostsByDate(allPosts, 'desc')
  const postSeries = allPostSeries
  const popularPosts = await getPostsFromCollection(
    getItemBySlug(allPostCollections, 'homepage-popular-posts')
  )

  return (
    <>
      <main className="px-4 mx-auto max-w-4xl">
          <header className="py-16">
            <div className="mx-auto max-w-xl text-lg">
              <h1 className="mb-8 text-4xl font-bold text-primary-500">Hi, I{"'"}m Nick Nish.</h1>
              <p className="mb-8">
                Welcome to my blog where you{"'"}ll find writing on ideas, tutorials, and resources
                ranging on topics like startups, making products, and software engineering.
              </p>
              <div className="mb-3">
                <span>👉</span>
                <Link href="/start" className="ml-3 font-bold underline" prefetch={false}>
                  Start here
                </Link>
              </div>
              <div className="mb-3">
                <span>👇</span>
                <SmoothScrollButton
                  className="ml-3 underline"
                  target="[data-target='blog-posts']"
                  scrollOptions={{ block: 'start' }}
                >
                  Or check out my latest writing
                </SmoothScrollButton>
              </div>
              {allExperiments.length > 0 && (
                <div className="mb-3">
                  <span>🧪</span>
                  <SmoothScrollButton
                    className="ml-3 underline"
                    target="[data-target='lab-experiments']"
                    scrollOptions={{ block: 'start' }}
                  >
                    Or check out my latest AI experiments
                  </SmoothScrollButton>
                </div>
              )}
            </div>
          </header>

          <section className="mb-12 scroll-m-4" data-target="blog-posts">
            <HomeSectionTitle>Popular Posts</HomeSectionTitle>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-x-3">
              {popularPosts.map((post, idx) => (
                <PopularPostCard key={idx} {...post} />
              ))}
            </div>
          </section>

          {allExperiments.length > 0 && (
            <div className="mb-12 scroll-m-4" data-target="lab-experiments">
              <LabExperimentsSection experiments={allExperiments.slice(0, 3)} />
            </div>
          )}

          <div className="md:grid md:grid-cols-3 md:gap-x-12">
            <section className="mb-12 md:col-span-2">
              <HomeSectionTitle>Latest Posts</HomeSectionTitle>
              <div className="flex flex-col gap-y-6 md:gap-y-8">
                {posts.map((post, idx) => (
                  <PostCard key={idx} {...post} />
                ))}
              </div>
            </section>

            <aside className="">
              <HomeSectionTitle>Post Series</HomeSectionTitle>
              <div className="flex flex-col gap-y-4 md:gap-y-8">
                {postSeries.map((series, idx) => (
                  <PostSeriesCard key={idx} {...series} />
                ))}
              </div>
            </aside>
          </div>
        </main>
      <StructuredData
        type="Page"
        args={{
          url: createUrl(HOME_PATH),
          title: siteConfig.siteTitle,
          description: siteConfig.siteDescription,
        }}
      />
    </>
  )
}

function HomeSectionTitle(props: HtmlAttributes<HTMLHeadingElement>) {
  const { children } = props
  return (
    <h2 className="mb-4 md:mb-5 uppercase tracking-wide text-black-50 dark:text-white-80">
      {children}
    </h2>
  )
}

function PostCard(post: Post) {
  return (
    <article>
      <h3 className="text-lg mb-2 font-semibold">
        <Link href={post.url} prefetch={false}>
          {post.title}
        </Link>
      </h3>
      <div className="flex items-center gap-x-2 mb-2 text-sm text-black-40 dark:text-white-50">
        <time dateTime={post.date}>{formatIsoDate(post.date)}</time>
        <span>·</span>
        <span>{post.readingTime} min read</span>
      </div>
      <p className="dark:text-white-80 line-clamp-3">{post.description}</p>
    </article>
  )
}

function PopularPostCard(post: Post) {
  return (
    <div className="flex flex-col justify-between p-4 border-2 border-black-10 dark:border-white-10 rounded-sm">
      <div>
        <Link href={post.url} prefetch={false}>
          <h3 className="mb-3 text-lg font-bold line-clamp-2">{post.title}</h3>
        </Link>
        <p className="text-sm line-clamp-4 dark:text-white-80">{post.description}</p>
      </div>
      <div className="flex items-center gap-x-2 mt-4 text-sm dark:text-white-50">
        <time dateTime={post.date}>{formatIsoDate(post.date)}</time>
        <span>·</span>
        <span>{post.readingTime} min read</span>
      </div>
    </div>
  )
}

function PostSeriesCard(series: PostSeries) {
  return (
    <Link
      href={series.url}
      className="group relative flex items-center h-40 rounded-sm"
      prefetch={false}
    >
      <div className="absolute top-0 w-full h-full overflow-hidden">
        <Image
          src={series.bannerImage}
          alt={series.bannerImageCredit.raw}
          width="256"
          height="170"
          className="w-full h-auto"
        />
        <div className="absolute bg-black-30 dark:bg-black-50 top-0 w-full h-full group-hover:bg-black-60 transition-colors" />
      </div>
      <h3 className="relative w-full px-4 text-center text-white-100 font-bold text-lg">
        {series.title}
      </h3>
    </Link>
  )
}
