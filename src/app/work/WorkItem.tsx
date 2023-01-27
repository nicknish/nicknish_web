import Link from 'next/link'

interface IWorkItemProps {
  href: string
  title: string
  description: string
  footerSubtitle: string
}

export const WorkItem = ({
  href,
  title,
  description,
  footerSubtitle,
}: IWorkItemProps): JSX.Element => {
  return (
    <Link
      href={href}
      // TODO: Fix shadow
      className="flex flex-col justify-between p-5 rounded border border-black-20 dark:border-white-20 hover:text-inherit shadow-sm"
      data-testid={`WorkItem--${href}`}
    >
      <div className="mb-3">
        <p className="mb-3 text-xl font-semibold">{title}</p>
        <p className="line-clamp-4">{description}</p>
      </div>
      <span className="text-sm">{footerSubtitle}</span>
    </Link>
  )
}
