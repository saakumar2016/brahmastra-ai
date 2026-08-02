# Product Backlog

> **Purpose:** The prioritized, working backlog of features, tasks, debt, and research. Complement to — not a duplicate of — the milestone docs.
> **Last Updated:** 2026-08-02
> **Related Documents:** [Master Spec](MASTER_SPEC.md) · [Roadmap](00-project/roadmap.md) · [Milestones](00-project/milestones.md) · [Milestones detail](milestones/)

Backlog items are sized work units. Each is linked to the milestone or feature doc that defines it. Items move Now → Next → Later as the current milestone progresses.

## Now

Work items for the **current milestone (04 — Market Data Engine)**.

- [ ] Define candle/OHLCV model and normalize from the page — see [market-data-engine](03-features/market-data-engine.md), [milestone-04](milestones/milestone-04-market-data-engine.md)
- [ ] Data source abstraction (swappable page/backend fetch)
- [ ] Caching layer to avoid repeated identical fetches
- [ ] Graceful fallback when data is unavailable
- [ ] Unit tests: parsing, normalization, cache logic

## Next

Items for the **upcoming milestones (05–07)**.

- [ ] Strategy Interface + Registry — [strategy-engine](03-features/strategy-engine.md)
- [ ] Rule Evaluation building blocks
- [ ] Signal aggregation + confidence scoring — [signal-engine](03-features/signal-engine.md)
- [ ] Floating Assistant overlay shell — [floating-assistant](03-features/floating-assistant.md)

## Later

Items for **milestones 08–12**.

- [ ] Notification center + system notifications — [notifications](03-features/notifications.md)
- [ ] Trade journal entities + stats — [trade-journal](03-features/trade-journal.md)
- [ ] Watchlist / scanner — [scanner](03-features/scanner.md)
- [ ] Broker interface + Zerodha Kite driver — [broker-integration](03-features/broker-integration.md)
- [ ] Order ticket UI with explicit confirmation
- [ ] Risk guardrails (per-trade/daily limits) — [risk-management](03-features/risk-management.md)
- [ ] AI service + grounded chat — [ai-assistant](03-features/ai-assistant.md)
- [ ] Strategy Builder UI — [strategy-builder](03-features/strategy-builder.md)

## Future Ideas

Ideas that are not scheduled.

- Strategy backtesting preview
- Multi-chart tabs in the Floating Assistant
- Journal-aware AI coaching and strategy explanation
- Additional brokers and advanced order types
- Social trading (sharing strategies/signals) — low priority
- Mobile companion app — low priority

## Technical Debt

Known internal improvements.

- [ ] Vite/`@crxjs` build warnings cleanup (deprecated esbuild options)
- [ ] Ensure fresh-install reproducibility of `vite`/`vitest` resolution in `apps/extension`
- [ ] Add CI pipeline (lint/typecheck/test/build) — see [milestone-12](milestones/milestone-12-production-release.md)
- [ ] Consolidate `docs/ARCHITECTURE.md` content into the `01-architecture/` set and retire the duplicate
- [ ] Normalize milestone naming (Context Engine → TradingView Context Engine) in older cross-references

## Research

Open questions to investigate.

- [ ] Market data sources for OHLCV without scraping TradingView (public APIs, broker feeds)
- [ ] WebSocket streaming feasibility for intraday updates
- [ ] Zustand integration pattern for UI stores (ADR-004)
- [ ] E2E harness (Playwright) with a static TradingView-like fixture
- [ ] Push notification delivery via backend (Milestone 08+)
