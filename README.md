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

## Scripts

| Script                 | Description                          |
| ---------------------- | ------------------------------------ |
| `pnpm lint`            | Run ESLint across all packages       |
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
