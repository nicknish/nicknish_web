import { type Pluggable } from 'unified'
import rehypeCodeTitles from 'rehype-code-titles'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import { rehypePrettyCode, rehypePrettyCodeOptions } from './code-blocks'
import { rehypeAccessibleEmojis } from 'rehype-accessible-emojis'

export const remarkPlugins: Pluggable[] = [
  // GitHub Flavored Markdown
  remarkGfm,
]

export const rehypePlugins: Pluggable[] = [
  // Add IDs to headings
  rehypeSlug,

  // Add links to headings
  rehypeAutolinkHeadings,

  // Add titles to code blocks
  rehypeCodeTitles,

  // Accessible emjois
  rehypeAccessibleEmojis,

  // Code syntax highlighting
  [rehypePrettyCode, rehypePrettyCodeOptions],
]
