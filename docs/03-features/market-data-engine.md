# Market Data Engine (Feature)

> **Purpose:** Feature spec for candle/series (OHLCV) data feeding strategies and the AI.
> **Last Updated:** 2026-08-02
> **Related Documents:** [Master Spec](../MASTER_SPEC.md) · [Milestone 04](../milestones/milestone-04-market-data-engine.md) · [Entities](../05-database/entities.md) · [Strategy Engine](strategy-engine.md)

## Summary

Provides **candle/series data (OHLCV)** to strategies and the AI, for the symbol and timeframe of the current chart context. It feeds strategy evaluation and grounds AI answers in real data.

## Why

Strategies need price history to evaluate conditions (e.g. "close above the 20 EMA"). The chart context alone (symbol, indicators, last price) is not enough for real rules.

## Key Capabilities

- Fetch candles for `(symbol, exchange, timeframe)` over a window.
- Normalized OHLCV model shared with strategies.
- Caching to avoid repeated fetches.
- Works offline-first from the page where possible; backend as an accelerator later.
- Graceful failure: strategies evaluate with whatever data exists.

## Design Points

- Lives in `src/core/market-data/` (planned).
- **No candle scraping** from TradingView DOM internals; use public/authorized data paths.
- Interface-first so the data source is swappable (TradingView fetch vs. backend).

## Non-Goals

- Real-time tick execution.
- Data storage history beyond caching.

## Dependencies

- Chart Context (03) for symbol/timeframe.

## Milestone

[`milestone-04-market-data-engine.md`](../milestones/milestone-04-market-data-engine.md)
