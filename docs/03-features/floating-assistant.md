# Floating Assistant (Feature)

> **Purpose:** Feature spec for the chart-overlay assistant panel.
> **Last Updated:** 2026-08-02
> **Related Documents:** [Master Spec](../MASTER_SPEC.md) · [Milestone 07](../milestones/milestone-07-floating-assistant.md) · [Design System](../02-design/design-system.md) · [AI Assistant](ai-assistant.md)

## Summary

A draggable, collapsible **assistant panel overlaid on the TradingView chart** that surfaces the current context, strategies, and signals — and later hosts chat with the AI Assistant.

## Why

The trader should never leave the chart to check the assistant. An always-available overlay keeps context, strategy results, and signals visible exactly where decisions are made.

## Key Capabilities

- Draggable and collapsible overlay on the chart.
- Shows live context (symbol, timeframe, indicators).
- Lists evaluated strategies and the unified signal.
- Later: embedded chat input for the AI Assistant (Milestone 11).

## Design Points

- Lives in `src/ui/floating-assistant/` (planned).
- Reads state from the background (single source of truth), never the DOM directly.
- Position/size persisted per user.

## Non-Goals

- Chart drawing or DOM modification of TradingView internals.

## Dependencies

- Strategy (05) and Signal (06) engines.

## Milestone

[`milestone-07-floating-assistant.md`](../milestones/milestone-07-floating-assistant.md)
