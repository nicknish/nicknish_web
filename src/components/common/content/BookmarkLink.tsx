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
