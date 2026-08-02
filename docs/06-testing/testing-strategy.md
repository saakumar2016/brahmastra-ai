# Testing Strategy

> **Purpose:** The overall testing approach across the unit/integration/e2e pyramid.
> **Last Updated:** 2026-08-02
> **Related Documents:** [Master Spec](../MASTER_SPEC.md) · [Unit Tests](unit-tests.md) · [Integration Tests](integration-tests.md) · [E2E Tests](e2e-tests.md) · [Coding Standards](../01-architecture/coding-standards.md)

## Pyramid

```
        ▲  e2e (few)
       ▲    integration (some)
      ▲      unit (most)
```

- **Unit** — pure parsing/utility/rule logic, fast, no DOM.
- **Integration** — engine behavior with injected fakes and real module boundaries (e.g. `ChartContextExtractor` orchestrating detectors).
- **E2E** — full extension behavior in a real browser (Playwright + TradingView fixture).

## What We Test

| Layer             | Example                                                                               |
| ----------------- | ------------------------------------------------------------------------------------- |
| Parsing/utilities | `normalizeText`, `parsePrice`, `parseSymbol`, `parseTimeframe`, `parseIndicatorTitle` |
| Registry          | indicator alias lookup                                                                |
| Rule evaluation   | strategy conditions, thresholds, combinators                                          |
| Engines           | `ChartContextExtractor` partial-failure behavior, `ExtractionScheduler` debounce      |
| Messaging         | message round-trips, typed handlers                                                   |

## What We Avoid Testing

- TradingView DOM internals (fragile). Instead: fixtures + injected readers.
- Third-party behavior (broker, LLM providers) — mocked at the boundary.

## Principles

1. **Pure functions first** — keep as much logic as possible free of side effects.
2. **Dependency injection enables tests** — engines accept fakes.
3. **Partial failure is a first-class case** — test that one failing detector does not discard the rest.
4. **Deterministic** — no sleeps/races; use fake timers for debounce.
5. **Co-located** — `*.test.ts` next to source, excluded from the production build.

## Run

```bash
pnpm test                       # root (turbo)
cd apps/extension && pnpm test  # Vitest directly
```

## Verification Gates (per task)

1. `pnpm build:extension`
2. `tsc --noEmit`
3. `eslint src/`
4. `pnpm test`
5. `prettier --check`
