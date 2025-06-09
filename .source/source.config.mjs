// source.config.ts
import { defineDocs, frontmatterSchema } from "fumadocs-mdx/config";
import { z } from "zod";
var docs = defineDocs({
  // Directory of documents, relative to the project root.
  // We are using the existing 'docs' folder.
  dir: "docs",
  docs: {
    schema: frontmatterSchema.extend({
      sidebar: z.string().optional()
    })
  }
});
export {
  docs
};
