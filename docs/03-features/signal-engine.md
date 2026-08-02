# Signal Engine (Feature)

> **Purpose:** Feature spec for aggregating strategy results into a unified, explained signal.
> **Last Updated:** 2026-08-02
> **Related Documents:** [Master Spec](../MASTER_SPEC.md) · [Milestone 06](../milestones/milestone-06-signal-engine.md) · [Strategy Engine](strategy-engine.md) · [Notifications](notifications.md)

## Summary

Combines the results of multiple strategies into a **unified trading signal** — a single `buy` / `sell` / `neutral` conclusion with a confidence score and a readable explanation.

## Why

One strategy says buy, another says sell. The Signal Engine aggregates them into one actionable answer, weighted by confidence and relevance, instead of leaving the trader to reconcile contradictions.

## Key Capabilities

- Aggregate strategy results into a unified signal.
- Confidence scoring (agreement, strategy weights, market conditions).
- Per-strategy contribution breakdown (why this signal).
- Deterministic and auditable — the same inputs produce the same signal.
- Optional watchlist mode: evaluate a list of symbols (scanner).

## Design Points

- Lives in `src/core/signal/` (planned).
- Depends on Strategy Engine results, not on raw DOM.
- Renders via `SignalBadge` / `StrategyCard` components.

## Non-Goals

- Order placement.
- Notifications.

## Dependencies

- Strategy Engine (05).

## Milestone

[`milestone-06-signal-engine.md`](../milestones/milestone-06-signal-engine.md)
