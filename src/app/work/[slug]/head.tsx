import { getWorkHistoryBySlug } from '@/lib/api'

export default async function Head({ params: { slug } }) {
  const post = await getWorkHistoryBySlug(slug)

  return (
    <>
      {/* TODO: Fix SEO for Work posts */}
      <title>{post.title}</title>
    </>
  )
}
