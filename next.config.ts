import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.ctfassets.net',
      },
      {
        protocol: 'https',
        hostname: 'prod-files-secure.s3.us-west-2.amazonaws.com',
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

export default nextConfig
