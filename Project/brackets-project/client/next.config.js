/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placeimg.com',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '9999'
      },
    ],
  },
}
module.exports = nextConfig
