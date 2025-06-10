import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';

export const baseOptions: BaseLayoutProps = {
  // Navigation bar configuration (now handled by CustomNavbar)
  nav: {
    title: 'DeployStack Docs',
    url: '/docs',
  },

  // GitHub repository for edit links
  githubUrl: 'https://github.com/deploystackio/documentation',
};
