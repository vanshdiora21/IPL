/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'cricketvectors.akamaized.net' },
    ],
  },
}
module.exports = nextConfig
