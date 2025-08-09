import type { Metadata } from 'next';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { HomeLayout } from 'fumadocs-ui/layouts/home';
import { DocsPage, DocsBody } from 'fumadocs-ui/page';
import { notFound } from 'next/navigation';
import { source, mainSource, developmentSource, selfHostedSource } from '@/lib/source';
import { generatePageMetadata, getCanonicalUrl } from '@/lib/seo-utils';
import { getFinalPageTitle } from '@/lib/h1-extractor';
import { readFile } from 'fs/promises';
import { getMDXComponents } from '@/mdx-components';
import { homeOptions, docsOptions } from '../layout.config';

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

  // Determine if this is the root page (no sidebar needed)
  const isRootPage = !slug || slug.length === 0;

  // Use HomeLayout for root page (no sidebar), DocsLayout for all other pages
  if (isRootPage) {
    return (
      <HomeLayout {...homeOptions}>
        <div className="container max-w-6xl mx-auto px-4 py-8">
          <article className="prose prose-neutral dark:prose-invert max-w-none">
            <MDX components={getMDXComponents()} />
          </article>
        </div>
      </HomeLayout>
    );
  }

  // Determine which section we're in and get the appropriate page tree
  const firstSegment = slug[0];
  let pageTree = mainSource.pageTree;
  let navTitle = 'DeployStack Docs';
  
  if (firstSegment === 'development') {
    pageTree = developmentSource.pageTree;
    navTitle = 'Development Docs';
  } else if (firstSegment === 'self-hosted') {
    pageTree = selfHostedSource.pageTree;
    navTitle = 'Self-Hosted Docs';
  }

  return (
    <DocsLayout
      {...docsOptions}
      tree={pageTree}
      nav={{
        title: navTitle,
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
  // Simply use the unified source generateParams
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
