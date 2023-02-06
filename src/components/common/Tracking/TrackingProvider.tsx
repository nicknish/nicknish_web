'use client'

import React, { useMemo } from 'react'
import { useTracking } from 'react-tracking'
import { nanoid } from 'nanoid'

interface ITrackingProviderProps {
  children: React.ReactNode
}

export function TrackingProvider(props: ITrackingProviderProps) {
  const { children } = props
  const randomId = useMemo(() => nanoid(), [])
  const { Track } = useTracking(
    {},
    {
      dispatch: (data: any) => {
        if (Object.keys(data).length > 0) {
          // Queue data for Google Analytics
          ;(window.dataLayer = window.dataLayer || []).push(data)
        }
      },
      process: (ownTrackingData: any) => {
        const commonData = { randomId }
        if (ownTrackingData.page) {
          // Add pageview event to every useTracking instance containing "page"
          // in its tracking object
          return { ...commonData, event: 'pageview' }
        }
        return null
      },
    }
  )

  return <Track>{children}</Track>
}
