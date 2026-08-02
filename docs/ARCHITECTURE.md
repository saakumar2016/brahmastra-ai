# Architecture

## Overview

Brahmastra AI is a monorepo housing a Chrome Extension for AI-powered trading. The repository is organized into two primary directories: `apps/` and `packages/`.

```
brahmastra-ai/
├── apps/
│   └── extension/       # Chrome Extension
├── packages/            # Shared libraries
├── docs/                # Documentation
├── pnpm-workspace.yaml  # Workspace definition
├── turbo.json           # Turborepo pipeline config
├── tsconfig.base.json   # Shared TypeScript config
├── .eslintrc.cjs        # ESLint configuration
├── .prettierrc          # Prettier configuration
├── .editorconfig        # Editor settings
└── .gitignore           # Git ignore rules
```

## Design Principles

1. **Monorepo Isolation** — Each app/package owns its dependencies, config, and build. Shared configs at the root reduce duplication.
2. **Incremental Builds** — Turborepo caches task outputs and skips unchanged work.
3. **Strict TypeScript** — Shared `tsconfig.base.json` ensures consistency; individual packages extend it.
4. **Code Quality Gates** — ESLint and Prettier run as pre-commit hooks via Husky + lint-staged.

## Chrome Extension Architecture

The extension lives in `apps/extension/` and is built with **React**, **TypeScript**, **Vite**, and **Manifest V3**. The build toolchain uses `@crxjs/vite-plugin` to compile the extension into a loadable Chrome extension bundle.

### Background Service Worker

**File:** `src/background/index.ts`

The background service worker is the extension's event-driven brain. It runs persistently (or as long as Chrome allows) and handles:

- Responding to `PING` requests with `PONG`
- Responding to `GET_EXTENSION_STATUS` with extension version and timestamp
- Storing the latest TradingView page detection per tab (single source of truth)
- Responding to `GET_PAGE_DETECTION` with the stored detection state
- Coordinating messages between content scripts and the popup/side panel (future)
- Managing long-lived state and API connections (future)

It has **no DOM access** and runs in its own isolated context.

### Content Script

**Files:** `src/content/index.ts`, `src/content/page-watcher.ts`

Content scripts are injected into web pages that match the declared URL patterns:

- `https://*.tradingview.com/*`
- `https://kite.zerodha.com/*`

Current behavior:

- Sends `PING` on load and logs "Communication established" on success
- Runs the detection service on load and after every page change
- Sends `PAGE_DETECTED` messages to the background with the structured detection result

The page watcher (`page-watcher.ts`) triggers re-detection whenever:

- The SPA navigates via `history.pushState` / `history.replaceState`
- The `popstate` or `hashchange` events fire
- The document title changes (symbol/timeframe switch without a URL change)
- A background poll detects a URL or title change (2s interval fallback)

Business logic (detection) lives in `shared/detection/`, not in the content script. The content script only composes detectors and forwards results.

Future responsibilities will include:

- Reading DOM data from TradingView/Kite
- Injecting UI overlays or buttons into the page
- Communicating with the background worker via the message bus

