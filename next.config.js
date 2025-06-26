/** @type {import('next').NextConfig} */
const nextConfig = {
  fastRefresh: true,
  concurrentFeatures: true,
  experimental: {
    appDir: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
    ],
  },

  // images: {
  //   domains: ["res.cloudinary.com","substackcdn.com","abs.twimg.com",""], // Add allowed image domains
  // },
}

module.exports = nextConfig
