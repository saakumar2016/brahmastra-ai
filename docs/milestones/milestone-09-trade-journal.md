# Milestone 09 — Trade Journal

> **Purpose:** Record trades and strategy performance for review, plus watchlist management.
> **Last Updated:** 2026-08-02
> **Related Documents:** [Master Spec](../MASTER_SPEC.md) · [Trade Journal feature](../03-features/trade-journal.md) · [Entities](../05-database/entities.md) · [Broker Integration](milestone-10-broker-integration.md)

## Status

⏳ **Not Started**

## Objective

Record trades and strategy performance so the trader can review what worked, where, and when — plus a watchlist for the scanner.

## Background

Consistent trading requires feedback. A journal turns decisions into data and links outcomes back to the strategies that produced them.

## Deliverables

- Journal entities + local-first storage
- Trade entry (manual + broker import later)
- Per-strategy stats: win rate, expectancy, avg RR, count
- Filters (market, timeframe, date range)
- Watchlist management

## Task Checklist

| Task ID | Title                                             | Priority | Size | Deps    | Status |
| ------- | ------------------------------------------------- | -------- | ---- | ------- | ------ |
| M09-T01 | Journal entities + local-first storage            | High     | L    | M06     | Ready  |
| M09-T02 | Trade entry (manual)                              | High     | M    | M09-T01 | Ready  |
| M09-T03 | Per-strategy stats (win rate, expectancy, avg RR) | High     | M    | M09-T01 | Ready  |
| M09-T04 | Filters (market, timeframe, date range)           | Medium   | M    | M09-T01 | Ready  |
| M09-T05 | Watchlist management                              | Medium   | M    | M09-T01 | Ready  |

> Status is authoritative in [`../../TASK_QUEUE.md`](../../TASK_QUEUE.md).

## Out of Scope

- Trade advice
- Social sharing

## Dependencies

- Milestone 06 (signal linkage: trades record the signal that produced them).

## Folder Changes

`src/core/journal/`

## Architecture Impact

- Introduces local-first persistence for domain data (`chrome.storage`/IndexedDB), the model for sync-ready schemas later.
- Defines journal entities in [`05-database/entities.md`](../05-database/entities.md) and links trades to strategies/signals.
- Stats computations are pure functions in `src/core/` (deterministic, testable).

## Acceptance Criteria

- Trades link to the strategy/signal that produced them
- Stats are deterministic and testable
- Works fully offline; sync-ready schema

## Testing

- Manual: enter a few trades across strategies/symbols → verify stats, filters, and journal persistence across reloads.
- Unit tests for stats calculations (win rate, expectancy, avg RR) and persistence logic.

## Definition of Done

- All acceptance criteria met; tests green; build/typecheck/lint/format pass.
- Entities documented and changelog updated.

## Future Improvements

- Backend sync across devices
- Strategy analytics visualizations
- Watchlist feeds the scanner (see `docs/03-features/scanner.md`)

## Risks

- **Schema churn** — journal schema may evolve; mitigated by a sync-ready, versioned schema from the start.
- **Data loss** — local-first storage can be cleared; mitigated by export capability and future sync.
