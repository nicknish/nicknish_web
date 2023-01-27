import { DynamicProseBlock } from '@/components/common/DynamicProseBlock'
import { allPosts, Post } from 'contentlayer/generated'
import { format, parseISO } from 'date-fns'
import { notFound } from 'next/navigation'
import { MDXBlock } from '@/components/common/MDXBlock'

export async function generateStaticParams() {
  return allPosts.map(post => ({ slug: post.slug }))
}

async function getBlogPostBySlug(slug: string) {
  return allPosts.find(post => post.slug === slug)
}

interface IBlogPostProps {
  params: {
    slug: Post['slug']
  }
}

export default async function BlogPost({ params: { slug } }: IBlogPostProps) {
  const post = await getBlogPostBySlug(slug)

  if (!post) {
    notFound()
  }

  return (
    <article className="px-4 mx-auto max-w-3xl">
      <header className="my-12">
        <h1 className="mb-4 text-3xl md:text-4xl font-bold">{post.title}</h1>
        <time dateTime={post.date} className="block text-slate-600 dark:text-white-80">
          {format(parseISO(post.date), 'LLLL d, yyyy')}
        </time>
      </header>
      <DynamicProseBlock>
        <MDXBlock code={post.body.code} />
      </DynamicProseBlock>
    </article>
  )
}
