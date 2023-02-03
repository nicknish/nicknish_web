import React from 'react'

export interface IFormErrorProps extends React.HTMLAttributes<HTMLDivElement> {
  label: React.ReactNode
}

export function FormError(props: IFormErrorProps) {
  const { label, className, ...rest } = props
  return (
    <div className={`text-sm mt-1 text-red-300 ${className ?? ''}`} {...rest}>
      {label}
    </div>
  )
}
