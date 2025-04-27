---
description: Technical docs for DeployStack's one-click deployment feature. Covers infrastructure template generation, cloud provider integration, and button configuration.
---

# One-Click Deploy

DeployStack leverages existing deployment technologies from cloud providers to make application deployment as straightforward as possible.

## How One-Click Deploy Works

When you submit your repository to [deploystack.io/submit](https://deploystack.io/submit), we:

1. Generate Infrastructure as Code (IaC) templates for [supported cloud providers](/docs/docker-to-iac/index.md)
2. Store these templates in our [deploy-templates repository](https://github.com/deploystackio/deploy-templates)
3. Create provider-specific deployment buttons for your README.md -> by [deploystack.io/deploy-button](https://deploystack.io/deploy-button)

## Template Generation and Storage

### Repository Structure

All generated templates are stored in the [deploystackio/deploy-templates](https://github.com/deploystackio/deploy-templates) repository using this organization:

- Each project gets its own subfolder and branch
- Naming convention: `<github_org_name|github_user_name>-<repo_name>` (lowercase)
- Example: `microsoft-vscode` for Microsoft's VS Code repository

### Branch Strategy

We create a dedicated branch for each project to support one-click deployment functionality:

- Branch name matches the subfolder name
- Contains all necessary IaC templates and configurations
- Enables direct integration with cloud provider deployment systems

## Cloud Provider Integration

### Current Providers

We integrate with cloud providers' native deployment systems. For example:

- **DigitalOcean**: Uses the "Deploy to DigitalOcean" functionality as documented in their [official guide](https://docs.digitalocean.com/products/app-platform/how-to/add-deploy-do-button/)
- **Kubernetes**: Generates Helm charts that can be deployed to any Kubernetes cluster
- Check [supported cloud providers](/docs/docker-to-iac/index.md) for full list

### Provider-Specific Templates

Each cloud provider may require specific template formats:

- AWS CloudFormation templates
- DigitalOcean App Spec
- Render Blueprints
- And more based on provider requirements
- Kubernetes Helm charts with all necessary templates

## Using Deploy Buttons

After template generation, you'll receive HTML/Markdown code for deployment buttons by visitig the [deploystack.io/deploy-button](https://deploystack.io/deploy-button) page.

There are two options you can chose from. The main difference is the deploy url. For the mode "Deploy via DeployStack" the deploy address points to the deploystack.io/deploy endpoint, where HTTP status code 302 redirects to the cloud provider one-click deploy endpoint.

In the example below with render:

```markdown
1. -> https://deploystack.io/deploy/microsoft-vscode?provider=rnd&language=rnd
2. -> HTTP 302 REDIRECT
3. -> https://render.com/deploy?repo=https://github.com/deploystackio/deploy-templates/tree/microsoft-vscode
```

### Deploy via DeployStack

Link via deploystack deploy endpoint.

- auto update on One-Click deploy links: if the provider's deploy url changes, we will update.
- future cloud provider support out of the box: The endpoint makes it easier for us to integrate with additional providers, which benefits your users.
- deploy statistics for your app: We collect anonymized statistics to show the number of deployments your application has had, similar to npm download statistics.

#### Example Markdown Deploy via DeployStack

- static deploy links: if the cloud provider changes the one-click deploy url, the functionality will also be broken. You have to update your `README.md` manually.
- no statistics collection possible: you will never know how many people use your project :)

```markdown [README.md]
## ⚡ One-Click Deploy

| Cloud Provider | Deploy Button |
|---------------|---------------|
| Render | <a href="https://deploystack.io/deploy/microsoft-vscode?provider=rnd&language=rnd"><img src="https://github.com/htdio-stg/deploy-templates/blob/main/.assets/img/rnd.svg" height="38"></a> |
```

### Deploy Standalone

Direct link to Cloud Provider to enable One-Click depoy.

#### Example Markdown Deploy Standalone

```markdown [README.md]
## ⚡ One-Click Deploy

| Cloud Provider | Deploy Button |
|---------------|---------------|
| Render | <a href="https://render.com/deploy?repo=https://github.com/deploystackio/deploy-templates/tree/microsoft-vscode"><img src="https://github.com/deploystackio/deploy-templates/blob/main/.assets/img/rnd.svg" height="38"></a> |
```

## License and Usage

All generated templates are available under the MIT License:

- Full license text available in the [deploy-templates repository](https://github.com/deploystackio/deploy-templates/blob/main/LICENSE)
- Free to use, modify, and distribute
- No warranty provided

## Extending Provider Support

Want to add support for another cloud provider? You can:

1. Contribute to the [docker-to-iac module](https://github.com/deploystackio/docker-to-iac)
2. Add a new provider parser
3. Implement the necessary template generation logic

Benefits of contributing:

- All existing projects in our catalog automatically get templates for the new provider
- The open-source community benefits from broader deployment options
- Your provider becomes part of the one-click deployment ecosystem

## Technical Implementation Details

The one-click deployment process:

1. User clicks deploy button
2. Cloud provider loads template from our repository's specific branch
3. Provider's deployment system processes the template
4. Application gets deployed according to specifications

## Validation and Security

For each deployment:

- Templates are version controlled
- Source code is publicly accessible
- Infrastructure specifications are transparent
- No sensitive data is stored in templates

## Future Enhancements

We're continuously working to:

- Add more cloud providers
- Improve template generation
- Enhance deployment options
- Support more complex configurations

## Next Steps

- Visit our [Discord community](https://discord.gg/UjFWwByB) for help
- Consider [contributing](https://github.com/deploystackio/docker-to-iac) to add more providers
