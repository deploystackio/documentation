---
description: Here's everything you need to know about our docker-to-iac module - from listing available cloud providers to converting your Docker setup into deployable code.
menuTitle: API
---

# docker-to-iac module API list

In this page you will find all possible APIs for package docker-to-iac.

## List all Parser

To list all available parsers, please use the `listAllParsers()` method.

### Example

```typescript
import { listAllParsers } from '@deploystack/docker-to-iac';

const parsers = listAllParsers();

console.log('Available Parsers:');
console.log(parsers);
```

#### Output

```json
[
  {
    providerWebsite: 'https://aws.amazon.com/cloudformation/',
    providerName: 'Amazon Web Services',
    providerNameAbbreviation: 'AWS',
    languageOfficialDocs: 'https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/Welcome.html',
    languageAbbreviation: 'CFN',
    languageName: 'AWS CloudFormation',
    defaultParserConfig: { files: [Array], cpu: 512, memory: '1GB' }
  },
  {
    providerWebsite: 'https://render.com/docs',
    providerName: 'Render',
    providerNameAbbreviation: 'RND',
    languageOfficialDocs: 'https://docs.render.com/infrastructure-as-code',
    languageAbbreviation: 'RND',
    languageName: 'Render Blue Print',
    defaultParserConfig: {
      files: [Array],
      subscriptionName: 'starter',
      region: 'oregon',
      diskSizeGB: 10
    }
  },
  {
    providerWebsite: 'https://www.digitalocean.com/',
    providerName: 'DigitalOcean',
    providerNameAbbreviation: 'DO',
    languageOfficialDocs: 'https://docs.digitalocean.com/products/app-platform/',
    languageAbbreviation: 'DOP',
    languageName: 'DigitalOcean App Spec',
    defaultParserConfig: { files: [Array], region: 'nyc', subscriptionName: 'basic-xxs' }
  },
  {
    providerWebsite: 'https://helm.sh/',
    providerName: 'Kubernetes',
    providerNameAbbreviation: 'K8S',
    languageOfficialDocs: 'https://helm.sh/docs/',
    languageAbbreviation: 'HELM',
    languageName: 'Helm Chart',
    defaultParserConfig: { 
      files: [Array],
      cpu: '100m',
      memory: '128Mi'
    }
  },
  {
    providerWebsite: 'https://www.digitalocean.com/',
    providerName: 'DigitalOcean',
    providerNameAbbreviation: 'DO',
    languageOfficialDocs: 'https://docs.digitalocean.com/products/app-platform/',
    languageAbbreviation: 'DOP',
    languageName: 'DigitalOcean App Spec',
    defaultParserConfig: { files: [Array], region: 'nyc', subscriptionName: 'basic-xxs' }
  }
]
```

**Note the files array**: that's because we have a [multi file strategy](/docs/docker-to-iac/multi-file-configuration.md).

### Type

```typescript
listAllParsers(): ParserInfo[]
```

## Get Parser Info

If you want to extract the `defaultParserConfig` object from a parser, the `getParserInfo` method is the most suitable for this.

### Example

```typescript
import { getParserInfo } from '@deploystack/docker-to-iac';

const awsInfo = getParserInfo('CFN');

console.log('Available Parsers:');
console.log(awsInfo);
```

#### Output

```json
{
  providerWebsite: 'https://aws.amazon.com/cloudformation/',
  providerName: 'Amazon Web Services',
  providerNameAbbreviation: 'AWS',
  languageOfficialDocs: 'https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/Welcome.html',
  languageAbbreviation: 'CFN',
  languageName: 'AWS CloudFormation',
  defaultParserConfig: {
    files: [
      {
        path: 'aws-cloudformation.cf.yml',
        templateFormat: 'yaml',
        isMain: true,
        description: 'AWS CloudFormation template'
      }
    ],
    cpu: 512,
    memory: '1GB'
  }
}
```

### Type

```typescript
getParserInfo(languageAbbreviation: string): ParserInfo
```

## Translate API

Translate Docker configurations (both Docker run commands and docker-compose.yml files) into your chosen Infrastructure as Code language.

### Function Signature

```typescript
translate(input: string, options: {
  source: 'run' | 'compose',
  target: string,
  templateFormat?: TemplateFormat,
  environmentVariableGeneration?: EnvironmentVariableGenerationConfig;
  environmentVariables?: Record<string, string>;
  persistenceKey?: string;
  serviceConnections?: ServiceConnectionsConfig;
}): TranslationResult
```

Where `TranslationResult` has the structure:

```typescript
interface TranslationResult {
  files: { 
    [path: string]: FileOutput 
  };
  serviceConnections?: ResolvedServiceConnection[];
}

interface FileOutput {
  content: string;
  format: TemplateFormat;
  isMain?: boolean;
}
```

