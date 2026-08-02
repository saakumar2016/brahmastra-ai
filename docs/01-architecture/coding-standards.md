# Coding Standards

> **Purpose:** Language, style, and code quality rules all contributions must follow.
> **Last Updated:** 2026-08-02
> **Related Documents:** [Master Spec](../MASTER_SPEC.md) · [CLAUDE.md](../../CLAUDE.md) · [Folder Structure](folder-structure.md) · [Testing Strategy](../06-testing/testing-strategy.md)

## TypeScript

- **Strict mode** — `strict: true` is always on. No `any`.
- **`noUncheckedIndexedAccess`** is honored by pattern where relevant (indexed reads are treated as possibly undefined).
- Prefer interfaces over type aliases for object shapes at module boundaries.
- Use `Readonly`/`as const` for immutable config and maps.
- Exhaustive `switch` with a `never` default for discriminated unions.

## Architecture & Design

- **SOLID** — single responsibility, open/closed, Liskov, interface segregation, dependency inversion.
- **Dependency injection** — constructors receive dependencies with sensible defaults (see `ChartContextExtractor`). No singletons unless justified (state owners).
- **Each detector/engine has one responsibility** and returns partial data on failure; never throw across module boundaries unless the caller is equipped to handle it.
- **Centralized selectors** — DOM selectors live in one file per engine (`selectors.ts`), not inline.
- **Barrels** — each engine exports a public API from `index.ts`.

## DOM Access

- All DOM reads go through a reader abstraction (e.g. `DomReader`) that never throws.
- Never depend on TradingView DOM element ordering unless it is a documented fallback.
- Never scrape undocumented APIs.

## Logging

- No direct `console.*` in modules. Use the `Logger` abstraction (`src/core/logger.ts`).
- Context modules log under a stable prefix (e.g. `[Context]`).
- Logging can be disabled via a flag without changing call sites.

## Naming

- Files: `kebab-case.ts`.
- Classes/Interfaces: `PascalCase`.
- Functions/variables: `camelCase`.
- Constants/aliases maps: `SCREAMING_SNAKE_CASE`.
- Test files: `*.test.ts` co-located next to the source.

## Tests

- Unit tests cover **pure parsing/utility logic** (no DOM integration).
- Valid, invalid, empty, and edge cases are all covered.
- Run: `cd apps/extension && pnpm test` (Vitest).

## Tooling

- Formatting: Prettier. Type checking: `tsc --noEmit`. Linting: ESLint (`@typescript-eslint`).
- CI-style verification before finishing a task:
  1. `pnpm build:extension` (root)
  2. `cd apps/extension && pnpm exec tsc --noEmit`
  3. `cd apps/extension && pnpm exec eslint src/ --ext .ts,.tsx`
  4. `cd apps/extension && pnpm test`

## Commit Hygiene

- No secrets in code or config.
- Only commit what the task asked for; never force-push or rewrite history.
