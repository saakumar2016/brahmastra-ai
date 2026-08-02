# Design System

> **Purpose:** Conventions for shared React components and styling.
> **Last Updated:** 2026-08-02
> **Related Documents:** [Master Spec](../MASTER_SPEC.md) · [Theme](theme.md) · [UI Guidelines](ui-guidelines.md) · [UX Principles](ux-principles.md)

## Approach

- **React + CSS Modules** — each component has a co-located `.module.css`. No inline styles, no CSS frameworks.
- **Shared components** in `src/components/` are consumed by Popup, Side Panel, and later the Floating Assistant.

## Components

| Component    | Purpose                             | Notes                                      |
| ------------ | ----------------------------------- | ------------------------------------------ |
| `Button`     | Primary / secondary / ghost actions | `children: ReactNode`; variants via props. |
| `Card`       | Surface for a section of content    | Rounded, themed surface.                   |
| `Header`     | App header (title, status, actions) | Shared across Popup and Side Panel.        |
| `Layout`     | Consistent spacing/padding shell    | Uses `min-height: 100%` (not `100vh`).     |
| `StatusCard` | A named status row                  | Composes `Card`.                           |

## Composition Rules

- **`StatusCard` composes `Card`** — components build on components; no duplicated structure.
- New shared UI belongs in `src/components/` only when used in 2+ contexts; otherwise keep it local.
- Each component exports a single named component (default export discouraged).

## Future Components (planned)

| Component        | For feature             | Milestone |
| ---------------- | ----------------------- | --------- |
| `StrategyCard`   | Strategy Engine results | 05        |
| `SignalBadge`    | Signal Engine           | 06        |
| `AssistantPanel` | Floating Assistant      | 07        |
| `JournalTable`   | Trade Journal           | 09        |
| `WatchlistItem`  | Watchlist               | 09        |
| `OrderTicket`    | Broker Integration      | 10        |

## Props Conventions

- Prefer explicit props over spread-everything.
- All display text is a prop; components never hardcode copy.
- Variants/tones via typed unions (e.g. `variant: "primary" | "secondary" | "ghost"`).
