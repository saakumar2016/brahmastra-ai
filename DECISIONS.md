# Decisions

> **Purpose:** Records **product** decisions (what and why) with their rationale and impact. Architecture decisions live in [`docs/08-adr/`](docs/08-adr/) instead.
> **Last Updated:** 2026-08-02
> **Related Documents:** [Constitution](BRAHMASTRA_CONSTITUTION.md) · [Master Spec](docs/MASTER_SPEC.md) · [Product Vision](docs/00-project/product-vision.md) · [ADRs](docs/08-adr/) · [Product Backlog](docs/PRODUCT_BACKLOG.md)

**Format:** append new decisions at the end; keep the most recent at the top. Status: `Active` · `Superseded` · `Deferred`.

## D-005 — Grounded AI only; never present unverified predictions as fact

- **Date:** 2026-08-02
- **Decision:** The AI assistant answers only from chart context, market data, strategy results, and journal entries. When data is missing it must say so.
- **Reason:** Trust is the product's core value; an assistant that fabricates prices or predictions destroys it.
- **Alternatives:** Allow the AI to answer freely and hedge. Rejected: undermines the "honest" value and creates liability.
- **Impact:** Prompt engineering and grounding/filtering are first-class parts of Milestone 11 (M11-T02); no secrets ever enter AI context.
- **Status:** Active

## D-004 — Order execution always requires explicit user confirmation; never unattended

- **Date:** 2026-08-02
- **Decision:** Broker execution (Milestone 10) is always user-confirmed, with a dry-run mode for testing. Automated/unattended trading is out of scope.
- **Reason:** The trader stays in control; the product must never act on money without informed consent.
- **Alternatives:** Allow auto-trading with rules. Rejected as a safety and trust risk for an assistive tool.
- **Impact:** Order ticket UI, risk guardrails, and dry-run are required deliverables of Milestone 10.
- **Status:** Active

## D-003 — Offline-first extension; backend is an accelerator, not a prerequisite

- **Date:** 2026-08-02
- **Decision:** The extension works fully without a backend (local-first storage, page-derived data). The backend adds AI, durable history, and push later.
- **Reason:** Keeps the core useful immediately, reduces privacy exposure, and lets the extension degrade gracefully when offline.
- **Alternatives:** Backend-required SaaS. Rejected: adds mandatory signup and network dependency contrary to the chart-first, local-first philosophy.
- **Impact:** Data-source abstraction (M04-T02), local-first journal schema (M09-T01), and the "backend as accelerator" architecture rule.
- **Status:** Active

## D-002 — TradingView first, Zerodha Kite as the first broker

- **Date:** 2026-07-31
- **Decision:** The extension targets TradingView charts first (context + strategies + assistant). The first broker integration is Zerodha Kite, behind a broker-agnostic interface.
- **Reason:** TradingView is where the target users already live; starting there delivers value fastest. Kite is the first concrete execution target (see [broker-integration](docs/03-features/broker-integration.md)).
- **Alternatives:** Multiple chart platforms or brokers at once. Rejected: splits effort and complicates the first release.
- **Impact:** Content scripts declare only TradingView + Kite hosts; driver abstraction keeps other brokers pluggable later (M10-T02).
- **Status:** Active

## D-001 — Chrome Extension (Manifest V3) as the first product surface

- **Date:** 2026-07-31
- **Decision:** Build the first product as a Chrome Extension (Manifest V3) running inside TradingView, rather than a standalone web app or desktop app.
- **Reason:** The extension lives where the trader works (in-chart overlay, context access) with the least friction to adopt.
- **Alternatives:** Web app (no in-chart presence), desktop app (distribution + install friction). Rejected for the chart-first mission.
- **Impact:** Fixed the platform stack (React + Vite + MV3, ADR-001/ADR-003), the permission model, and the distribution path. A mobile companion app remains a low-priority future idea.
- **Status:** Active

---

_Decisions are product-level. Any architectural implications they carry are recorded in the corresponding ADRs in [`docs/08-adr/`](docs/08-adr/)._
