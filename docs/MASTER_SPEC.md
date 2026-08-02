# Master Specification

> **Purpose:** The single source of truth for Brahmastra AI — product, architecture, standards, and workflow. Future documents reference this instead of repeating content.
> **Last Updated:** 2026-08-02
> **Related Documents:** [Docs index](README.md) · [Constitution](../BRAHMASTRA_CONSTITUTION.md) · [CLAUDE.md](../CLAUDE.md) · [Project State](../PROJECT_STATE.md) · [Task Queue](../TASK_QUEUE.md) · [Roadmap](00-project/roadmap.md) · [Milestones](00-project/milestones.md)

---

## 1. Product Vision

Brahmastra AI is an **AI-powered trading assistant** that runs as a Chrome Extension (Manifest V3) inside TradingView. The north star: _every trader should be able to evaluate their trading ideas on TradingView with the rigor of an analyst and the speed of automation — without leaving the chart._

- The product **sees** the same chart the trader sees.
- It **thinks** in pluggable trading strategies.
- It **speaks** through a floating assistant grounded in real chart data.
- It **acts** with one-click, user-confirmed broker execution.
- It **remembers** through a trade journal and strategy analytics.

> Details: [`00-project/product-vision.md`](00-project/product-vision.md) · [`00-project/project-overview.md`](00-project/project-overview.md)

## 2. Product Goals

1. Automate consistent, rule-based strategy evaluation on the current chart.
2. Combine strategies into one explained, confidence-scored signal.
3. Provide a grounded AI assistant that never invents data.
4. Complete the loop: signal → one-click (confirmed) execution.
5. Compound learning through journal and strategy analytics.

## 3. Target Users

- Technical traders who live in TradingView.
- Traders who want consistent, automated strategy evaluation.
- Traders who want AI assistance grounded in their actual charts.

## 4. High-Level Architecture

```
Browser
  TradingView page ── content script (detection + context extraction)
        │  runtime messages
  Background service worker (state owner: detection today; signals/broker later)
        │
  Popup │ Side Panel │ Floating Assistant  (React UI, reads state from background)
        │ HTTPS (planned)
  Backend (planned): AI analysis, market data, notifications, durable storage
```

Key rules:

- The **background service worker owns cross-context state**; UI never computes it.
- **`src/core/` is UI-independent** and strictly typed.
- The extension **works fully offline**; the backend is an accelerator, not a prerequisite.
- **Partial failure is always preferred** over discarding good data.

> Details: [`01-architecture/architecture.md`](01-architecture/architecture.md) · [`01-architecture/extension-architecture.md`](01-architecture/extension-architecture.md) · [`01-architecture/backend-architecture.md`](01-architecture/backend-architecture.md)

## 5. Modules

| Module               | Location (planned)           | Milestone | Feature doc                                             |
| -------------------- | ---------------------------- | --------- | ------------------------------------------------------- |
| Chart Context Engine | `src/core/context/`          | 03        | [chart-context](03-features/chart-context.md)           |
| Market Data Engine   | `src/core/market-data/`      | 04        | [market-data-engine](03-features/market-data-engine.md) |
| Strategy Engine      | `src/core/strategy/`         | 05        | [strategy-engine](03-features/strategy-engine.md)       |
| Signal Engine        | `src/core/signal/`           | 06        | [signal-engine](03-features/signal-engine.md)           |
| Floating Assistant   | `src/ui/floating-assistant/` | 07        | [floating-assistant](03-features/floating-assistant.md) |
| Notifications        | `src/core/notifications/`    | 08        | [notifications](03-features/notifications.md)           |
| Trade Journal        | `src/core/journal/`          | 09        | [trade-journal](03-features/trade-journal.md)           |
| Broker Integration   | `src/core/broker/`           | 10        | [broker-integration](03-features/broker-integration.md) |
| AI Assistant         | `src/core/ai/`               | 11        | [ai-assistant](03-features/ai-assistant.md)             |
| Scanner / Watchlist  | consumer of 04–06            | 09+       | [scanner](03-features/scanner.md)                       |
| Strategy Builder     | UI over 05                   | 05+       | [strategy-builder](03-features/strategy-builder.md)     |
| Risk Management      | across 05/09/10              | 10/12     | [risk-management](03-features/risk-management.md)       |

## 6. Folder Structure

```
brahmastra-ai/
├── apps/extension/          # Chrome Extension (MV3)
│   └── src/
│       ├── components/      # Reusable React UI
│       ├── core/            # UI-independent engines (context/, market-data/, …)
│       ├── theme/ styles/   # Design tokens + base styles
│       ├── popup/ sidepanel/ ui/  # React apps + floating assistant
│       ├── background/      # Service worker (state owner)
│       ├── content/         # Content script + watcher + scheduler
│       ├── shared/          # Messaging + detection contracts
│       └── types/
├── packages/                # Shared libraries (future)
└── docs/                    # This documentation set
```

> Details: [`01-architecture/folder-structure.md`](01-architecture/folder-structure.md)

## 7. Coding Standards

- **Strict TypeScript**, no `any`, exhaustive discriminated unions.
- **SOLID**; dependency injection at module boundaries.
- **No business logic in React components**; logic stays in `src/core/`.
- **Composition over inheritance**; no circular dependencies.
- **Centralized selectors** and a throwing-proof `DomReader` for DOM access.
- **Logger abstraction** (`src/core/logger.ts`) — no direct `console.*` in modules.
- **Prettier + ESLint** enforced; test files excluded from production builds.

> Details: [`01-architecture/coding-standards.md`](01-architecture/coding-standards.md) · [`CLAUDE.md`](../CLAUDE.md)

