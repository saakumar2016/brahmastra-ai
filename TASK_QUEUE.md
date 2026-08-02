# Task Queue

> **Purpose:** The executable work tracker. One task per row; status is driven by the life cycle below. This is the file an agent reads to answer "work next".
> **Last Updated:** 2026-08-02
> **Related Documents:** [CLAUDE.md](CLAUDE.md) · [Project State](PROJECT_STATE.md) · [Roadmap Progress](ROADMAP_PROGRESS.md) · [Product Backlog](docs/PRODUCT_BACKLOG.md) · [Milestones](docs/milestones/)

## Task Lifecycle

```
Ready ──▶ In Progress ──▶ Review ──▶ Completed
   ▲                                    │
   └──────────── (blocked → back) ──────┘
```

- **Ready** — eligible to be picked up as the next unit of work.
- **In Progress** — actively being implemented (exactly one at a time).
- **Review** — implemented; awaiting verification gates / review.
- **Completed** — all gates passed, documentation updated, DoD met.

**Rule:** implement **exactly one** task per work session; then update statuses and stop.

## Priority & Size Legend

- **Priority:** High / Medium / Low
- **Size:** S (≤ half session) · M (≤ session) · L (> session)

## Relationship to Other Files

- **Milestone docs** (`docs/milestones/`) define _what_ a milestone delivers and contain the task checklist (Task ID, Priority, Size, Deps).
- **This file** is the _source of truth for task status_.
- **`PRODUCT_BACKLOG.md`** tracks feature-level priorities (Now / Next / Later) and links down to tasks here.
- **`PROJECT_STATE.md`** snapshots the single current task; **`ROADMAP_PROGRESS.md`** rolls progress up.

## Task Table

Status values: `Ready` · `In Progress` · `Review` · `Completed`.

### Milestone 01 — Foundation (Completed)

| Task ID | Title                                       | Priority | Size | Deps    | Status    |
| ------- | ------------------------------------------- | -------- | ---- | ------- | --------- |
| M01-T01 | pnpm workspace + Turbo task runner          | High     | M    | —       | Completed |
| M01-T02 | Shared tsconfig / ESLint / Prettier configs | High     | M    | M01-T01 | Completed |
| M01-T03 | Husky + lint-staged hooks                   | Medium   | S    | M01-T02 | Completed |
| M01-T04 | `apps/extension` scaffold                   | High     | M    | M01-T01 | Completed |
| M01-T05 | `docs/` structure + README                  | Medium   | M    | M01-T01 | Completed |

### Milestone 02 — Chrome Extension Core (Completed)

| Task ID | Title                                                        | Priority | Size | Deps             | Status    |
| ------- | ------------------------------------------------------------ | -------- | ---- | ---------------- | --------- |
| M02-T01 | MV3 manifest + Vite build wiring                             | High     | M    | M01-T04          | Completed |
| M02-T02 | Theme tokens + base styles                                   | Medium   | M    | M02-T01          | Completed |
| M02-T03 | Shared components (Button, Card, Header, Layout, StatusCard) | Medium   | L    | M02-T02          | Completed |
| M02-T04 | Messaging layer (`MessageBus`, `MSG`)                        | High     | M    | M02-T01          | Completed |
| M02-T05 | Detection types + `TradingViewDetector`                      | High     | M    | M02-T04          | Completed |
| M02-T06 | `DetectionService` + `DetectionStore` (background)           | High     | M    | M02-T05          | Completed |
| M02-T07 | Content `page-watcher`                                       | Medium   | S    | M02-T05          | Completed |
| M02-T08 | Popup + Side Panel detection UI                              | Medium   | M    | M02-T03, M02-T06 | Completed |

### Milestone 03 — TradingView Context Engine (Completed)

| Task ID | Title                                       | Priority | Size | Deps        | Status    |
| ------- | ------------------------------------------- | -------- | ---- | ----------- | --------- |
| M03-T01 | `ChartContext` / `IndicatorInfo` types      | High     | S    | M02-T05     | Completed |
| M03-T02 | `DomReader` + `CONTEXT_SELECTORS`           | High     | M    | M03-T01     | Completed |
| M03-T03 | `SymbolDetector`                            | High     | M    | M03-T02     | Completed |
| M03-T04 | `IndicatorDetector` + indicator registry    | High     | M    | M03-T02     | Completed |
| M03-T05 | `PriceDetector`                             | Medium   | S    | M03-T02     | Completed |
| M03-T06 | `MarketDetector`                            | Medium   | S    | M03-T02     | Completed |
| M03-T07 | `ChartContextExtractor` facade (DI)         | High     | M    | M03-T03..06 | Completed |
| M03-T08 | `Logger` abstraction + `text-utils`         | High     | S    | —           | Completed |
| M03-T09 | Extraction scheduler (debounce + immediate) | High     | M    | M03-T07     | Completed |
| M03-T10 | Unit tests for parsing / utilities (54)     | High     | M    | M03-T03..09 | Completed |

