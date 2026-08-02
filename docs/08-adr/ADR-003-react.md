# ADR-003 — React

> **Purpose:** Record the decision to use React for all extension UI.
> **Last Updated:** 2026-08-02
> **Related Documents:** [Design System](../02-design/design-system.md) · [UI Guidelines](../02-design/ui-guidelines.md) · [Extension Architecture](../01-architecture/extension-architecture.md)

- **Status:** Accepted
- **Decision:** Use **React 18** for the Popup, Side Panel, and future Floating Assistant, with CSS Modules for styling and a CSS custom-property theme.
- **Context:** The extension needs several small, componentized UIs that share a design system (Popup, Side Panel, Floating Assistant). The team is already familiar with React; it integrates cleanly with Vite; and the DOM is small enough that a full framework like Angular is unnecessary.
- **Alternatives:**
  - Vanilla TS + lit/Web Components — lighter but loses shared component ergonomics and JSX ergonomics.
  - Vue/Svelte — viable but inconsistent with team familiarity.
  - No framework (plain DOM) — acceptable for the popup but poor for the side panel and assistant.
- **Consequences:**
  - All UI logic must stay out of `src/core/`; components are presentational.
  - Shared components live in `src/components/`; CSS Modules enforce scoping.
  - Bundle size is managed via Vite code-splitting per entry (popup/sidepanel/assistant).
- **Date:** 2026-08-02
