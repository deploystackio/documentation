import { docs } from '../.source';
import { loader } from 'fumadocs-core/source';
import { icons } from 'lucide-react';
import { createElement } from 'react';
import { DeployStackLogo } from './components/DeployStackLogo';
import { createMDXSource } from 'fumadocs-mdx';
import type { PageTree } from 'fumadocs-core/server';

// Helper function for icon handling
function createIconHandler() {
  return (icon?: string) => {
    if (!icon) return;
    
    if (icon === 'DeployStackLogo') {
      return createElement(DeployStackLogo);
    }
    
    if (icon in icons) {
      return createElement(icons[icon as keyof typeof icons]);
    }
    
    return undefined;
  };
}

// Filter docs into separate sections
type Doc = (typeof docs.docs)[number];
const allDocs = docs.docs.map((doc: Doc) => ({
  ...doc,
  title: doc.sidebar ?? doc.title,
}));
const allMeta = docs.meta;

// Main docs (include all files for complete control via meta.json)
const mainDocs = allDocs; // Include everything

const mainMeta = allMeta; // Include everything

// Development docs are now included in mainSource

// Self-hosted docs are now included in mainSource

// Create main source with all content
export const mainSource = loader({
  baseUrl: '/',
  source: createMDXSource(mainDocs, mainMeta),
  icon: createIconHandler(),
});

// developmentSource removed - development content is now in mainSource

// selfHostedSource removed - self-hosted content is now in mainSource

// Unified source for backward compatibility and dynamic usage
export const source = {
  getPage(slug?: string[], locale?: string) {
    return mainSource.getPage(slug, locale);
  },
  
  getPages(locale?: string) {
    return mainSource.getPages(locale);
  },
  
  generateParams() {
    return mainSource.generateParams();
  },
  
  // Get appropriate page tree based on current path
  getPageTree(path?: string) {
    return mainSource.pageTree;
  },
  
  // Return the main page tree directly
  get pageTree() {
    return mainSource.pageTree;
  },
};
