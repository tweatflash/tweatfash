/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ["res.cloudinary.com","substackcdn.com"], // Add allowed image domains
  },
}

module.exports = nextConfig
