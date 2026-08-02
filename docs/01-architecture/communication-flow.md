# Communication Flow

> **Purpose:** Explains how the extension's contexts communicate via the messaging layer.
> **Last Updated:** 2026-08-02
> **Related Documents:** [Master Spec](../MASTER_SPEC.md) · [Extension Architecture](extension-architecture.md) · [Messaging API](../04-api/messaging.md)

## Messaging Layer

All cross-context communication uses the shared messaging layer in `src/shared/messaging/`:

- **`MessageBus`** — `send` (fire-and-forget) and `request` (request/response) over `chrome.runtime`.
- **`MessageHandler`** — typed message handlers receiving `(message, sender)`.
- **`MSG`** — a typed map of message constants (`src/shared/messaging/constants.ts`).

## Current Messages

| Message                | Sender     | Receiver   | Direction | Purpose                                |
| ---------------------- | ---------- | ---------- | --------- | -------------------------------------- |
| `PING`                 | Any        | Any        | request   | Liveness check (`PONG`).               |
| `GET_EXTENSION_STATUS` | Popup/Side | Background | request   | Extension status (`EXTENSION_STATUS`). |
| `OPEN_SIDE_PANEL`      | Popup      | Background | send      | Open the side panel.                   |
| `HEARTBEAT`            | Background | Popup/Side | send      | Keepalive.                             |
| `PAGE_DETECTED`        | Content    | Background | send      | Push detection payload (per tab).      |
| `GET_PAGE_DETECTION`   | Popup/Side | Background | request   | Fetch stored detection.                |
| `PAGE_DETECTION`       | Background | Popup/Side | response  | `PageDetection \| null`.               |

## Detection Flow

```
Content script
  DetectionService.detect(document, url)
      └──► PAGE_DETECTED ──► Background
                                  └──► DetectionStore (per tab)
  Popup / Side Panel
      GET_PAGE_DETECTION ──► Background ──► PAGE_DETECTION (PageDetection | null)
```

The background service worker is the **single source of truth** for detection state. UI contexts never compute detection themselves.

## Context Extraction Flow (within content script)

```
Page change / mutation
   ├─ new chart URL ──────────────► extract immediately
   └─ same URL mutations ─────────► debounce ~500ms ──► single extraction

ChartContextExtractor.getChartContext()
   ├─ SymbolDetector  ──► symbol, exchange, timeframe, chartType
   ├─ IndicatorDetector ──► indicators[]
   ├─ PriceDetector   ──► visiblePrice?
   └─ MarketDetector ──► marketStatus?
```

Detectors run independently; a failure drops only its own field.

## Future Message Groups

| Group         | Examples                                  | Milestone |
| ------------- | ----------------------------------------- | --------- |
| Market data   | `GET_CANDLES`, `CANDLES`                  | 04        |
| Strategy      | `EVALUATE_STRATEGIES`, `STRATEGY_RESULTS` | 05        |
| Signal        | `GET_SIGNAL`, `SIGNAL`                    | 06        |
| Notifications | `NOTIFICATION_TRIGGERED`                  | 08        |
| Broker        | `GET_ACCOUNT`, `PLACE_ORDER`, `ORDER_ACK` | 10        |
| AI            | `CHART_QUESTION`, `AI_ANSWER`             | 11        |

## Rules

- Every message has a constant in `MSG`, a payload type, and a typed handler.
- Request/response is used when the caller needs a result; send otherwise.
- UI never reads the DOM; it only consumes state provided by the background.
