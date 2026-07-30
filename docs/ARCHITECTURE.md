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
- Coordinating messages between content scripts and the popup/side panel (future)
- Managing long-lived state and API connections (future)

It has **no DOM access** and runs in its own isolated context.

### Content Script

**File:** `src/content/index.ts`

Content scripts are injected into web pages that match the declared URL patterns:

- `https://*.tradingview.com/*`
- `https://kite.zerodha.com/*`

Current behavior: sends `PING` on load and logs "Communication established" on success.

Future responsibilities will include:

- Reading DOM data from TradingView/Kite
- Injecting UI overlays or buttons into the page
- Communicating with the background worker via the message bus

Content scripts have **partial DOM access** but run in an isolated world (not the page's JavaScript context).

### Popup

**Files:** `src/popup/`

The popup is a small React application that opens when the user clicks the extension toolbar icon. It is built as a separate Vite HTML entry point.

Current behavior: displays "Brahmastra AI" heading with a "Check Extension Status" button. On click, sends `GET_EXTENSION_STATUS` and shows loaded state, version, and timestamp.

Future responsibilities:

- Quick account overview
- Manual trade triggers
- Status indicators

The popup **closes when the user clicks outside it**, so it should not hold critical state.

### Side Panel

**Files:** `src/sidepanel/`

The side panel is a persistent React application that lives in the Chrome DevTools side panel. Unlike the popup, it stays open across tab navigations.

Current behavior: displays "Brahmastra AI" heading with "Communication Ready" status and a "Ping Background" button. On click, sends `PING` and displays "PONG" on success.

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
│  Display result  │  │  Display PONG    │  │  Log result      │
└──────────────────┘  └──────────────────┘  └──────────────────┘
```

### Design

Instead of calling `chrome.runtime.sendMessage` directly throughout the codebase, a **Message Bus** abstraction layer is used. Every message flows through the bus, ensuring:

- **Type safety** — all message types are defined as discriminated unions in `message-types.ts`
- **Single responsibility** — the bus handles transport; handlers handle business logic
- **Testability** — the bus can be mocked or replaced without changing consumers
- **Extensibility** — new message types and runtime participants can be added without refactoring

### Files

| File                                      | Purpose                                                                                               |
| ----------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| `src/shared/messaging/constants.ts`       | String constants for all message types (prevents typos across files)                                  |
| `src/shared/messaging/types.ts`           | Shared data structures (e.g., `ExtensionStatus`)                                                      |
| `src/shared/messaging/message-types.ts`   | Strongly typed discriminated unions: `Request`, `Response`, `Message`                                 |
| `src/shared/messaging/message-bus.ts`     | Low-level transport: `send()` (fire-and-forget), `request()` (await response), `onMessage()` (listen) |
| `src/shared/messaging/message-handler.ts` | Higher-level dispatch: `handle(type, handler)` + `listen()` registers everything                      |

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