### Examples

#### Translating Docker Compose

```javascript
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { translate } from '@deploystack/docker-to-iac';

const dockerComposeContent = readFileSync('path/to/docker-compose.yml', 'utf8');

const result = translate(dockerComposeContent, {
  source: 'compose',
  target: 'CFN',
  templateFormat: 'yaml'
});

// Access individual file contents
console.log(`Generated ${Object.keys(result.files).length} files:`);
Object.keys(result.files).forEach(path => {
  console.log(`- ${path}`);
});

// Write files to disk preserving directory structure
Object.entries(result.files).forEach(([path, fileData]) => {
  const fullPath = join('output', path);
  const dir = dirname(fullPath);
  
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }
  
  writeFileSync(fullPath, fileData.content);
});
```

#### Translating Docker Run Command

```javascript
import { translate } from '@deploystack/docker-to-iac';
import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';

const dockerRunCommand = 'docker run -d -p 8080:80 nginx:latest';

const result = translate(dockerRunCommand, {
  source: 'run',
  target: 'RND',
  templateFormat: 'yaml'
});

console.log(result)

// Access and save all generated files
Object.entries(result.files).forEach(([path, fileData]) => {
  const fullPath = join('output', path);
  const dir = dirname(fullPath);
  
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }
  
  writeFileSync(fullPath, fileData.content);
  console.log(`Created: ${path}`);
});
```

#### Translating Docker Compose to Helm Chart

```javascript
import { translate } from '@deploystack/docker-to-iac';
import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';

const dockerComposeContent = `
version: '3'
services:
  web:
    image: nginx:latest
    ports:
      - "80:80"
  db:
    image: postgres:13
    environment:
      POSTGRES_USER: myuser
      POSTGRES_PASSWORD: mypassword
      POSTGRES_DB: myapp
`;

const result = translate(dockerComposeContent, {
  source: 'compose',
  target: 'HELM',
  templateFormat: 'yaml'
});

// Access and save all generated files to create a complete Helm Chart
Object.entries(result.files).forEach(([path, fileData]) => {
  const fullPath = join('helm-chart', path);
  const dir = dirname(fullPath);
  
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }
  
  writeFileSync(fullPath, fileData.content);
  console.log(`Created: ${path}`);
});
```

#### Example Output (Partial - Chart.yaml)

```yaml
apiVersion: v2
name: deploystack-app
description: A Helm chart for DeployStack application generated from Docker configuration
type: application
version: 0.1.0
appVersion: 1.0.0
maintainers:
  - name: DeployStack
    email: hello@deploystack.io
dependencies:
  - name: db
    repository: https://charts.bitnami.com/bitnami
    version: ^12.0.0
    condition: dependencies.db.enabled
```

#### Configuring Service Connections

```javascript
import { translate } from '@deploystack/docker-to-iac';

const dockerComposeContent = `
version: "3"
services:
  db:
    image: mariadb:latest
    environment:
      - MYSQL_ROOT_PASSWORD=rootpass
  app:
    image: node:alpine
    environment:
      - DATABASE_HOST=db  # This will be transformed
`;

const result = translate(dockerComposeContent, {
  source: 'compose',
  target: 'DOP',  // DigitalOcean App Platform
  templateFormat: 'yaml',
  serviceConnections: {
    mappings: [
      {
        fromService: 'app',        // Service that needs to connect
        toService: 'db',           // Service to connect to
        environmentVariables: [    // Env vars that reference the service
          'DATABASE_HOST'
        ]
      }
    ]
  }
});

// The result will include transformed service references:
console.log(result.serviceConnections);
```

### Example Output (AWS CloudFormation)

```yaml
{
  files: {
    'render.yaml': {
      content: 'services:\n' +
        '  - name: default\n' +
        '    type: web\n' +
        '    env: docker\n' +
        '    runtime: image\n' +
        '    image:\n' +
        '      url: docker.io/library/nginx:latest\n' +
        '    startCommand: ""\n' +
        '    plan: starter\n' +
        '    region: oregon\n' +
        '    envVars:\n' +
        '      - key: PORT\n' +
        '        value: "80"\n',
      format: 'yaml',
      isMain: true
    }
  }
}
Created: render.yaml
```

#### Translation with Environment Variable Generation

```typescript
import { translate } from '@deploystack/docker-to-iac';

// Environment variable configuration
const envConfig = {
  'library/mariadb': {
    versions: {
      '*': {
        environment: {
          'MYSQL_ROOT_PASSWORD': {
            type: 'password',
            length: 16
          },
          'MYSQL_DATABASE': {
            type: 'string',
            length: 12,
            pattern: 'lowercase'
          }
        }
      }
    }
  }
};

const translatedConfig = translate(dockerComposeContent, {
  source: 'compose',
  target: 'CFN',
  templateFormat: 'yaml',
  environmentVariableGeneration: envConfig
});
```

