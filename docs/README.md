# Brahmastra AI — Documentation

> **Purpose:** Documentation portal — index to every document in the handbook, with a suggested reading order.
> **Last Updated:** 2026-08-02
> **Related Documents:** [Master Spec](MASTER_SPEC.md) · [Constitution](../BRAHMASTRA_CONSTITUTION.md) · [CLAUDE.md](../CLAUDE.md) · [Repository README](../README.md)

This folder is the single source of truth for **what we are building** and **how we build it**.

## Start Here

- **[`MASTER_SPEC.md`](MASTER_SPEC.md)** — single source of truth: vision, architecture, standards, milestones.
- **[`CLAUDE.md`](../CLAUDE.md)** — operating instructions for AI coding agents (rules + Definition of Done).
- **[`00-project/project-overview.md`](00-project/project-overview.md)** — what Brahmastra AI is.
- **[`00-project/roadmap.md`](00-project/roadmap.md)** — current milestone status (04 in progress).

## How the Files Relate

The repository is self-managing. Each file answers one question; no file duplicates another.

```
AGENTS.md                    → First file an AI agent reads (entry point to the governing docs)
BRAHMASTRA_CONSTITUTION.md   → Why we exist (vision, values, standing principles) — changes rarely
CLAUDE.md                    → How agents behave (rules, workflow, Definition of Done)
docs/MASTER_SPEC.md          → What we build (product + architecture, single source of truth)
docs/milestones/             → How we deliver (12 milestones, each with tasks + acceptance criteria)
docs/08-adr/                 → Architecture decisions (why the code is shaped this way)
PROJECT_STATE.md             → Where we are right now (current milestone, current task)
TASK_QUEUE.md                → What to do next (executable task list with life cycle)
ROADMAP_PROGRESS.md          → How far we've come (overall + per-milestone progress)
PROJECT_HEALTH.md            → How healthy the repo is (gates, tests, lint, type safety, debt)
DECISIONS.md                 → Product decisions (what we chose and why — non-architectural)
docs/PRODUCT_BACKLOG.md      → Feature-level backlog (Now / Next / Later / ideas / debt)
docs/CHANGELOG.md            → What changed per release
```

- **Milestones** describe implementation; **architecture docs** describe architecture; **ADRs** record architecture decisions; **DECISIONS.md** records product decisions.
- `docs/MASTER_SPEC.md` is the single source of truth; everything else references it.
- Task status lives in `TASK_QUEUE.md`; milestone checklists point to it.
- Writing **"work next"** → `CLAUDE.md` → `TASK_QUEUE.md` → `PROJECT_STATE.md` drives the next task.

## Documentation Map

| Document / Section                             | Purpose                                                  |
| ---------------------------------------------- | -------------------------------------------------------- |
| [`MASTER_SPEC.md`](MASTER_SPEC.md)             | Single source of truth for the product and standards     |
| [`PRODUCT_BACKLOG.md`](PRODUCT_BACKLOG.md)     | Working backlog: Now / Next / Later / ideas / tech debt  |
| [`CHANGELOG.md`](CHANGELOG.md)                 | Notable changes per release, Keep-a-Changelog format     |
| [`SECURITY.md`](SECURITY.md)                   | Security principles and requirements                     |
| [`DEVELOPMENT_GUIDE.md`](DEVELOPMENT_GUIDE.md) | Setup, run, debug, extend, test, build, release          |
| [`ARCHITECTURE.md`](ARCHITECTURE.md)           | Implementation-level record of the architecture as built |

### Repository-level management files

| File                                                             | Purpose                                                      |
| ---------------------------------------------------------------- | ------------------------------------------------------------ |
| [`../BRAHMASTRA_CONSTITUTION.md`](../BRAHMASTRA_CONSTITUTION.md) | Highest-level charter (vision, values, principles)           |
| [`../PROJECT_STATE.md`](../PROJECT_STATE.md)                     | Live operational snapshot (current milestone/task)           |
| [`../TASK_QUEUE.md`](../TASK_QUEUE.md)                           | Executable task list with life cycle (Ready → … → Completed) |
| [`../ROADMAP_PROGRESS.md`](../ROADMAP_PROGRESS.md)               | Overall + per-milestone progress dashboard                   |
| [`../PROJECT_HEALTH.md`](../PROJECT_HEALTH.md)                   | Gate/test/lint/type-safety/debt quality dashboard            |
| [`../DECISIONS.md`](../DECISIONS.md)                             | Product decisions and rationale (architecture → ADRs)        |

| Section                                | Purpose                                                                            |
| -------------------------------------- | ---------------------------------------------------------------------------------- |
| [`00-project/`](00-project/)           | Vision, overview, roadmap, milestones overview, glossary                           |
| [`01-architecture/`](01-architecture/) | System + extension architecture, communication, coding standards, folder structure |
| [`02-design/`](02-design/)             | UX principles, UI guidelines, design system, theme                                 |
| [`03-features/`](03-features/)         | Detailed feature specs (one per capability)                                        |
| [`04-api/`](04-api/)                   | Messaging + API contracts (extension, backend, broker)                             |
| [`05-database/`](05-database/)         | Entities and storage schema                                                        |
| [`06-testing/`](06-testing/)           | Testing strategy (unit / integration / e2e)                                        |
| [`07-deployment/`](07-deployment/)     | Build process, release process, production checklist                               |
| [`08-adr/`](08-adr/)                   | Architecture Decision Records                                                      |
| [`milestones/`](milestones/)           | Milestone-by-milestone delivery plan (01–12)                                       |

## Reading Order

1. **New to the project:** [`project-overview`](00-project/project-overview.md) → [`product-vision`](00-project/product-vision.md) → [`MASTER_SPEC`](MASTER_SPEC.md).
2. **Engineering onboarding:** [`CLAUDE.md`](../CLAUDE.md) → [`coding-standards`](01-architecture/coding-standards.md) → [`folder-structure`](01-architecture/folder-structure.md) → [`DEVELOPMENT_GUIDE`](DEVELOPMENT_GUIDE.md).
3. **Where we are:** [`roadmap`](00-project/roadmap.md) → [`milestones/`](milestones/) → [`PRODUCT_BACKLOG`](PRODUCT_BACKLOG.md).
4. **Where we have been:** [`CHANGELOG`](CHANGELOG.md) → [`08-adr/`](08-adr/).
5. **Safety:** [`SECURITY`](SECURITY.md) → [`production-checklist`](07-deployment/production-checklist.md).

## Naming Conventions

- Sections are prefixed `NN-` to enforce ordering.
- Feature files mirror the names in [`milestones/`](milestones/) and the future `src/core/` modules.
- ADRs follow the convention `ADR-NNN-short-slug.md` in [`08-adr/`](08-adr/).
- Every document has **Title, Purpose, Last Updated, Related Documents**.
- Cross-reference instead of duplicating; reference [`MASTER_SPEC.md`](MASTER_SPEC.md) rather than repeating it.
