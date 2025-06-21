import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';

export const baseOptions: BaseLayoutProps = {
  // Navigation bar configuration
  nav: {
    title: 'DeployStack Docs',
    url: '/',
  },

  // Navigation links
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
      text: 'Login',
      url: 'https://cloud.deploystack.io/login',
      external: true,
    },
  ],

  // GitHub repository for edit links
  githubUrl: 'https://github.com/deploystackio/documentation',
};
