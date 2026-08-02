# Milestone 07 — Floating Assistant

> **Purpose:** Always-available, draggable assistant panel overlaid on the TradingView chart.
> **Last Updated:** 2026-08-02
> **Related Documents:** [Master Spec](../MASTER_SPEC.md) · [Floating Assistant feature](../03-features/floating-assistant.md) · [Signal Engine](milestone-06-signal-engine.md) · [AI Assistant](milestone-11-ai-assistant.md)

## Status

⏳ **Not Started**

## Objective

Deliver an always-available, draggable assistant panel overlaid on the TradingView chart, showing context, strategies, and the unified signal.

## Background

Decisions happen on the chart. A persistent overlay keeps the trader's context, strategy results, and signal visible exactly where they act — no tab switching.

## Deliverables

- Draggable, collapsible overlay panel
- Live context view (symbol, timeframe, indicators)
- Strategy results + unified signal view
- Position/size persistence

## Out of Scope

- Chat (AI Assistant, Milestone 11)
- Notifications

## Dependencies

- Milestones 02 (UI foundation), 03 (context), 05 (strategies), 06 (signal).

## Folder Changes

`src/ui/floating-assistant/`

## Architecture Impact

- First chart-overlay UI surface; reads state from the background service worker only — never the DOM.
- Reuses the design system (02) and the `Signal` contract (06).
- Establishes persistence of UI state (position/size) via the background store.

## Acceptance Criteria

- Panel reads state from the background, never the DOM
- No interference with chart interactions while collapsed
- Signals render with reason breakdown
- Keyboard accessible

## Testing

- Manual: open a chart → panel shows live context and signal; drag/collapse/persist across reloads; verify the panel does not block chart clicks when collapsed.
- Integration tests for state flow (background → panel) with injected store fakes.

## Definition of Done

- All acceptance criteria met; tests green; build/typecheck/lint/format pass.
- Feature doc and changelog updated.

## Future Improvements

- Multi-chart tabs in the panel
- Chat input (feeds Milestone 11)

## Risks

- **Chart interaction conflicts** — overlay can block chart input; mitigated by collapse behavior and pointer-event isolation.
- **Layout drift** — TradingView layout changes; mitigated by keeping the panel DOM-isolated and position-persistent.
