# Chart Context Feature

> **Purpose:** Feature spec for extracting the current structured state of a TradingView chart.
> **Last Updated:** 2026-08-02
> **Related Documents:** [Master Spec](../MASTER_SPEC.md) · [Milestone 03](../milestones/milestone-03-context-engine.md) · [ADR-005](../08-adr/ADR-005-context-engine.md) · [Messaging API](../04-api/messaging.md)

## Summary

Extracts the structured, current state of a TradingView chart: **symbol, exchange, timeframe, chart type, visible indicators, visible price, and market status** — without AI, analysis, or broker integration.

## Why

Everything Brahmastra AI does later (strategies, signals, AI, execution) depends on knowing _what chart the trader is on_. This is the foundation.

## Current Capabilities

- Page detection on TradingView (chart vs. unsupported).
- Extraction of:
  - `symbol`, `exchange`
  - `timeframe` (e.g. `15m`, `1H`, `1D`)
  - `chartType` (Candles, Bars, Line, …)
  - `indicators[]` — visible indicator names + parameters
  - `visiblePrice` (optional)
  - `marketStatus` — `open` / `closed` (optional)
  - `timestamp`
- Immediate extraction on chart load; ~500ms debounce for same-page mutations.
- **Partial extraction** — a failing detector only drops its own field.
- `[Context]`-prefixed debug logging via the `Logger` abstraction.

## Design Points

- **Dependency injection** — `ChartContextExtractor` receives detectors; defaults provided.
- **Centralized selectors** — all TradingView DOM selectors in `selectors.ts`.
- **Indicator registry** — alias table in `indicator-registry.ts`.
- **Graceful DOM** — `DomReader` never throws.

## Non-Goals

- No candle scraping.
- No analysis or signals.
- No broker data.

## Dependencies

- Milestone 02 (extension core, messaging, detection).

## Milestone

[`milestone-03-context-engine.md`](../milestones/milestone-03-context-engine.md)
