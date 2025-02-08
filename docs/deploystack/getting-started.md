---
description: Start deploying Docker applications across cloud providers with DeployStack. Step-by-step guide to generating infrastructure templates from Docker configurations.
---

# Getting Started with DeployStack

DeployStack offers two distinct paths to transform your Docker projects into cloud-ready deployments: a Quick Start path for immediate results, and our Recommended path for enhanced control and automation. Let's explore both approaches in detail.

## Understanding the Two Paths

### 🚀 Quick Start Path

The Quick Start path is designed for developers who want to immediately make their Docker projects deployable, with minimal setup required. This approach works with your existing repository structure.

### Recommended Path

The Recommended path provides additional features through a `.deploystack` configuration directory and GitHub app integration. This approach enables automatic updates, environment variable management, and project customization.

## Quick Start Path: Detailed Guide

### For Docker Compose Projects

#### Requirements

- A public GitHub repository
- A `docker-compose.yml` or `docker-compose.yaml` file in your repository's root directory
- Container images must be:
  - Pre-built and available in supported registries
  - Publicly accessible
  - Referenced using the `image` directive

#### Step-by-Step Process

1. **Repository Preparation**
   - Ensure your `docker-compose.yml` is in the root directory
   - Verify all images are publicly accessible
   - Check that your compose file uses supported configuration options

2. **Submission**
   - Visit [deploystack.io/submit](https://deploystack.io/submit)
   - Enter your GitHub repository URL
   - Our system automatically detects your compose file
   - Review the detected configuration

3. **Template Generation**
   - Infrastructure templates are generated for each supported cloud provider
   - Templates are stored in our public repository
   - You receive deployment button code for your README.md

### For Docker Run Commands

#### Requirements

- A public GitHub repository
- A valid Docker run command that includes:
  - Image name and tag
  - Port mappings (if required)
  - Environment variables (if needed)
  - Volume mounts (if necessary)

#### Step-by-Step Process

1. **Command Preparation**
   - Ensure your Docker run command is complete and valid
   - Verify all referenced images are publicly available
   - Test the command locally if possible

2. **Submission**
   - Visit [deploystack.io/submit](https://deploystack.io/submit)
   - Enter your GitHub repository URL
   - Paste your Docker run command
   - Review the parsed configuration

3. **Template Generation**
   - Infrastructure templates are generated automatically
   - Templates are optimized for each cloud provider
   - You receive deployment button code

## Recommended Path: Comprehensive Setup

### The `.deploystack` Directory Structure

Create a `.deploystack` directory in your repository with these components:

```bash
.deploystack/
├── docker-compose.yml  # Your Docker Compose configuration
├── docker-run.txt      # Or your Docker run command
├── env                 # Environment variables (optional)
└── logo.webp           # Your project logo (optional)
```

#### Component Details

**Docker Configuration Files**:

- `docker-compose.yml`: Your complete Docker Compose configuration
- `docker-run.txt`: Alternative to compose file, contains your Docker run command
- Only one of these files should be present

For more configuration options please check our [.deploystack Directory Reference](/docs/deploystack/deploystack-configuration-directory.md).

### GitHub App Integration

The [DeployStack Repository Sync](https://github.com/apps/deploystack-repository-sync) app enables:

1. **Automatic Updates**
   - Monitors changes to your Docker configurations
   - Updates templates when configurations change
   - Ensures templates stay in sync with your project

2. **Installation Steps**
   - Visit the GitHub app installation page
   - Select your repositories
   - Configure access permissions
   - Verify installation

3. **Monitoring and Updates**
   - Changes to `.deploystack` directory trigger updates
   - Only default branch changes are processed
   - Templates are automatically regenerated

## Behind the Scenes: How It Works

### The docker-to-iac Module

Our open-source [docker-to-iac](https://github.com/deploystackio/docker-to-iac) module:

- Parses your Docker configurations
- Handles multiple cloud provider translations
- Supports various infrastructure patterns
- Maintains provider-specific optimizations

### Template Generation Process

1. **Configuration Analysis**
   - Docker configurations are parsed
   - Dependencies are identified

2. **Provider-Specific Translation**
   - Templates generated for each provider
   - Provider best practices applied
   - Resource mappings optimized

3. **Template Storage**
   - Templates stored in [deploy-templates](https://github.com/deploystackio/deploy-templates)
   - Version controlled for tracking
   - Publicly accessible

### Deployment Button Integration

After template generation:

1. Visit [deploystack.io/deploy-button](https://deploystack.io/deploy-button)
2. Select your preferred button style
3. Copy the generated code
4. Add to your README.md

## Best Practices

### Repository Organization

- Keep Docker configurations clean and well-documented
- Use specific version tags for images
- Document environment variable requirements
- Include clear deployment instructions

### Configuration Management

- Use the `.deploystack` directory for better organization
- Keep environment variables separate
- Test configurations locally

### Deployment Strategy

- Start with the Quick Start path if needed
- Migrate to Recommended path for better control
- Use GitHub app for automatic updates

## Troubleshooting Common Issues

### Template Generation

- Verify image accessibility
- Check Docker configuration syntax
- Ensure all required ports are exposed
- Validate environment variables

## Need Additional Help?

- Review our detailed [Troubleshooting Guide](/docs/deploystack/troubleshooting.md)
- Join our active [Discord Community](https://discord.gg/UjFWwByB)
- Submit issues on GitHub to our [Feedback repository](https://github.com/deploystackio/feedback)
