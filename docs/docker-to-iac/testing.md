---
description: Learn how to test the docker-to-iac module including Docker run commands and Docker Compose files, with support for multi-file output generation and directory structure preservation.
menuTitle: Testing
---

# Testing docker-to-iac Module

Before submitting a pull request, test your code locally. Testing covers both code quality and functional aspects for Docker run commands and Docker Compose files, including the new multi-file output capabilities.

## Running Tests

### Code Quality Check

First, run ESLint to ensure code quality:

```bash
npm run lint
```

ESLint must pass locally before submitting your PR, as GitHub Actions CI/CD will block any PR that fails the lint check.

### Functional Testing

Run the test suite:

```bash
npm run test
```

The test suite runs comprehensive checks across all parsers and formats, with support for multi-file outputs. Testing structure:

```bash
test/
├── docker-compose-files/   # Test docker-compose files
│   ├── file1.yml
│   ├── file2.yaml
│   └── ...
├── docker-run-files/       # Test docker run commands
│   ├── nginx.txt
│   ├── redis.txt
│   └── ...
├── output/                 # Generated test outputs
│   ├── docker-compose/     # Docker Compose test outputs
│   │   └── [filename]/    
│   │       ├── services.json
│   │       ├── cfn/       # AWS CloudFormation outputs
│   │       │   └── aws-cloudformation.cf.yml
│   │       ├── rnd/       # Render outputs
│   │       │   └── render.yaml
│   │       └── dop/       # DigitalOcean outputs
│   │           └── .do/
│   │               └── deploy.template.yaml
│   └── docker-run/        # Docker run test outputs
│       └── [filename]/    
│           ├── services.json
│           ├── cfn/
│           │   └── aws-cloudformation.cf.yml
│           ├── rnd/
│           │   └── render.yaml
│           └── dop/
│               └── .do/
│                   └── deploy.template.yaml
└── test.ts                # Main test file
```

The test suite automatically:

- Tests all parsers listed by `listAllParsers()`
- Processes all Docker Compose files in `test/docker-compose-files/`
- Processes all Docker run commands in `test/docker-run-files/`
- Generates outputs in all supported formats (JSON, YAML, text)
- Preserves proper directory structure for multi-file outputs
- Validates parser information and service listing
- Creates organized output directories for inspection

### Adding Test Cases

#### For Docker Compose

Add your test files to `test/docker-compose-files/` with `.yml` or `.yaml` extension.

#### For Docker Run Commands

Add your test commands to `test/docker-run-files/` with `.txt` extension. Each file should contain a single Docker run command. You can use line continuations with `\` for readability:

```bash
docker run -d \
  --name nginx-proxy \
  -p 80:80 \
  -v /etc/nginx/conf.d:/etc/nginx/conf.d:ro \
  nginx:alpine
```

### Adding Tests for New Parsers

When adding a new parser:

1. Add Docker Compose test files to `test/docker-compose-files/`
2. Add Docker run test files to `test/docker-run-files/`
3. The test suite will automatically include your parser in testing
4. Check outputs in `test/output/docker-compose/` and `test/output/docker-run/`

For parsers that generate multiple files:

1. Ensure your `parseFiles` method returns the correct file structure
2. The test suite will automatically preserve directory structure
3. Verify that nested directories are created correctly in the output

## Examining Test Output

After running tests, check the output directory structure to verify that your parser correctly generates files:

```bash
$ tree -a test/output/docker-run/simple-1/
test/output/docker-run/simple-1/
├── cfn
│   └── aws-cloudformation.cf.yml
├── dop
│   └── .do
│       └── deploy.template.yaml
├── rnd
│   └── render.yaml
└── services.json

5 directories, 4 files
```

This shows how each parser generates its files with the appropriate directory structure.

## Local Testing with `npm link`

Test locally using `npm link`. Development environment setup:

```bash
some-root-dir/
|-- docker-to-iac/
|-- my-dev-env/
|   |-- index.ts
|   |-- docker-compose.yml
|   |-- docker-run.txt
|   |-- node_modules/
|   |-- package.json
```

Setup steps:

1. In `docker-to-iac/`: `npm link`
2. In `my-dev-env`: `npm link ../docker-to-iac/`

### Setting up my-dev-env

1. Initialize: `npm init`

2. Create `index.js`:

```javascript
import { translate } from '@deploystack/docker-to-iac';
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';

// Test Docker Compose
const dockerComposeContent = readFileSync('docker-compose.yml', 'utf8');
const composeResult = translate(dockerComposeContent, {
  source: 'compose',
  target: 'CFN',
  templateFormat: 'yaml'
});

console.log('Docker Compose Translation - Files:', Object.keys(composeResult.files));

// Write output files preserving directory structure
Object.entries(composeResult.files).forEach(([path, fileData]) => {
  const fullPath = join('output', 'compose', path);
  const dir = dirname(fullPath);
  
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }
  
  writeFileSync(fullPath, fileData.content);
});

// Test Docker Run
const dockerRunContent = readFileSync('docker-run.txt', 'utf8');
const runResult = translate(dockerRunContent, {
  source: 'run',
  target: 'CFN',
  templateFormat: 'yaml'
});

console.log('Docker Run Translation - Files:', Object.keys(runResult.files));

// Write output files preserving directory structure
Object.entries(runResult.files).forEach(([path, fileData]) => {
  const fullPath = join('output', 'run', path);
  const dir = dirname(fullPath);
  
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }
  
  writeFileSync(fullPath, fileData.content);
});
```

3. Test changes:
   - Make changes in `docker-to-iac/`
   - Run `npm run build` in docker-to-iac
   - Test in `my-dev-env/` with `node index.js`
   - Check the output directory for generated files

## Test Results

The test suite shows success (✓) or failure (❌) for each test. On failure:

- Error details are logged
- Process exits with code 1
- GitHub Actions fails PR check

Check both Docker Compose and Docker run outputs in `test/output/` to verify your parser produces expected results across all formats and maintains the correct directory structure for multi-file outputs.