### Parameters

#### `input: string`

For Docker Compose: The contents of your docker-compose.yml file
For Docker run: The complete docker run command

#### `options.source: 'run' | 'compose'`

Specifies the input type:

- `'run'` - For Docker run commands
- `'compose'` - For Docker Compose files

#### `options.target: string`

The IaC language to translate to. Currently supported targets:
Please see the sidebar on the left, section Parsers.

#### `options.templateFormat?: TemplateFormat`

Optional. The desired output format:

- `'json'` - JavaScript Object Notation
- `'yaml'` - YAML format
- `'text'` - Plain text

> [!IMPORTANT]
> Not all template formats are valid for every IaC language. For example, AWS CloudFormation only accepts YAML or JSON formats. Choose a format compatible with your target IaC language.

#### `options.environmentVariableGeneration?: EnvironmentVariableGenerationConfig`

Optional. Configuration for generating environment variable values. Structure:

```typescript
type EnvironmentVariableGenerationConfig = {
  [imageName: string]: {
    versions: {
      [version: string]: {
        environment: {
          [variableName: string]: {
            type: 'password' | 'string' | 'number';
            length?: number;
            pattern?: 'uppercase' | 'lowercase' | 'normal';
            min?: number;  // For number type
            max?: number;  // For number type
          }
        }
      }
    }
  }
}
```

Generation types:

- `password`: Generates a secure random password
- `string`: Generates a random string
- `number`: Generates a random number within specified range

Patterns (for string type):

- `uppercase`: Only uppercase characters
- `lowercase`: Only lowercase characters
- `normal`: Mixed case with numbers

Version matching:

- Use exact versions (e.g., "10.5")
- Use "*" for all versions
- Use "latest" for latest version

> [!IMPORTANT]
> Environment variables in your docker-compose.yml must use the `${VARIABLE_NAME}` syntax to be processed by the generator.

#### `environmentVariables?: Record<string, string>`

Optional. The docker-to-iac module supports passing environment variables from `.env` files to your Infrastructure as Code templates. This feature allows you to manage configuration values separately from your Docker configurations and maintain consistency across deployments.

```typescript
import { translate, parseEnvFile } from '@deploystack/docker-to-iac';
import { readFileSync } from 'fs';

// Read and parse the .env file
const envContent = readFileSync('.env', 'utf-8');
const envVariables = parseEnvFile(envContent);

const result = translate(dockerConfig, {
  source: 'run',  // or 'compose'
  target: 'RND',  // or other supported targets
  templateFormat: 'yaml',
  environmentVariables: envVariables
});
```

#### `options.persistenceKey?: string`

Optional. The `persistenceKey` parameter allows you to maintain consistent variable values across multiple template generations.

#### `options.serviceConnections?: ServiceConnectionsConfig`

Optional. Configure service-to-service communications by defining which environment variables reference other services.

```typescript
type ServiceConnectionsConfig = {
  mappings: Array<{
    fromService: string;         // Service that needs to connect
    toService: string;           // Service to connect to
    environmentVariables: string[]; // Environment variables that reference the service
    property?: string;           // Connection property type (connectionString, hostport, etc.)
  }>
};
```

This option is currently supported by:

- Render.com (RND): Uses Blueprint's `fromService` syntax
- DigitalOcean App Platform (DOP): Uses direct service names
- Kubernetes Helm Charts (HELM): Uses Kubernetes DNS service discovery

Example:

```javascript
serviceConnections: {
  mappings: [
    {
      fromService: 'frontend',
      toService: 'api',
      environmentVariables: ['API_URL'],
      property: 'hostport'
    },
    {
      fromService: 'app',
      toService: 'db',
      environmentVariables: ['DATABASE_URL'],
      property: 'connectionString'
    }
  ]
}
```

### Return Value

Returns the translated Infrastructure as Code template and any resolved service connections:

```typescript
{
  files: {
    // Generated IaC template files with paths as keys
    'render.yaml': { content: '...', format: 'yaml', isMain: true }
  },
  serviceConnections: [
    {
      fromService: 'app',
      toService: 'db',
      variables: {
        'DATABASE_HOST': {
          originalValue: 'db',
          transformedValue: 'db'  // Transformed as appropriate for the provider
        }
      }
    }
  ]
}
```

## List Services API

Extract service configurations from either Docker run commands or docker-compose.yml files as structured JSON objects.

### Function Signature

```typescript
listServices(content: string, options: ListServicesOptions): { [key: string]: ServiceConfig }

type ListServicesOptions = {
  source: 'compose' | 'run';
  environmentVariableGeneration?: EnvironmentVariableGenerationConfig;
  environmentVariables?: Record<string, string>;
  persistenceKey?: string;
};
```

