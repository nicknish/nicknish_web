import siteConfig from '@/config'

export const SiteMetadata: React.FC = () => {
  return (
    <>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />

      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />

      <link rel="manifest" href="/manifest.json" />

      <meta name="msapplication-TileColor" content={siteConfig.themeColor} />
      <meta name="theme-color" content={siteConfig.themeColor} />
      <meta name="google-site-verification" content="ZsR7DBayXkYHUqgVqkePKJRLeQXzkri7m-s5CFZzMG4" />
    </>
  )
}
