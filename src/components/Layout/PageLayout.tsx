import React from 'react'

interface ILayoutProps {
  className?: string
  children: React.ReactNode
}

export function PageLayout(props: ILayoutProps) {
  const { className, ...rest } = props
  return <main className={`px-4 mx-auto max-w-4xl ${className ?? ''}`} {...rest} />
}
