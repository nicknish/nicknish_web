const { withContentlayer } = require('next-contentlayer')

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.ctfassets.net',
      },
    ],
  },
  productionBrowserSourceMaps: true,
  async redirects() {
    return [
      {
        source: '/blog',
        destination: '/',
        permanent: false,
      },
    ]
  },
}

module.exports = withContentlayer(nextConfig)
