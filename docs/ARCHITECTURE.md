# Architecture

## Overview

Brahmastra AI is a monorepo housing a Chrome Extension for AI-powered trading. The repository is organized into two primary directories: `apps/` and `packages/`.

```
brahmastra-ai/
├── apps/                  # Runnable applications
│   └── (future: extension, backend, admin, website)
├── packages/              # Shared libraries
│   └── (future: ui, types, utils, trading-engine)
├── docs/                  # Documentation
├── pnpm-workspace.yaml    # Workspace definition
├── turbo.json             # Turborepo pipeline config
├── tsconfig.base.json     # Shared TypeScript config
├── .eslintrc.cjs          # ESLint configuration
├── .prettierrc            # Prettier configuration
├── .editorconfig          # Editor settings
└── .gitignore             # Git ignore rules
```

## Design Principles

1. **Monorepo Isolation** — Each app/package owns its dependencies, config, and build. Shared configs at the root reduce duplication.
2. **Incremental Builds** — Turborepo caches task outputs and skips unchanged work.
3. **Strict TypeScript** — Shared `tsconfig.base.json` ensures consistency; individual packages extend it.
4. **Code Quality Gates** — ESLint and Prettier run as pre-commit hooks via Husky + lint-staged.

## Package Boundaries

TBD — will be defined as packages are created.

---

## TODO: Future Milestones

### App Layer

- `apps/extension` — Chrome Extension (Manifest V3)
- `apps/backend` — Node.js API server
- `apps/admin` — Admin dashboard
- `apps/website` — Landing/marketing site

### Package Layer

- `packages/ui` — Shared UI components
- `packages/types` — Shared TypeScript types
- `packages/utils` — Shared utilities
- `packages/trading-engine` — Core trading logic
