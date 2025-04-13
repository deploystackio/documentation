# DeployStack Documentation

This repository contains the official documentation for the DeployStack ecosystem. Visit [deploystack.io](https://deploystack.io) to learn more about our platform.

## Project Structure

Key directories in this repository:

```text
.
├── docs/
│   ├── assets/
│   │   └── images/
│   ├── deploystack/
│   ├── docker-to-iac/
│   └── sidebar-links.json
└── markdown-rules/
```

## Contributing Guidelines

### Documentation Standards

1. Store all documentation files in the `./docs` directory
2. Place images in `./docs/assets/images`
3. Use absolute links for all references:
   - Documentation: `/docs/docker-to-iac/index.md`
   - Images: `/docs/assets/images/example.png`

### Adding New Content

When creating new documentation:

1. Add new pages to the appropriate subdirectory in `./docs`
2. Follow the established file naming conventions
3. Ensure all links are absolute paths
4. Include necessary sidebar entries in `sidebar-links.json`

### Asset Management

For diagrams and architectural images (optional):

1. Use [draw.io](https://app.diagrams.net/) for creating diagrams
2. Export as PNG with included diagram data for future editing
3. Place files in the appropriate subdirectory under `./docs/assets/images`

If you want to upload images, please minify them.

## Deployment Process

Our deployment process uses two main branches:

- `main`: Development branch
- `prod`: Production branch

### Workflow

1. Create feature branches from `main`
2. Submit pull requests to `main`
3. After approval and merge to `main`, changes are automatically validated
4. Merge to `prod` to deploy to [deploystack.io/docs](https://deploystack.io/docs)

### Continuous Integration

The CI pipeline includes:

- Markdown linting
- Link validation
- Automatic versioning using semantic release
- Production deployment triggers

## Development Setup

```bash
# Install dependencies
npm ci

# Run markdown linting
npm run lint:md

# Check for dead links
npm run lint:links
```

## Release Process

Releases are managed automatically through our CI/CD pipeline. When merging to the production branch:

1. Changes are validated
2. Documentation is built
3. Content is deployed to [deploystack.io/docs](https://deploystack.io/docs)

## 💬 Need Help?

- 📚 Check our [Documentation](https://deploystack.io/docs)
- 🎯 Report issues on [GitHub](https://github.com/deploystackio/documentation/issues)
- 📧 Use Discord to chat with us at [https://discord.gg/UjFWwByB](https://discord.gg/UjFWwByB)