## 8. Documentation Rules

- This document is the source of truth; other docs **reference it instead of repeating** it.
- Every document has **Title, Purpose, Last Updated, Related Documents**.
- Use **relative markdown links** between documents.
- Documentation is updated when features change (see Definition of Done).
- `docs/` layout is a living portal, indexed from [`docs/README.md`](README.md).

## 9. Security Principles

- Minimal permission surface (`storage` today); least privilege always.
- Credentials/API keys encrypted at rest, never logged or committed.
- All external calls from the **background**, never the content script.
- Order placement always requires **explicit user confirmation**.
- Keep dependencies current; audit on every release.

> Details: [`SECURITY.md`](SECURITY.md)

## 10. Testing Philosophy

- **Unit tests** for pure parsing/utility/rule logic (no DOM) — the majority.
- **Integration tests** across module boundaries with injected fakes.
- **E2E (planned)** in a real browser against TradingView-like fixtures.
- **Partial-failure paths are first-class test cases.**
- Deterministic tests only — fake timers for debounce, no network.

> Details: [`06-testing/testing-strategy.md`](06-testing/testing-strategy.md)

## 11. Development Workflow

Work is executed through the **[Engineering Workflow](#15-engineering-workflow)** (section 15), driven by the task life cycle in [`TASK_QUEUE.md`](../TASK_QUEUE.md):

1. Pick the highest-priority **Ready** task from the current milestone (see [`TASK_QUEUE.md`](../TASK_QUEUE.md) and [`PROJECT_STATE.md`](../PROJECT_STATE.md)).
2. Implement with DI + pure logic in `src/core/`, UI in `src/ui|popup|sidepanel`.
3. Add/update tests; run the verification gates (build, typecheck, lint, tests, format).
4. Update documentation, the changelog, and the project-state files.
5. Merge via PR; Definition of Done must be met.

> Details: [`DEVELOPMENT_GUIDE.md`](DEVELOPMENT_GUIDE.md) · [`CLAUDE.md`](../CLAUDE.md) · [section 15](#15-engineering-workflow)

## 12. Release Strategy

- Semantic versioning; milestone-aligned releases.
- Gates: lint → typecheck → tests → build → smoke test in a clean Chrome profile.
- Store submission from `dist/`; tagged releases with rollback builds retained.

> Details: [`07-deployment/release-process.md`](07-deployment/release-process.md) · [`07-deployment/production-checklist.md`](07-deployment/production-checklist.md)

## 13. Milestone Overview

| #   | Milestone                  | Status         |
| --- | -------------------------- | -------------- |
| 01  | Foundation                 | ✅ Completed   |
| 02  | Chrome Extension Core      | ✅ Completed   |
| 03  | TradingView Context Engine | ✅ Completed   |
| 04  | Market Data Engine         | 🚧 In Progress |
| 05  | Strategy Engine            | ⏳ Not Started |
| 06  | Signal Engine              | ⏳ Not Started |
| 07  | Floating Assistant         | ⏳ Not Started |
| 08  | Notifications              | ⏳ Not Started |
| 09  | Trade Journal              | ⏳ Not Started |
| 10  | Broker Integration         | ⏳ Not Started |
| 11  | AI Assistant               | ⏳ Not Started |
| 12  | Production Release         | ⏳ Not Started |

> Details: [`00-project/roadmap.md`](00-project/roadmap.md) · [`00-project/milestones.md`](00-project/milestones.md) · [`milestones/`](milestones/)

## 14. Future Vision

- Watchlist/scanner across instruments.
- Journal-aware AI coaching and strategy explanation.
- Push notifications via the backend.
- Additional brokers, advanced order types.
- Low priority: social trading, mobile companion app.

## 15. Engineering Workflow

Every unit of work flows through the same loop. The loop is executed **one task at a time** and driven by the autonomous "work next" command (see [`CLAUDE.md`](../CLAUDE.md)).

```
Milestone
  └─▶ Task Queue        pick highest-priority Ready task (TASK_QUEUE.md)
       └─▶ Architecture Review   check docs/01-architecture + related ADR
            └─▶ Implementation    exactly one task; DI + src/core/, UI via background contract
                 └─▶ Testing      unit/integration; partial-failure paths included
                      └─▶ Documentation   feature/milestone doc + ADR if decision
                           └─▶ Review      Definition of Done gates + code-review checklist
                                └─▶ Update Project State   PROJECT_STATE.md
                                     └─▶ Update Task Queue  TASK_QUEUE.md (move task to Completed)
                                          └─▶ Update Roadmap ROADMAP_PROGRESS.md + CHANGELOG.md
                                               └─▶ Stop — wait for approval
```

Rules of the loop:

- **One task per iteration.** Never combine tasks.
- **Dependencies verified before starting** — the task's deps must be `Completed` in `TASK_QUEUE.md`.
- **Architecture review before code** — confirm the change fits the documented architecture; update ADR/docs when it does not.
- **Documentation updates are part of the task**, not an afterthought.
- **State files stay current** — `PROJECT_STATE.md`, `TASK_QUEUE.md`, `ROADMAP_PROGRESS.md`, `PROJECT_HEALTH.md` are updated in the same iteration.
- **Stop and summarize** — the next iteration is a separate, explicit request.

> Details: [`TASK_QUEUE.md`](../TASK_QUEUE.md) · [`CLAUDE.md`](../CLAUDE.md) · [`DEVELOPMENT_GUIDE.md`](DEVELOPMENT_GUIDE.md) · [`06-testing/testing-strategy.md`](06-testing/testing-strategy.md)
