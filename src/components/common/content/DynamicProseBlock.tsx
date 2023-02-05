import React from 'react'

interface IDynamicProseBlock {
  children: React.ReactNode
  element?: string
  className?: string
}

export function DynamicProseBlock(props: IDynamicProseBlock) {
  const { element, className, ...rest } = props
  const Element = element || 'div'
  
  return (
    <Element 
      // @ts-ignore
      className={`prose md:prose-lg dark:prose-invert ${className ?? ''}`}
      {...rest} 
    />
  )
}
