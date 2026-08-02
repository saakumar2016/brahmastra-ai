# Unit Tests

> **Purpose:** Framework and conventions for unit-level tests of pure logic.
> **Last Updated:** 2026-08-02
> **Related Documents:** [Master Spec](../MASTER_SPEC.md) · [Testing Strategy](testing-strategy.md) · [Integration Tests](integration-tests.md)

## Framework

**Vitest** (v3) with a `node` environment, run from `apps/extension`. Test files are `*.test.ts` co-located with source and excluded from the production TypeScript build (`tsconfig.json` exclude).

## Coverage Today

| Function                | File                                          | Covers                                                        |
| ----------------------- | --------------------------------------------- | ------------------------------------------------------------- |
| `normalizeText()`       | `src/core/text-utils.test.ts`                 | whitespace, NBSP, null/undefined, trimming, collapsing        |
| `parseSymbol()`         | `src/shared/detection/chart-info.test.ts`     | bare/exchange: symbol, colons, empty, whitespace              |
| `parseTimeframe()`      | `src/shared/detection/chart-info.test.ts`     | known intervals, unknown passthrough, null                    |
| `parsePrice()`          | `src/core/context/price-detector.test.ts`     | numbers, negatives, separators, NBSP, no-number, NaN/Infinity |
| `parseIndicatorTitle()` | `src/core/context/indicator-detector.test.ts` | parens, compact, numeric params, empty params, unknown        |
| `lookupIndicatorName()` | `src/core/context/indicator-detector.test.ts` | aliases, canonical names, case, unknown, empty                |

## Case Requirements

Every pure function suite covers:

- **Valid** inputs.
- **Invalid** inputs.
- **Empty** values.
- **Edge cases** (boundaries, unusual characters, `null`/`undefined`).

## Adding a Test

1. Name it `<source>.test.ts` next to the source.
2. Import `describe`, `it`, `expect` from `vitest` explicitly (no globals).
3. Keep it deterministic — no network, no timing.

## Run

```bash
cd apps/extension
pnpm test          # run once
pnpm test:watch    # watch mode
```
