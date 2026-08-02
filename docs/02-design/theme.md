# Theme

> **Purpose:** Documents the design tokens (CSS custom properties) used across the UI.
> **Last Updated:** 2026-08-02
> **Related Documents:** [Master Spec](../MASTER_SPEC.md) · [Design System](design-system.md) · [UI Guidelines](ui-guidelines.md)

## Overview

All styling values live as **CSS custom properties** (design tokens) in `src/theme/`. No hardcoded colors, spacing, or radii exist in application code. The theme is split into modular files for maintainability.

## Token Files

| File              | Tokens                                                               |
| ----------------- | -------------------------------------------------------------------- |
| `colors.css`      | Color palette (background, surface, text, border, accent, semantic). |
| `spacing.css`     | Spacing scale.                                                       |
| `typography.css`  | Font families, sizes, weights, line heights.                         |
| `radius.css`      | Corner radii scale.                                                  |
| `shadows.css`     | Elevation shadows.                                                   |
| `transitions.css` | Duration + easing curves.                                            |
| `index.css`       | Imports and exposes the complete token set.                          |

## Usage Rules

- Reference tokens only (e.g. `var(--color-surface)`), never raw values.
- Semantic names over raw color names (e.g. `--color-accent` not `--color-blue`).
- The `theme/index.ts` exports a `ThemeToken` type for typed access where needed.

## Token Categories

- **Base** — colors, spacing, radii, shadows.
- **Semantic** — success / warning / danger / info mapped to trading meaning (e.g. buy = accent-success tone).

## Example

```css
.card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
}
```

## Theming Future

- A single source of tokens means dark/light and brand theming can be added by overriding the token set — no component changes required.
