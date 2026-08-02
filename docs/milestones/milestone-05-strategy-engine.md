# Milestone 05 — Strategy Engine

> **Purpose:** Evaluate multiple trading strategies independently and combine them into a unified signal.
> **Last Updated:** 2026-08-02
> **Related Documents:** [Master Spec](../MASTER_SPEC.md) · [Strategy Engine feature](../03-features/strategy-engine.md) · [Roadmap](../00-project/roadmap.md) · [Market Data Engine](milestone-04-market-data-engine.md) · [Signal Engine](milestone-06-signal-engine.md)

## Status

⏳ **Not Started**

## Objective

Build a modular strategy engine capable of evaluating multiple trading strategies independently and combining them into a unified trading signal.

## Background

The Strategy Engine is the heart of Brahmastra AI. Every future feature (AI, notifications, broker execution, scanner) depends on this module. It consumes the chart context (03) and candle series (04) and produces typed, explainable strategy results.

## Deliverables

- Strategy Interface
- Strategy Manager
- Strategy Registry
- Strategy Result
- Strategy Configuration
- Rule Evaluation

## Task Checklist

| Task ID | Title                                             | Priority | Size | Deps        | Status |
| ------- | ------------------------------------------------- | -------- | ---- | ----------- | ------ |
| M05-T01 | `Strategy` interface + `StrategyResult` types     | High     | M    | M03, M04    | Ready  |
| M05-T02 | Strategy registry                                 | High     | S    | M05-T01     | Ready  |
| M05-T03 | Strategy manager + configuration validation       | High     | M    | M05-T01     | Ready  |
| M05-T04 | Rule evaluation building blocks                   | Medium   | L    | M05-T01     | Ready  |
| M05-T05 | Sample strategies (trend, mean-reversion) + tests | Medium   | M    | M05-T03..04 | Ready  |

> Status is authoritative in [`../../TASK_QUEUE.md`](../../TASK_QUEUE.md).

## Out of Scope

- AI
- Order Placement
- Notifications

## Dependencies

- Milestone 03 (chart context)
- Milestone 04 (market data / candle series)

## Folder Changes

`src/core/strategy/`

## Architecture Impact

- Defines the `Strategy` contract that all future strategies (and the Signal Engine) depend on.
- Keeps rule evaluation pure and UI-independent inside `src/core/`, mirroring the context-engine pattern (03).
- Registry pattern enables pluggability without engine changes.

## Acceptance Criteria

- Strategies are pluggable
- No hardcoded conditions
- Unit tests pass
- Fully typed

## Testing

- Unit tests for rule evaluation, configuration validation, and registry behavior (Vitest).
- Manual: register several sample strategies (trend, mean-reversion), evaluate against a chart context + candle series, verify each returns a typed `StrategyResult` with reasons and conditions; verify a malformed strategy config fails validation, not the engine.

## Definition of Done

- All acceptance criteria met; tests green; build/typecheck/lint/format pass.
- Strategy contract documented in [`03-features/strategy-engine.md`](../03-features/strategy-engine.md).
- Changelog updated.

## Future Improvements

- Strategy versioning
- Backtesting preview
- Strategy Builder UI (see `docs/03-features/strategy-builder.md`)

## Risks

- **Strategy design sprawl** — many strategies can complicate the registry; mitigated by a strict shared contract and configuration validation.
- **Data coupling** — rules must run on deterministic series (04); mitigated by the normalized candle model.
