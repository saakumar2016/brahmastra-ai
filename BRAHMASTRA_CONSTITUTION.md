# Brahmastra AI — Constitution

> **Purpose:** The highest-level charter of the project — vision, values, and standing principles. It changes rarely; everything else in the repository must align with it.
> **Last Updated:** 2026-08-02
> **Related Documents:** [CLAUDE.md](CLAUDE.md) · [Master Spec](docs/MASTER_SPEC.md) · [Project State](PROJECT_STATE.md) · [Task Queue](TASK_QUEUE.md)

The Constitution states **why we exist and the standing principles we never violate**. It does not restate the product spec or the architecture — those live in [`docs/MASTER_SPEC.md`](docs/MASTER_SPEC.md) and the `docs/` handbook, which must always align with this document.

---

## Project Vision

Every trader should be able to evaluate their trading ideas on TradingView with the rigor of an analyst and the speed of automation — without leaving the chart.

## Mission

Build a trustworthy, self-improving trading assistant that **sees** the trader's chart, **thinks** in explicit, reviewable trading strategies, **speaks** through a grounded AI assistant, **acts** only with explicit user confirmation, and **remembers** through a journal — so that the trader's decisions are consistently informed by their own rules and history.

## Core Values

1. **Honesty over hype.** The assistant never invents data. "I don't know" is a valid answer; "Unavailable" is a valid state.
2. **The trader stays in control.** Every action that touches money requires explicit, informed confirmation. There is no unattended trading.
3. **Trust through transparency.** Signals, strategies, and AI answers must be explainable and auditable.
4. **Simplicity over cleverness.** Prefer the smallest solution that is correct, tested, and maintainable over years.
5. **Excellence in the details.** Deterministic behavior, strict typing, tested edge cases, and readable docs are features, not chores.

## Engineering Principles

1. **Correctness first** — code must be deterministic, typed, and tested before it is considered done.
2. **Reuse, don't duplicate** — shared logic lives in shared modules; cross-reference documentation instead of copying it.
3. **Composition over inheritance** — small composable modules over deep hierarchies.
4. **Dependency injection at boundaries** — modules receive their collaborators; they never hardcode them.
5. **Fail partial, never fail wholesale** — a failing component drops only its own output.
6. **Documentation is part of the work** — behavior changes ship with updated docs and changelog entries.

## Architecture Principles

1. **The background service worker owns cross-context state.** UI contexts read state; they never compute it.
2. **`src/core/` is UI-independent.** Business logic lives outside React components.
3. **Offline-first.** The extension works without a backend; the backend is an accelerator, not a prerequisite.
4. **No scraping of TradingView internals.** Use declared, stable, or authorized data paths only.
5. **Centralized selectors** — never hardcode DOM selectors outside dedicated selector modules.
6. **Decisions are recorded.** Architecture decisions live in ADRs; product decisions in `DECISIONS.md`.

## Product Philosophy

1. **Chart-first** — the tool lives where the trader works and complements the chart without competing for attention.
2. **Privacy-respecting** — minimal permissions, encrypted secrets, no data leaks beyond intended channels.
3. **Local-first** — user data is available offline and syncs later; the user owns their journal.
4. **Pluggable by design** — strategies, data sources, and AI providers are swappable, never hardwired.

## Quality Standards

1. **Strict TypeScript** — no `any`; exhaustive discriminated unions; interfaces at module boundaries.
2. **All pure logic is unit-tested** — valid, invalid, empty, and edge cases.
3. **Deterministic tests** — fake timers for debounce, no network, no real DOM in unit tests.
4. **Gates must pass before done** — build, typecheck, lint, tests, format (see Definition of Done).
5. **A clean tree** — no lint noise, no formatting drift, no generated files committed.

## Security Principles

1. **Least privilege** — the smallest permission surface that works; every permission is reviewed per release.
2. **Secrets never leak** — encrypted at rest, never logged, never committed, never sent to AI context.
3. **All external calls from the background** — never from the content script.
4. **Order placement always requires explicit user confirmation** — with dry-run support.
5. **Input validation at every boundary** — messages, broker/backend payloads, and DOM data are never trusted blindly.

## Performance Principles

1. **Extraction is debounced** — bursts of DOM mutations produce a single unit of work.
2. **Repeated work is cached** — identical fetches and computations are served from cache.
3. **Small, fast extensions** — bundle size and startup time are reviewed; heavy work is deferred or offloaded to the backend.

## Scalability Principles

1. **Engine boundaries are seams** — market data, strategy, and signal engines are independent, swappable modules.
2. **The watchlist/scanner design is data-source-agnostic** — it must scale to many instruments without rearchitecting.
3. **The backend is designed as an accelerator** — durable, multi-user features grow there, not in the extension.

## Maintainability Principles

1. **Stable public contracts** — engine APIs (e.g. `getChartContext`) stay stable even when internals change.
2. **Single source of truth** — `MASTER_SPEC.md` defines the product; milestone docs define delivery; `TASK_QUEUE.md` defines execution.
3. **Documentation is living** — updated with every change, never regenerated wholesale.
4. **Technical debt is tracked, not hidden** — in `PRODUCT_BACKLOG.md` and `TASK_QUEUE.md`, with a plan.

## AI Development Principles

1. **Grounded generation** — AI answers reference real chart data, market data, strategy results, and journal entries.
2. **No fabrication** — missing data is explicitly admitted; citations are required where feasible.
3. **Provider-agnostic** — LLM providers are swappable; no vendor lock-in.
4. **No secrets in context** — broker credentials and private data are never part of AI prompts.
5. **AI assists; the trader decides** — AI never places orders.

## Definition of Success

Brahmastra AI succeeds when:

1. A trader can load a TradingView chart, see their strategies evaluated against real data, understand the resulting signal, and act on it with one confirmed click — all without leaving the page.
2. The extension is trustworthy: it is deterministic, honest about unknowns, secure, and never acts without consent.
3. The engineering system sustains itself: new contributors (human or AI) can "resume" the project from its documentation and make safe, consistent progress without long briefings.
4. The codebase stays healthy for years: green gates, low debt, tested logic, and a documentation set that reflects reality.

## Long-Term Vision

- A watchlist/scanner across instruments and market regimes.
- Journal-aware AI coaching and "why did this signal fire?" explanations.
- Multi-broker execution with robust risk guardrails.
- Push notifications and multi-device sync via the backend.
- Eventually: a trusted companion traders rely on daily — still grounded, still honest, still under the trader's control.

---

_This document aligns with, and is superior to, [`docs/MASTER_SPEC.md`](docs/MASTER_SPEC.md). Any conflict is resolved in favor of this Constitution; change the Constitution only through deliberate, rare amendments._
