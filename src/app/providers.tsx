interface IAppProvidersProps {
  children: React.ReactNode
}

export function AppProviders(props: IAppProvidersProps) {
  const { children } = props
  return <>{children}</>
}
