import { describe, it, expect } from 'vitest'
import { calculateReadingTime } from './reading-time'

describe('calculateReadingTime', () => {
  it('returns 1 for empty string', () => {
    expect(calculateReadingTime('')).toBe(1)
  })

  it('returns 1 for null', () => {
    expect(calculateReadingTime(null)).toBe(1)
  })

  it('returns 1 for undefined', () => {
    expect(calculateReadingTime(undefined)).toBe(1)
  })

  it('returns 1 for very short content', () => {
    expect(calculateReadingTime('Hello world')).toBe(1)
  })

  it('calculates correct reading time for plain text', () => {
    // 400 words at 200 WPM = 2 minutes
    const words = Array(400).fill('word').join(' ')
    expect(calculateReadingTime(words)).toBe(2)
  })

  it('rounds up to the next minute', () => {
    // 201 words at 200 WPM = 1.005 -> ceil = 2 minutes
    const words = Array(201).fill('word').join(' ')
    expect(calculateReadingTime(words)).toBe(2)
  })

  it('excludes fenced code blocks from word count', () => {
    const content = [
      Array(200).fill('word').join(' '),
      '```javascript',
      Array(1000).fill('code').join(' '),
      '```',
    ].join('\n')
    expect(calculateReadingTime(content)).toBe(1)
  })

  it('excludes inline code from word count', () => {
    const content = 'Here is some `inline code` in a sentence'
    // "Here is some in a sentence" = 6 words
    expect(calculateReadingTime(content)).toBe(1)
  })

  it('excludes images from word count', () => {
    const content = '![alt text](https://example.com/image.png) Some words here'
    expect(calculateReadingTime(content)).toBe(1)
  })

  it('keeps link text but strips URLs', () => {
    const content = 'Click [this link](https://example.com) to continue'
    // "Click this link to continue" = 5 words
    expect(calculateReadingTime(content)).toBe(1)
  })

  it('strips HTML tags', () => {
    const content = '<div>Hello</div> <span>world</span>'
    expect(calculateReadingTime(content)).toBe(1)
  })

  it('strips markdown heading markers', () => {
    const content = '# Heading\n## Subheading\n### Third'
    // "Heading Subheading Third" = 3 words
    expect(calculateReadingTime(content)).toBe(1)
  })

  it('strips bold and italic markers but keeps text', () => {
    const content = '**bold** and *italic* and ~~strikethrough~~'
    // "bold and italic and strikethrough" = 5 words
    expect(calculateReadingTime(content)).toBe(1)
  })

  it('strips horizontal rules', () => {
    const content = 'Above\n---\nBelow'
    // "Above Below" = 2 words
    expect(calculateReadingTime(content)).toBe(1)
  })

  it('handles realistic blog post content', () => {
    // ~600 words of prose + code blocks that should be excluded
    const prose = Array(600).fill('word').join(' ')
    const content = [
      '# My Blog Post',
      '',
      prose,
      '',
      '```typescript',
      'const foo = "this should not count"',
      'const bar = "neither should this"',
      '```',
      '',
      '![screenshot](./img.png)',
      '',
      'Read [the docs](https://example.com) for more.',
    ].join('\n')
    // 600 words prose + a few words from the last line = ~605 words -> ceil(605/200) = 4
    expect(calculateReadingTime(content)).toBe(4)
  })

  it('handles content with only code blocks', () => {
    const content = '```\nconst x = 1\n```'
    expect(calculateReadingTime(content)).toBe(1)
  })

  it('handles content with only images', () => {
    const content = '![img1](url1)\n![img2](url2)\n![img3](url3)'
    expect(calculateReadingTime(content)).toBe(1)
  })
})
