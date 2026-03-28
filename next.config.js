/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**.crex.live' },
      { protocol: 'https', hostname: '**.cricbuzz.com' },
      { protocol: 'https', hostname: 'crex.live' },
      { protocol: 'https', hostname: 'img1.hscicdn.com' },
      { protocol: 'https', hostname: '**.hscicdn.com' },
    ],
    unoptimized: true,
  },
}

module.exports = nextConfig
