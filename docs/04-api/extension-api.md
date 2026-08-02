# Extension API

> **Purpose:** Documents the Chrome APIs the extension uses and why.
> **Last Updated:** 2026-08-02
> **Related Documents:** [Master Spec](../MASTER_SPEC.md) · [Extension Architecture](../01-architecture/extension-architecture.md) · [Messaging API](messaging.md) · [Security](../SECURITY.md)

## Chrome APIs Used (current)

| API                          | Where                | Purpose                        |
| ---------------------------- | -------------------- | ------------------------------ |
| `chrome.runtime`             | shared `MessageBus`  | Cross-context messaging.       |
| `chrome.runtime.sendMessage` | content              | Push detection to background.  |
| `chrome.runtime.onMessage`   | background           | Receive + handle messages.     |
| `chrome.storage`             | background (planned) | Persist per-tab/session state. |
| `chrome.sidePanel`           | background           | Open/close the side panel.     |

## Manifest (current)

- `manifest_version: 3`
- `permissions: ["storage"]`
- `action.default_popup` → `src/popup/index.html`
- `side_panel.default_path` → `src/sidepanel/index.html`
- `background.service_worker` → `src/background/index.ts` (`type: module`)
- Content scripts on `*.tradingview.com/*` and `kite.zerodha.com/*`

## Internal Contracts

### DetectionService

```ts
new DetectionService([detector]); // detectors implement PageDetector
detectionService.detect(doc, url); // → PageDetection
```

### MessageBus

```ts
bus.send(message); // fire-and-forget
await bus.request(message); // → response
```

### ChartContextExtractor

```ts
new ChartContextExtractor({ symbolDetector, indicatorDetector, priceDetector, marketDetector });
await extractor.getChartContext(); // → ChartContext
```

### DomReader

Wraps all DOM reads (`query`, `queryAll`, `text`, `exists`, `queryIn`, `queryAllIn`, `textIn`). Never throws.

## Planned Permissions/APIs (later)

| API                    | Milestone | Purpose                     |
| ---------------------- | --------- | --------------------------- |
| `chrome.notifications` | 08        | System notifications.       |
| `chrome.alarms`        | 08        | Scheduled condition checks. |
| `chrome.identity`      | 10        | Broker OAuth.               |
| `offscreen`/`fetch`    | 04, 11    | Market data + AI calls.     |

## Rules

- Keep the permission surface minimal (least privilege).
- Content scripts never talk directly to external servers; background does (later).
