# CLAUDE.md — Project Instructions for Claude Code

> **Purpose:** Operating instructions for Claude Code (and other AI coding agents) working on Brahmastra AI.
> **Last Updated:** 2026-08-02
> **Related Documents:** [Constitution](BRAHMASTRA_CONSTITUTION.md) · [Master Spec](docs/MASTER_SPEC.md) · [Project State](PROJECT_STATE.md) · [Task Queue](TASK_QUEUE.md) · [Docs index](docs/README.md) · [Coding Standards](docs/01-architecture/coding-standards.md)

## Project Context

- Brahmastra AI is an AI-powered trading assistant delivered as a **Chrome Extension (Manifest V3)** that runs inside TradingView.
- Stack: pnpm workspace + Turbo, Vite + `@crxjs/vite-plugin`, React 18, TypeScript (strict), Vitest, CSS Modules + CSS custom-property theme.
- The single source of truth for the product is **[`docs/MASTER_SPEC.md`](docs/MASTER_SPEC.md)**. The highest-level charter is **[`BRAHMASTRA_CONSTITUTION.md`](BRAHMASTRA_CONSTITUTION.md)**.
- Current milestone: **04 — Market Data Engine**. Milestones 01–03 are complete. Live status: [`PROJECT_STATE.md`](PROJECT_STATE.md).

## Before You Start

1. Read [`BRAHMASTRA_CONSTITUTION.md`](BRAHMASTRA_CONSTITUTION.md) and [`docs/MASTER_SPEC.md`](docs/MASTER_SPEC.md).
2. Read [`PROJECT_STATE.md`](PROJECT_STATE.md) and [`TASK_QUEUE.md`](TASK_QUEUE.md) to learn the current task.
3. Read the relevant milestone doc in [`docs/milestones/`](docs/milestones/), feature doc in [`docs/03-features/`](docs/03-features/), and any related ADR in [`docs/08-adr/`](docs/08-adr/).
4. Read [`docs/DEVELOPMENT_GUIDE.md`](docs/DEVELOPMENT_GUIDE.md) for setup/run/debug.
5. Only then write code.

## Project Intelligence

The repository is self-describing:

| File                                                       | Answers                                   |
| ---------------------------------------------------------- | ----------------------------------------- |
| [`BRAHMASTRA_CONSTITUTION.md`](BRAHMASTRA_CONSTITUTION.md) | Why we exist; standing principles         |
| [`docs/MASTER_SPEC.md`](docs/MASTER_SPEC.md)               | What we build; the single source of truth |
| [`PROJECT_STATE.md`](PROJECT_STATE.md)                     | Where we are right now                    |
| [`TASK_QUEUE.md`](TASK_QUEUE.md)                           | What to do next; task status              |
| [`ROADMAP_PROGRESS.md`](ROADMAP_PROGRESS.md)               | Overall progress dashboard                |
| [`PROJECT_HEALTH.md`](PROJECT_HEALTH.md)                   | Gate/build/test/lint/type safety status   |
| [`DECISIONS.md`](DECISIONS.md)                             | Product decisions (why we chose what)     |
| [`docs/CHANGELOG.md`](docs/CHANGELOG.md)                   | What changed per release                  |
| [`docs/08-adr/`](docs/08-adr/)                             | Architecture decisions and rationale      |

## Autonomous Workflow

When the user writes **work next · continue · resume · next · proceed**:

1. Read `CLAUDE.md` (this file), `BRAHMASTRA_CONSTITUTION.md`, `docs/MASTER_SPEC.md`, `PROJECT_STATE.md`, `TASK_QUEUE.md`, the current milestone doc, and the related ADR.
2. Determine the **highest-priority Ready task** in the current milestone (see `TASK_QUEUE.md`).
3. Verify its dependencies are `Completed`.
4. Explain: goal, files, architecture impact, risks, implementation plan.
5. **Implement exactly ONE task.** Never multiple.
6. Run the verification gates (see Definition of Done).
7. Update `PROJECT_STATE.md`, `TASK_QUEUE.md`, `ROADMAP_PROGRESS.md`, `docs/CHANGELOG.md`, and the milestone doc.
8. Summarize what changed. **STOP** and wait for approval.

## Task Lifecycle

`Ready → In Progress → Review → Completed`. Exactly one task is `In Progress` at a time. Update statuses in `TASK_QUEUE.md` as work moves through the life cycle.

## Documentation Priority

- `BRAHMASTRA_CONSTITUTION.md` > `docs/MASTER_SPEC.md` > milestone docs > feature docs > implementation notes.
- Never duplicate a higher-priority document; cross-reference it.
- `docs/MASTER_SPEC.md` must remain the single source of truth.
- When in doubt, ask the user before inventing new process.

## Development Priority

- Correctness and tests first; then clarity; then performance (only when measured).
- Prefer the smallest correct change; avoid speculative generality.
- Reuse existing utilities (`src/core/text-utils.ts`, `DomReader`, `Logger`) before writing new ones.

## Coding Rules

- Never duplicate code. Reuse existing utilities.
- Always keep business logic modular and in `src/core/`; never inside React components.
- Follow existing conventions before introducing new patterns.
- No hardcoded DOM selectors outside centralized `selectors.ts` files.
- No direct `console.*` in modules — use the `Logger` abstraction.
- Do not add comments unless they explain non-obvious decisions.

