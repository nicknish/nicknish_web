const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: SITE_URL,
  generateRobotsTxt: true,
  /**
   * generateIndexSitemap generates Index Sitemaps, which are useful for sites
   * that exceed the size limits (50k urls).
   */
  generateIndexSitemap: false,
  exclude: ['/server-sitemap.xml'],
  robotsTxtOptions: {
    additionalSitemaps: [`${SITE_URL}/server-sitemap.xml`],
  },
}
