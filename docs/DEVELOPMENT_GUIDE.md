# Development Guide

> **Purpose:** How to set up, run, debug, extend, test, build, and release Brahmastra AI.
> **Last Updated:** 2026-08-02
> **Related Documents:** [Master Spec](MASTER_SPEC.md) · [CLAUDE.md](../CLAUDE.md) · [Build Process](07-deployment/build-process.md) · [Testing Strategy](06-testing/testing-strategy.md) · [Coding Standards](01-architecture/coding-standards.md)

## Project Setup

Prerequisites: Node.js ≥ 18, pnpm ≥ 9.

```bash
git clone <repo> && cd brahmastra-ai
pnpm install
pnpm build:extension
```

Verify quality gates:

```bash
pnpm lint          # ESLint across all packages
pnpm typecheck     # tsc across all packages
pnpm test          # Vitest across all packages
pnpm format:check  # Prettier check
```

## Running Locally

Watch build for development:

```bash
pnpm dev:extension   # vite build --watch in apps/extension
```

Load the extension:

1. `pnpm build:extension` (or let the watch build).
2. Open `chrome://extensions` → enable **Developer mode**.
3. **Load unpacked** → select `apps/extension/dist`.

## Debugging the Extension

- **Background (service worker):** `chrome://extensions` → find Brahmastra AI → click **Service Worker** link → DevTools console. Expect `Background worker started` (and `Communication established` from the content script on first contact).
- **Content script:** open DevTools on a TradingView chart; `[Context]` debug logs appear under the Console (extraction). Verify detection via the Popup/Side Panel.
- **Popup / Side Panel:** right-click → **Inspect** on the popup, or DevTools on the side panel.
- **Reload after changes:** the watch build writes to `dist/`; click **Reload** on the extension card (or fully reload the tab) to pick up changes.

## Adding a New Feature

1. Read [`MASTER_SPEC.md`](MASTER_SPEC.md) and the relevant feature doc in [`03-features/`](03-features/).
2. Implement business logic in `src/core/` (UI-independent, DI, strict types).
3. Wire messaging through `src/shared/messaging/` (constant + payload type + handler) if the background/UI needs it.
4. Add UI in `src/popup`, `src/sidepanel`, or `src/ui` using shared components + theme tokens.
5. Add unit/integration tests; update `docs/CHANGELOG.md`; meet Definition of Done.

## Adding a New Strategy

1. Implement the strategy interface (`src/core/strategy/` — see [strategy-engine](03-features/strategy-engine.md)).
2. Register it in the strategy registry.
3. Provide a `StrategyConfiguration` with defaults and validation.
4. Add unit tests for rule evaluation; verify via the signal path.

## Testing

```bash
cd apps/extension
pnpm test          # run once (Vitest)
pnpm test:watch    # watch mode
```

Test rules: pure-function unit tests (valid/invalid/empty/edge), deterministic integration tests with injected fakes, fake timers for debounce. See [`06-testing/`](06-testing/).

## Building

```bash
pnpm build:extension   # tsc && vite build → apps/extension/dist
```

Outputs the unpacked extension (manifest, service worker, content script, popup/side panel, icons).

## Releasing

1. Meet the [production checklist](07-deployment/production-checklist.md).
2. Bump version in `apps/extension/public/manifest.json` and package.json.
3. Build, smoke-test in a clean Chrome profile.
4. Tag `vX.Y.Z`; zip `dist/` for store submission.
5. Update `docs/CHANGELOG.md`. See [release process](07-deployment/release-process.md).

## Troubleshooting

| Symptom                                    | Likely cause / fix                                                                                  |
| ------------------------------------------ | --------------------------------------------------------------------------------------------------- |
| `Command "build:extension" not found`      | Run from the repo root, not `apps/extension`.                                                       |
| Content script logs nothing on TradingView | Extension not reloaded after build, or you're not on a declared host.                               |
| Detection shows Unavailable                | Symbol/timeframe not in URL or DOM; selectors in `src/core/context/selectors.ts` may need updating. |
| Extraction runs too often                  | Debounce constant `CONTEXT_EXTRACTION_DEBOUNCE_MS` in `src/content/extraction-scheduler.ts`.        |
| `tsc` complains about test files           | Test files are excluded from the build; run them with `pnpm test`.                                  |
| Vite build warnings about esbuild options  | Known tech-debt warning from `@crxjs`; tracked in [PRODUCT_BACKLOG.md](PRODUCT_BACKLOG.md).         |
