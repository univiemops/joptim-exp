/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  basePath: '/joptim',
  async rewrites() { return [{ source: '/calibration', destination: '/html/index.html', }] }
}

module.exports = nextConfig
