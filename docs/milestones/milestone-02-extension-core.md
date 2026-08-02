# Milestone 02 — Chrome Extension Core

> **Purpose:** Build the Manifest V3 extension shell — UI, design system, messaging, and TradingView page detection.
> **Last Updated:** 2026-08-02
> **Related Documents:** [Master Spec](../MASTER_SPEC.md) · [Extension Architecture](../01-architecture/extension-architecture.md) · [Communication Flow](../01-architecture/communication-flow.md) · [Design System](../02-design/design-system.md) · [Change Log](../CHANGELOG.md)

## Status

✅ **Completed**

## Objective

Build the Manifest V3 extension shell: UI (Popup + Side Panel), shared design system, messaging layer, and TradingView page detection.

## Background

With the workspace foundation (01) in place, the product needed a working shell that every capability plugs into. Detection establishes the core fact everything depends on — _what chart the trader is on_ — and the UI/theme/messaging layers are the substrate for all later features.

## Deliverables

- MV3 manifest (popup, side panel, background service worker, content script) — see [ADR-001](../08-adr/ADR-001-manifest-v3.md)
- React UI foundation: theme tokens, shared components (`Button`, `Card`, `Header`, `Layout`, `StatusCard`), Popup + Side Panel apps
- Shared messaging layer (`MessageBus`, `MessageHandler`, `MSG` constants)
- Detection layer: `PageDetection` types, `TradingViewDetector`, `DetectionService`, `DetectionStore`, content `page-watcher`
- Detection status UI in Popup and Side Panel

## Task Checklist

| Task ID | Title                                                        | Priority | Size | Deps             | Status    |
| ------- | ------------------------------------------------------------ | -------- | ---- | ---------------- | --------- |
| M02-T01 | MV3 manifest + Vite build wiring                             | High     | M    | M01-T04          | Completed |
| M02-T02 | Theme tokens + base styles                                   | Medium   | M    | M02-T01          | Completed |
| M02-T03 | Shared components (Button, Card, Header, Layout, StatusCard) | Medium   | L    | M02-T02          | Completed |
| M02-T04 | Messaging layer (`MessageBus`, `MSG`)                        | High     | M    | M02-T01          | Completed |
| M02-T05 | Detection types + `TradingViewDetector`                      | High     | M    | M02-T04          | Completed |
| M02-T06 | `DetectionService` + `DetectionStore` (background)           | High     | M    | M02-T05          | Completed |
| M02-T07 | Content `page-watcher`                                       | Medium   | S    | M02-T05          | Completed |
| M02-T08 | Popup + Side Panel detection UI                              | Medium   | M    | M02-T03, M02-T06 | Completed |

> Status is authoritative in [`../../TASK_QUEUE.md`](../../TASK_QUEUE.md).

## Out of Scope

- Context extraction
- Analysis or signals
- Broker integration

## Dependencies

- Milestone 01 (foundation).

## Folder Changes

`apps/extension/src/`: `components/`, `styles/`, `theme/`, `popup/`, `sidepanel/`, `background/`, `content/`, `shared/`

## Architecture Impact

- Establishes the background service worker as the **single source of truth** for cross-context state.
- Defines the typed messaging contract (`src/shared/messaging/`) used by every future message group.
- Sets the UI architecture: React + CSS Modules + theme tokens ([ADR-003](../08-adr/ADR-003-react.md)).

## Acceptance Criteria

- Extension loads unpacked; Popup and Side Panel render
- Background is the single source of truth for detection state
- Content script detects chart vs. unsupported pages and reports to the background
- UIs render detection without reading the DOM themselves
- All messaging is typed; no ad-hoc string messages

## Testing

- Manual verification of detection flow across page types (chart / non-chart).
- Unit tests were introduced in Milestone 03; messaging/UI testing strategy is captured in [`06-testing/`](../06-testing/).

## Definition of Done

- All acceptance criteria pass; extension installs and runs in a clean Chrome profile.
- Messaging and detection contracts documented in [`04-api/messaging.md`](../04-api/messaging.md).

## Future Improvements

- Deep-linking from Side Panel actions to specific TradingView views
- Extension status indicator in the toolbar icon

## Risks

- Low. TradingView DOM/selector drift affects detection only; mitigated by the centralized detection layer.
