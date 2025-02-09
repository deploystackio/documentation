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
    provieerNameAbbreviation: 'AWS',
    languageOfficialDocs: 'https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/Welcome.html',
    languageAbbreviation: 'CFN',
    languageName: 'AWS CloudFormation',
    defaultParserConfig: { fileName: 'aws-cloudformation.yaml', cpu: 512, memory: '1GB', templateFormat: 'yaml' }
  },
  {
    providerWebsite: 'https://render.com/docs',
    providerName: 'Render',
    provieerNameAbbreviation: 'RND',
    languageOfficialDocs: 'https://docs.render.com/infrastructure-as-code',
    languageAbbreviation: 'RND',
    languageName: 'Render Blue Print',
    defaultParserConfig: {
      subscriptionName: 'free',
      region: 'oregon',
      fileName: 'render.yaml',
      templateFormat: 'yaml'
    }
  }
]
```

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
    provieerNameAbbreviation: 'AWS',
    languageOfficialDocs: 'https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/Welcome.html',
    languageAbbreviation: 'CFN',
    languageName: 'AWS CloudFormation',
    defaultParserConfig: { fileName: 'aws-cloudformation.yaml', cpu: 512, memory: '1GB', templateFormat: 'yaml' }
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
}): any
```

### Examples

#### Translating Docker Compose

```javascript
import { readFileSync, writeFileSync } from 'fs';
import { translate } from '@deploystack/docker-to-iac';

const dockerComposeContent = readFileSync('path/to/docker-compose.yml', 'utf8');

const translatedConfig = translate(dockerComposeContent, {
  source: 'compose',
  target: 'CFN',
  templateFormat: 'yaml'
});
console.log(translatedConfig);
```

#### Translating Docker Run Command

```javascript
import { translate } from '@deploystack/docker-to-iac';

const dockerRunCommand = 'docker run -d -p 8080:80 nginx:latest';

const translatedConfig = translate(dockerRunCommand, {
  source: 'run',
  target: 'CFN',
  templateFormat: 'yaml'
});
console.log(translatedConfig);
```

### Example Output (AWS CloudFormation)

```yaml
AWSTemplateFormatVersion: 2010-09-09
Description: Generated from container configuration by docker-to-iac
Parameters:
  VPC:
    Type: AWS::EC2::VPC::Id
  SubnetA:
    Type: AWS::EC2::Subnet::Id
  SubnetB:
    Type: AWS::EC2::Subnet::Id
  ServiceName:
    Type: String
    Default: DeployStackService
Resources:
  Cluster:
    Type: AWS::ECS::Cluster
    Properties:
      ClusterName: !Join ['', [!Ref ServiceName, Cluster]]
  ExecutionRole:
    Type: AWS::IAM::Role
    Properties:
      RoleName: !Join ['', [!Ref ServiceName, ExecutionRole]]
      AssumeRolePolicyDocument:
        Statement:
          - Effect: Allow
            Principal:
              Service: ecs-tasks.amazonaws.com
            Action: sts:AssumeRole
      ManagedPolicyArns:
        - arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy
...
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

Optional. The `persistenceKey` parameter allows you to maintain consistent variable values across multiple template generations

### Return Value

Returns the translated Infrastructure as Code template in the specified format. The structure and content will vary based on the target IaC language and template format chosen.

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
