---
description: Quickstart guide for using docker-to-iac to translate Docker run commands and Docker Compose files into infrastructure as code templates
menuTitle: Quickstart
---

# Quickstart Guide

## Installation

First, install the module and its dependencies:

```bash
npm i @deploystack/docker-to-iac
```

## Usage Examples

### Translating Docker Compose

```javascript
import { translate } from '@deploystack/docker-to-iac';
import { readFileSync, writeFileSync } from 'fs';

// Read Docker Compose file content
const dockerComposeContent = readFileSync('path/to/docker-compose.yml', 'utf8');

const translatedConfig = translate(dockerComposeContent, {
  source: 'compose',
  target: 'CFN',
  templateFormat: 'yaml'
});

// Write the translated config to a file
writeFileSync('output-aws.yml', translatedConfig);
```

### Translating Docker Run Commands

```javascript
import { translate } from '@deploystack/docker-to-iac';
import { writeFileSync } from 'fs';

// Your docker run command
const dockerRunCommand = 'docker run -d -p 8080:80 -e NODE_ENV=production nginx:latest';

const translatedConfig = translate(dockerRunCommand, {
  source: 'run',
  target: 'CFN',
  templateFormat: 'yaml'
});

// Write the translated config to a file
writeFileSync('output-aws.yml', translatedConfig);
```

### Translation Options

When using the `translate` function, you can specify:

- `source`: Either 'compose' or 'run' depending on your input
- `target`: The IaC language to translate to (e.g., 'CFN' for AWS CloudFormation)
- `templateFormat`: Output format - 'json', 'yaml', or 'text'

For a complete list of supported parsers and formats, visit the [API documentation](/docs/docker-to-iac/api.md).
