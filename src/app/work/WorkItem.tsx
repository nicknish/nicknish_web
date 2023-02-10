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
      className="group flex flex-col justify-between p-5 rounded border border-black-20 dark:border-white-20 hover:text-inherit hover:shadow-lg shadow-sm transition-all"
      data-testid={`WorkItem--${href}`}
      prefetch={false}
    >
      <div className="mb-3">
        <p className="mb-3 text-xl font-semibold group-hover:text-primary-500 transition-colors">
          {title}
        </p>
        <p className="line-clamp-3 dark:text-white-80">{description}</p>
      </div>
      <span className="text-sm text-black-50 dark:text-white-50">{footerSubtitle}</span>
    </Link>
  )
}
