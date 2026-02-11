const WORDS_PER_MINUTE = 200

/**
 * Calculate reading time in minutes from raw markdown content.
 */
export function calculateReadingTime(rawContent: string | null | undefined): number {
  if (!rawContent) return 1
  // Strip code blocks (fenced)
  let text = rawContent.replace(/```[\s\S]*?```/g, '')
  // Strip inline code
  text = text.replace(/`[^`]+`/g, '')
  // Strip images
  text = text.replace(/!\[[^\]]*\]\([^)]*\)/g, '')
  // Strip links but keep text
  text = text.replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
  // Strip HTML tags
  text = text.replace(/<[^>]+>/g, '')
  // Strip markdown heading markers, bold, italic, strikethrough
  text = text.replace(/#{1,6}\s/g, '')
  text = text.replace(/(\*{1,3}|_{1,3}|~~)(.*?)\1/g, '$2')
  // Strip horizontal rules
  text = text.replace(/^[-*_]{3,}\s*$/gm, '')

  const words = text.split(/\s+/).filter(word => word.length > 0)
  const minutes = Math.ceil(words.length / WORDS_PER_MINUTE)
  return Math.max(1, minutes)
}
