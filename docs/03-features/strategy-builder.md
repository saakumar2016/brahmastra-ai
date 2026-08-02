# Strategy Builder (Feature)

> **Purpose:** Feature spec for the visual, no-code strategy composition editor.
> **Last Updated:** 2026-08-02
> **Related Documents:** [Master Spec](../MASTER_SPEC.md) · [Product Backlog](../PRODUCT_BACKLOG.md) · [Strategy Engine](strategy-engine.md)

## Summary

A **visual editor** to compose trading strategies from rule blocks — no code required. The output is a strategy configuration consumed by the Strategy Engine.

## Why

Not every trader writes code. The Strategy Builder makes the pluggable strategy system accessible: pick conditions, combine them, tune parameters, and save.

## Key Capabilities

- Palette of rule blocks (crossovers, levels, thresholds, time filters).
- Visual condition builder (AND/OR combinators).
- Parameter controls with validation and defaults.
- Save/load strategies into the registry and storage.
- Preview: run the draft strategy against the current chart context.

## Design Points

- UI feature; output is a validated `StrategyConfiguration` for `src/core/strategy/`.
- Reuses the rule-evaluation building blocks of the Strategy Engine.

## Non-Goals

- Arbitrary scripting; only composable rule blocks.

## Dependencies

- Strategy Engine (05), design system components.

## Milestone

- Evolves with [Milestone 05](../milestones/milestone-05-strategy-engine.md); full builder UI lands alongside the signal engine UI.
