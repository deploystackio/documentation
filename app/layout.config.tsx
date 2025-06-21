import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';

// Base configuration shared between both layouts
const baseConfig = {
  nav: {
    title: 'DeployStack Docs',
    url: '/',
  },
  githubUrl: 'https://github.com/deploystackio/documentation',
};

// Configuration for the home page (root URL) with all links visible
export const homeOptions: BaseLayoutProps = {
  ...baseConfig,
  links: [
    {
      text: 'MCP Server',
      url: 'https://deploystack.io/mcp',
      external: true,
    },
    {
      text: 'Changelog',
      url: 'https://deploystack.io/changelog',
      external: true,
    },
    {
      type: 'custom',
      secondary: true,
      children: (
        <a
          href="https://cloud.deploystack.io/login"
          target="_blank"
          rel="noopener noreferrer"
          className="text-slate-100 bg-slate-800 border border-slate-700 ml-1.5 focus:outline-none hover:bg-slate-900 hover:text-slate-50 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2 me-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 transition-colors"
        >
          Login
        </a>
      ),
    },
  ],
};

export const docsOptions: BaseLayoutProps = {
  ...baseConfig
};

export const baseOptions = docsOptions;
