import { MDXRemote } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeCodeTitles from 'rehype-code-titles'
import { rehypeAccessibleEmojis } from 'rehype-accessible-emojis'
import rehypePrettyCode from 'rehype-pretty-code'
import { rehypePrettyCodeOptions } from 'lib/mdx/code-blocks'

interface IMDXBlockProps {
  source: string
  components?: Record<string, React.ComponentType<any>>
}

export function MDXBlock({ source, components }: IMDXBlockProps) {
  return (
    <MDXRemote
      source={source}
      options={{
        mdxOptions: {
          remarkPlugins: [remarkGfm],
          rehypePlugins: [
            rehypeSlug,
            rehypeAutolinkHeadings,
            rehypeCodeTitles,
            rehypeAccessibleEmojis,
            [rehypePrettyCode, rehypePrettyCodeOptions],
          ],
        },
      }}
      components={components}
    />
  )
}
