# UI Guidelines

> **Purpose:** Interface behavior, layout, and interaction conventions.
> **Last Updated:** 2026-08-02
> **Related Documents:** [Master Spec](../MASTER_SPEC.md) · [Design System](design-system.md) · [Theme](theme.md) · [UX Principles](ux-principles.md)

## Principles

1. **Chart-first** — the extension complements the chart; it never competes for attention while the trader is working.
2. **Consistent** — Popup, Side Panel, and Floating Assistant share components and tokens.
3. **Calm** — muted defaults, explicit highlights only for signals and alerts.
4. **Resilient** — every field can show "Unavailable"; the UI never breaks when data is missing.

## Layout

- Popup: compact, task-focused (status + quick actions).
- Side Panel: the main workspace — detection summary now; strategies, signals, journal later.
- Floating Assistant: draggable overlay, collapsible.

## Content States

| State       | Rendering                         |
| ----------- | --------------------------------- |
| Loading     | Skeleton or "Loading…"            |
| Available   | Real value                        |
| Unavailable | "Unavailable" (never a blank)     |
| Error       | Message + retry where appropriate |

## Writing

- Plain, terse labels. No jargon in UI text (glossary terms explained on hover where needed).
- Numbers: symbol uppercase; prices with appropriate precision; timeframes as labels (`15m`, `1H`, `1D`).

## Accessibility

- Keyboard-operable controls.
- Status conveyed not only by color (e.g. text/icon + color).
- Reasonable contrast using theme tokens.

## Dark/Light

- The extension follows the theme tokens in `src/theme/`; both popup and side panel use the same palette.
- Charts themselves are TradingView's domain — do not restyle them.
