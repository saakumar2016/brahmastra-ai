# Brahmastra AI

A production-grade Chrome Extension for AI-powered trading.

## Tech Stack

- **Monorepo**: pnpm workspaces + Turborepo
- **Language**: TypeScript
- **Linting**: ESLint + Prettier
- **Git Hooks**: Husky + lint-staged

## Getting Started

```bash
pnpm install
pnpm lint
pnpm format:check
pnpm typecheck
```

## Project Structure

```
brahmastra-ai/
├── apps/          # Application entry points
├── packages/      # Shared libraries and utilities
├── docs/          # Project documentation
└── (config files) # Root workspace configuration
```

## Scripts

| Script           | Description                    |
| ---------------- | ------------------------------ |
| `pnpm lint`      | Run ESLint across all packages |
| `pnpm format`    | Format code with Prettier      |
| `pnpm typecheck` | Run TypeScript checks          |

## License

MIT
