'use client'

import React from 'react'
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

  React.useEffect(() => {
    getData('https://jsonplaceholder.typicode.com/todos/1')
      .then(response => response.json())
      .then(data => console.log('data in then', data))
    console.log('=========================')
  }, [])

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
      <div className="flex items-center gap-x-1.5 mb-2 text-sm text-black-40 dark:text-white-50">
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
      <div className="flex items-center gap-x-1.5 mt-4 text-sm dark:text-white-50">
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

const CACHE_NAME = 'test'
const MAX_CACHE_AGE_HEADER = 'max-cache-age'
// const MAX_CACHE_AGE = 10 * 60 * 1000 // 10 minutes
const MAX_CACHE_AGE = 10 * 1000 // 10 seconds

/**
 * getData fetches data from the network and caches it. If the browser doesn't
 * support Cache API, then just fetch the data.
 *
 * @param url {String}
 * @param options {Object}
 * @param options.expiry {Number} - Max age of the cached data in milliseconds
 * @returns response {Response}
 */
async function getData(url: string, options: { expiry: number } = { expiry: MAX_CACHE_AGE }) {
  const { expiry } = options

  // If the browser doesn't support Cache API, then just fetch the data
  if (!('caches' in self)) {
    return fetch(url)
  }

  // Cache API is supported, game on! Get the previous response from the cache.
  let cache = await caches.open(CACHE_NAME)
  let prevResponse = await cache.match(url)

  if (!prevResponse) {
    // Cache miss, so fetch the response and put it in the cache
    console.log('response not in cache, fetching')
    return await addResponseToCache(url, await fetch(url), cache)
  }

  const cachedTime = prevResponse.headers.get(MAX_CACHE_AGE_HEADER)
  if (!cachedTime || isDataStale(cachedTime, expiry)) {
    // If the cached response is older than the max age or there is no time
    // header, then fetch the data again and update the cache
    console.log('response in cache is stale, fetching again')
    return await addResponseToCache(url, await fetch(url), cache)
  }

  console.log('response in cache is fresh, returning cached response')
  return prevResponse
}

/**
 * addResponseToCache creates a new Response based on the existing response. It
 * adds a max-cache-age header before adding the new response to the cache. In
 * getData, we use max-cache-age to see if the response is stale, and if it is,
 * we refetch the data.
 *
 * @param url {String}
 * @param response {Response}
 * @param cache {Cache}
 * @returns newResponse {Response}
 */
async function addResponseToCache(url: string, response: Response, cache: Cache) {
  const data = await response.json()

  // Headers are immutable, so we have to copy the response headers and create a
  // new Response with a custom header 'cached-time' so we can see when the
  // response was cached.
  const newHeaders = new Headers(response.headers)
  newHeaders.set(MAX_CACHE_AGE_HEADER, Date.now().toString())

  const newResponse = new Response(JSON.stringify(data), { headers: newHeaders })
  console.log('putting response in cache')
  cache.put(url, newResponse.clone())

  return newResponse
}

/**
 * isDataStale checks if the data is older than the max age.
 * @param cachedTime {String} - Time the data was cached
 * @param maxAge {Number} - Max age of the cached data in milliseconds
 */
function isDataStale(cachedTime: string, maxAge: number) {
  const parsedTime = parseInt(cachedTime)
  const now = new Date().getTime()
  const cachedAt = new Date(parsedTime).getTime()

  if (Number.isNaN(parsedTime)) {
    return true
  }

  return Math.abs(now - cachedAt) > maxAge
}
