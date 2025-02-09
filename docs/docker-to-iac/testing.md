---
description: Learn how to test the docker-to-iac module including Docker run commands and Docker Compose files. Complete guide for local testing, automated checks, and CI/CD integration.
menuTitle: Testing
---

# Testing docker-to-iac Module

Before submitting a pull request, test your code locally. Testing covers both code quality and functional aspects for Docker run commands and Docker Compose files.

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

The test suite runs comprehensive checks across all parsers and formats. Testing structure:

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
│   │       ├── cfn/       # AWS CloudFormation
│   │       ├── rnd/       # Render
│   │       └── dop/       # DigitalOcean
│   └── docker-run/        # Docker run test outputs
│       └── [filename]/    
│           ├── services.json
│           ├── cfn/
│           ├── rnd/
│           └── dop/
└── test.ts                # Main test file
```

The test suite automatically:

- Tests all parsers listed by `listAllParsers()`
- Processes all Docker Compose files in `test/docker-compose-files/`
- Processes all Docker run commands in `test/docker-run-files/`
- Generates outputs in all supported formats (JSON, YAML, text)
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
import { readFileSync } from 'fs';

// Test Docker Compose
const dockerComposeContent = readFileSync('docker-compose.yml', 'utf8');
const composeConfig = translate(dockerComposeContent, {
  source: 'compose',
  target: 'CFN',
  templateFormat: 'yaml'
});
console.log('Docker Compose Translation:', composeConfig);

// Test Docker Run
const dockerRunContent = readFileSync('docker-run.txt', 'utf8');
const runConfig = translate(dockerRunContent, {
  source: 'run',
  target: 'CFN',
  templateFormat: 'yaml'
});
console.log('Docker Run Translation:', runConfig);
```

3. Test changes:
   - Make changes in `docker-to-iac/`
   - Run `npm run build` in docker-to-iac
   - Test in `my-dev-env/` with `node index.js`

## Test Results

The test suite shows success (✓) or failure (❌) for each test. On failure:

- Error details are logged
- Process exits with code 1
- GitHub Actions fails PR check

Check both Docker Compose and Docker run outputs in `test/output/` to verify your parser produces expected results across all formats.
