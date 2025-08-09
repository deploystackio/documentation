import { MetadataRoute } from 'next';
import { source } from '@/lib/source';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  // Get all pages from source.getPages() which combines all sources
  const allPages = source.getPages();
  
  // Map pages to sitemap entries
  const sitemapEntries = allPages.map((page) => ({
    url: new URL(page.url, 'https://docs.deploystack.io').toString(),
    lastModified: page.data.lastModified ? new Date(page.data.lastModified) : undefined,
    changeFrequency: 'weekly' as const,
    priority: page.url === '/' ? 1.0 : page.url.startsWith('/development') || page.url.startsWith('/self-hosted') ? 0.7 : 0.8,
  }));

  return sitemapEntries;
}
