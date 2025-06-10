import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  // Sitemap is now handled by app/docs/sitemap.xml/route.ts
  // If you have other Next.js configurations, add them here
  // For example, if you need to serve static files from the 'public' directory
  // and your images are in 'docs/assets/images', you might need to configure images domain
  // or ensure they are moved to 'public/docs/assets/images' and referenced accordingly.
  // For now, we'll stick to the basic config.
};

export default withMDX(config);
