# ADR-001 — Manifest V3

> **Purpose:** Record the decision to build the extension on Manifest V3.
> **Last Updated:** 2026-08-02
> **Related Documents:** [Architecture](../01-architecture/architecture.md) · [Extension Architecture](../01-architecture/extension-architecture.md) · [Master Spec](../MASTER_SPEC.md)

- **Status:** Accepted
- **Decision:** Use **Manifest V3** for the Chrome extension.
- **Context:** Chrome is the target browser and TradingView is the primary host. Extensions must pick a manifest generation; MV2 is being phased out by Chrome. The extension needs a modern service worker, module support, and a path that stays supported long-term.
- **Alternatives:**
  - Manifest V2 — deprecated and removed from modern Chrome; not viable long-term.
  - Firefox/WebExtension hybrid — not a target; kept future-compatible but not decided now.
- **Consequences:**
  - Background logic runs in a service worker (no long-lived pages); state is per-event or persisted to `chrome.storage`.
  - Remote code is banned (CSP is enforced by the platform) — all code is bundled by Vite.
  - Permissions must be declared upfront and kept minimal.
- **Date:** 2026-08-02
