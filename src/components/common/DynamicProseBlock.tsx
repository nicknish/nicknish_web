interface IDynamicProseBlock {
  children: JSX.Element
  className?: string
}

export const DynamicProseBlock = ({ children, className }: IDynamicProseBlock): JSX.Element => {
  return <div className={`prose md:prose-lg dark:prose-invert ${className}`}>{children}</div>
}
