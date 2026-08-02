# Milestone 01 — Foundation

> **Purpose:** Establish the monorepo, tooling, and shared standards every later milestone builds on.
> **Last Updated:** 2026-08-02
> **Related Documents:** [Master Spec](../MASTER_SPEC.md) · [Milestones overview](../00-project/milestones.md) · [Folder Structure](../01-architecture/folder-structure.md) · [Coding Standards](../01-architecture/coding-standards.md) · [Change Log](../CHANGELOG.md)

## Status

✅ **Completed**

## Objective

Set up the monorepo, tooling, and shared standards that every future milestone builds on.

## Background

Brahmastra AI would grow from a single extension into multiple packages (core engines, shared UI, later a backend). Starting with a consistent workspace, lint/format/typecheck tooling, and a documentation structure prevents friction and keeps the codebase healthy as scope grows.

## Deliverables

- pnpm workspace + Turbo task runner
- Shared `tsconfig.base.json`, ESLint config, Prettier config
- Husky + lint-staged hooks
- `docs/` documentation structure
- Placeholder `apps/extension` scaffold

## Task Checklist

| Task ID | Title                                       | Priority | Size | Deps    | Status    |
| ------- | ------------------------------------------- | -------- | ---- | ------- | --------- |
| M01-T01 | pnpm workspace + Turbo task runner          | High     | M    | —       | Completed |
| M01-T02 | Shared tsconfig / ESLint / Prettier configs | High     | M    | M01-T01 | Completed |
| M01-T03 | Husky + lint-staged hooks                   | Medium   | S    | M01-T02 | Completed |
| M01-T04 | `apps/extension` scaffold                   | High     | M    | M01-T01 | Completed |
| M01-T05 | `docs/` structure + README                  | Medium   | M    | M01-T01 | Completed |

> Status is authoritative in [`../../TASK_QUEUE.md`](../../TASK_QUEUE.md).

## Out of Scope

- Any extension functionality
- UI

## Dependencies

- None (first milestone).

## Folder Changes

`./` (repo root configs), `apps/extension/`, `packages/`

## Architecture Impact

- Defines the workspace boundaries (`apps/*`, `packages/*`) and the task runner (`turbo`) used by all later work.
- Establishes ADR-002 (monorepo).

## Acceptance Criteria

- `pnpm install` works from a clean checkout
- `pnpm lint`, `pnpm format:check`, `pnpm typecheck` pass
- Pre-commit hooks run lint + format
- Repository structure matches [`folder-structure.md`](../01-architecture/folder-structure.md)

## Testing

- No application logic in this milestone; verification is tooling-based (install + root scripts).

## Definition of Done

- All acceptance criteria pass on a clean checkout.
- README documents setup and scripts.
- Workspace builds and formats cleanly.

## Future Improvements

- CI pipeline (lint/typecheck/test/build)
- GitHub Actions for releases

## Risks

- Low. Tooling churn (pnpm/Turbo version bumps) can cause friction — mitigated by pinning the package manager and lockfile.
