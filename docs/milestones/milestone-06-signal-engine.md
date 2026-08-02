# Milestone 06 — Signal Engine

> **Purpose:** Combine multiple strategy results into a single, explained, confidence-scored signal.
> **Last Updated:** 2026-08-02
> **Related Documents:** [Master Spec](../MASTER_SPEC.md) · [Signal Engine feature](../03-features/signal-engine.md) · [Strategy Engine](milestone-05-strategy-engine.md) · [Notifications](milestone-08-notifications.md)

## Status

⏳ **Not Started**

## Objective

Combine the results of multiple strategies into a **single, explained, confidence-scored signal** (`buy` / `sell` / `neutral`) for the current chart.

## Background

Multiple strategies will disagree. The Signal Engine aggregates them into one actionable conclusion — weighted, auditable, and explainable — instead of leaving the trader to reconcile contradictions.

## Deliverables

- Signal types (`Signal`, contributions)
- Aggregation logic with confidence scoring
- Per-strategy contribution breakdown (why this signal)
- `SignalBadge` / `StrategyCard` UI components
- Watchlist evaluation path (basis for the scanner)

## Task Checklist

| Task ID | Title                                 | Priority | Size | Deps    | Status |
| ------- | ------------------------------------- | -------- | ---- | ------- | ------ |
| M06-T01 | `Signal` types + contributions        | High     | S    | M05     | Ready  |
| M06-T02 | Aggregation + confidence scoring      | High     | L    | M06-T01 | Ready  |
| M06-T03 | `SignalBadge` / `StrategyCard` UI     | Medium   | M    | M06-T02 | Ready  |
| M06-T04 | Watchlist evaluation path             | Medium   | M    | M06-T02 | Ready  |
| M06-T05 | Tests (determinism, confidence edges) | High     | M    | M06-T02 | Ready  |

> Status is authoritative in [`../../TASK_QUEUE.md`](../../TASK_QUEUE.md).

## Out of Scope

- Order placement
- Notifications

## Dependencies

- Milestone 05 (strategy results).

## Folder Changes

`src/core/signal/`, `src/components/` (signal UI)

## Architecture Impact

- Adds the aggregation layer above the Strategy Engine; **reuses** strategy results rather than re-running rules.
- Establishes the deterministic `Signal` contract consumed by the assistant, notifications, and execution.
- Deterministic confidence scoring keeps results auditable and testable.

## Acceptance Criteria

- Same inputs → same signal (deterministic)
- Signal includes per-strategy contribution + confidence
- Works for the current chart and for a watchlist
- Unit tests for aggregation and confidence edge cases

## Testing

- Unit tests for aggregation, confidence bounds (0..1), neutral cases, and determinism (Vitest).
- Manual: configure 2–3 strategies that disagree → verify a weighted signal with explanations; run the same chart twice → identical signal.

## Definition of Done

- All acceptance criteria met; tests green; build/typecheck/lint/format pass.
- Signal contract documented in [`03-features/signal-engine.md`](../03-features/signal-engine.md).
- Changelog updated.

## Future Improvements

- Market-regime-aware weighting
- Signal history and stats

## Risks

- **Confidence calibration** — naive weighting can mislead; mitigated by deterministic scoring and contribution breakdown.
- **Scope creep** — risk of pulling notifications/execution in early; deliberately deferred to 08/10.
