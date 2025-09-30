# Contributing to Alphabyte Labs CLI

Thank you for your interest in contributing to Alphabyte Labs CLI! This document provides guidelines and information for contributors.

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/your-username/alphabyte-labs.git`
3. Install dependencies: `pnpm install`
4. Create a new branch: `git checkout -b feature/your-feature-name`

## Development

### Prerequisites

- Node.js 18 or higher
- pnpm package manager

### Building

```bash
# Build the CLI
pnpm cli:build

# Build in watch mode
pnpm cli:dev
```

### Testing

```bash
# Run tests
pnpm cli test

# Run tests in watch mode
pnpm cli test:dev
```

### Linting

```bash
# Lint code
pnpm cli lint

# Fix linting issues
pnpm cli lint --fix
```

## Adding New Components or Blocks

1. Add your component/block to the appropriate registry directory:
   - Components: `apps/web/registry/ui/`
   - Blocks: `apps/web/registry/view/`

2. The CLI will automatically detect new components and blocks

## Adding New Commands

1. Create a new command file in `src/commands/`
2. Export the command and add it to `src/index.ts`
3. Add tests for the new command
4. Update documentation

## Code Style

- Use TypeScript
- Follow the existing code style
- Add JSDoc comments for public APIs
- Use meaningful variable and function names
- Keep functions small and focused

## Pull Request Process

1. Ensure all tests pass
2. Ensure code is properly linted
3. Update documentation if needed
4. Create a clear description of your changes
5. Submit a pull request

## License

By contributing to this project, you agree that your contributions will be licensed under the MIT License.