Content scripts have **partial DOM access** but run in an isolated world (not the page's JavaScript context).

### Popup

**Files:** `src/popup/`

The popup is a small React application that opens when the user clicks the extension toolbar icon. It is built as a separate Vite HTML entry point.

Current behavior: displays "Brahmastra AI" heading with a "Check Extension Status" button. On click, sends `GET_EXTENSION_STATUS` and shows loaded state, version, and timestamp. It also requests the latest page detection on load and renders it via the shared `DetectionStatus` component.

Future responsibilities:

- Quick account overview
- Manual trade triggers
- Status indicators

The popup **closes when the user clicks outside it**, so it should not hold critical state.

### Side Panel

**Files:** `src/sidepanel/`

The side panel is a persistent React application that lives in the Chrome DevTools side panel. Unlike the popup, it stays open across tab navigations.

Current behavior: displays "Brahmastra AI" heading with "Communication Ready" status and a "Ping Background" button. On click, sends `PING` and displays "PONG" on success. It also requests the latest page detection on load and renders it via the shared `DetectionStatus` component.

Future responsibilities:

- Real-time trading dashboard
- Chart overlays and analytics
- Signal logs and history

### Build Output

When built, the extension outputs the following structure to `dist/`:

```
dist/
├── manifest.json         # Generated manifest
├── icon16.png
├── icon48.png
├── icon128.png
├── src/
│   ├── background/
│   │   └── index.js      # Compiled service worker
│   ├── content/
│   │   └── index.js      # Compiled content script
│   ├── popup/
│   │   └── index.html    # Compiled popup (React SPA)
│   └── sidepanel/
│       └── index.html    # Compiled side panel (React SPA)
```

### Loading the Extension

See [README.md#loading-into-chrome](../README.md#loading-into-chrome).

---

## Extension Messaging Architecture

The extension comprises four isolated runtime environments that must communicate with each other:

```
┌─────────────────────────────────────────────────────────────────┐
│                    BACKGROUND SERVICE WORKER                    │
│                                                                │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                 MessageHandler Dispatch                  │   │
│  │                                                         │   │
│  │  PING  ──────────────────────────────────────────▶ PONG │   │
│  │  GET_EXTENSION_STATUS ──▶ EXTENSION_STATUS               │   │
│  └─────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
          ▲                          ▲              ▲
          │ chrome.runtime           │              │
          │ .sendMessage             │              │
          ▼                          ▼              ▼
┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐
│     POPUP        │  │   SIDE PANEL     │  │  CONTENT SCRIPT  │
│                  │  │                  │  │                  │
│  Request status  │  │  Ping background │  │  PING on load    │
│  Display result  │  │  Display PONG    │  │  Report page     │
│  Show detection  │  │  Show detection  │  │  (PAGE_DETECTED) │
└──────────────────┘  └──────────────────┘  └──────────────────┘
```

### Design

Instead of calling `chrome.runtime.sendMessage` directly throughout the codebase, a **Message Bus** abstraction layer is used. Every message flows through the bus, ensuring:

- **Type safety** — all message types are defined as discriminated unions in `message-types.ts`
- **Single responsibility** — the bus handles transport; handlers handle business logic
- **Testability** — the bus can be mocked or replaced without changing consumers
- **Extensibility** — new message types and runtime participants can be added without refactoring

### Files

| File                                      | Purpose                                                                                                                                                           |
| ----------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `src/shared/messaging/constants.ts`       | String constants for all message types (prevents typos across files)                                                                                              |
| `src/shared/messaging/types.ts`           | Shared data structures (e.g., `ExtensionStatus`)                                                                                                                  |
| `src/shared/messaging/message-bus.ts`     | Low-level transport: `send()` (fire-and-forget), `request()` (await response), `onMessage()` (listen, also passes the message `sender`)                           |
| `src/shared/messaging/message-handler.ts` | Higher-level dispatch: `handle(type, handler)` + `listen()` registers everything; handlers receive `(message, sender)`                                            |
| `src/shared/messaging/message-types.ts`   | Strongly typed discriminated unions: `Request`, `Response`, `Message` — includes the detection messages (`PAGE_DETECTED`, `GET_PAGE_DETECTION`, `PAGE_DETECTION`) |

### Message Flow

```
Sender                      Background                    Receiver
  │                             │                            │
  ├─ request({type: PING}) ────▶│                            │
  │                             ├─ handler returns PONG ────▶│ (Promise resolves)
  │◀─────────────────────────── PONG                         │
  │                             │                            │
  │                             │                            │
  ├─ request({type:             │                            │
  │    GET_EXTENSION_STATUS}) ──▶│                            │
  │                             ├─ handler returns           │
  │                             │  EXTENSION_STATUS ────────▶│
  │◀───────────────── {loaded, version, timestamp}           │
```

### Why a Message Bus?

1. **Centralized error handling** — the bus catches and normalizes transport errors (e.g., "Receiving end does not exist").
2. **No raw Chrome API calls** — business logic never touches `chrome.runtime.*` directly.
3. **Swap transport** — if we ever need to switch from `sendMessage` to `connect` (port-based), only the bus changes.
4. **Single source of truth** — all message types are defined in one place, making it impossible to have mismatched type strings.

---

## TradingView Detection Architecture (Milestone 5)

A reusable, extensible detection layer identifies whether the current page is a supported TradingView view and exposes structured page metadata to the rest of the extension.

### Design

Detection is split into a **detection service** (pure logic) and a **page watcher** (observation). The content script stays lightweight — it only composes detectors, observes changes, and forwards results.

- **Detectors** implement the `PageDetector` interface (`matches(url)` + `detect(doc, url)`) and are registered with the `DetectionService`.
- The **DetectionService** picks the first detector that `matches()` the URL and returns its result. If no detector matches, it returns `{ supported: false, reason: "Not a TradingView page" }`.
- The **TradingViewDetector** recognizes `tradingview.com` and `*.tradingview.com`, and classifies `/chart/*` paths as a supported **chart** page.
- Page metadata (symbol, exchange, timeframe, url, title) is extracted from the URL query string (`symbol`, `interval`) and the document title only — no DOM scraping, no undocumented APIs.
- Future page types (screener, watchlist, symbol page) and detectors (NSE, Broker) are added by implementing new detectors and registering them — no changes to the existing architecture.

### Folder Structure

```
apps/extension/src/shared/detection/
├── index.ts               # Barrel export
├── types.ts               # PageDetection union + page type constants/labels
├── detector.ts            # PageDetector interface
├── detection-service.ts   # DetectionService (matches detectors to URLs)
├── tradingview-detector.ts # TradingView page classifier
├── chart-info.ts          # Symbol/exchange/timeframe extraction
└── detection-store.ts     # Background-side state store (per tab)
```

### Supported Page Types

| `pageType` | URL pattern | Extracted metadata                      |
| ---------- | ----------- | --------------------------------------- |
| `chart`    | `/chart/*`  | symbol, exchange, timeframe, url, title |

Unsupported results are `{ supported: false, reason }` with reasons such as `"Not a TradingView page"` or `"Unsupported TradingView page"`.

### Detection Flow

```
┌──────────────────────────┐
│  Content Script          │
│  ┌────────────────────┐  │
│  │ page-watcher.ts    │  │  history/popstate/title/poll
│  └─────────┬──────────┘  │        events
│            ▼             │
│  DetectionService        │
│    └─ TradingViewDetector│
│            ▼             │
│     PageDetection        │
│            │             │
└────────────┼─────────────┘
             │ PAGE_DETECTED (bus.send)
             ▼
┌──────────────────────────┐
│  Background Service      │
│  DetectionStore          │
│  (keyed by tab id)       │
└───────┬──────────┬───────┘
        │          ▲
        │          │ GET_PAGE_DETECTION
        ▼          │
┌────────────┐  ┌──────────────┐
│   Popup    │  │ Side Panel   │
│ (on mount) │  │ (on mount)   │
└────────────┘  └──────────────┘
```

### Message Flow

| Message              | Sender     | Receiver   | Direction                             |
| -------------------- | ---------- | ---------- | ------------------------------------- |
| `PAGE_DETECTED`      | Content    | Background | pushes detection payload (per tab)    |
| `GET_PAGE_DETECTION` | Popup/Side | Background | requests stored detection             |
| `PAGE_DETECTION`     | Background | Popup/Side | responds with `PageDetection \| null` |

### State Ownership

The **background service worker** is the single source of truth for detection state. It stores the latest `PageDetection` per tab (from `PAGE_DETECTED`) and serves it to the Popup and Side Panel via `GET_PAGE_DETECTION` / `PAGE_DETECTION`. Popup and Side Panel never compute detection themselves; they only render what the background reports. The `DetectionStore` keeps a per-tab map plus a fallback to the latest result when the requesting context has no tab.

---

## UI Architecture (Milestone 4)

The extension UI is built with React, CSS Modules, and a centralized CSS custom property theme. No CSS frameworks are used.

### Design Principles

1. **Centralized Theme** — All colors, spacing, typography, shadows, and radii are defined as CSS custom properties in `src/theme/` (split into modular files). No hardcoded values anywhere in the application.
2. **Reusable Components** — Shared UI components live in `src/components/`. Both Popup and Side Panel consume these components for a consistent look.
3. **CSS Modules** — Each component has a co-located `.module.css` file for scoped styling. No inline styles.
4. **Shared Layout** — The `Layout` component provides consistent spacing, padding, and structure for both Popup and Side Panel.

### Folder Structure

```
apps/extension/src/
├── components/           # Reusable UI components
│   ├── Button/           # Primary/secondary button
│   ├── Card/             # Generic card container
│   ├── DetectionStatus/  # TradingView detection display
│   ├── Header/           # Title + subtitle header
│   ├── Layout/           # Shared page layout wrapper
│   └── StatusCard/       # Key-value status display
├── styles/               # Global styles
│   ├── base.css          # Reset + base element styles
│   └── index.css         # Imports theme + base
├── theme/                # Centralized design tokens
│   ├── index.ts          # TypeScript exports
│   ├── theme.css         # Aggregator (imports all token files)
│   ├── colors.css        # Color tokens
│   ├── spacing.css       # Spacing tokens
│   ├── typography.css    # Font, size, weight, line-height tokens
│   ├── radius.css        # Border radius tokens
│   ├── shadows.css       # Shadow tokens
│   └── transitions.css   # Transition tokens
├── popup/                # Popup entry point
│   ├── App.tsx           # Popup root component
│   ├── index.html        # Popup HTML shell
│   └── main.tsx          # React mount
├── sidepanel/            # Side Panel entry point
│   ├── App.tsx           # Side Panel root component
│   ├── index.html        # Side Panel HTML shell
│   └── main.tsx          # React mount
├── background/           # Service Worker (state owner)
├── content/              # Content Script (page watcher)
├── shared/               # Shared messaging + detection layer
└── types/                # Shared TypeScript types
```

### Component Hierarchy

```
Layout
└── Header (title, subtitle)
└── Button (primary, secondary)
└── Card
└── StatusCard (label/value rows)
└── DetectionStatus (renders a StatusCard from PageDetection state)
```

### Theme Organization

| File              | Token Group                   | Examples                                      |
| ----------------- | ----------------------------- | --------------------------------------------- |
| `colors.css`      | `--color-*`                   | `--color-bg-primary`, `--color-primary`, etc. |
| `spacing.css`     | `--space-*`                   | `--space-1` (4px) through `--space-10` (40px) |
| `typography.css`  | `--font-*`, `--line-height-*` | `--font-size-sm`, `--font-weight-bold`        |
| `radius.css`      | `--radius-*`                  | `--radius-sm` (4px) through `--radius-full`   |
| `shadows.css`     | `--shadow-*`                  | `--shadow-sm`, `--shadow-md`, `--shadow-lg`   |
| `transitions.css` | `--transition-*`              | `--transition-fast`, `--transition-normal`    |

### Messaging Compatibility

All existing message types, handlers, and flows remain unchanged. The UI layer only imports from `shared/messaging/` for communication with the background worker.

---

## Package Boundaries

TBD — will be defined as packages are created.

---

## TODO: Future Milestones

### App Layer

- `apps/extension` — Chrome Extension (Manifest V3) [DONE]
- `apps/backend` — Node.js API server
- `apps/admin` — Admin dashboard
- `apps/website` — Landing/marketing site

### Package Layer

- `packages/ui` — Shared UI components
- `packages/types` — Shared TypeScript types
- `packages/utils` — Shared utilities
- `packages/trading-engine` — Core trading logic
