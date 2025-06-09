import { defineDocs, defineConfig, frontmatterSchema } from 'fumadocs-mdx/config';
import { z } from 'zod';

export const docs = defineDocs({
  // Directory of documents, relative to the project root.
  // We are using the existing 'docs' folder.
  dir: 'docs',
  docs: {
    schema: frontmatterSchema.extend({
      sidebar: z.string().optional(),
    }),
  },
});

export default defineConfig({
  mdxOptions: {
    rehypeCodeOptions: {
      themes: {
        light: 'github-light',
        dark: 'github-dark',
      },
    },
  },
});
