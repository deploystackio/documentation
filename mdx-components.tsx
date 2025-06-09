import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { ComponentType } from 'react';

type MDXComponents = {
  [key: string]: ComponentType<any>;
};

// You can add your own global components here
const customComponents: MDXComponents = {
  // Example:
  // MyCustomComponent: () => <p>Hello from custom component!</p>,
};

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    ...customComponents,
    ...components,
  };
}
