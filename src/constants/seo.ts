import { Metadata } from "next";

import config from '@/config'

export type { Metadata }

const DEFAULT_IMAGE = {
  url: config.shareImage,
  width: config.shareImageWidth,
  height: config.shareImageHeight,
  alt: config.siteTitle,
}

const DEFAULT_TITLE = {
  default: config.siteTitle,
  template: `%s | ${config.shortTitle}`
}

export const DEFAULT_METADATA: Metadata = {
  title: DEFAULT_TITLE,
  description: config.siteDescription,
  // @ts-expect-error
  metadataBase: config.siteUrl,
  authors: { name: config.author },
  openGraph: {
    title: DEFAULT_TITLE,
    description: config.siteDescription,
    siteName: config.siteTitle,
    type: 'website',
    url: config.siteUrl,
    locale: 'en_IE',
    images: [DEFAULT_IMAGE],
  },
  twitter: {
    title: DEFAULT_TITLE,
    description: config.siteDescription,
    site: config.siteUrl,
    creator: config.userTwitter,
    card: 'summary_large_image',
    images: [DEFAULT_IMAGE]
  },
  /**** NON-CONTENT META TAGS ****/
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    // shrinkToFit: 'no',
  },
  icons: {
    icon: ['/favicon.ico', '/favicon-16x16.png', '/favicon-32x32.png'],
    shortcut: '/favicon-32x32.png',
    apple: '/apple-touch-icon.png',
    other: {
      rel: 'apple-touch-icon',
      url: '/apple-touch-icon.png',
    }
  },
  manifest: '/manifest.json',
  themeColor: config.themeColor,
  verification: {
    google: 'ZsR7DBayXkYHUqgVqkePKJRLeQXzkri7m-s5CFZzMG4',
  }
}
