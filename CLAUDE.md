# CLAUDE.md — Project Instructions for Claude Code

> **Purpose:** Operating instructions for Claude Code (and other AI coding agents) working on Brahmastra AI.
> **Last Updated:** 2026-08-02
> **Related Documents:** [Master Spec](docs/MASTER_SPEC.md) · [Docs index](docs/README.md) · [Coding Standards](docs/01-architecture/coding-standards.md)

## Project Context

- Brahmastra AI is an AI-powered trading assistant delivered as a **Chrome Extension (Manifest V3)** that runs inside TradingView.
- Stack: pnpm workspace + Turbo, Vite + `@crxjs/vite-plugin`, React 18, TypeScript (strict), Vitest, CSS Modules + CSS custom-property theme.
- The single source of truth for the product is **[`docs/MASTER_SPEC.md`](docs/MASTER_SPEC.md)**. Read it and its referenced documents before starting work.
- Current milestone: **04 — Market Data Engine**. Milestones 01–03 are complete.

## Coding Rules

- Never duplicate code. Reuse existing utilities (`src/core/text-utils.ts`, `DomReader`, `Logger`).
- Always keep business logic modular and in `src/core/`; never inside React components.
- Follow existing conventions before introducing new patterns.
- No hardcoded DOM selectors outside centralized `selectors.ts` files.
- No direct `console.*` in modules — use the `Logger` abstraction.
- Do not add comments unless they explain non-obvious decisions.

## Architecture Rules

- Never introduce circular dependencies.
- Prefer composition over inheritance.
- Use dependency injection at module boundaries; provide default implementations.
- The background service worker owns cross-context state; UI never computes it.
- Never scrape TradingView internals or use undocumented APIs.
- Partial failure is preferred: a failing component drops only its own output.

## React Rules

- Business logic lives in `src/core/`; components only render and dispatch.
- Use shared components in `src/components/`; CSS Modules for styling; theme tokens only.
- Typed props with explicit unions for variants; no inline styles.

## TypeScript Rules

- Strict mode; no `any`.
- Use interfaces for object shapes at boundaries; `as const`/`Readonly` for config maps.
- Exhaustive `switch` with a `never` default for discriminated unions.

## Testing Rules

- Unit-test all pure parsing/utility/rule logic (`*.test.ts` co-located, Vitest).
- Cover valid, invalid, empty, and edge cases.
- Keep tests deterministic — fake timers for debounce, no network, no real DOM.

## Documentation Rules

- Every document has Title, Purpose, Last Updated, Related Documents.
- Always update documentation when features change (part of Definition of Done).
- Cross-reference instead of duplicating; reference `docs/MASTER_SPEC.md` rather than repeating it.
- Keep the changelog (`docs/CHANGELOG.md`) in sync with completed work.

## Git Commit Rules

- Concise, conventional commit messages (`feat:`, `fix:`, `refactor:`, `docs:`, `test:`, `chore:`).
- Commit only what the task asked for; never commit secrets or artifacts.
- Only commit/amend/push when explicitly requested.

## Definition of Done

A task is done only when **all** of the following pass:

1. Build: `pnpm build:extension`
2. Type check: `pnpm exec tsc --noEmit` (in `apps/extension`)
3. Lint: `pnpm exec eslint src/ --ext .ts,.tsx` (in `apps/extension`)
4. Tests: `pnpm test`
5. Format: `pnpm exec prettier --check` on changed files
6. Documentation and `docs/CHANGELOG.md` updated if behavior changed
7. No duplicate code; no business logic in components; no circular dependencies
