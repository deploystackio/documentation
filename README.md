# DeployStack Documentation

This repository contains the official documentation site for the [DeployStack](https://deploystack.io/docs/) ecosystem, built with [fumadocs](https://fumadocs.vercel.app/). Visit [deploystack.io](https://deploystack.io) to learn more about our platform.

## Technology Stack

- **Framework**: Next.js 15 with App Router
- **Documentation**: Fumadocs for modern docs experience
- **Content**: MDX (Markdown + React components)
- **Styling**: Tailwind CSS
- **Language**: TypeScript

## Project Structure

```text
.
├── docs/                  # Documentation content (MDX files)
│   ├── deploystack/       # DeployStack documentation
│   ├── docker-to-iac/     # Docker-to-IaC documentation
│   └── assets/            # Images and static assets
├── app/                   # Next.js app directory (fumadocs framework)
├── lib/                   # Documentation utilities & components
└── source.config.ts       # Fumadocs configuration
```

**Note**: The `app/` directory contains the fumadocs framework setup and should not be modified for content changes. All documentation content goes in the `docs/` directory.

## Development Setup

```bash
# Install dependencies
npm ci

# Start documentation development server (http://localhost:3000)
npm run dev

# Build documentation site for production
npm run build

# Start production server
npm run start

# Validate documentation quality
npm run lint:md      # Markdown linting
npm run lint:links   # Link validation
```

## Contributing Guidelines

### Writing Documentation

1. **Content Format**: Write all documentation in MDX format (`.mdx` files)
2. **Location**: Store all content in the `docs/` directory
3. **Navigation**: Use `meta.json` files in each directory to control navigation structure
4. **Assets**: Place images in `docs/assets/images/` with appropriate subdirectories
5. **Links**: Use absolute paths for all references:
   - Documentation: `/docs/docker-to-iac/`
   - Images: `/docs/assets/images/example.png`

### Navigation Structure

Fumadocs automatically generates navigation from your file structure and `meta.json` files:

- Each directory can have a `meta.json` file to configure its appearance in navigation
- File-based routing: `docs/deploystack/index.mdx` becomes `/docs/deploystack`
- Nested directories create hierarchical navigation

### Adding New Content

1. Create new `.mdx` files in the appropriate `docs/` subdirectory
2. Add or update `meta.json` files to control navigation
3. Follow established naming conventions
4. Ensure all links use absolute paths
5. Test locally with `npm run dev`

### Asset Management

For diagrams and images:

1. Use [drow.io](https://app.diagrams.net/) for creating diagrams
2. Export as PNG or WebP format
3. Optimize images for web (compress file sizes)
4. Place files in appropriate subdirectories under `docs/assets/images/`

## Deployment Process

Our deployment uses a two-branch workflow:

- **`main`**: Development branch for content updates and testing
- **`prod`**: Production branch that deploys to [deploystack.io/docs](https://deploystack.io/docs)

### Workflow

1. Create feature branches from `main`
2. Submit pull requests to `main`
3. After approval and merge to `main`, changes are automatically validated
4. Merge to `prod` to deploy to production

### Continuous Integration

The CI pipeline includes:

- Markdown linting and validation
- Link checking to prevent broken links
- Automatic fumadocs build verification
- Production deployment triggers

## Local Development

When running `npm run dev`, the documentation site will be available at `http://localhost:3000`. The fumadocs framework provides:

- Hot reloading for content changes
- Automatic navigation generation
- Built-in search functionality
- Responsive design
- Dark/light mode support

## 💬 Need Help?

- 📚 Check our [Documentation](https://deploystack.io/docs)
- 🎯 Report issues on [GitHub](https://github.com/deploystackio/documentation/issues)
- 📧 Join our Discord at [https://discord.gg/UjFWwByB](https://discord.gg/UjFWwByB)
