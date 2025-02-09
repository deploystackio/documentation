---
description: Contribute to DeployStack by adding cloud providers that support Docker runtime and infrastructure as code. Your work benefits the entire open-source community.
menuTitle: Before you Start contributing
---

# Before you start contributing to docker-to-iac module

Thank you for your interest in extending the module. Please remember that [docker-to-iac](https://github.com/deploystackio/docker-to-iac) open-source module is the heart of the DeployStack platform.

## Adding a new cloud provider

This means: if your pull request will get approved, all existing applications in our catalog [https://deploystack.io/c/](https://deploystack.io/c) will be expanded to include another cloud provider that you want to add.

That sounds great, you are helping all open source applications inside our catalog.

There is one thing to keep in mind:

### Docker Container Runtime

The platform you want to add to the docker-to-iac module must have a docker runtime like Render.com or DigitalOcean.

Currently, our catalog only includes dockerized applications. Therefore, they also need a runtime environment where the Docker container can be executed.

### Infrastructure as Code

Our platform's advantage is that visitors to an open source repository can deploy an application using the one-click deploy button.

Therefore, the new cloud provider must supply the option and allow infrastructure as code teamplte. The template can be something custom like CloudFormation from AWS or something generic like Terraform (although Terraform is not generic, that's a bad example 😄).

However, one-click deployment or a similar mechanism/automation __must__ be available.
