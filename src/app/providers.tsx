import { TrackingProvider } from '@/components/common/Tracking'

interface IAppProvidersProps {
  children: React.ReactNode
}

export function AppProviders(props: IAppProvidersProps) {
  const { children } = props
  return <TrackingProvider>{children}</TrackingProvider>
}
