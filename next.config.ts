import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
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

export default nextConfig
