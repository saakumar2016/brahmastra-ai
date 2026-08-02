# Integration Tests

> **Purpose:** Approach for verifying engine behavior across module boundaries.
> **Last Updated:** 2026-08-02
> **Related Documents:** [Master Spec](../MASTER_SPEC.md) · [Testing Strategy](testing-strategy.md) · [Unit Tests](unit-tests.md)

## Purpose

Verify **engine behavior across module boundaries** using injected fakes and controlled fixtures — without a live TradingView page.

## Targets

| Area                              | What is verified                                                                                                    |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| `ChartContextExtractor`           | Orchestration, legend sharing, **partial-failure preservation** (one detector throws → only its field is dropped).  |
| Detectors with a stub `DomReader` | Symbol fallback chain, indicator parsing from legend, price primary-instrument selection, market status candidates. |
| `ExtractionScheduler`             | Immediate on new URL, debounce coalescing (fake timers), cancel behavior.                                           |
| Messaging                         | Typed handlers receiving `(message, sender)`; request/response round-trips with a mock `chrome.runtime`.            |

## How

- Use **fake timers** for anything time-based.
- Use **injected dependencies** (DI) instead of real DOM/service workers.
- Build small DOM fixtures with jsdom when a detector genuinely needs elements — but prefer passing already-extracted structures.

## Example Idea

```ts
// ChartContextExtractor partial failure
const extractor = new ChartContextExtractor({
  symbolDetector: fakeSymbol, // succeeds
  indicatorDetector: fakeIndicators, // succeeds
  priceDetector: {
    extract: () => {
      throw new Error("boom");
    },
  },
  marketDetector: fakeMarket, // succeeds
});
const ctx = await extractor.getChartContext();
expect(ctx.symbol).toBe("BTCUSDT"); // kept
expect(ctx.visiblePrice).toBeUndefined(); // only this dropped
```

## Run

Integration tests run with the same Vitest setup as unit tests (`pnpm test`). They are kept separate by naming intent, not a separate runner.
