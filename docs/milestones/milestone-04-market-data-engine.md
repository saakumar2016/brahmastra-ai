# Milestone 04 — Market Data Engine

> **Purpose:** Provide candle/series (OHLCV) data so strategies can evaluate conditions on real price history.
> **Last Updated:** 2026-08-02
> **Related Documents:** [Master Spec](../MASTER_SPEC.md) · [Market Data Engine feature](../03-features/market-data-engine.md) · [Roadmap](../00-project/roadmap.md) · [Product Backlog](../PRODUCT_BACKLOG.md)

## Status

🚧 **In Progress** (current milestone)

## Objective

Provide candle/series (OHLCV) data for the current symbol and timeframe so strategies can evaluate conditions on real price history.

## Background

Chart context (03) tells us _what_ is on the chart; strategies need _history_ to run rules (crossovers, levels, trends). Without a market data source, the Strategy Engine (05) would be blind. This milestone introduces the first consumer-facing engine that feeds both strategies and the future AI assistant.

## Deliverables

- Candle/OHLCV types and normalized model
- Data source abstraction (swappable: page fetch vs. backend)
- Fetch + cache for `(symbol, exchange, timeframe, range)`
- Graceful fallback when data is unavailable
- Unit tests for parsing, normalization, and cache logic

## Task Checklist

| Task ID | Title                                                    | Priority | Size | Deps          | Status    |
| ------- | -------------------------------------------------------- | -------- | ---- | ------------- | --------- |
| M04-T01 | Candle/OHLCV model + normalization                       | High     | M    | M03 (context) | Completed |
| M04-T02 | Data source abstraction (swappable page/backend)         | High     | M    | M04-T01       | Completed |
| M04-T03 | Fetch + cache for `(symbol, exchange, timeframe, range)` | High     | M    | M04-T02       | Completed |
| M04-T04 | Graceful fallback when data is unavailable               | Medium   | S    | M04-T03       | Completed |
| M04-T05 | Unit + integration tests (parsing, normalization, cache) | High     | M    | M04-T01..04   | Ready     |
| M04-T06 | Update docs: entities, feature doc, changelog            | Medium   | S    | M04-T05       | Ready     |

> Status is authoritative in [`../../TASK_QUEUE.md`](../../TASK_QUEUE.md). Next task: **M04-T05**.

## Out of Scope

- Real-time tick execution
- Long-term storage beyond caching

## Dependencies

- Milestone 03 (chart context) provides symbol/timeframe inputs.

## Folder Changes

`apps/extension/src/core/market-data/`

## Architecture Impact

- Extends `src/core/` with the first data-producing engine; defines the candle model consumed by strategies and the AI.
- Establishes the data-source abstraction seam (page vs. backend), keeping the extension offline-capable.
- Caching layer prevents repeated identical fetches.

## Acceptance Criteria

- Strategies can consume a deterministic candle series
- Caching prevents repeated identical fetches
- Works offline-first; never scrapes TradingView internals
- Unit tests for parsing/normalization and cache logic

## Testing

- Unit tests for candle parsing, normalization, and cache behavior (Vitest).
- Integration tests with an injected fake data source (no network).
- See [`06-testing/`](../06-testing/).

## Definition of Done

- All acceptance criteria met; tests green; build/typecheck/lint/format pass.
- Market data contract documented in [`05-database/entities.md`](../05-database/entities.md) and [`04-api/backend-api.md`](../04-api/backend-api.md).
- Changelog updated.

## Future Improvements

- Intraday streaming via WebSocket
- Backend market data service for multi-instrument scans

## Risks

- **Data source availability** — public/authorized OHLCV access may be limited or rate-limited; mitigated by the swappable source abstraction and caching.
- **Scope creep** — risk of pulling in real-time streaming early; deliberately deferred.
