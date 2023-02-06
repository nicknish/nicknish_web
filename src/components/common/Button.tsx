import React from 'react'
import Link from 'next/link'

import type { HtmlAttributes } from '@/types/elements'

import { OutboundLink, IOutboundLinkProps } from './Tracking/OutboundLink'

const themeClassNamesMap: { [T in ButtonThemes]: string } = {
  primary:
    'bg-primary-500 text-white-100 hover:bg-primary-600 hover:text-white-90 dark:bg-white-90 dark:text-black-70 hover:dark:bg-white-60 hover:dark:text-black-70',
}

const sizeClassNamesMap: { [T in ButtonSizes]: string } = {
  small: 'text-sm py-[10px] px-5',
}

export const Button = {
  Default: DefaultButton,
  InternalLink: InternalLinkButton,
  ExternalLink: ExternalLinkButton,
  TrackingLink: OutboundTrackingLinkButton,
}

type ButtonThemes = 'primary'
type ButtonSizes = 'small'

export interface IButtonBaseProps {
  theme: ButtonThemes
  size: ButtonSizes
}

export interface IDefaultButtonProps extends IButtonBaseProps, HtmlAttributes<HTMLButtonElement> {}

function DefaultButton(props: IDefaultButtonProps) {
  const { theme, size, className, ...rest } = props
  const allClassnames = getButtonClassNames({ theme, size, className })
  return <button className={allClassnames} {...rest} />
}

export interface IInternalLinkButtonProps extends IButtonBaseProps {
  href: string
  className?: string
  children?: React.ReactNode
}

function InternalLinkButton(props: IInternalLinkButtonProps) {
  const { theme, size, className, ...rest } = props
  const allClassnames = getButtonClassNames({ theme, size, className })
  return <Link {...rest} className={allClassnames} />
}

export interface IExternalLinkButtonProps
  extends IButtonBaseProps,
    HtmlAttributes<HTMLAnchorElement> {}

function ExternalLinkButton(props: IExternalLinkButtonProps) {
  const { theme, size, className, ...rest } = props
  const allClassnames = getButtonClassNames({ theme, size, className })
  return <a {...rest} className={allClassnames} />
}

export interface IOutboundTrackingLinkButtonProps extends IButtonBaseProps, IOutboundLinkProps {}

function OutboundTrackingLinkButton(props: IOutboundTrackingLinkButtonProps) {
  const { theme, size, className, ...rest } = props
  const allClassnames = getButtonClassNames({ theme, size, className })
  return <OutboundLink {...rest} className={allClassnames} />
}

function getButtonClassNames(args: {
  theme: ButtonThemes
  size: ButtonSizes
  className?: string
}): string {
  const { theme, size, className } = args
  const defaultClassNames =
    'inline-block border-none rounded-sm no-underline tracking-wide font-semibold transition-all cursor-pointer'
  const themeClassNames = themeClassNamesMap[theme]
  const sizeClassNames = sizeClassNamesMap[size]

  return `${defaultClassNames} ${themeClassNames} ${sizeClassNames} ${className ?? ''}`
}
