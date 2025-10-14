# DeployStack Documentation

This repository contains the official documentation for [DeployStack](https://docs.deploystack.io/) - The First MCP-as-a-Service Platform. Built with [Mintlify](https://mintlify.com), our documentation provides a modern, searchable experience for developers building with DeployStack's satellite infrastructure.

Visit [docs.deploystack.io](https://docs.deploystack.io) to explore the live documentation.

## Technology Stack

- **Documentation Platform**: Mintlify
- **Content**: MDX (Markdown + React components)
- **Deployment**: Automatic deployment via Mintlify platform

## Project Structure

```text
.
├── general/               # Getting started and core concepts
│   ├── architecture.mdx   # System architecture overview
│   ├── teams.mdx          # Team management
│   ├── roles.mdx          # Role-based access control
│   └── mcp-*.mdx          # MCP server guides
├── self-hosted/           # Self-hosting guides
│   ├── quick-start.mdx    # Quick start guide
│   ├── setup.mdx          # Installation instructions
│   └── docker-compose.mdx # Docker deployment
├── development/           # Development documentation
│   ├── frontend/          # Frontend development guides
│   │   ├── index.mdx      # Frontend overview
│   │   ├── ui/            # UI system documentation
│   │   └── ...
│   ├── backend/           # Backend development guides
│   │   ├── index.mdx      # Backend overview
│   │   ├── api/           # API documentation
│   │   ├── database/      # Database guides
│   │   └── ...
│   └── satellite/         # Satellite development guides
│       ├── index.mdx      # Satellite overview
│       ├── architecture.mdx
│       └── ...
├── assets/                # Images and static assets
│   └── images/
│       ├── logo/          # Logo files
│       └── ...
├── docs.json              # Mintlify configuration
├── index.mdx              # Documentation home page
└── README.md              # This file
```

## Local Development

Mintlify provides a local development CLI for previewing documentation changes:

```bash
# Install Mintlify CLI globally (one-time setup)
npm install -g mintlify

# Start local development server
mintlify dev

# The documentation will be available at http://localhost:3000
```

The local server provides:
- Hot reloading for instant content updates
- Navigation preview
- Component rendering
- Dark/light mode testing

## Writing Documentation

### Content Format

All documentation is written in **MDX** (Markdown with JSX components):

```mdx
---
title: Your Page Title
description: A brief description of the page content
---

# Your Page Title

Write your content here using standard Markdown syntax.

<Info>
Use Mintlify components for callouts and special content blocks.
</Info>

## Section Header

More content here...
```

### Mintlify Components

Mintlify provides built-in components for enhanced documentation:

**Callouts:**
```mdx
<Note>General information</Note>
<Info>Important information</Info>
<Tip>Helpful tips</Tip>
<Warning>Important warnings</Warning>
<Check>Success status</Check>
<Danger>Critical warnings</Danger>
```

**Code Groups:**
```mdx
<CodeGroup>
```bash macOS/Linux
npm install
```

```powershell Windows
npm install
```
</CodeGroup>
```

**Cards:**
```mdx
<CardGroup cols={2}>
  <Card title="Getting Started" icon="rocket" href="/general/quick-start">
    Begin your DeployStack journey
  </Card>
  <Card title="API Reference" icon="code" href="/development/backend/api">
    Explore the API documentation
  </Card>
</CardGroup>
```

**Steps:**
```mdx
<Steps>
  <Step title="Install Dependencies">
    Run `npm install` to install required packages
  </Step>
  <Step title="Configure Environment">
    Set up your environment variables
  </Step>
  <Step title="Start Development">
    Run `npm run dev` to start the development server
  </Step>
</Steps>
```

### Navigation Configuration

Navigation is controlled via `docs.json`:

- **Tabs**: Top-level navigation sections (General, Self Hosted, Frontend Development, etc.)
- **Groups**: Subsections within each tab
- **Pages**: Individual documentation pages

To add a new page:
1. Create the `.mdx` file in the appropriate directory
2. Add the page path to `docs.json` under the relevant group
3. Test locally with `mintlify dev`

### Content Guidelines

**File Naming:**
- Use kebab-case: `my-new-page.mdx`
- Index files represent the directory: `index.mdx`

**Links:**
- Use absolute paths from documentation root: `/development/backend/api/index`
- Mintlify automatically handles `.mdx` extensions

**Images:**
- Store in `assets/images/` with logical subdirectories
- Reference with absolute paths: `/assets/images/logo/dark.webp`
- Optimize images before committing (compress file sizes)

**Frontmatter:**
```yaml
---
title: Page Title (required)
description: Page description for SEO (required)
---
```

## Asset Management

### Images and Diagrams

1. **Diagrams**: Create with [draw.io](https://app.diagrams.net/)
2. **Export Format**: PNG or WebP
3. **Optimization**: Compress images before committing
4. **Location**: Store in `assets/images/` with appropriate subdirectories

## Contributing Guidelines

### Workflow

1. **Fork or Branch**: Create a feature branch from `main`
2. **Write Content**: Add or update documentation in MDX format
3. **Test Locally**: Run `mintlify dev` to preview changes
4. **Submit PR**: Create a pull request to `main` branch
5. **Review**: Wait for review and address feedback
6. **Merge**: Changes are automatically deployed after merge

### Pull Request Guidelines

- Write clear commit messages
- Test all links and navigation
- Verify code examples are correct
- Check for spelling and grammar
- Ensure images load correctly
- Preview on mobile and desktop layouts

### Documentation Standards

**Writing Style:**
- Write in clear, concise language
- Use active voice
- Address the reader directly ("you")
- Avoid jargon without explanation
- Include code examples where helpful

**Code Examples:**
- Include complete, working examples
- Add comments for clarity
- Show expected output when relevant
- Test all code before committing

**Structure:**
- Start with overview/introduction
- Progress from basic to advanced
- Use descriptive section headers
- Include related documentation links at the end

## Deployment

### Automatic Deployment

Mintlify automatically deploys documentation when changes are merged to `main`:

- **Trigger**: Push or merge to `main` branch
- **Build**: Mintlify builds the documentation
- **Deploy**: Changes go live at docs.deploystack.io
- **CDN**: Content served via Mintlify's global CDN

### Branch Strategy

- **`main`**: Production branch that deploys to docs.deploystack.io
- **Feature Branches**: Create from `main` for new content or updates
- **Pull Requests**: All changes must go through PR review

## Need Help?

- 📚 **Documentation**: [docs.deploystack.io](https://docs.deploystack.io)
- 💬 **Discord**: [Join our community](https://discord.gg/42Ce3S7b3b)
- 🐛 **Issues**: [GitHub Issues](https://github.com/deploystackio/documentation/issues)
- 🌐 **Website**: [deploystack.io](https://deploystack.io)
- 🚀 **Dashboard**: [cloud.deploystack.io](https://cloud.deploystack.io)

## Links

- [Mintlify Documentation](https://mintlify.com/docs)
- [MDX Documentation](https://mdxjs.com/)
- [DeployStack Main Repository](https://github.com/deploystackio/deploystack)
- [DeployStack Changelog](https://deploystack.io/changelog)
