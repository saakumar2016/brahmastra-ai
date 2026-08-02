# Brahmastra AI

A production-grade Chrome Extension for AI-powered trading.

## Tech Stack

- **Monorepo**: pnpm workspaces + Turborepo
- **Language**: TypeScript
- **Linting**: ESLint + Prettier
- **Git Hooks**: Husky + lint-staged
- **Extension**: React + Vite + Manifest V3

## Getting Started

```bash
pnpm install
```

## Development

```bash
# Build the extension (production)
pnpm build:extension

# Watch mode (auto-rebuild on changes)
pnpm dev:extension
```

The built extension is output to `apps/extension/dist/`.

## Loading into Chrome

1. Open Chrome and navigate to `chrome://extensions`
2. Enable **Developer mode** (toggle in top-right)
3. Click **Load unpacked**
4. Select `apps/extension/dist/`
5. The extension should now appear in your toolbar

### Verifying the install

After loading the extension, perform these checks:

**Popup**

1. Click the extension icon in the toolbar
2. Click **Check Extension Status**
3. You should see: Loaded: Yes, Version, and Timestamp

**Side Panel**

1. Open the side panel (right-click extension icon → "Inspect popup" or use Chrome's side panel toggle)
2. Click **Ping Background**
3. You should see "PONG" appear below the button

**Content Script**

1. Navigate to `https://www.tradingview.com` or `https://kite.zerodha.com`
2. Open DevTools console (F12)
3. You should see: "Communication established"

**Background Worker**

1. Go to `chrome://extensions`
2. Find Brahmastra AI → click "Service Worker" link
3. Console should show: "Background worker started"

### TradingView Detection

The extension detects whether the active tab is a supported TradingView page and exposes page metadata to the Popup and Side Panel.

**Supported pages**

| Page  | URL pattern     | Detection result                              |
| ----- | --------------- | --------------------------------------------- |
| Chart | `/chart/*`      | `{ supported: true, pageType: "chart", ... }` |
| Other | everything else | `{ supported: false, reason: "..." }`         |

**Verifying detection**

1. Navigate to a TradingView chart page, e.g. `https://www.tradingview.com/chart/?symbol=BINANCE:BTCUSDT`
2. Open the Popup
3. The **TradingView Detection** section should show: Detected, Chart, Symbol, Exchange, Timeframe, and URL

Fields are shown as **Unavailable** when the data cannot be determined from the page (e.g. the symbol is not present in the URL).

### TradingView Context Extraction

When a supported chart page is detected, the content script runs the **Context Extraction Engine** (`src/core/context/`) which collects structured chart data from the TradingView DOM. It does **not** perform analysis — it only gathers data for future AI milestones.

**Extracted data (`ChartContext`)**

| Field          | Description                                                  |
| -------------- | ------------------------------------------------------------ |
| `symbol`       | Instrument symbol (e.g. `BTCUSDT`)                           |
| `exchange`     | Exchange (e.g. `BINANCE`), empty when unavailable            |
| `timeframe`    | Chart timeframe (e.g. `15`, `1H`, `1D`)                      |
| `chartType`    | Chart style (e.g. Candles, Bars, Line)                       |
| `url`          | Current page URL                                             |
| `indicators`   | Visible indicator names + parameters (e.g. `EMA`, `RSI`)     |
| `visiblePrice` | Last visible price (optional, `undefined` when unavailable)  |
| `marketStatus` | `open` / `closed` (optional, `undefined` when indeterminate) |
| `timestamp`    | Extraction timestamp (epoch ms)                              |

**Verifying context extraction**

1. Open DevTools console on a TradingView chart page
2. Look for `[Context]` debug logs:
   - `Extracted Symbol: ...`
   - `Extracted Timeframe: ...`
   - `Extracted Indicators: ...`
   - `Extraction Time: ...ms`
   - `Chart context: { ... }`

DOM selectors are centralized in `src/core/context/selectors.ts` — update them there when TradingView changes its DOM.

**How it runs**

- A new chart URL is extracted **immediately** on load.
- Same-page DOM mutations (SPA navigation, title changes) are **debounced** (~500ms) so many mutations produce a single extraction. The delay is a single constant, `CONTEXT_EXTRACTION_DEBOUNCE_MS` in `src/content/extraction-scheduler.ts`.
- Detectors run **independently**. If one fails (e.g. price), the others still contribute — only the failed field is dropped and the failure is logged.
- Extraction runs only on chart pages; unsupported pages never trigger it.

**Design notes**

- `ChartContextExtractor` receives its detectors via **dependency injection** (defaults provided), so each detector can be tested or swapped in isolation.
- Indicator aliases live in a dedicated **indicator registry** (`src/core/context/indicator-registry.ts`). Add new indicators there — the detector needs no changes.
- All debug output goes through a reusable **Logger** (`src/core/logger.ts`) with an automatic `[Context]` prefix; logging can be disabled by flag.
- Text normalization helpers are reusable in `src/core/text-utils.ts`.

**Tests**

Pure parsing/utility logic has unit tests (Vitest):

```
cd apps/extension
pnpm test
```

Covered: `normalizeText()`, `parsePrice()`, `parseIndicatorTitle()`, `parseSymbol()`, `parseTimeframe()`, and indicator alias lookup — including valid, invalid, empty and edge-case inputs.

## Scripts

| Script                 | Description                          |
| ---------------------- | ------------------------------------ |
| `pnpm lint`            | Run ESLint across all packages       |
| `pnpm test`            | Run unit tests across all packages   |
| `pnpm format`          | Format code with Prettier            |
| `pnpm format:check`    | Check formatting without writing     |
| `pnpm typecheck`       | Run TypeScript checks                |
| `pnpm build:extension` | Build the Chrome Extension           |
| `pnpm dev:extension`   | Watch mode for extension development |

## Project Structure

```
brahmastra-ai/
├── apps/
│   └── extension/       # Chrome Extension (Manifest V3)
│       └── src/
│           ├── components/   # Reusable UI components
│           ├── core/         # Core engine (context extraction)
│           │   └── context/  # Chart context extraction layer
│           ├── styles/       # Global base styles
│           ├── theme/        # Centralized CSS theme tokens
│           ├── popup/        # Popup React app
│           ├── sidepanel/    # Side Panel React app
│           ├── background/   # Service Worker (state owner)
│           ├── content/      # Content Script (page watcher)
│           ├── shared/       # Shared messaging + detection layer
│           └── types/        # Shared TypeScript types
├── packages/            # Shared libraries
├── docs/                # Project documentation
└── (config files)       # Root workspace configuration
```

## License

MIT
