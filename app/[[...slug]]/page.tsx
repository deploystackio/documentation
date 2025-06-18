import type { Metadata } from 'next';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { DocsPage, DocsBody } from 'fumadocs-ui/page';
import { notFound } from 'next/navigation';
import { source } from '@/lib/source';
import { generatePageMetadata, getCanonicalUrl } from '@/lib/seo-utils';
import { getFinalPageTitle } from '@/lib/h1-extractor';
import { readFile } from 'fs/promises';
import { getMDXComponents } from '@/mdx-components';
import { baseOptions } from '../layout.config';

export default async function Page({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}) {
  const { slug } = await params;
  const page = source.getPage(slug);

  if (!page) {
    notFound();
  }

  const MDX = page.data.body;

  return (
    <DocsLayout
      {...baseOptions}
      tree={source.pageTree}
      nav={{
        title: 'DeployStack Docs',
        url: '/',
      }}
      sidebar={{
        defaultOpenLevel: 1
      }}
    >
      <DocsPage toc={page.data.toc} full={page.data.full}>
        <DocsBody>
          <MDX components={getMDXComponents()} />
        </DocsBody>
      </DocsPage>
    </DocsLayout>
  );
}

export async function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = source.getPage(slug);

  if (!page) {
    return {};
  }

  const slugString = slug ? slug.join('/') : '';
  const url = getCanonicalUrl(slugString);

  // Read the raw MDX file to extract H1 heading
  let finalTitle = page.data.title;
  try {
    // Get the absolute path from the page info
    const filePath = page.file.path;
    const absolutePath = `./docs/${filePath}`;
    const rawContent = await readFile(absolutePath, 'utf-8');
    finalTitle = getFinalPageTitle(rawContent, page.data.title);
  } catch (error) {
    // Fallback to frontmatter title if file reading fails
    console.warn('Failed to read MDX file for H1 extraction:', error);
    finalTitle = page.data.title;
  }

  return generatePageMetadata({
    title: finalTitle,
    description: page.data.description || 'DeployStack Documentation and API Reference',
    slug: slugString,
    url,
  });
}
