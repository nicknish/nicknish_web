import { supabaseClient } from 'lib/supabase-server'
import { BlogPostLikesButton } from './BlogPostLikesButton'

export const revalidate = 60

interface IBlogPostLikesProps {
  slug: string
}

export async function BlogPostLikes({ slug }: IBlogPostLikesProps) {
  // TODO: This seems super jank and making 2 requests per load? Ugh
  const { data: postData, error: postError } = await supabaseClient
    .from('blog_posts')
    .select()
    .match({ slug })
    .single()
  const { data: likesData, error: likesError } = await supabaseClient
    .from('blog_post_likes')
    .select('id, likes_no')
    .match({ id: postData.id })
    .single()

  if (postData === null || postError || likesData === null || likesError) {
    // TODO: Notify
    console.log(`There was an error fetching Blog Post Likes`, {
      postData,
      postError,
      likesData,
      likesError,
    })
    return
  }

  return <BlogPostLikesButton likesCount={likesData.likes_no} likesId={likesData.id} />
}
