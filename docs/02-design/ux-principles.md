# UX Principles

> **Purpose:** Core user-experience principles that guide every feature.
> **Last Updated:** 2026-08-02
> **Related Documents:** [Master Spec](../MASTER_SPEC.md) · [UI Guidelines](ui-guidelines.md) · [Design System](design-system.md)

## 1. Know the Chart

The single most important UX fact is _what chart the trader is on_. Detection and context extraction drive everything. If we don't know the symbol/timeframe, we say "Unavailable" — we never guess silently.

## 2. Zero-Interference Default

- No popovers or overlays on install.
- The assistant appears only when opened.
- The extension is present but invisible until the trader needs it.

## 3. Signal over Noise

- Show one clear, explained signal — not a wall of indicators.
- Every signal shows _why_ (strategy + conditions), not just a direction.

## 4. Immediate on First, Debounced on Repeat

- First chart load: results immediately.
- Rapid chart fiddling: settle into a single update (~500ms debounce). The UI never feels spammy.

## 5. Graceful Degradation

Missing price? Missing market status? A broker not connected? The feature still works; the missing piece is marked unavailable.

## 6. Actions Are One Click Away

A signal that can be executed should reach the broker in as few clicks as possible (later milestone) — but never execute without explicit confirmation.

## 7. The Assistant Is Grounded

AI answers must cite real chart data. If the model does not know, it says so — it never invents prices or signals.

## 8. Learnability

- Standard TradingView-like icons and terminology.
- Glossary available for terms; hover tooltips on jargon.
- New users can install, open a chart, and see a signal without a manual.

## 9. Trust Through Transparency

- Show what data was extracted and when.
- Show which strategies produced a signal and their parameters.
- Journal and analytics are the trader's own data.
