import React from 'react'
import Link from 'next/link'
import { compareDesc, format, parseISO } from 'date-fns'

import { allPosts, allPostSeries, Post } from 'contentlayer/generated'

function getPosts() {
  const posts = allPosts.sort((a, b) => {
    return compareDesc(new Date(a.date), new Date(b.date))
  })
  return posts
}
function getPostSeries() {
  return allPostSeries
}

export default function Home() {
  const posts = getPosts()
  const postSeries = getPostSeries()

  // TODO: Find a way to fix this
  const popularPosts = posts.slice(0, 4)

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
            <span className="ml-3">Or check out my latest writing</span>
          </div>
        </div>
      </header>

      <section className="mb-12">
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
          {posts.map((post, idx) => (
            <PostCard key={idx} {...post} />
          ))}
        </section>

        <aside className="">
          <HomeSectionTitle>Post Series</HomeSectionTitle>
          {/* TODO */}
          {postSeries.map((series, idx) => (
            <div key={idx}>{series.title}</div>
          ))}
        </aside>
      </div>
    </main>
  )
}

function HomeSectionTitle(props: React.HtmlHTMLAttributes<HTMLHeadingElement>) {
  const { children } = props
  return <h2 className="mb-3 uppercase tracking-wide">{children}</h2>
}

function PostCard(post: Post) {
  return (
    <div className="mb-6">
      <time dateTime={post.date} className="block text-sm text-black-50 dark:text-white-50">
        {format(parseISO(post.date), 'LLLL d, yyyy')}
      </time>
      <h3 className="text-lg">
        <Link href={post.url}>{post.title}</Link>
      </h3>
    </div>
  )
}

function PopularPostCard(post: Post) {
  return (
    <Link
      className="block p-4 border-2 border-black-10 dark:border-white-10 rounded-sm"
      href={post.url}
    >
      <h3 className="mb-3 text-lg font-bold line-clamp-2">{post.title}</h3>
      {/* TODO: post.body.raw is kind of jank */}
      <p className="text-sm line-clamp-4">{post.description || post.body.raw.slice(0, 300)}</p>
      <time dateTime={post.date} className="block mt-4 text-sm text-black-50 dark:text-white-50">
        {format(parseISO(post.date), 'LLLL d, yyyy')}
      </time>
    </Link>
  )
}