### Examples

#### Listing Docker Compose Services with Environment Variables

```javascript
import { readFileSync } from 'fs';
import { listServices, parseEnvFile } from '@deploystack/docker-to-iac';

const dockerComposeContent = readFileSync('path/to/docker-compose.yml', 'utf8');
const envContent = readFileSync('.env', 'utf-8');
const envVariables = parseEnvFile(envContent);

const services = listServices(dockerComposeContent, {
  source: 'compose',
  environmentVariables: envVariables
});

console.log(services);
```

##### Output with Environment Variables

```json
{
  "db": {
    "image": "mariadb:11.2",
    "ports": [],
    "command": "mariadbd --character-set-server=utf8mb4 --collation-server=utf8mb4_bin",
    "restart": "unless-stopped",
    "volumes": [{"host": "db", "container": "/var/lib/mysql"}],
    "environment": {
      "MYSQL_ROOT_PASSWORD": "mysecretpassword",
      "MYSQL_USER": "myuser",
      "MYSQL_PASSWORD": "mysecretpassword",
      "MYSQL_DATABASE": "mydatabase"
    }
  }
}
```

#### Listing Docker Run Services

```javascript
import { listServices } from '@deploystack/docker-to-iac';

const dockerRunCommand = 'docker run -d -p 8080:80 -e NODE_ENV=production nginx:latest';

const services = listServices(dockerRunCommand, {
  source: 'run'
});

console.log(services);
```

##### Output

```json
{
  "service": {
    "image": "nginx:latest",
    "ports": ["8080:80"],
    "environment": {
      "NODE_ENV": "production"
    }
  }
}
```

### Options

#### `content: string`

The input content to parse:

- For Docker Compose: The contents of your docker-compose.yml file
- For Docker run: The complete docker run command

#### `options.source: 'run' | 'compose'`

Specifies the input type:

- `'run'` - For Docker run commands
- `'compose'` - For Docker Compose files

#### `options.environmentVariables?: Record<string, string>`

Optional. Environment variables from a `.env` file or other source. Used to substitute variables in the format `${VARIABLE_NAME}` in your Docker configuration.

Example:

```javascript
const envVariables = {
  'DB_PASSWORD': 'mysecretpassword',
  'DB_USERNAME': 'myuser',
  'DB_DATABASE': 'mydatabase'
};
```

#### `options.environmentVariableGeneration?: EnvironmentVariableGenerationConfig`

Optional. Configuration for automatically generating environment variable values. Structure:

```typescript
type EnvironmentVariableGenerationConfig = {
  [imageName: string]: {
    versions: {
      [version: string]: {
        environment: {
          [variableName: string]: {
            type: 'password' | 'string' | 'number';
            length?: number;
            pattern?: 'uppercase' | 'lowercase' | 'normal';
            min?: number;  // For number type
            max?: number;  // For number type
          }
        }
      }
    }
  }
}
```

Example:

```javascript
const envGeneration = {
  'library/mariadb': {
    versions: {
      '*': {
        environment: {
          'MYSQL_ROOT_PASSWORD': {
            type: 'password',
            length: 16
          },
          'MYSQL_DATABASE': {
            type: 'string',
            length: 12,
            pattern: 'lowercase'
          }
        }
      }
    }
  }
};
```

#### `options.persistenceKey?: string`

Optional. A unique key to maintain consistent generated environment variables across multiple calls to `listServices` or `translate`.

### Return Value

Returns an object where:

- Keys are service names
- Values are service configurations containing:
  - `image`: Docker image name and tag
  - `ports`: Array of port mappings
  - `command`: Custom command (if specified)
  - `restart`: Restart policy (if specified)
  - `volumes`: Array of volume mappings (if specified)
  - `environment`: Object of environment variables

## Parse Environment File

Parse a `.env` file content into a key-value object using the `parseEnvFile()` method. The method handles basic environment file syntax including comments and quoted values.

### Example

```typescript
import { parseEnvFile } from '@deploystack/docker-to-iac';

const envContent = `
# Database settings
DB_HOST=localhost
DB_USER="admin"
DB_PASS='secretpass'
# Comment line
NUMBERS=123456
QUOTED="value=with=equals"
`;

const envVars = parseEnvFile(envContent);

console.log('Parsed Environment Variables:');
console.log(envVars);
```

#### Output

```json
{
  "DB_HOST": "localhost",
  "DB_USER": "admin",
  "DB_PASS": "secretpass",
  "NUMBERS": "123456",
  "QUOTED": "value=with=equals"
}
```

### Type

```typescript
parseEnvFile(content: string): Record<string, string>
```
