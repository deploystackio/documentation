---
description: Directory structure and organization of the docker-to-iac module, including guidance for adding new parsers and source handlers.
menuTitle: Project Structure
---

# Project Structure of docker-to-iac Module

The project follows standard npm module organization with additional structure to handle both Docker run commands and Docker Compose files.

## Directory Structure

```bash
docker-to-iac/
|-- .github/
|-- dist/
|-- src/
|   |-- index.ts
|   |-- config/
|   |   |-- render/
|   |   |   |-- service-types.ts
|   |-- parsers/
|   |   |-- aws-cloudformation.ts
|   |   |-- base-parser.ts
|   |   |-- digitalocean.ts
|   |   |-- render.ts
|   |-- sources/
|   |   |-- base.ts
|   |   |-- factory.ts
|   |   |-- compose/
|   |   |   |-- index.ts
|   |   |   |-- validate.ts
|   |   |-- run/
|   |   |   |-- index.ts
|   |-- types/
|   |   |-- container-config.ts
|   |-- utils/
|       |-- constructImageString.ts
|       |-- digitalOceanParserServiceName.ts
|       |-- getImageUrl.ts
|       |-- parseCommand.ts
|       |-- parseDockerImage.ts
|       |-- parseEnvironmentVariables.ts
|       |-- parsePort.ts
|-- test/
|   |-- docker-compose-files/
|   |-- docker-run-files/
|   |-- output/
|   |-- test.ts
|-- .gitignore
|-- eslint.config.mjs
|-- LICENSE
|-- README.md
|-- package-lock.json
|-- package.json
|-- release.config.cjs
|-- tsconfig.json
```

## Directory Purposes

### Core Directories

- `src/` - Source code
- `test/` - Test files and test cases
- `dist/` - Compiled output
- `.github/` - GitHub workflows and templates

### Source Code Organization

#### Config (`src/config/`)

Contains provider-specific configurations:

- `render/` - Render.com specific configurations
  - `service-types.ts` - Service type mappings for Render.com deployments (web, private services, Redis)

Each cloud provider can have its own subdirectory for configuration files that affect how the parser handles specific cases for that provider.

#### Parsers (`src/parsers/`)

Contains IaC-specific parsers for different cloud providers:

- `base-parser.ts` - Base parser class
- `aws-cloudformation.ts` - AWS CloudFormation parser
- `digitalocean.ts` - DigitalOcean App Platform parser
- `render.ts` - Render Blueprint parser

#### Source Handlers (`src/sources/`)

Handles different input types:

- `compose/` - Docker Compose file processing
- `run/` - Docker run command processing
- `base.ts` - Base source handler
- `factory.ts` - Source handler factory

#### Types (`src/types/`)

TypeScript type definitions:

- `container-config.ts` - Container configuration types

#### Utilities (`src/utils/`)

Helper functions for parsing and processing:

- Docker image handling
- Command parsing
- Environment variable processing
- Port mapping utilities
- and many more...

### Adding New Source

Add new input source handlers in `src/sources/`:

```bash
src/sources/new-source/
|-- index.ts
|-- validate.ts  # if needed
```

## Testing

Place test files in appropriate directories:

- Docker Compose files: `test/docker-compose-files/`
- Docker run commands: `test/docker-run-files/`
- Test output: `test/output/`
