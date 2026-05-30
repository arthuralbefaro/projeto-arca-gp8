import path from 'node:path';

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

const nextConfig = {
  output: 'export',
  basePath: basePath || undefined,
  assetPrefix: basePath ? `${basePath}/` : undefined,
  turbopack: {
    root: path.resolve('.'),
  },
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
