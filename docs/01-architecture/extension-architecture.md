# Extension Architecture

> **Purpose:** Describes the extension's runtime contexts and their responsibilities.
> **Last Updated:** 2026-08-02
> **Related Documents:** [Master Spec](../MASTER_SPEC.md) · [Architecture](architecture.md) · [Communication Flow](communication-flow.md) · [Messaging API](../04-api/messaging.md) · [ADR-001](../08-adr/ADR-001-manifest-v3.md)

## Overview

The extension is a Manifest V3 Chrome extension (`apps/extension/`) built with Vite + `@crxjs/vite-plugin` and React. It runs in four contexts: **content script**, **background service worker**, **popup**, and **side panel**.

## Contexts

| Context        | Entry point               | Role                                                                                 |
| -------------- | ------------------------- | ------------------------------------------------------------------------------------ |
| Content Script | `src/content/index.ts`    | Injected into TradingView pages. Watches for page changes, extracts chart context.   |
| Background     | `src/background/index.ts` | Service worker. Owns per-tab detection state; future home of signal/broker sessions. |
| Popup          | `src/popup/index.ts`      | Small browser-action UI.                                                             |
| Side Panel     | `src/sidepanel/index.ts`  | Full extension UI docked on the side of the browser window.                          |

## Source Layout (current)

```
apps/extension/src/
├── components/       # Reusable React UI components
├── core/
│   ├── logger.ts     # Logger interface + ConsoleLogger
│   ├── text-utils.ts # Reusable text helpers
│   └── context/      # Chart Context Extraction Engine
├── styles/           # Global base styles
├── theme/            # CSS custom-property theme (tokens)
├── popup/            # Popup React app
├── sidepanel/        # Side Panel React app
├── background/       # Service worker
├── content/          # Content script + page watcher + extraction scheduler
├── shared/           # Messaging + detection layer (types, MessageBus, DetectionService)
└── types/            # Shared TypeScript types
```

## Runtime Flow (current)

1. **Content script** loads on TradingView pages and runs detection.
2. **Page watcher** (`page-watcher.ts`) reacts to navigation, title changes, history API calls, and polling.
3. On a detected chart page, **`ChartContextExtractor`** extracts a `ChartContext` (symbol, exchange, timeframe, chart type, indicators, visible price, market status).
4. **Extraction scheduler** debounces same-page mutations (~500ms) and extracts immediately on new chart URLs.
5. Detection payloads are pushed to the background, which stores them per tab.
6. Popup / Side Panel request the stored detection and render it.

## Future Extension Modules

| Module             | Planned location             | Milestone |
| ------------------ | ---------------------------- | --------- |
| Market Data Engine | `src/core/market-data/`      | 04        |
| Strategy Engine    | `src/core/strategy/`         | 05        |
| Signal Engine      | `src/core/signal/`           | 06        |
| Floating Assistant | `src/ui/floating-assistant/` | 07        |
| Notifications      | `src/core/notifications/`    | 08        |
| Trade Journal      | `src/core/journal/`          | 09        |
| Broker Integration | `src/core/broker/`           | 10        |
| AI Assistant       | `src/core/ai/`               | 11        |

## Manifest

See `public/manifest.json`. Key facts:

- `manifest_version: 3`
- Permissions: `storage` (currently).
- Content scripts match `*.tradingview.com/*` and `kite.zerodha.com/*`.
- Side panel + popup defined; background service worker is a module.

## Rules

- The **background owns state**; UIs render what it reports.
- **No UI logic in the content script** and vice versa.
- Every new cross-context message is typed and added to the messaging layer (`src/shared/messaging/`).
