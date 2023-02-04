import React from 'react'

interface IProseContainerProps extends React.HTMLAttributes<any> {
  children: React.ReactNode
  element?: string
}

export function ProseContainer(props: IProseContainerProps) {
  const { className = '', ...rest } = props
  const Element = props.element || 'div'

  return (
    <Element
      // @ts-ignore
      className={`md:text-lg max-w-prose mx-auto ${className ?? ''}`}
      {...rest}
    />
  )
}
