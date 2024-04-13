const MillionLint = require('@million/lint');
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    swcPlugins: [['@swc-jotai/react-refresh', {}]]
  }
};
module.exports = MillionLint.next({
  rsc: true
})(nextConfig);