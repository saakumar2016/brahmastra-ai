# E2E Tests (Planned)

> **Purpose:** Plans for end-to-end testing in a real Chrome environment.
> **Last Updated:** 2026-08-02
> **Related Documents:** [Master Spec](../MASTER_SPEC.md) · [Testing Strategy](testing-strategy.md) · [Milestone 12](../milestones/milestone-12-production-release.md)

> **Status: Planned.** E2E requires a real Chrome environment and a TradingView fixture; introduced at the extension-core / production milestones.

## Purpose

Verify the **whole extension works in a real browser**: load extension → open a chart → detect → extract → UI renders.

## Tooling

- **Playwright** with the Chromium extension context (supports loading unpacked extensions).
- A **static TradingView-like fixture page** that reproduces the DOM selectors the engine reads — TradingView itself is out of scope for CI.

## Scenarios (planned)

1. Install extension; popup shows "Communication established" + extension status.
2. Load fixture chart → detection runs → background stores `PageDetection`.
3. Popup / Side Panel render the stored detection.
4. Context extraction logs a `ChartContext` with symbol/timeframe/indicators.
5. New chart URL → immediate extraction; same-page mutations → one debounced extraction.
6. Missing data → "Unavailable" rendered, no crash.

## Fakes & Fixtures

- Fixture pages live in `e2e/fixtures/` and mirror `selectors.ts` exactly.
- Broker, AI, and backend calls are mocked at the boundary.

## Run (planned)

```bash
cd apps/extension
pnpm test:e2e
```

## Rule

E2E must be **stable and deterministic** — no reliance on live network or live TradingView DOM.
