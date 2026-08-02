# Milestone 03 — TradingView Context Engine

> **Purpose:** Extract the full structured chart context from the TradingView DOM — reliably, partially, and without scraping.
> **Last Updated:** 2026-08-02
> **Related Documents:** [Master Spec](../MASTER_SPEC.md) · [Chart Context feature](../03-features/chart-context.md) · [ADR-005](../08-adr/ADR-005-context-engine.md) · [Extension Architecture](../01-architecture/extension-architecture.md) · [Change Log](../CHANGELOG.md)

## Status

✅ **Completed**

## Objective

Extract the full structured **Chart Context** (symbol, exchange, timeframe, chart type, indicators, visible price, market status) from the TradingView DOM — reliably, partially, and without scraping.

## Background

Detection (02) tells us _that_ we are on a chart; the Context Engine tells us _what is on it_. Every later capability (strategies, signals, AI, execution) consumes this context. The engine had to be resilient to TradingView's changing DOM, must never throw into the page, and must preserve partial data when any single detector fails.

## Deliverables

- `ChartContext`, `IndicatorInfo`, `MarketStatus` types
- `DomReader` — throwing-proof DOM abstraction
- Centralized `CONTEXT_SELECTORS`
- Detectors: `SymbolDetector`, `IndicatorDetector`, `PriceDetector`, `MarketDetector`
- `ChartContextExtractor` orchestrator with dependency injection
- Indicator registry (`indicator-registry.ts`)
- `Logger` abstraction; `text-utils.ts`
- Debounced extraction scheduling (~500ms) with immediate first-load extraction
- Unit tests for all pure parsing/utility logic

## Out of Scope

- Candle scraping
- AI / analysis
- Broker integration

## Dependencies

- Milestone 02 (extension core, messaging, detection).

## Folder Changes

`apps/extension/src/core/context/`, `src/core/logger.ts`, `src/core/text-utils.ts`, `src/content/extraction-scheduler.ts`

## Architecture Impact

- Introduces the `src/core/` pattern: UI-independent, DI-driven engines that later engines (market data, strategy, signal) will mirror.
- Establishes `Logger`, `text-utils`, and per-detector failure isolation as project-wide conventions.
- Keeps `getChartContext(): Promise<ChartContext>` as a stable public API.

## Acceptance Criteria

- Detectors fail independently — one failure drops only its own field
- No hardcoded selectors outside `selectors.ts`
- Indicator aliases live only in the registry
- `getChartContext(): Promise<ChartContext>` public API is stable
- Unit tests pass (`pnpm test`)
- Fully typed; no `any`

## Testing

- Vitest unit tests for `normalizeText`, `parsePrice`, `parseIndicatorTitle`, `parseSymbol`, `parseTimeframe`, and indicator alias lookup (54 tests).
- Integration approach for orchestration/partial failure is documented in [`06-testing/integration-tests.md`](../06-testing/integration-tests.md).

## Definition of Done

- All acceptance criteria met; tests green; build/typecheck/lint/format pass.
- Debug logs verified on a live TradingView chart (`[Context]` prefix).
- Documentation updated: feature doc, ADR-005, changelog.

## Future Improvements

- Additional detectors (drawings, visible range)
- Exchange/symbol normalization table
- Context diffing for "what changed" events

## Risks

- **TradingView DOM drift** — high frequency of DOM changes; mitigated by centralized selectors, `DomReader`, and debounced extraction.
- **Cross-context state bloat** — low; context is stateless and recomputed on demand.
