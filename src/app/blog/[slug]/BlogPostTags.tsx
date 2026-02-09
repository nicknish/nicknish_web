import type { Post } from 'lib/content'

interface IBlogPostTagsProps {
  tags: Post['tags']
}

export function BlogPostTags(props: IBlogPostTagsProps) {
  const { tags } = props

  if (!tags) {
    return null
  }

  return (
    <div className="flex items-center gap-x-2">
      {tags?.map((tag, idx) => (
        <div className="px-2 py-2 bg-black-10 dark:bg-black-30 rounded-sm" key={idx}>
          {tag}
        </div>
      ))}
    </div>
  )
}
