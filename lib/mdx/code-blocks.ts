// From https://rehype-pretty-code.netlify.app/
import rehypePrettyCode from 'rehype-pretty-code'
import { type Options } from 'rehype-pretty-code'

export { rehypePrettyCode }

export const rehypePrettyCodeOptions: Partial<Options> = {
  // Use one of Shiki's packaged themes
  theme: 'one-dark-pro',

  // Or your own JSON theme
  // theme: JSON.parse(fs.readFileSync(require.resolve('./themes/dark.json'), 'utf-8')),

  // Keep the background or use a custom background color?
  keepBackground: true,

  // Callback hooks to add custom logic to nodes when visiting
  // them.
  onVisitLine(node) {
    // Prevent lines from collapsing in `display: grid` mode, and
    // allow empty lines to be copy/pasted
    if (node.children.length === 0) {
      node.children = [{ type: 'text', value: ' ' }]
    }
  },
  onVisitHighlightedLine(node) {
    // Each line node by default has `class="line"`.
    node.properties.className = [...(node.properties.className || []), 'highlighted']
  },
  onVisitHighlightedChars(node) {
    // Each word node has no className by default.
    node.properties.className = ['word']
  },
}
