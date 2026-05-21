/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: "/projeto-arca-gp8",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
