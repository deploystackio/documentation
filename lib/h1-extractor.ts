/**
 * Utility to extract H1 heading from MDX content for use in page titles
 */

export interface H1ExtractionResult {
  h1Title: string | null;
  fallbackTitle: string;
}

/**
 * Extracts the first H1 heading from MDX content
 * Supports both markdown syntax (# Heading) and JSX syntax (<h1>Heading</h1>)
 */
export function extractH1FromMDX(content: string): string | null {
  if (!content) return null;

  // Remove frontmatter first
  const contentWithoutFrontmatter = content.replace(/^---[\s\S]*?---\n?/, '');

  // Pattern for markdown H1: # Heading
  const markdownH1Match = contentWithoutFrontmatter.match(/^#\s+(.+)$/m);
  if (markdownH1Match) {
    return markdownH1Match[1].trim();
  }

  // Pattern for JSX H1: <h1>Heading</h1> or <h1 ...>Heading</h1>
  const jsxH1Match = contentWithoutFrontmatter.match(/<h1[^>]*>([^<]+)<\/h1>/i);
  if (jsxH1Match) {
    return jsxH1Match[1].trim();
  }

  return null;
}

/**
 * Gets the best title for a page, preferring H1 over frontmatter title
 */
export function getBestPageTitle(
  mdxContent: string | undefined,
  frontmatterTitle: string | undefined
): H1ExtractionResult {
  const h1Title = mdxContent ? extractH1FromMDX(mdxContent) : null;
  const fallbackTitle = frontmatterTitle || 'Untitled';

  return {
    h1Title,
    fallbackTitle,
  };
}

/**
 * Gets the final title to use, with H1 taking precedence
 */
export function getFinalPageTitle(
  mdxContent: string | undefined,
  frontmatterTitle: string | undefined
): string {
  const { h1Title, fallbackTitle } = getBestPageTitle(mdxContent, frontmatterTitle);
  return h1Title || fallbackTitle;
}
