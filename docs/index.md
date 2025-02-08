---
description: Welcome to DeployStack documentation. Learn how to automate Docker Compose deployments across cloud providers with Infrastructure as Code templates and one-click deployments.
---

# DeployStack Documentation

DeployStack converts your **Docker configurations** into **Infrastructure as Code** (IaC) templates for multiple cloud providers. Whether you have a docker-compose.yml file or docker run commands, it generates the necessary AWS CloudFormation, Render.com Blueprint, or DigitalOcean specifications for example. This lets you and your users deploy the same application consistently across different cloud platforms using their native deployment mechanisms, **without needing to manually create** each provider's infrastructure.

## Get Started

DeployStack simplifies cloud deployment through three key steps: configure your Docker setup, translate docker compose or run command to IaC templates, and enable one-click deployment for your users. Start by understanding the core concepts and how to integrate DeployStack with your repository.

### Core Concepts

::: card-grid{columns=3}
!card-icon[CloudUpload]{title="Quickstart" link="/docs/deploystack/getting-started"}
Start with our Getting Started Guide to understand the basics of DeployStack.
!card-icon[Terminal]{title="One-Click Deploy" link="/docs/deploystack/one-click-deploy"}
Learn how to enable One-Click Deploy buttons for your repository.
!card-icon[FileText]{title="Configuration" link="/docs/deploystack/deploystack-configuration-directory"}
Configuration file placed to your repository, telling Zerops how to build and start your app.
:::

### Supported Cloud Providers

DeployStack generates infrastructure templates for major cloud providers, each optimized for their specific deployment patterns. AWS CloudFormation templates use Fargate for containerized workloads, DigitalOcean leverages App Platform, and Render.com implements Blueprints for smooth deployment. While translating your docker command to Infrastructure as Code by using [docker-to-iac](/docs/docker-to-iac/index.md) module, you can choose your target provider.

::: card-grid{columns=4}
!card-image[AWS]{title="AWS" link="/docs/docker-to-iac/parser/aws-cloudformation" src="/img/deploy/aws.svg" width=47 height=28}
!card-image[DigitalOcean]{title="DigitalOcean" link="/docs/docker-to-iac/parser/digitalocean" src="/img/deploy/digitalocean.svg" width=56 height=28}
!card-image[Render.com]{title="Render.com" link="/docs/docker-to-iac/parser/render.com" src="/img/deploy/render.svg" width=130 height=28}
:::

### DeployStack Ecosystem

DeployStack consists of several integrated components that work together to enable consistent Docker to cloud deployment. Each repository serves a specific purpose in the ecosystem:

::: card-grid{columns=3}
!card-icon[Container]{title="docker-to-iac" link="https://github.com/deploystackio/docker-to-iac" target="_blank"}
The core Node.js module that handles Docker configuration translation to Infrastructure as Code templates
!card-icon[BookOpenText]{title="documentation" link="https://github.com/deploystackio/documentation" target="_blank"}
Central repository for all DeployStack documentation and guides
!card-icon[FileText]{title="deploy-templates" link="https://github.com/deploystackio/deploy-templates" target="_blank"}
Houses all generated Infrastructure as Code templates for supported repositories
!card-icon[MessageCircleHeart]{title="feedback" link="https://github.com/deploystackio/feedback" target="_blank"}
Public repository for feature requests, bug reports, and roadmap discussions
:::

## Contributing to DeployStack docker-to-iac module

DeployStack is open source and we welcome contributions. Here's how you can help:

- Add support for new cloud providers
- Improve existing Infrastructure as Code templates
- Enhance documentation
- Report issues and suggest improvements

Visit our [GitHub repository](https://github.com/deploystackio/docker-to-iac) to get started.

## Community and Support

- Join our [Discord community](https://discord.gg/UjFWwByB)
- Check our [troubleshooting guide](/docs/deploystack/troubleshooting.md)
