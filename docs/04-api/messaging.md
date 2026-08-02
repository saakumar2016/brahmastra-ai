# Messaging API

> **Purpose:** Contract for all cross-context runtime messaging in the extension.
> **Last Updated:** 2026-08-02
> **Related Documents:** [Master Spec](../MASTER_SPEC.md) · [Communication Flow](../01-architecture/communication-flow.md) · [Extension Architecture](../01-architecture/extension-architecture.md)

## Overview

All cross-context communication goes through the shared messaging layer in `src/shared/messaging/`. Two patterns are used:

- **`send`** — fire-and-forget (`PAGE_DETECTED`).
- **`request`** — request/response (`GET_PAGE_DETECTION` → `PAGE_DETECTION`).

Messages are typed constants (`MSG`) in `src/shared/messaging/constants.ts`. Handlers receive `(message, sender)`.

## Message Table (current)

| Message                | Pattern  | Payload                 | Response                                   |
| ---------------------- | -------- | ----------------------- | ------------------------------------------ |
| `PING`                 | request  | —                       | `PONG`                                     |
| `GET_EXTENSION_STATUS` | request  | —                       | `EXTENSION_STATUS`                         |
| `OPEN_SIDE_PANEL`      | send     | —                       | —                                          |
| `HEARTBEAT`            | send     | timestamp               | —                                          |
| `PAGE_DETECTED`        | send     | `PageDetection`         | —                                          |
| `GET_PAGE_DETECTION`   | request  | —                       | `PAGE_DETECTION` (`PageDetection \| null`) |
| `PAGE_DETECTION`       | response | `PageDetection \| null` | —                                          |

## Contracts (current)

### PageDetection

```ts
type PageDetection =
  | {
      supported: true;
      pageType: "chart";
      symbol?: string;
      exchange?: string;
      timeframe?: string;
      url: string;
    }
  | { supported: false; reason: string };
```

### ChartContext

```ts
interface ChartContext {
  symbol: string;
  exchange: string;
  timeframe: string;
  chartType: string;
  url: string;
  indicators: IndicatorInfo[];
  visiblePrice?: number;
  marketStatus?: "open" | "closed";
  timestamp: number;
}
```

## Future Message Groups

| Group         | Messages                                    | Milestone |
| ------------- | ------------------------------------------- | --------- |
| Market data   | `GET_CANDLES` / `CANDLES`                   | 04        |
| Strategy      | `EVALUATE_STRATEGIES` / `STRATEGY_RESULTS`  | 05        |
| Signal        | `GET_SIGNAL` / `SIGNAL`                     | 06        |
| Notifications | `NOTIFICATION_TRIGGERED`                    | 08        |
| Broker        | `GET_ACCOUNT` / `PLACE_ORDER` / `ORDER_ACK` | 10        |
| AI            | `CHART_QUESTION` / `AI_ANSWER`              | 11        |

## Rules

- New messages: add constant → payload type → handler → update this table.
- Every message has a typed payload; no stringly-typed ad-hoc messages.
- Request/response only when the caller needs a result.
