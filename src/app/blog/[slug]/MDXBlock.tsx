'use client'

import React from 'react'
import { useMDXComponent } from 'next-contentlayer/hooks'
import { type MDXContentProps } from 'mdx-bundler/dist/types'
import { type MDX } from '@contentlayer/core'

interface IMDXBlockProps extends MDXContentProps {
  code: MDX['code']
}

export function MDXBlock({ code, ...props }: IMDXBlockProps) {
  const MDXComponent = useMDXComponent(code)
  return <MDXComponent {...props} />
}
