# ADR-004 — Zustand

> **Purpose:** Record the decision to use Zustand for shared client state as the UI surface grows.
> **Last Updated:** 2026-08-02
> **Related Documents:** [Extension Architecture](../01-architecture/extension-architecture.md) · [Design System](../02-design/design-system.md) · [Master Spec](../MASTER_SPEC.md)

- **Status:** Accepted
- **Decision:** Adopt **Zustand** for shared client-side state within extension UIs (Popup, Side Panel, Floating Assistant) as the UI grows beyond local component state.
- **Context:** Today the UI uses local React state and requests data from the background via the messaging layer. As strategies, signals, assistant chat, and journal views arrive, multiple UI contexts will need shared, selectable state (current chart context, active signal, assistant session) without prop drilling or heavy boilerplate. Zustand is minimal, selector-based (avoids re-render storms), and lives entirely in the client — it complements, not replaces, the background's role as the cross-context source of truth.
- **Alternatives:**
  - Redux Toolkit — full-featured but more ceremony than the extension needs.
  - React Context — simple but re-renders on every store change; poor for frequently updated values (prices, signals).
  - Jotai — viable (atom-based), but Zustand's store + selector model fits the shared-session pattern better here.
  - No client store — acceptable now, but prop drilling grows unmanageable with multiple UI contexts.
- **Consequences:**
  - Client stores mirror (never own) background truth; the background remains the source of truth for cross-context state.
  - Zustand is added as a dependency in Milestone 04+ UI work; stores are typed and exported from dedicated modules (e.g. `src/ui/stores/`).
  - Selectors must be used to avoid needless re-renders.
- **Date:** 2026-08-02
