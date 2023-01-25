import React, { ReactNode } from 'react'

import Link, { LinkProps } from 'next/link'

export type ButtonThemes = 'primary'
export type ButtonSizes = 'small'

interface ButtonProps {
  children: React.ReactNode
  theme: ButtonThemes
  size: ButtonSizes
  className?: string
  linkProps?: LinkProps
  buttonProps?: React.ButtonHTMLAttributes<HTMLButtonElement>
}

const themeClassNamesMap: { [T in ButtonThemes]: string } = {
  primary:
    'bg-primary-500 text-white-100 hover:bg-primary-600 hover:text-white-90 dark:bg-white-90 dark:text-black-70 hover:dark:bg-white-60 hover:dark:text-black-70',
}

const sizeClassNamesMap: { [T in ButtonSizes]: string } = {
  small: 'text-sm py-[10px] px-5',
}

export const Button = ({
  theme = 'primary',
  size = 'small',
  children,
  className,
  linkProps,
  buttonProps,
}: ButtonProps) => {
  const defaultClassNames =
    'inline-block border-none rounded-sm no-underline tracking-wide font-semibold transition-all cursor-pointer'
  const themeClassNames = themeClassNamesMap[theme]
  const sizeClassNames = sizeClassNamesMap[size]

  if (linkProps) {
    return (
      <Link
        {...linkProps}
        className={`${defaultClassNames} ${themeClassNames} ${sizeClassNames} ${className}`}
      >
        {children}
      </Link>
    )
  }

  return (
    <button
      className={`${defaultClassNames} ${themeClassNames} ${sizeClassNames} ${className}`}
      {...buttonProps}
    >
      <>{children}</>
    </button>
  )
}
