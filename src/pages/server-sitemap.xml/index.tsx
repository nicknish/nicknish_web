import { getServerSideSitemap, type ISitemapField } from 'next-sitemap'
import { GetServerSideProps } from 'next'

import siteConfig from '@/config'
import {
  CONTACT_PATH,
  NEWSLETTER_PATH,
  PROJECTS_PATH,
  START_PATH,
  WORK_PATH,
} from '@/constants/urls'
import { allJobs, allPosts, allPostSeries, allProjects } from 'contentlayer/generated'
import { getPostsFromPostSeries } from '@/lib/posts'

const SITE_URL = siteConfig.siteUrl

// Add any new routes to sitemap
export const getServerSideProps: GetServerSideProps = async ctx => {
  const fields: ISitemapField[] = [
    buildSitemapField(SITE_URL, { changefreq: 'daily' }),
    buildSitemapField(`${SITE_URL}${CONTACT_PATH}`, { changefreq: 'monthly' }),
    buildSitemapField(`${SITE_URL}${NEWSLETTER_PATH}`, { changefreq: 'monthly' }),
    buildSitemapField(`${SITE_URL}${PROJECTS_PATH}`, { changefreq: 'monthly' }),
    buildSitemapField(`${SITE_URL}${START_PATH}`, { changefreq: 'monthly' }),
    buildSitemapField(`${SITE_URL}${WORK_PATH}`, { changefreq: 'monthly' }),
    ...allPosts.map(post =>
      buildSitemapField(post.url, { lastmod: post.date, changefreq: 'daily' })
    ),
    ...allProjects.map(project =>
      buildSitemapField(project.url, { lastmod: project.endDate, changefreq: 'monthly' })
    ),
    ...allPostSeries.map(series => {
      const recentPost = getPostsFromPostSeries(series).pop()
      return buildSitemapField(series.url, { lastmod: recentPost?.date, changefreq: 'monthly' })
    }),
    ...allJobs.map(job => buildSitemapField(job.url, { changefreq: 'monthly' })),
  ]

  return getServerSideSitemap(ctx, fields)
}

export default function SitemapIndex() {}

function buildSitemapField(loc: string, config: Partial<ISitemapField>): ISitemapField {
  return {
    loc,
    lastmod: new Date().toISOString(),
    ...config,
  }
}
