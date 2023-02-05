import React from 'react'
import Link from 'next/link'

import {
  allPostCollections,
  allPosts,
  allPostSeries,
  Post,
  PostSeries,
} from 'contentlayer/generated'
import { getPostsFromCollection, sortPostsByDate } from '@/lib/posts'
import { getItemBySlug } from '@/lib/utils'
import { formatIsoDate } from '@/utils/dates'

import { Image } from '@/components/common/Image'
import { SmoothScrollButton } from '@/components/common/SmoothScrollButton'

export default function HomePage() {
  const posts = sortPostsByDate(allPosts, 'desc')
  const postSeries = allPostSeries
  const popularPosts = getPostsFromCollection(
    getItemBySlug(allPostCollections, 'homepage-popular-posts')
  )

  return (
    <main className="px-4 mx-auto max-w-4xl">
      <header className="py-16">
        <div className="mx-auto max-w-xl text-lg">
          <h1 className="mb-8 text-3xl font-bold text-primary-500">Hi, I{"'"}m Nick Nish.</h1>
          <p className="mb-8">
            Welcome to my blog where you{"'"}ll find writing on ideas, tutorials, and resources
            ranging on topics like startups, making products, and software engineering.
          </p>
          <div className="mb-3">
            <span>👉</span>
            <Link href="/start" className="ml-3 font-bold underline">
              Start here
            </Link>
          </div>
          <div className="mb-3">
            <span>👇</span>
            <SmoothScrollButton
              className="ml-3"
              target="[data-target='blog-posts']"
              scrollOptions={{ block: 'start' }}
            >
              Or check out my latest writing
            </SmoothScrollButton>
          </div>
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

      <div className="md:grid md:grid-cols-3 md:gap-x-12">
        <section className="mb-12 md:col-span-2">
          <HomeSectionTitle>Latest Posts</HomeSectionTitle>
          <div className="flex flex-col gap-y-6 md:gap-y-8">
            {/* TODO: Make better styling */}
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
  )
}

function HomeSectionTitle(props: React.HtmlHTMLAttributes<HTMLHeadingElement>) {
  const { children } = props
  return (
    <h2 className="mb-4 md:mb-5 uppercase tracking-wide text-black-80 dark:text-white-80">
      {children}
    </h2>
  )
}

function PostCard(post: Post) {
  return (
    <article>
      <h3 className="text-lg mb-2 font-semibold">
        <Link href={post.url}>{post.title}</Link>
      </h3>
      <time dateTime={post.date} className="block mb-2 text-sm text-black-50 dark:text-white-50">
        {formatIsoDate(post.date)}
      </time>
      <p className="text-black-80 dark:text-white-80 line-clamp-3">{post.description}</p>
    </article>
  )
}

function PopularPostCard(post: Post) {
  return (
    <div className="flex flex-col justify-between p-4 border-2 border-black-10 dark:border-white-10 rounded-sm">
      <div>
        <Link href={post.url}>
          <h3 className="mb-3 text-lg font-bold line-clamp-2">{post.title}</h3>
        </Link>
        <p className="text-sm line-clamp-4">{post.description}</p>
      </div>
      <time dateTime={post.date} className="block mt-4 text-sm text-black-50 dark:text-white-50">
        {formatIsoDate(post.date)}
      </time>
    </div>
  )
}

function PostSeriesCard(series: PostSeries) {
  return (
    <Link href={series.url} className="group relative flex items-center h-40 rounded-sm">
      <div className="absolute top-0 w-full h-full overflow-hidden">
        <Image
          src={series.bannerImage}
          alt={series.bannerImageCredit.raw}
          width="256"
          height="170"
          className="w-full h-auto"
        />
        <div className="absolute bg-black-50 top-0 w-full h-full group-hover:bg-black-60 transition-colors" />
      </div>
      <h3 className="relative w-full px-4 text-center dark:text-white-100 font-bold text-lg">
        {series.title}
      </h3>
    </Link>
  )
}
