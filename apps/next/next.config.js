/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['image.tmdb.org', 'lh3.googleusercontent.com'],
  },
};

const withPlugins = require('next-compose-plugins');
const withTM = require('next-transpile-modules')(['app']);

module.exports = withPlugins([withTM], nextConfig);
