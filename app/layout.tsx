import { RootProvider } from 'fumadocs-ui/provider';
import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import { generateWebSiteSchema, generateOrganizationSchema, combineSchemas } from '@/lib/structured-data';
import './global.css'; // Import global styles

export const metadata: Metadata = {
  title: {
    template: '%s | DeployStack Docs',
    default: 'DeployStack Docs',
  },
  description: 'DeployStack Full Documentation and API',
  metadataBase: new URL('https://deploystack.io'),
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en',
    siteName: 'DeployStack Documentation',
  },
  twitter: {
    site: '@deploystack',
  },
};

export default function Layout({ children }: { children: ReactNode }) {
  // Generate site-wide structured data
  const websiteSchema = generateWebSiteSchema();
  const organizationSchema = generateOrganizationSchema();
  const structuredData = combineSchemas(websiteSchema, organizationSchema);

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: structuredData }}
        />
      </head>
      <body
        // Using Tailwind CSS classes for basic layout styling
        // Ensure these are compatible with Fumadocs/your design
        // The Fumadocs example uses inline styles, but Tailwind is also fine.
        className="flex flex-col min-h-screen"
      >
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
