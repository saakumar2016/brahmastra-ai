# ADR-005 — Context Engine

> **Purpose:** Record the architecture of the TradingView Context Engine (Milestone 03).
> **Last Updated:** 2026-08-02
> **Related Documents:** [Chart Context feature](../03-features/chart-context.md) · [Extension Architecture](../01-architecture/extension-architecture.md) · [Milestone 03](../milestones/milestone-03-context-engine.md)

- **Status:** Accepted
- **Decision:** Build the Context Engine as a **facade (`ChartContextExtractor`) over independent detectors**, with dependency injection, a throwing-proof `DomReader`, centralized selectors, an indicator registry, and per-detector failure isolation.
- **Context:** TradingView's DOM changes frequently and chart pages vary. The engine must extract symbol/exchange/timeframe/chart type/indicators/price/market status reliably without scraping, without exceptions escaping, and without one detector's failure discarding another detector's successful data. Future engines (market data, strategy, signal) consume `ChartContext`, so the public `getChartContext(): Promise<ChartContext>` must stay stable.
- **Alternatives:**
  - One monolithic extractor — simpler to write but couples all extraction and fails wholesale on any error.
  - Single try/catch fallback — loses partial data whenever any part throws.
  - Reading TradingView's internal state/APIs directly — faster but brittle and violates the "no scraping" rule.
- **Consequences:**
  - Each detector (symbol, indicator, price, market) is independently testable and swappable via DI.
  - `DomReader` guarantees DOM reads never throw; selectors are centralized in `selectors.ts`.
  - Indicator aliases live in `indicator-registry.ts` for one-line additions.
  - Extraction is debounced (~500ms) in the content script, with immediate extraction on first chart load.
- **Date:** 2026-08-02
