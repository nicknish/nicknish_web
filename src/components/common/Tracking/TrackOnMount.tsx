'use client'

import { useTracking, Options as useTrackingOptions } from 'react-tracking'

interface ITrackOnMountProps<P extends {}> {
  children: JSX.Element
  trackingData: P
  trackingOptions?: useTrackingOptions<P>
}

export function TrackOnMount<P extends {}>(props: ITrackOnMountProps<P>): JSX.Element {
  const { children, trackingData, trackingOptions } = props
  const { Track } = useTracking(trackingData, trackingOptions)
  return <Track>{children}</Track>
}
