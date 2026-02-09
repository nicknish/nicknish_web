import Link from 'next/link'

import type { Experiment } from 'lib/content'
import { formatIsoDate } from '@/utils/dates'
import { LAB_PATH } from '@/constants/urls'

interface LabExperimentsSectionProps {
  experiments: Experiment[]
  showViewAll?: boolean
  sectionTitle?: string
}

export function LabExperimentsSection({
  experiments,
  showViewAll = true,
  sectionTitle = 'Latest from the Lab',
}: LabExperimentsSectionProps) {
  if (experiments.length === 0) return null

  const [featured, ...rest] = experiments

  return (
    <section>
      <h2 className="mb-4 md:mb-5 uppercase tracking-wide text-black-50 dark:text-white-80">
        {sectionTitle}
      </h2>

      <Link href={featured.url} className="block group" prefetch={false}>
        <div className="p-6 border-2 border-black-10 dark:border-white-10 rounded-sm hover:border-primary-500 transition-colors">
          <h3 className="text-xl font-bold mb-2 group-hover:text-primary-500 transition-colors">
            {featured.title}
          </h3>
          <time
            dateTime={featured.date}
            className="block mb-3 text-sm text-black-40 dark:text-white-50"
          >
            {formatIsoDate(featured.date)}
          </time>
          <p className="dark:text-white-80 line-clamp-3">{featured.description}</p>
          {featured.tags && featured.tags.length > 0 && (
            <div className="mt-3 flex gap-2 flex-wrap">
              {featured.tags.map(tag => (
                <span
                  key={tag}
                  className="text-xs px-2 py-1 bg-black-5 dark:bg-white-10 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </Link>

      {rest.length > 0 && (
        <div className="grid grid-cols-2 gap-2 md:gap-3 mt-3">
          {rest.map(experiment => (
            <Link
              key={experiment.slug}
              href={experiment.url}
              className="block group"
              prefetch={false}
            >
              <div className="p-4 border-2 border-black-10 dark:border-white-10 rounded-sm hover:border-primary-500 transition-colors h-full">
                <h3 className="text-lg font-bold mb-2 group-hover:text-primary-500 transition-colors line-clamp-2">
                  {experiment.title}
                </h3>
                <time
                  dateTime={experiment.date}
                  className="block mb-2 text-sm text-black-40 dark:text-white-50"
                >
                  {formatIsoDate(experiment.date)}
                </time>
                <p className="text-sm dark:text-white-80 line-clamp-3">
                  {experiment.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}

      {showViewAll && (
        <div className="mt-4 text-right">
          <Link
            href={LAB_PATH}
            className="text-primary-500 hover:text-primary-600 font-semibold transition-colors"
            prefetch={false}
          >
            View all experiments &rarr;
          </Link>
        </div>
      )}
    </section>
  )
}
