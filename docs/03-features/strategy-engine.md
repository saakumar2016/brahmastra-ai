# Strategy Engine (Feature)

> **Purpose:** Feature spec for the modular, pluggable strategy evaluation engine.
> **Last Updated:** 2026-08-02
> **Related Documents:** [Master Spec](../MASTER_SPEC.md) · [Milestone 05](../milestones/milestone-05-strategy-engine.md) · [Signal Engine](signal-engine.md) · [Strategy Builder](strategy-builder.md) · [Market Data Engine](market-data-engine.md)

## Summary

A modular engine that evaluates **multiple trading strategies independently** and exposes the results for the current chart context. Strategies are pluggable modules — no hardcoded conditions.

## Why

The Strategy Engine is the **heart of Brahmastra AI**. Every future feature (AI, notifications, broker execution, scanner) depends on it. Consistent, rule-based evaluation turns subjective chart reading into repeatable decisions.

## Key Capabilities

- **Strategy Interface** — a typed contract every strategy implements.
- **Strategy Registry** — discover registered strategies by category/market.
- **Strategy Manager** — runs one or many strategies against a context and market data.
- **Strategy Result** — structured outcome (signal direction, confidence, reasons, evaluated conditions).
- **Strategy Configuration** — per-strategy parameters with defaults and validation.
- **Rule Evaluation** — reusable building blocks (crossovers, levels, thresholds) for strategies.

## Design Points

- Lives in `src/core/strategy/` (planned).
- Strategies depend on the **Chart Context** and **Market Data Engine** inputs only.
- Engine must stay UI-independent; results rendered by the UI layer.
- Fully typed; unit tests for rule evaluation and configuration.

## Non-Goals

- AI decision-making (rules are deterministic).
- Order placement.
- Notifications.

## Dependencies

- Chart Context (03), Market Data Engine (04).

## Milestone

[`milestone-05-strategy-engine.md`](../milestones/milestone-05-strategy-engine.md)
