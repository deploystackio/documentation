import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import type { ReactNode } from 'react';
import { baseOptions } from '../layout.config';
import { source } from '../../lib/source';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout
      {...baseOptions}
      tree={source.pageTree}
      nav={{
        title: 'DeployStack Docs',
        url: '/docs',
      }}
      sidebar={{
        defaultOpenLevel: 1
      }}
    >
      {children}
    </DocsLayout>
  );
}