### Milestone 04 — Market Data Engine (Current)

| Task ID | Title                                                    | Priority | Size | Deps          | Status    |
| ------- | -------------------------------------------------------- | -------- | ---- | ------------- | --------- |
| M04-T01 | Candle/OHLCV model + normalization                       | High     | M    | M03 (context) | Completed |
| M04-T02 | Data source abstraction (swappable page/backend)         | High     | M    | M04-T01       | Completed |
| M04-T03 | Fetch + cache for `(symbol, exchange, timeframe, range)` | High     | M    | M04-T02       | Ready     |
| M04-T04 | Graceful fallback when data is unavailable               | Medium   | S    | M04-T03       | Ready     |
| M04-T05 | Unit + integration tests (parsing, normalization, cache) | High     | M    | M04-T01..04   | Ready     |
| M04-T06 | Update docs: entities, feature doc, changelog            | Medium   | S    | M04-T05       | Ready     |

### Milestone 05 — Strategy Engine

| Task ID | Title                                             | Priority | Size | Deps        | Status |
| ------- | ------------------------------------------------- | -------- | ---- | ----------- | ------ |
| M05-T01 | `Strategy` interface + `StrategyResult` types     | High     | M    | M03, M04    | Ready  |
| M05-T02 | Strategy registry                                 | High     | S    | M05-T01     | Ready  |
| M05-T03 | Strategy manager + configuration validation       | High     | M    | M05-T01     | Ready  |
| M05-T04 | Rule evaluation building blocks                   | Medium   | L    | M05-T01     | Ready  |
| M05-T05 | Sample strategies (trend, mean-reversion) + tests | Medium   | M    | M05-T03..04 | Ready  |

### Milestone 06 — Signal Engine

| Task ID | Title                                 | Priority | Size | Deps    | Status |
| ------- | ------------------------------------- | -------- | ---- | ------- | ------ |
| M06-T01 | `Signal` types + contributions        | High     | S    | M05     | Ready  |
| M06-T02 | Aggregation + confidence scoring      | High     | L    | M06-T01 | Ready  |
| M06-T03 | `SignalBadge` / `StrategyCard` UI     | Medium   | M    | M06-T02 | Ready  |
| M06-T04 | Watchlist evaluation path             | Medium   | M    | M06-T02 | Ready  |
| M06-T05 | Tests (determinism, confidence edges) | High     | M    | M06-T02 | Ready  |

### Milestone 07 — Floating Assistant

| Task ID | Title                                  | Priority | Size | Deps         | Status |
| ------- | -------------------------------------- | -------- | ---- | ------------ | ------ |
| M07-T01 | Overlay shell (draggable, collapsible) | High     | M    | M02-T03      | Ready  |
| M07-T02 | Live context view                      | High     | M    | M07-T01, M03 | Ready  |
| M07-T03 | Strategy + signal view                 | High     | M    | M07-T01, M06 | Ready  |
| M07-T04 | Position/size persistence              | Medium   | S    | M07-T01      | Ready  |
| M07-T05 | Integration tests + accessibility      | Medium   | M    | M07-T02..04  | Ready  |

### Milestone 08 — Notifications

| Task ID | Title                                    | Priority | Size | Deps    | Status |
| ------- | ---------------------------------------- | -------- | ---- | ------- | ------ |
| M08-T01 | Notification types + notification center | High     | M    | M06     | Ready  |
| M08-T02 | Watch conditions (symbol × strategy)     | High     | M    | M08-T01 | Ready  |
| M08-T03 | Scheduled background evaluation (alarms) | High     | M    | M08-T02 | Ready  |
| M08-T04 | Deduplication + rate limiting            | High     | S    | M08-T03 | Ready  |
| M08-T05 | System notifications + click-through     | Medium   | M    | M08-T03 | Ready  |

