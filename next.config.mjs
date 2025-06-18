import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  output: 'export', // Enable static HTML export
  trailingSlash: true, // Required for static export
  // basePath: '/docs', // Set base path for the application
  // assetPrefix: '/docs', // Ensure assets are also prefixed with /docs
  images: {
    unoptimized: true // Required for static export
  },
  // Sitemap is now handled by app/docs/sitemap.xml/route.ts
  // If you have other Next.js configurations, add them here
};

export default withMDX(config);
