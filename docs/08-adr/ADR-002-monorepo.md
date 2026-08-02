# ADR-002 — Monorepo

> **Purpose:** Record the decision to organize the codebase as a pnpm + Turbo monorepo.
> **Last Updated:** 2026-08-02
> **Related Documents:** [Folder Structure](../01-architecture/folder-structure.md) · [Master Spec](../MASTER_SPEC.md)

- **Status:** Accepted
- **Decision:** Use a **pnpm workspace monorepo with Turbo** as the task runner.
- **Context:** The project will grow from one extension into multiple shared packages (core engines, shared UI, and later a backend). A monorepo keeps shared code versioned together, enables consistent lint/typecheck/test tasks, and avoids publishing boilerplate.
- **Alternatives:**
  - Single package — simpler initially but forces the future backend and shared libraries to live awkwardly or become separate repos.
  - npm workspaces alone — fine for linking, but no built-in caching/task orchestration; Turbo adds it.
  - Lerna/Nx — heavier or more opinionated than needed.
- **Consequences:**
  - Strict workspace boundaries must be maintained (`apps/*`, `packages/*`).
  - All shared packages must resolve within the workspace; no cross-app private duplication.
  - Turbo tasks (`lint`, `typecheck`, `test`, `build`) are the standard entry points.
- **Date:** 2026-08-02