### Milestone 09 — Trade Journal

| Task ID | Title                                             | Priority | Size | Deps    | Status |
| ------- | ------------------------------------------------- | -------- | ---- | ------- | ------ |
| M09-T01 | Journal entities + local-first storage            | High     | L    | M06     | Ready  |
| M09-T02 | Trade entry (manual)                              | High     | M    | M09-T01 | Ready  |
| M09-T03 | Per-strategy stats (win rate, expectancy, avg RR) | High     | M    | M09-T01 | Ready  |
| M09-T04 | Filters (market, timeframe, date range)           | Medium   | M    | M09-T01 | Ready  |
| M09-T05 | Watchlist management                              | Medium   | M    | M09-T01 | Ready  |

### Milestone 10 — Broker Integration

| Task ID | Title                                      | Priority | Size | Deps     | Status |
| ------- | ------------------------------------------ | -------- | ---- | -------- | ------ |
| M10-T01 | Broker interface (broker-agnostic)         | High     | M    | M06, M09 | Ready  |
| M10-T02 | Zerodha Kite driver                        | High     | L    | M10-T01  | Ready  |
| M10-T03 | Instrument-token mapping                   | High     | M    | M10-T01  | Ready  |
| M10-T04 | Order ticket UI with explicit confirmation | High     | M    | M10-T01  | Ready  |
| M10-T05 | Risk guardrails + dry-run mode             | High     | M    | M10-T01  | Ready  |

### Milestone 11 — AI Assistant

| Task ID | Title                                     | Priority | Size | Deps         | Status |
| ------- | ----------------------------------------- | -------- | ---- | ------------ | ------ |
| M11-T01 | AI service (swappable LLM provider)       | High     | M    | M06, M09     | Ready  |
| M11-T02 | Grounded prompt assembly + filtering      | High     | L    | M11-T01, M04 | Ready  |
| M11-T03 | Chat UI (Floating Assistant / Side Panel) | High     | M    | M11-T01, M07 | Ready  |
| M11-T04 | Citations + "I don't know" behavior       | High     | M    | M11-T02      | Ready  |
| M11-T05 | Backend AI endpoint wiring                | Medium   | M    | M11-T02      | Ready  |

### Milestone 12 — Production Release

| Task ID | Title                                       | Priority | Size | Deps        | Status |
| ------- | ------------------------------------------- | -------- | ---- | ----------- | ------ |
| M12-T01 | Production hardening (checklist)            | High     | L    | all M01–M11 | Ready  |
| M12-T02 | E2E smoke suite                             | High     | M    | M12-T01     | Ready  |
| M12-T03 | Release automation (tag, package, submit)   | High     | M    | M12-T01     | Ready  |
| M12-T04 | Store listing, privacy policy, support docs | Medium   | M    | M12-T01     | Ready  |
| M12-T05 | Feature flags + rollback path               | Medium   | M    | M12-T01     | Ready  |

### Cross-Cutting (Infrastructure)

| Task ID   | Title                                                                           | Priority | Size | Deps      | Status |
| --------- | ------------------------------------------------------------------------------- | -------- | ---- | --------- | ------ |
| INFRA-T01 | Add `lint`/`typecheck` scripts to `apps/extension` so turbo gates run           | High     | S    | —         | Ready  |
| INFRA-T02 | Align code version (manifest + package.json) with `CHANGELOG.md` releases       | Medium   | S    | —         | Ready  |
| INFRA-T03 | CI pipeline (lint → typecheck → test → build)                                   | Medium   | M    | INFRA-T01 | Ready  |
| INFRA-T04 | Consolidate `docs/ARCHITECTURE.md` into `01-architecture/` and retire duplicate | Low      | M    | —         | Ready  |

> Cross-cutting items also appear in [`PRODUCT_BACKLOG.md`](docs/PRODUCT_BACKLOG.md) under Technical Debt / Research; the status lives here only.

## How "work next" Resolves the Next Task

1. Read [PROJECT_STATE.md](PROJECT_STATE.md) → the current milestone is **04**.
2. Scan the table above for the current milestone's highest-priority task in **Ready** → `M04-T01`.
3. Verify its dependencies (M03 — context engine) are Completed.
4. Implement exactly that task; run gates; update this file, `PROJECT_STATE.md`, `ROADMAP_PROGRESS.md`, `docs/CHANGELOG.md`, and the milestone doc; stop.
