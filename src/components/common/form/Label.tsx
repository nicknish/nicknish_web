import React from 'react'

interface ILabelProps extends React.InputHTMLAttributes<HTMLLabelElement> {
  label: React.ReactNode
}

export function Label(props: ILabelProps) {
  const { label, className, children, ...rest } = props
  return (
    <label className={`${className ?? ''}`} {...rest}>
      {label && <span className="">{label}</span>}
      <div>{children}</div>
    </label>
  )
}
