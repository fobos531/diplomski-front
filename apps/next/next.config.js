/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
};

const withPlugins = require('next-compose-plugins');
const withTM = require('next-transpile-modules')(['app']);

module.exports = withPlugins([withTM], nextConfig);
