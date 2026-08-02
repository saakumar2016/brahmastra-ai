# Milestone 08 — Notifications

> **Purpose:** Alert the trader when a watched instrument or strategy condition fires.
> **Last Updated:** 2026-08-02
> **Related Documents:** [Master Spec](../MASTER_SPEC.md) · [Notifications feature](../03-features/notifications.md) · [Strategy Engine](milestone-05-strategy-engine.md) · [Signal Engine](milestone-06-signal-engine.md) · [Security](../SECURITY.md)

## Status

⏳ **Not Started**

## Objective

Alert the trader when a watched instrument or strategy condition fires — in-extension first, system notifications later.

## Background

Traders cannot watch every chart. Notifications turn the engine into an always-on watchkeeper that evaluates strategies for a watchlist without the chart being open.

## Deliverables

- Notification types + center
- Watch conditions (symbol × strategy)
- Scheduled evaluation (background + alarms)
- Deduplication and rate limiting
- System notifications (`chrome.notifications`)
- Click-through to the relevant chart

## Out of Scope

- Order placement
- Social signal sharing

## Dependencies

- Milestones 05 (strategy) and 06 (signal) — **reused**, never reimplemented.

## Folder Changes

`src/core/notifications/`, `src/background/` (scheduling)

## Architecture Impact

- Extends the background service worker into a scheduled evaluator using `chrome.alarms`.
- Adds watchlist as a persisted entity evaluated off-chart.
- Permission surface grows (`notifications`, `alarms`) — reviewed per [SECURITY.md](../SECURITY.md).

## Acceptance Criteria

- Opt-in per strategy and per instrument
- No duplicate alerts for the same condition
- Alerts link to the triggering chart
- Evaluation reuses Strategy/Signal engines (no reimplementation)

## Testing

- Manual: add a watch on a symbol/strategy → set a near-term condition → verify a single alert fires, then click-through opens the chart.
- Unit tests for deduplication, rate limiting, and scheduling logic (fake timers).

## Definition of Done

- All acceptance criteria met; tests green; build/typecheck/lint/format pass.
- Permission changes reflected in manifest + [SECURITY.md](../SECURITY.md).
- Changelog updated.

## Future Improvements

- Push notifications via backend
- Notification templates per strategy

## Risks

- **Notification fatigue / spamming** — mitigated by deduplication, rate limiting, and opt-in per strategy/instrument.
- **Permission review friction** — new permissions require store review; mitigated by scoping alerts to evaluated conditions only.
