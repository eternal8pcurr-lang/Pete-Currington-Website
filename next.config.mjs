/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Allow images served from Plasmic's CDN so next/image can optimize them.
    // If you use other external image hosts, add them here.
    domains: ["site-assets.plasmic.app"],
    // Alternatively, for more complex matching use `remotePatterns`.
    // remotePatterns: [
    //   {
    //     protocol: 'https',
    //     hostname: '**.plasmic.app',
    //   },
    // ],
  },
};

export default nextConfig;
