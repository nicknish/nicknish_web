import { getServerSideSitemap, type ISitemapField } from 'next-sitemap'

import siteConfig from '@/config'
import {
  CONTACT_PATH,
  LAB_PATH,
  NEWSLETTER_PATH,
  PROJECTS_PATH,
  START_PATH,
  WORK_PATH,
} from '@/constants/urls'
import { allJobs, getPosts, allPostSeries, allProjects, allExperiments } from 'lib/content'
import { getPostsFromPostSeries } from '@/lib/posts'

const SITE_URL = siteConfig.siteUrl

// Add any new routes to sitemap
export async function GET(request: Request) {
  const allPosts = await getPosts()

  const seriesFields: ISitemapField[] = []
  for (const series of allPostSeries) {
    const seriesPosts = await getPostsFromPostSeries(series)
    const recentPost = seriesPosts[seriesPosts.length - 1]
    seriesFields.push(
      buildSitemapField(series.url, { lastmod: recentPost?.date, changefreq: 'monthly' })
    )
  }

  const fields: ISitemapField[] = [
    buildSitemapField(SITE_URL, { changefreq: 'daily' }),
    buildSitemapField(`${SITE_URL}${CONTACT_PATH}`, { changefreq: 'monthly' }),
    buildSitemapField(`${SITE_URL}${NEWSLETTER_PATH}`, { changefreq: 'monthly' }),
    buildSitemapField(`${SITE_URL}${PROJECTS_PATH}`, { changefreq: 'monthly' }),
    buildSitemapField(`${SITE_URL}${START_PATH}`, { changefreq: 'monthly' }),
    buildSitemapField(`${SITE_URL}${WORK_PATH}`, { changefreq: 'monthly' }),
    buildSitemapField(`${SITE_URL}${LAB_PATH}`, { changefreq: 'weekly' }),
    ...allPosts.map(post =>
      buildSitemapField(post.url, { lastmod: post.date, changefreq: 'daily' })
    ),
    ...allExperiments.map(experiment =>
      buildSitemapField(experiment.url, { lastmod: experiment.date, changefreq: 'monthly' })
    ),
    ...allProjects.map(project =>
      buildSitemapField(project.url, { lastmod: project.endDate, changefreq: 'monthly' })
    ),
    ...seriesFields,
    ...allJobs.map(job => buildSitemapField(job.url, { changefreq: 'monthly' })),
  ]

  return getServerSideSitemap(fields)
}

function buildSitemapField(loc: string, config: Partial<ISitemapField>): ISitemapField {
  return {
    loc,
    lastmod: new Date().toISOString(),
    ...config,
  }
}
