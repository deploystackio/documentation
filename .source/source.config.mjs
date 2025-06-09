// source.config.ts
import { defineDocs } from "fumadocs-mdx/config";
var docs = defineDocs({
  // Directory of documents, relative to the project root.
  // We are using the existing 'docs' folder.
  dir: "docs"
});
export {
  docs
};
