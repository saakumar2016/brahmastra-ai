# Changelog

> **Purpose:** Records notable changes per milestone, following [Keep a Changelog](https://keepachangelog.com/).
> **Last Updated:** 2026-08-02
> **Related Documents:** [Master Spec](MASTER_SPEC.md) · [Roadmap](00-project/roadmap.md) · [Milestones](00-project/milestones.md)

All notable changes to this project are documented here.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html). Version numbers follow the [release process](07-deployment/release-process.md) and track milestone completion.

## [Unreleased]

### Added

- Milestone 04 — Market Data Engine groundwork (in progress): candle model, data source abstraction, caching. See [milestone-04](milestones/milestone-04-market-data-engine.md).
- `M04-T01` — Candle/OHLCV model + normalization (`src/core/market-data/`): canonical `Candle` type, `RawCandle` input, `parseNumber`, `parseCandleTime`, `normalizeCandle`, `normalizeCandleSeries` (validate, drop invalid, dedupe by time, sort ascending) + 52 unit tests.
- `M04-T01` review refinement: `parseCandleTime` now accepts only strict ISO-8601 datetimes (with timezone) or Unix seconds/ms; `Candle`/`RawCandle` are `readonly` value objects; shared `NumericValue` alias.

## [0.3.0] — 2026-08-02 — Milestone 03: TradingView Context Engine

### Added

- `ChartContextExtractor` facade with dependency injection and per-detector failure isolation.
- Detectors: `SymbolDetector`, `IndicatorDetector`, `PriceDetector`, `MarketDetector`.
- `DomReader` (throwing-proof DOM abstraction) and centralized `CONTEXT_SELECTORS`.
- Indicator registry (`indicator-registry.ts`).
- `Logger` abstraction (`src/core/logger.ts`) and `text-utils.ts`.
- Debounced extraction scheduling (~500ms) with immediate first-load extraction (`src/content/extraction-scheduler.ts`).
- Vitest unit tests for all pure parsing/utility logic (54 tests).
- Documentation: `docs/` handbook structure established; context extraction sections in README and ARCHITECTURE.

## [0.2.0] — 2026-08-02 — Milestone 02: Chrome Extension Core

### Added

- Manifest V3 extension shell (popup, side panel, background service worker, content script).
- React UI foundation: theme tokens, shared components (`Button`, `Card`, `Header`, `Layout`, `StatusCard`).
- Shared messaging layer (`MessageBus`, `MessageHandler`, `MSG` constants).
- TradingView page detection: `TradingViewDetector`, `DetectionService`, `DetectionStore`, content `page-watcher`.
- Detection status UI in Popup and Side Panel.

## [0.1.0] — 2026-07-31 — Milestone 01: Foundation

### Added

- pnpm workspace + Turbo task runner.
- Shared TypeScript/ESLint/Prettier configs; Husky + lint-staged hooks.
- `apps/extension` scaffold and `docs/` documentation structure.

[Unreleased]: https://github.com/anomalyco/brahmastra-ai/compare/v0.3.0...HEAD
[0.3.0]: https://github.com/anomalyco/brahmastra-ai/releases/tag/v0.3.0
[0.2.0]: https://github.com/anomalyco/brahmastra-ai/releases/tag/v0.2.0
[0.1.0]: https://github.com/anomalyco/brahmastra-ai/releases/tag/v0.1.0
