import Link from 'next/link'
import type { Post } from 'lib/content'
import { formatIsoDate } from '@/utils/dates'

interface RelatedPostsProps {
  posts: Post[]
}

export function RelatedPosts({ posts }: RelatedPostsProps) {
  if (posts.length === 0) {
    return null
  }

  return (
    <nav aria-labelledby="related-posts-heading" className="mt-12">
      <h2 id="related-posts-heading" className="mb-4 md:mb-5 uppercase tracking-wide text-black-50 dark:text-white-80">
        Related Posts
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {posts.map(post => (
          <Link key={post.slug} href={post.url} className="block group no-underline text-inherit" prefetch={false}>
            <div className="flex flex-col justify-between p-4 border-2 border-black-10 dark:border-white-10 rounded-sm group-hover:border-primary-500 transition-colors h-full">
              <div>
                <h3 className="mb-2 text-lg font-bold group-hover:text-primary-500 transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-sm text-black-70 dark:text-white-80 line-clamp-3">{post.description}</p>
              </div>
              <div className="flex items-center gap-x-1.5 mt-4 text-sm text-black-40 dark:text-white-50">
                <time dateTime={post.date}>{formatIsoDate(post.date)}</time>
                <span>&middot;</span>
                <span>{post.readingTime} min read</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </nav>
  )
}
