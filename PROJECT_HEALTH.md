# Project Health

> **Purpose:** Repository quality dashboard. Re-verify the gates before each release and after significant refactors; update this file when the numbers change.
> **Last Updated:** 2026-08-02
> **Related Documents:** [Project State](PROJECT_STATE.md) · [Task Queue](TASK_QUEUE.md) · [Product Backlog](docs/PRODUCT_BACKLOG.md) · [Testing Strategy](docs/06-testing/testing-strategy.md) · [Master Spec](docs/MASTER_SPEC.md)

## Gate Verification Matrix (verified 2026-08-02)

| Gate        | Command                                | Result  | Notes                                           |
| ----------- | -------------------------------------- | ------- | ----------------------------------------------- |
| Build       | `pnpm build:extension`                 | ✅ PASS | `tsc && vite build` → `apps/extension/dist`     |
| Tests       | `pnpm test`                            | ✅ PASS | 54/54 tests, 4 files                            |
| Lint        | `pnpm exec eslint src/ --ext .ts,.tsx` | ✅ PASS | 0 errors (run in `apps/extension`)              |
| Type safety | `pnpm exec tsc --noEmit`               | ✅ PASS | strict mode, 0 errors (run in `apps/extension`) |
| Format      | `pnpm format:check`                    | ✅ PASS | Prettier clean across repo                      |
| Coverage    | —                                      | ⚠️ N/A  | No coverage instrumentation configured          |

## Summary

| Area                     | Status | Detail                                                                                                   |
| ------------------------ | ------ | -------------------------------------------------------------------------------------------------------- |
| **Build Status**         | 🟢     | Extension builds cleanly to `dist/`.                                                                     |
| **Tests**                | 🟢     | 54 passing (parsing, normalization, indicator alias, price).                                             |
| **Coverage**             | 🟡     | Not instrumented; pure-logic functions are the priority for future coverage.                             |
| **Lint**                 | 🟢     | Direct eslint clean; see Known Issues for the turbo gap.                                                 |
| **Type Safety**          | 🟢     | Strict TS, no `any`, exhaustive unions.                                                                  |
| **Architecture Health**  | 🟢     | Matches `docs/01-architecture/`: background owns state, `src/core/` is UI-independent, DI at boundaries. |
| **Technical Debt**       | 🟡     | Tracked in [`PRODUCT_BACKLOG.md`](docs/PRODUCT_BACKLOG.md) and `INFRA-T01..04`.                          |
| **Documentation Health** | 🟢     | 60+ documents; link/duplicate/consistency validation clean; Prettier clean.                              |
| **Known Issues**         | 🟡     | See below.                                                                                               |
| **Next Milestone**       | —      | 04 — Market Data Engine (task `M04-T01` is next).                                                        |

## Known Issues

1. **Turbo gate gap (High).** `pnpm lint` / `pnpm typecheck` invoke `turbo lint|typecheck`, but `apps/extension/package.json` defines no `lint`/`typecheck` scripts, so turbo runs **0 tasks**. Mitigation: run the direct commands in the matrix above until `INFRA-T01` lands.
2. **Version drift (Medium).** Code (`manifest.json`, `package.json`) is `0.1.0` while `docs/CHANGELOG.md` documents releases through `0.3.0`. `INFRA-T02`.
3. **Docs consolidation pending (Low).** `docs/ARCHITECTURE.md` duplicates `01-architecture/` content; scheduled for consolidation. `INFRA-T04`.
4. **Build warnings (Low).** `@crxjs` emits deprecated-esbuild-options warnings; tracked in the backlog.

## Technical Debt

See [Product Backlog → Technical Debt](docs/PRODUCT_BACKLOG.md) and the `INFRA-*` rows in [TASK_QUEUE.md](TASK_QUEUE.md). Debt is sized, prioritized, and assigned a status — never hidden.

## Re-verification Cadence

- **Every session:** the gates for the task being worked (per Definition of Done in `CLAUDE.md`).
- **Before each release:** full matrix above + `docs/07-deployment/production-checklist.md`.
- **Update this file** when: a gate's status changes, a known issue is resolved, or coverage is introduced.
