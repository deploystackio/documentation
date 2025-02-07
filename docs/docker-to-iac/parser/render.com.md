---
description: Translate docker docker-compose.yml file into Render.com Infrastructure as Code with DeployStack
---

# Render.com - Parser Full Documentation

The parser for Render.com translates the `docker-compose.yml` file into Render [BluePrint](https://render.com/docs/infrastructure-as-code). The parser logic can be found in GitHub inside [docker-to-iac repo](https://github.com/deploystackio/docker-to-iac/blob/main/src/parsers/render.ts).

## Parser language abbreviation for API

- `languageAbbreviation`: `RND`.

## Prerequisite to deploy Render BluePrint

There are no special requirements for using the Render.com blueprint. However, you need a valid render.com account with sufficient credits.

## Architecture

The BluePrint will create a render "web" service.

Type = "[Web Service](https://render.com/docs/blueprint-spec#type)".

Render dashboard will list all your web services. At the top, you can switch between Dashboard and BluePrints.

![Render BluePrints](/docs/assets/images/docker-to-iac/render.com-dashboard-blueprints.png)

After the BluePrint has been created through one-click deployment, the BluePrint will be visible in the BluePrint menu.

In contrast to other cloud providers, Render.com's usability is very trivial. There is no VPC / VNet or anything else. After successful deployment, you can open your service via a URL.

## Default output format

- The default output format for this parser: `YAML`.

## Supported Docker Compose Variables

The current version supports the following Docker Compose variables:

For __services__:

- image
- environment
- ports
- command

> [!NOTE]
> The supported variables that are not on this list are ignored. This means that they are not translated by the parser in Infrastructure as Code from `docker-compose.yml` or docker run command.

## Volume Support

Render.com offers two types of storage options:

### Default: Ephemeral Filesystem

By default, Render services use an ephemeral filesystem where:

- Changes to the filesystem are lost after deployments or restarts
- Each service instance has its own separate filesystem
- No data persists between deployments

### Persistent Disk Option

The parser supports adding persistent disk storage through the `volumes` directive:

- Persistent disks are automatically configured with 10GB size
- Only one disk per service is supported
- Files are preserved across deployments and restarts
- Only filesystem changes under the disk's mount path are preserved

Important limitations for persistent disks:

- A disk can only be accessed by a single service instance
- Services with persistent disks cannot scale to multiple instances

Read more here: [render.com/docs/disks](https://render.com/docs/disks)

## Service Types

The parser automatically determines the appropriate service type for each container in your Docker configuration:

### Web Services (Default)

By default, services are created as `type: web`, which is suitable for:

- HTTP-based applications
- Frontend applications
- API servers
- Any service that needs to be publicly accessible

### Private Services

For databases and other TCP-based services, the parser automatically sets `type: pserv`. These services:

- Are not publicly accessible
- Can communicate with other services over TCP
- Are ideal for databases and backend services

Read more here: [render.com/docs/private-services](https://render.com/docs/private-services).

The service type is determined based on the Docker image being used. For example:

```yaml
services:
  web:
    image: nginx:latest
    # Automatically set to type: web
    
  db:
    image: mariadb:11.2
    # Automatically set to type: pserv
```

### Adding New Service Types

If you're using a service that should be private but isn't automatically detected, please visit our [Render: Contributing to Render Service Types docs page](/docs/docker-to-iac/render-contributing-to-service-types.md).

## Multi Services Support

Multi `services` support for Render.com: __yes__

Since [multi services](https://render.com/docs/blueprint-spec#root-level-fields) feature is supported.

Please read more about [multi service support here](/docs/docker-to-iac/multi-services-support.md).