## Engineering Principles

- **Correctness first** — deterministic, typed, tested.
- **Composition over inheritance**; small composable modules.
- **Dependency injection at module boundaries** with default implementations.
- **Fail partial, never fail wholesale** — a failing component drops only its own output.
- **Stable public contracts** — change internals, keep APIs.

## Architecture Rules

- Never introduce circular dependencies.
- The background service worker owns cross-context state; UI never computes it.
- Never scrape TradingView internals or use undocumented APIs.
- The extension is offline-first; the backend is an accelerator.
- Record architecture decisions in ADRs, not in commit messages alone.

## Architecture Guardian

- Check new work against [`docs/01-architecture/`](docs/01-architecture/): architecture.md, extension-architecture.md, communication-flow.md, folder-structure.md, coding-standards.md.
- Any change to a public contract, module boundary, or state ownership requires updating the corresponding doc and, if a decision is involved, an ADR.
- Flag architecture drift in `PROJECT_HEALTH.md` or `PRODUCT_BACKLOG.md` rather than silently diverging.

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
- Partial-failure paths are first-class test cases.

## Error Handling

- DOM reads never throw (`DomReader`); extraction never breaks the page.
- Fail partial: isolate failures per component and preserve successful output.
- Validate all external input (messages, payloads, DOM data) at module boundaries.
- Exhaustive unions make "impossible" states a compile error, not a runtime surprise.

## Logging Rules

- Use the `Logger` abstraction; never `console.*` in modules.
- Prefix context (e.g. `[Context]`); logging is disableable by flag.
- Never log tokens, keys, prices as secrets, or personal data.

## Performance Rules

- Debounce bursty work (DOM mutation → extraction).
- Cache repeated identical work; avoid re-fetch/recompute.
- Keep the bundle small; defer heavy work or offload to the backend.

## Security Rules

- Least privilege: minimal permissions; every permission reviewed per release.
- Secrets encrypted at rest, never logged, never committed, never sent to AI context.
- All external calls originate from the background, never the content script.
- Orders always require explicit user confirmation; dry-run for testing.
- Render all untrusted text via React; no `innerHTML` with untrusted data.

## Dependency Rules

- Add dependencies only when necessary; prefer stdlib/`src/shared` utilities.
- Update patched versions promptly; review `pnpm audit` before releases.
- Keep the lockfile committed for reproducible installs.

## Backward Compatibility

- Preserve stable public contracts (`getChartContext(): Promise<ChartContext>`, message types, entities).
- Version entities/schemas; migrate rather than break.
- Deprecate, don't delete, without a documented reason.

## Refactoring Policy

- Refactor only when it reduces net complexity or removes duplication.
- Refactoring must keep tests green and docs in sync in the same change.
- Large refactors are separate tasks in `TASK_QUEUE.md`, never slipped into feature work.

## Documentation Rules

- Every document has Title, Purpose, Last Updated, Related Documents.
- Always update documentation when features change (part of Definition of Done).
- Cross-reference instead of duplicating; reference `docs/MASTER_SPEC.md` rather than repeating it.
- Keep the changelog (`docs/CHANGELOG.md`) and project state in sync with completed work.

## Code Review Checklist

- No duplication; logic in `src/core/`, not components.
- Typed, no `any`; no circular dependencies; DI used at boundaries.
- Tests cover valid/invalid/empty/edge and partial failure.
- No secrets, no `console.*`, no hardcoded selectors.
- Docs, changelog, and task status updated.

## Feature Completion Checklist

- [ ] Behavior implemented in `src/core/` (UI-independent).
- [ ] UI consumes it via the background/messaging contract.
- [ ] Tests added; gates green.
- [ ] Feature doc, milestone task, and changelog updated.
- [ ] `TASK_QUEUE.md` + `PROJECT_STATE.md` + `ROADMAP_PROGRESS.md` updated.

## Repository Health

- Gates must pass (build, tsc, eslint, tests, format) — see `PROJECT_HEALTH.md`.
- The extension package lacks `lint`/`typecheck` scripts (turbo runs 0 tasks). Until `INFRA-T01` lands, run the direct commands listed in `PROJECT_HEALTH.md`.
- Never leave generated artifacts, secrets, or lint noise in commits.

## Future Feature Registry

- Unplanned ideas go to `PRODUCT_BACKLOG.md` (Future Ideas / Research), not into code.
- New product decisions go to `DECISIONS.md`; new architecture decisions go to `docs/08-adr/`.

## AI Behaviour

- Be honest: "I don't know" and "Unavailable" are valid answers.
- Never present fabricated data as fact; ground answers in real chart/strategy/journal data.
- AI never places orders; it assists the trader.
- When instructions are ambiguous, ask before acting — don't guess scope.

## Never Do

- Never modify application source code when a task is documentation-only.
- Never trade money, place orders, or fabricate prices/data.
- Never log, commit, or send secrets.
- Never scrape TradingView internals.
- Never implement multiple tasks in one session.
- Never regenerate the documentation set; improve and extend it.

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
6. Documentation, `docs/CHANGELOG.md`, and project-state files updated if behavior changed
7. No duplicate code; no business logic in components; no circular dependencies
8. Exactly one task completed and its status moved through the life cycle
