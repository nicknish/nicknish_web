'use client'

// Amended from gatsby-plugin-google-analytics

import type { HtmlAttributes } from '@/types/elements'

export interface IOutboundLinkProps extends HtmlAttributes<HTMLAnchorElement> {
  href: string
  target?: string
  eventCategory?: string
  eventAction?: string
  eventLabel?: string
  eventValue?: number
}

export function OutboundLink(props: IOutboundLinkProps) {
  const { eventCategory, eventAction, eventLabel, eventValue, ...rest } = props
  return (
    <a
      {...rest}
      onClick={e => {
        if (typeof props.onClick === `function`) {
          props.onClick(e)
        }
        let redirect = true
        if (
          e.button !== 0 ||
          e.altKey ||
          e.ctrlKey ||
          e.metaKey ||
          e.shiftKey ||
          e.defaultPrevented
        ) {
          redirect = false
        }
        if (props.target && props.target.toLowerCase() !== `_self`) {
          redirect = false
        }

        ;(window.dataLayer = window.dataLayer || []).push({
          eventCategory: eventCategory || `Outbound Link`,
          eventAction: eventAction || `click`,
          eventLabel: eventLabel || props.href,
          eventValue,
          transport: redirect ? `beacon` : ``,
          hitCallback: function () {
            if (redirect) {
              document.location = props.href
            }
          },
        })

        if (redirect) {
          document.location = props.href
        }

        return false
      }}
    />
  )
}
