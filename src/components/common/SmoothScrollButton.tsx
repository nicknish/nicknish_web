'use client'

import { HtmlAttributes } from '@/types/elements'
import { isBrowser } from '@/utils/environment'
import React from 'react'

export interface ISmoothScrollButtonProps extends HtmlAttributes<HTMLButtonElement> {
  target: string
  scrollOptions?: ScrollIntoViewOptions
}

const DEFAULT_SCROLL_OPTIONS: ScrollIntoViewOptions = { behavior: 'smooth', block: 'center' }

export function SmoothScrollButton(props: ISmoothScrollButtonProps) {
  const { target, scrollOptions = {}, className, ...rest } = props
  const [isSupported, setIsSupported] = React.useState<boolean | undefined>(undefined)

  const handleClick = () => {
    const $targetEl = document.querySelector(target)
    if (!$targetEl) {
      return
    }
    if (isSupported) {
      $targetEl.scrollIntoView({ ...DEFAULT_SCROLL_OPTIONS, ...scrollOptions })
    } else {
      $targetEl.scrollIntoView(false)
    }
  }

  React.useEffect(() => {
    if (isBrowser() && 'scrollBehavior' in document.documentElement.style) {
      setIsSupported(true)
    }
  }, [])

  if (isSupported === false) {
    return <span className={className ?? ''}>{rest.children}</span>
  }

  return (
    <button
      {...rest}
      className={`hover:text-primary-600 transition-colors ${className ?? ''}`}
      onClick={handleClick}
    />
  )
}
