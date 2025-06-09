import defaultComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';

// You can add your own global components here
const customComponents: MDXComponents = {
  // Example:
  // MyCustomComponent: () => <p>Hello from custom component!</p>,
};

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultComponents,
    ...customComponents,
    ...components,
  };
}
