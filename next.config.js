const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  cacheStartUrl: false,
  disable: process.env.NODE_ENV === 'development',
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['mui-tel-input'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cms.deerhacks.ca',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.discordapp.com',
        pathname: '/**',
      },
    ],
  },
}

module.exports = withPWA(nextConfig)
