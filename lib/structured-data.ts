import type { WithContext, WebSite, Organization, TechArticle, BreadcrumbList } from 'schema-dts';

// Base organization data for DeployStack
const DEPLOYSTACK_ORG: WithContext<Organization> = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'DeployStack',
  url: 'https://deploystack.io',
  logo: 'https://deploystack.io/logo-deploystack.png',
  description: 'The Complete MCP Management Platform',
  sameAs: [
    'https://github.com/deploystackio',
  ],
};

// Website schema for the documentation site
export function generateWebSiteSchema(): WithContext<WebSite> {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'DeployStack Documentation',
    description: 'Complete documentation for DeployStack - The MCP Management Platform',
    url: 'https://docs.deploystack.io',
    publisher: {
      '@type': 'Organization',
      name: 'DeployStack',
      url: 'https://deploystack.io',
    },
    inLanguage: 'en',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://docs.deploystack.io?search={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    } as any,
  };
}

// Organization schema
export function generateOrganizationSchema(): WithContext<Organization> {
  return DEPLOYSTACK_ORG;
}

// Generate breadcrumb schema from slug path
export function generateBreadcrumbSchema(slug: string[]): WithContext<BreadcrumbList> {
  const items = [
    {
      '@type': 'ListItem' as const,
      position: 1,
      name: 'Documentation',
      item: 'https://docs.deploystack.io/',
    },
  ];

  let currentPath = '';
  slug.forEach((segment, index) => {
    currentPath += `/${segment}`;
    items.push({
      '@type': 'ListItem' as const,
      position: index + 2,
      name: formatSegmentName(segment),
      item: `https://docs.deploystack.io${currentPath}`,
    });
  });

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items,
  };
}

// Generate technical article schema for documentation pages
export function generateTechArticleSchema({
  title,
  description,
  slug,
  url,
  dateModified,
  datePublished,
}: {
  title: string;
  description?: string;
  slug: string[];
  url: string;
  dateModified?: string;
  datePublished?: string;
}): WithContext<TechArticle> {
  const article: WithContext<TechArticle> = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: title,
    name: title,
    description: description || `DeployStack documentation: ${title}`,
    url,
    publisher: DEPLOYSTACK_ORG,
    author: {
      '@type': 'Organization',
      name: 'DeployStack Team',
      url: 'https://deploystack.io',
    },
    inLanguage: 'en',
    about: {
      '@type': 'Thing',
      name: 'MCP Management Platform',
      description: 'Model Context Protocol management and deployment tools',
    },
    audience: {
      '@type': 'Audience',
      audienceType: 'Developers',
    },
    genre: 'Technical Documentation',
    keywords: generateKeywords(slug, title),
  };

  // Add dates if available
  if (datePublished) {
    article.datePublished = datePublished;
  }
  if (dateModified) {
    article.dateModified = dateModified;
  }

  return article;
}

// Helper function to format segment names for breadcrumbs
function formatSegmentName(segment: string): string {
  return segment
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

// Generate relevant keywords based on slug and title
function generateKeywords(slug: string[], title: string): string {
  const baseKeywords = ['DeployStack', 'MCP', 'Model Context Protocol', 'Documentation'];
  
  // Add section-specific keywords
  if (slug.includes('development')) {
    baseKeywords.push('Development', 'API', 'SDK');
  }
  if (slug.includes('self-hosted')) {
    baseKeywords.push('Self-hosted', 'Installation', 'Setup');
  }
  if (slug.includes('backend')) {
    baseKeywords.push('Backend', 'Server', 'Database');
  }
  if (slug.includes('frontend')) {
    baseKeywords.push('Frontend', 'UI', 'React');
  }
  if (slug.includes('gateway')) {
    baseKeywords.push('Gateway', 'API Gateway', 'Proxy');
  }
  
  // Add words from title
  const titleWords = title.toLowerCase().split(/\s+/).filter(word => word.length > 3);
  baseKeywords.push(...titleWords);
  
  return baseKeywords.join(', ');
}

// Combine multiple schemas into a single JSON-LD script
export function combineSchemas(...schemas: WithContext<any>[]): string {
  if (schemas.length === 1) {
    return JSON.stringify(schemas[0], null, 2);
  }
  
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': schemas.map(schema => {
      const { '@context': _, ...rest } = schema;
      return rest;
    }),
  }, null, 2);
}
