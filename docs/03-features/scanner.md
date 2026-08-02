# Scanner (Feature)

> **Purpose:** Feature spec for evaluating a watchlist through the Strategy/Signal engines.
> **Last Updated:** 2026-08-02
> **Related Documents:** [Master Spec](../MASTER_SPEC.md) · [Product Backlog](../PRODUCT_BACKLOG.md) · [Strategy Engine](strategy-engine.md) · [Signal Engine](signal-engine.md) · [Trade Journal](trade-journal.md)

## Summary

Evaluates a **watchlist of symbols** through the Strategy/Signal engines and surfaces which instruments currently show signals — a screen inside Brahmastra AI.

## Why

Traders monitor many instruments, not just the open chart. The scanner applies the same engines to many symbols so no watchlist item is missed.

## Key Capabilities

- Watchlist of symbols (managed with the Trade Journal/watchlist feature).
- Run strategies/signals across the watchlist (market data permitting).
- Sort/filter by signal, confidence, or symbol.
- One-click open the chart of a scanned symbol.
- Optional: turn scans into notifications (Milestone 08).

## Design Points

- A consumer of the Strategy + Signal engines — no logic duplication.
- Rate-limited to respect data sources.

## Non-Goals

- Real-time level-2 scanning.

## Dependencies

- Strategy (05), Signal (06), Market Data (04).

## Milestone

- Part of [Milestone 09](../milestones/milestone-09-trade-journal.md) (watchlist) and later milestone 12 hardening; scanning UI follows signal engine availability.
