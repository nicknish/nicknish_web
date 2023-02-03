import Link from 'next/link'

import { DynamicProseBlock } from '@/components/common/DynamicProseBlock'
import { OutboundLink } from '@/components/common/OutboundLink'
import { NewsletterSignupForm } from '../newsletter/NewsletterSignupForm'
import { Image } from '@/components/common/Image'

import siteConfig from '@/config'
import { NEWSLETTER_PATH } from '@/constants/urls'
import { getPostCollectionBySlug, getPostsFromCollection } from '@/lib/posts'
import type { Post } from 'contentlayer/generated'
import PROFILE_IMG from './profile.png'

export default async function StartPage() {
  const topTechnicalPosts = getPostsFromCollection(
    getPostCollectionBySlug('popular-technical-posts')
  )
  const topProductPosts = getPostsFromCollection(getPostCollectionBySlug('popular-product-posts'))

  return (
    <main className="px-4 mx-auto max-w-4xl">
      <StartHeader />
      <hr />
      <div className="text-center">
        <StartBio />
        <hr />
        <StartPopularPosts
          topTechnicalPosts={topTechnicalPosts}
          topProductPosts={topProductPosts}
        />
        <hr />
        <StartNewsletter />
      </div>
    </main>
  )
}

function StartHeader() {
  return (
    <header className="mb-16 md:grid md:grid-cols-5 md:gap-x-8">
      <div className="mb-8 md:mb-0 md:col-span-2">
        <Image
          className="w-80 md:w-auto rounded-lg md:-rotate-2 hover:md:rotate-0 transition-transform"
          src={PROFILE_IMG}
          alt="Nick Nish profile picture"
          width={350}
          height={350}
        />
      </div>

      <DynamicProseBlock className="md:col-span-3">
        <>
          <h1 className="text-2xl md:text-3xl text-primary-500 font-bold">
            Hi there, I{"'"}m Nick!
          </h1>
          <p>
            Welcome to my corner of the internet where I share ideas and help you solve real
            problems.
          </p>
          <p>
            I fundamentally believe the internet and technology has created limitless opportunity.{' '}
            <b>I aim to help you leverage those opportunities by providing you a toolkit</b> to
            create products and navigate the technology world.
          </p>
          {/* <p className='my-4'>
          I'm fascinated by the indie maker movement and how software engineers
          and non-engineers are utilizing new tools to create products that
          provide them financial independence.
        </p> */}
          <p>
            On this blog you can expect ideas, tutorials, and resources ranging topics like
            startups, making products, and software engineering.
          </p>
        </>
      </DynamicProseBlock>
    </header>
  )
}

function StartBio() {
  return (
    <StartSection>
      <>
        <h2 className="">Quick Bio</h2>
        <p>
          I{"'"}m a product-oriented engineer that loves startups. I currently work at Credit Karma.
        </p>
        <p>
          I publish Makers, a newsletter for creatives, technologists, and makers.{' '}
          <Link href={NEWSLETTER_PATH}>Subscribe here</Link> or{' '}
          <OutboundLink href={siteConfig.newsletterUrl}>read the archive.</OutboundLink>
        </p>
        <p>Born and raised in Los Angeles.</p>
        <p>Living in Portland, OR.</p>
        <p>
          Favorite book: <OutboundLink href="https://amzn.to/2XeHjMj">4-Hour Workweek</OutboundLink>
          .
        </p>
      </>
    </StartSection>
  )
}

function StartPopularPosts({
  topTechnicalPosts,
  topProductPosts,
}: {
  topTechnicalPosts: Post[]
  topProductPosts: Post[]
}) {
  return (
    <StartSection>
      <>
        <h2>Popular Posts</h2>
        <h3>Product</h3>
        <StartPopularArticles posts={topProductPosts} />
        <h3>Software Engineering</h3>
        <StartPopularArticles posts={topTechnicalPosts} />
      </>
    </StartSection>
  )
}

function StartNewsletter() {
  return (
    <StartSection>
      <>
        <h2>Subscribe</h2>
        <p>I publish Makers, an occasional newsletter for makers and creatives.</p>
        <p>
          It{"'"}s the best way to keep up with everything here, so drop your email below or{' '}
          <OutboundLink href={siteConfig.newsletterUrl}>read the archive</OutboundLink>. I promise
          to never do anything shady or send you spam.
        </p>
        <StartNewsletterSignupForm />
      </>
    </StartSection>
  )
}

function StartSection({ children }: { children: JSX.Element }) {
  return (
    <section className="my-8">
      <DynamicProseBlock className="mx-auto">{children}</DynamicProseBlock>
    </section>
  )
}

function StartPopularArticles({ posts }: { posts: Post[] }) {
  return (
    <ul className="list-none !pl-0">
      {posts.map((post, idx) => (
        <li className="!pl-0" key={idx}>
          <Link href={post.url}>{post.title}</Link>
        </li>
      ))}
    </ul>
  )
}

function StartNewsletterSignupForm() {
  return (
    <div className="mt-8 not-prose">
      <NewsletterSignupForm />
    </div>
  )
}
