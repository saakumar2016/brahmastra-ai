# Roadmap

> **Purpose:** Prioritized capabilities, delivery phases, and current milestone status.
> **Last Updated:** 2026-08-02
> **Related Documents:** [Master Spec](../MASTER_SPEC.md) · [Milestones](milestones.md) · [Milestones detail](../milestones/) · [Product Backlog](../PRODUCT_BACKLOG.md) · [Change Log](../CHANGELOG.md)

## Prioritized Capabilities

### High Priority

- **Strategy Engine** — evaluate multiple strategies on the chart context.
- **Floating Assistant** — an always-available assistant overlaid on the chart.
- **Signal Engine** — combine strategy results into a unified signal.

### Medium Priority

- **Trade Journal** — record trades, review strategy performance.
- **Watchlist** — track instruments of interest.

### Low Priority

- **Social Trading** — sharing strategies and signals.
- **Mobile App** — companion app for alerts and journaling.

> The working backlog (Now / Next / Later) lives in [`PRODUCT_BACKLOG.md`](../PRODUCT_BACKLOG.md). This file tracks the phase plan and status.

## Delivery Phases

The roadmap is executed as **12 milestones** (see [`../milestones/`](../milestones/)). Phases below group them by theme.

| Phase                      | Milestones | Theme                                                           |
| -------------------------- | ---------- | --------------------------------------------------------------- |
| **Phase 1 — Foundation**   | 01–02      | Project setup, extension core (MV3, UI, messaging, detection).  |
| **Phase 2 — Context**      | 03         | TradingView Context Engine: extract and preserve chart context. |
| **Phase 3 — Intelligence** | 04–06      | Market Data, Strategy, Signal engines.                          |
| **Phase 4 — Presence**     | 07–08      | Floating assistant, notifications.                              |
| **Phase 5 — Memory**       | 09         | Trade journal.                                                  |
| **Phase 6 — Execution**    | 10         | Broker integration.                                             |
| **Phase 7 — AI**           | 11         | AI assistant grounded in chart + journal.                       |
| **Phase 8 — Production**   | 12         | Release hardening and distribution.                             |

## Status Legend

- ✅ `Completed` — accepted and done.
- 🚧 `In Progress` — active work.
- ⏳ `Not Started` — not begun.

## Milestone Status at a Glance

| #   | Milestone                  | Status         |
| --- | -------------------------- | -------------- |
| 01  | Foundation                 | ✅ Completed   |
| 02  | Chrome Extension Core      | ✅ Completed   |
| 03  | TradingView Context Engine | ✅ Completed   |
| 04  | Market Data Engine         | 🚧 In Progress |
| 05  | Strategy Engine            | ⏳ Not Started |
| 06  | Signal Engine              | ⏳ Not Started |
| 07  | Floating Assistant         | ⏳ Not Started |
| 08  | Notifications              | ⏳ Not Started |
| 09  | Trade Journal              | ⏳ Not Started |
| 10  | Broker Integration         | ⏳ Not Started |
| 11  | AI Assistant               | ⏳ Not Started |
| 12  | Production Release         | ⏳ Not Started |

See [`../milestones/`](../milestones/) for the details of each milestone.
