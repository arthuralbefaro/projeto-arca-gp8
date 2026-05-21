/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: isProd ? '/projeto-arca-gp8' : '',
  assetPrefix: isProd ? '/projeto-arca-gp8/' : '',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
