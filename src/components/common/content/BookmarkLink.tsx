// TODO: As of Feb 13, 2023, Contentlayer has an issue passing React components to MDX files
// See https://github.com/contentlayerdev/contentlayer/issues/309

import React from 'react'

interface IBookmarkLinkProps {
  title: string
  description: string
  url: string
}

export function BookmarkLink(props: IBookmarkLinkProps) {
  const { title, description, url } = props
  return (
    <figure>
      {title}
      {description}
      {url}
    </figure>
  )
}
