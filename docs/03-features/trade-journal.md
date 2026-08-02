# Trade Journal (Feature)

> **Purpose:** Feature spec for recording trades and reviewing strategy performance.
> **Last Updated:** 2026-08-02
> **Related Documents:** [Master Spec](../MASTER_SPEC.md) · [Milestone 09](../milestones/milestone-09-trade-journal.md) · [Entities](../05-database/entities.md) · [Broker Integration](broker-integration.md)

## Summary

Records trades and strategy performance so the trader can review **what worked, where, and when** — with analytics per strategy, market, and timeframe.

## Why

Consistent trading requires feedback. A journal turns decisions into data: which strategies win on which symbols/timeframes, and whether execution followed the signal.

## Key Capabilities

- Record trades (manual or imported from broker).
- Link trades to the strategy and signal that produced them.
- Per-strategy stats: win rate, expectancy, avg RR, count.
- Filter by market, timeframe, date range.
- Watchlist management (medium-priority companion).

## Design Points

- Lives in `src/core/journal/` (planned).
- Local-first storage with optional backend sync later.
- Data model matches `05-database/` entities.

## Non-Goals

- Trade advice; the journal reports, it does not judge.

## Dependencies

- Signal Engine (06); Broker Integration (10) for auto-import.

## Milestone

[`milestone-09-trade-journal.md`](../milestones/milestone-09-trade-journal.md)
