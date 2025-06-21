import type { Metadata } from 'next';

export interface PageSEOData {
  title: string;
  description: string;
  slug: string;
  url: string;
}

export function getSchemaOrgData(pageData: PageSEOData) {
  const { title, description, url } = pageData;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@id": "https://deploystack.io/#identity",
        "@type": "Organization",
        "name": "DeployStack.io",
        "url": "https://deploystack.io",
        "sameAs": [
          "https://x.com/deploystack"
        ]
      },
      {
        "@id": "https://deploystack.io/#website",
        "@type": "WebSite",
        "inLanguage": "en",
        "name": "DeployStack Documentation",
        "url": "https://deploystack.io/",
        "publisher": {
          "@id": "https://deploystack.io/#identity"
        },
        "workTranslation": []
      },
      {
        "@id": `${url}/#webpage`,
        "description": description || "DeployStack Documentation and API Reference",
        "name": title,
        "url": url,
        "@type": [
          "WebPage"
        ],
        "about": {
          "@id": "https://deploystack.io/#identity"
        },
        "isPartOf": {
          "@id": "https://deploystack.io/docs/#website"
        },
        "potentialAction": [
          {
            "@type": "ReadAction",
            "target": [
              url
            ]
          }
        ],
        "primaryImageOfPage": {
          "@id": url
        }
      },
      {
        "@id": `${url}/#article`,
        "description": description || "DeployStack Documentation and API Reference",
        "headline": title,
        "inLanguage": "en",
        "@type": [
          "Article",
          "BlogPosting"
        ],
        "isPartOf": {
          "@id": `${url}/#webpage`
        },
        "mainEntityOfPage": {
          "@id": `${url}/#webpage`
        },
        "publisher": {
          "@id": "https://deploystack.io/#identity"
        }
      },
      {
        "@id": url,
        "@type": "ImageObject",
        "caption": "DeployStack.io",
        "contentUrl": "https://cdnx.deploystack.io/logo/deploystack-logo.png",
        "inLanguage": "en",
        "url": "https://cdnx.deploystack.io/logo/deploystack-logo.png"
      }
    ]
  };
}

export function generatePageMetadata(pageData: PageSEOData): Metadata {
  const { title, description, url } = pageData;
  
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      type: 'article',
      siteName: 'DeployStack Documentation',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      site: '@deploystack',
    },
    alternates: {
      canonical: url,
    },
    other: {
      'application/ld+json': JSON.stringify(getSchemaOrgData(pageData)),
    },
  };
}

export function getCanonicalUrl(slug: string): string {
  const baseUrl = 'https://docs.deploystack.io';
  
  if (slug === '' || slug === '/') {
    return baseUrl;
  }
  
  // Remove leading slash if present and ensure clean URL
  const cleanSlug = slug.startsWith('/') ? slug.slice(1) : slug;
  return `${baseUrl}/${cleanSlug}`;
}
