import React from 'react'

interface ILayoutProps {
  children: JSX.Element
}

export function PageLayout(props: ILayoutProps) {
  return <main className="px-4 mx-auto max-w-4xl" {...props} />
}
