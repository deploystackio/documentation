---
description: Directory structure and organization of the docker-to-iac module, including guidance for adding new parsers, source handlers, and tests.
menuTitle: Project Structure
---

# Project Structure of docker-to-iac Module

The project follows standard npm module organization with a well-defined structure to handle both Docker run commands and Docker Compose files, supporting multiple output formats and comprehensive testing.

## Directory Structure

```bash
docker-to-iac/
|-- src/                        # Source code
|   |-- index.ts                # Main entry point
|   |-- config/                 # Provider-specific configurations
|   |   |-- connection-properties.ts
|   |   |-- digitalocean/
|   |   |   |-- database-types.ts
|   |   |-- render/
|   |       |-- service-types.ts
|   |-- parsers/                # IaC parsers for different cloud providers
|   |   |-- aws-cloudformation.ts
|   |   |-- base-parser.ts
|   |   |-- digitalocean.ts
|   |   |-- render.ts
|   |-- sources/                # Input source handlers
|   |   |-- base.ts
|   |   |-- factory.ts
|   |   |-- compose/            # Docker Compose handling
|   |   |   |-- index.ts
|   |   |   |-- validate.ts
|   |   |-- run/                # Docker run command handling
|   |       |-- index.ts
|   |-- types/                  # TypeScript type definitions
|   |   |-- container-config.ts
|   |   |-- environment-config.ts
|   |   |-- service-connections.ts
|   |-- utils/                  # Helper utilities
|       |-- constructImageString.ts
|       |-- detectDatabaseEnvVars.ts
|       |-- digitalOceanParserServiceName.ts
|       |-- getDigitalOceanDatabaseType.ts
|       |-- getImageUrl.ts
|       |-- parseCommand.ts
|       |-- parseDockerImage.ts
|       |-- parseEnvFile.ts
|       |-- processEnvironmentVariablesGeneration.ts
|       |-- resolveEnvironmentValue.ts
|       |-- (... and many more)
|-- test/                       # Test files
|   |-- e2e/                    # End-to-end tests
|   |   |-- assertions/         # Test assertions
|   |   |   |-- digitalocean.ts
|   |   |   |-- do-port-assertions.ts
|   |   |   |-- port-assertions.ts
|   |   |   |-- render.ts
|   |   |-- docker-compose-files/ # Test Docker Compose files
|   |   |-- docker-run-files/     # Test Docker run commands
|   |   |-- output/               # Test output directory
|   |   |-- utils/                # Test utilities
|   |   |-- index.ts              # Main E2E test executor
|   |   |-- test1.ts              # Environment variables and volume mapping tests
|   |   |-- test2.ts              # Port mapping tests
|   |   |-- test3.ts              # Environment variable substitution tests
|   |   |-- test4.ts              # Schema validation tests
|   |-- unit/                   # Unit tests
|   |   |-- config/             # Configuration tests
|   |   |-- parsers/            # Parser tests
|   |   |-- sources/            # Source handler tests
|   |   |-- utils/              # Utility function tests
|   |-- test.ts                 # Main test entry point
|-- eslint.config.mjs           # ESLint configuration
|-- tsconfig.json               # TypeScript configuration
|-- vitest.config.ts            # Vitest configuration
|-- package.json                # Package configuration
|-- README.md                   # Project documentation
```

## Directory Purposes

### Core Directories

- `src/` - Source code for the module
- `test/` - Test files organized by test type (unit and end-to-end)
- `dist/` - Compiled output (generated during build)

### Source Code Organization

#### Config (`src/config/`)

Contains provider-specific configurations:

- `connection-properties.ts` - Cross-provider connection property mappings
- `digitalocean/` - DigitalOcean App Platform specific configurations
  - `database-types.ts` - Database type mappings for DigitalOcean
- `render/` - Render.com specific configurations
  - `service-types.ts` - Service type mappings for Render deployments

#### Parsers (`src/parsers/`)

Contains IaC-specific parsers for different cloud providers:

- `base-parser.ts` - Base parser class that defines common functionality
- `aws-cloudformation.ts` - AWS CloudFormation parser
- `digitalocean.ts` - DigitalOcean App Platform parser
- `render.ts` - Render Blueprint parser
- ... additional parsers for other providers

#### Source Handlers (`src/sources/`)

Handles different input types:

- `base.ts` - Base source handler interface
- `factory.ts` - Factory for creating appropriate source handlers
- `compose/` - Docker Compose file processing
  - `index.ts` - Main Compose parser
  - `validate.ts` - Compose file validation
- `run/` - Docker run command processing
  - `index.ts` - Docker run command parser

#### Types (`src/types/`)

TypeScript type definitions:

- `container-config.ts` - Container and service configuration types
- `environment-config.ts` - Environment variable configuration types
- `service-connections.ts` - Service connection configuration types

#### Utilities (`src/utils/`)

Helper functions for parsing and processing:

- `constructImageString.ts` - Docker image string construction
- `detectDatabaseEnvVars.ts` - Database environment variable detection
- `digitalOceanParserServiceName.ts` - Name formatting for DigitalOcean
- `getDigitalOceanDatabaseType.ts` - Database type detection for DigitalOcean
- `parseDockerImage.ts` - Docker image parsing
- `parseEnvFile.ts` - Environment file parsing
- `resolveEnvironmentValue.ts` - Environment variable resolution
- And many more utility functions for specific operations

### Test Organization

#### End-to-End Tests (`test/e2e/`)

Integration tests that validate the complete workflow:

- `assertions/` - Validation functions for test output
- `docker-compose-files/` - Test Docker Compose files
- `docker-run-files/` - Test Docker run commands
- `output/` - Generated test outputs
- `utils/` - Test helper utilities
- `test1.ts` through `test4.ts` - Specific test scenarios:
  1. Environment variables and volume mapping
  2. Port mappings
  3. Environment variable substitution
  4. Schema validation

#### Unit Tests (`test/unit/`)

Tests for individual components:

- `config/` - Tests for configuration modules
- `parsers/` - Tests for IaC parsers
- `sources/` - Tests for source handlers
- `utils/` - Tests for utility functions

## Adding New Parser

Please check our [Adding a New Parser](/docs/docker-to-iac/example-of-a-new-parser.md) documentation for detailed instructions on how to add a new parser to the project. This includes creating a new parser file, implementing the parsing logic, and ensuring compatibility with existing configurations.

### Adding New Tests

Please refer to the [Testing](/docs/docker-to-iac/testing.md) documentation for guidelines on adding new tests, including unit and end-to-end tests.
