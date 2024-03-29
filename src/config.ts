const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL as string
const TWITTER_USERNAME = '@nickjnish'
const DISQUS_SHORTNAME = 'nicknish'

const siteConfig = {
  siteUrl: SITE_URL,
  siteTitle: `Nick Nish - Software and Product Developer Blog`,
  siteDescription: `Nick Nish's Portfolio and Blog. Learn about software development, React/JavaScript, product, and business.`,
  themeColor: '#ff8061',

  /* SEO */
  author: 'Nick Nish',
  shortTitle: 'Nick Nish', // App manifest, e.g. Mobile Home Screen
  shareImage: 'logos/share.png', // OpenGraph Default Share Image (recommended: 1200x1200)
  shareImageWidth: 1200,
  shareImageHeight: 630,
  userTwitter: TWITTER_USERNAME,

  /* Site Navigation */
  githubUrl: 'https://github.com/nicknish',
  linkedinUrl: 'https://linkedin.com/in/nicknish',
  twitterUsername: TWITTER_USERNAME,
  twitterUrl: `https://twitter.com/${TWITTER_USERNAME}`,
  newsletterUrl: 'https://nicknish.substack.com',
  resumeUrl:
    'https://s3-us-west-1.amazonaws.com/nicknish-experiments/resume/nick_nish_resume_public.pdf',

  /* Other */
  disqusShortname: DISQUS_SHORTNAME,
}

export default siteConfig
