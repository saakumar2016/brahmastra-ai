# Notifications (Feature)

> **Purpose:** Feature spec for alerting the trader when watch conditions fire.
> **Last Updated:** 2026-08-02
> **Related Documents:** [Master Spec](../MASTER_SPEC.md) · [Milestone 08](../milestones/milestone-08-notifications.md) · [Signal Engine](signal-engine.md) · [Security](../SECURITY.md)

## Summary

Alerts the trader when a **watched instrument or strategy condition** fires — via in-extension notifications and later push/desktop notifications.

## Why

Traders cannot watch every chart. Notifications turn the engine into an always-on watchkeeper: "BTCUSDT 1H triggered your RSI-cross strategy."

## Key Capabilities

- Watch a symbol or a strategy on a symbol.
- Evaluate conditions on a schedule (chart open or background data).
- Deduplicate and rate-limit alerts.
- In-extension notification center + system notifications.
- Click-through to the relevant chart.

## Design Points

- Lives in `src/core/notifications/` (planned).
- Reuses Strategy/Signal evaluation — notifications are a consumer, not a reimplementation.
- User-controlled: opt-in per strategy and per instrument.

## Non-Goals

- Order placement.
- Social signal sharing.

## Dependencies

- Strategy Engine (05), Signal Engine (06).

## Milestone

[`milestone-08-notifications.md`](../milestones/milestone-08-notifications.md)
