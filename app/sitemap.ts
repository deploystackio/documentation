import { MetadataRoute } from 'next';
import { source } from '@/lib/source';

export const dynamic = 'force-static';

function getPages(tree: any): any[] {
  const pages: any[] = [];

  function traverse(nodes: any[]) {
    for (const node of nodes) {
      if (node.type === 'page') {
        pages.push(node);
      } else if ('children' in node) {
        traverse(node.children);
      }
    }
  }

  traverse(tree.children);
  return pages;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = getPages(source.pageTree).map((page) => ({
    url: new URL(page.url, 'https://docs.deploystack.io').toString(),
    lastModified: page.lastModified,
  }));

  return pages;
}
