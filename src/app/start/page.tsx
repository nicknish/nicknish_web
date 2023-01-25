import { getPopularPosts } from '@/lib/api'

// TODO
export default async function StartPage() {
  const { data } = await getPopularPosts()

  return <main className="px-4 mx-auto max-w-4xl">Hello</main>
}
