/** @type {import('next').NextConfig} */

//import { withNodeModules } from 'next/dist/server/next-dev-server-utils'
//import { rewriteUrl } from 'next/dist/server/api-utils'

const nextConfig = {
  reactStrictMode: true,

  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:8081/api/:path*'
      }
    ]
  },
  /*async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, must-revalidate'
          },
          {
            key: 'Cross-Origin-Embedder-Policy',
            value: 'require-corp'
          },
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin'
          }
        ]
      }
    ]
  }*/
}

export default nextConfig
