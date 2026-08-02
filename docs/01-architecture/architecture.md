# System Architecture

> **Purpose:** Describes the overall system — the Chrome extension and the planned backend.
> **Last Updated:** 2026-08-02
> **Related Documents:** [Master Spec](../MASTER_SPEC.md) · [Extension Architecture](extension-architecture.md) · [Backend Architecture](backend-architecture.md) · [Folder Structure](folder-structure.md)

## High-Level Overview

Brahmastra AI is primarily a **Chrome Extension** that runs inside TradingView. A lightweight **backend** (planned) will host AI analysis, durable storage, and push notifications.

```
┌───────────────────────────────────────────────┐
│                    Browser                     │
│                                               │
│   TradingView Page                             │
│   ┌───────────────────────────────────────┐   │
│   │ Content Script                         │   │
│   │  - Page Watcher (detection)            │   │
│   │  - Chart Context Extractor             │   │
│   └───────────────┬───────────────────────┘   │
│                   │ runtime messages          │
│   ┌───────────────▼───────────────────────┐   │
│   │ Background Service Worker             │   │
│   │  - DetectionStore (per-tab state)     │   │
│   │  - Strategy/Signal evaluation (later) │   │
│   │  - Broker session (later)             │   │
│   └───────────────┬───────────────────────┘   │
│                   │                           │
│   ┌───────────────▼───────────────────────┐   │
│   │ Popup  │  Side Panel  │  Assistant    │   │
│   │ (UI)   │  (UI)        │  (UI overlay) │   │
│   └───────────────────────────────────────┘   │
└────────────────────────┬──────────────────────┘
                         │ HTTPS (planned)
              ┌──────────▼──────────┐
              │  Backend (planned)  │
              │  - AI Analysis API  │
              │  - Market data      │
              │  - Notifications    │
              └─────────────────────┘
```

## Layering

- **Presentation** — Popup, Side Panel, Floating Assistant (React + CSS Modules).
- **Core Engine** — detection, context extraction, and later market data / strategy / signal logic. Lives in `src/core/` and is UI-independent.
- **Shared** — messaging, types, and contracts shared between contexts (`src/shared/`).
- **Backend (planned)** — AI, durable storage, push.

## State Ownership

The **background service worker** is the single source of truth for cross-context state (currently detection per tab). UI contexts request state; they never compute it themselves. This rule extends to future state (signals, broker sessions, journal).

## Design Principles

1. **Dependency injection** — engines receive their dependencies; they never hardcode collaborators. This makes them testable and swappable (e.g. `ChartContextExtractor`).
2. **Partial failure** — a failing component degrades gracefully; it never discards data already produced by other components.
3. **Graceful extraction** — DOM reads never throw and never break the page.
4. **Strict typing** — no `any`; interfaces define contracts at module boundaries.

## Backend Coupling (Planned)

The extension should degrade gracefully when offline. Market data and strategy evaluation must work from the page where possible; the backend is an accelerator (AI, history, push), not a prerequisite.

---

## ADR-001 — Manifest V3

|                 |                                                                             |
| --------------- | --------------------------------------------------------------------------- |
| **Status**      | Accepted                                                                    |
| **Decision**    | Use **Manifest V3** for the Chrome extension.                               |
| **Reason**      | Future-proof: MV3 is the current and only supported manifest going forward. |
| **Alternative** | Manifest V2 (deprecated, removed from Chrome).                              |
