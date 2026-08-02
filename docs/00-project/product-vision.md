# Product Vision

> **Purpose:** Articulates the product's north star, mission, and principles.
> **Last Updated:** 2026-08-02
> **Related Documents:** [Master Spec](../MASTER_SPEC.md) · [Project Overview](project-overview.md) · [Roadmap](roadmap.md)

## North Star

> **Every trader should be able to evaluate their trading ideas on TradingView with the rigor of an analyst and the speed of automation — without leaving the chart.**

## The Product We Are Building

Brahmastra AI becomes the trader's **co-pilot on the chart**:

- It **sees** the same chart the trader sees (symbol, timeframe, indicators, price).
- It **thinks** in trading strategies — the trader's own rules, evaluated consistently.
- It **speaks** through a floating assistant, answering questions grounded in the current chart context.
- It **acts** with one click — placing trades at the broker.
- It **remembers** — a journal and strategy analytics that compound over time.

## Guiding Beliefs

1. **Context is everything.** A trading tool that does not know what chart you are on is guessing. Context extraction is the foundation for every other capability.
2. **Rules over vibes.** Strategy engines make decisions consistent and testable. Hardcoded conditions are banned.
3. **Ground the AI.** The assistant must answer from real chart data, never from thin air.
4. **Stay in the flow.** The trader should rarely leave TradingView. Signals, assistant, and execution live on the page.
5. **Pluggable everything.** Strategies, data sources, brokers, and notifications are swappable modules.

## Phased Evolution

| Phase | Theme              | What it delivers                                         |
| ----- | ------------------ | -------------------------------------------------------- |
| 1     | Foundation + Core  | Extension shell, UI, detection, chart context extraction |
| 2     | Intelligence       | Strategy engine, signal engine, market data              |
| 3     | Presence           | Floating assistant, notifications                        |
| 4     | Execution + Memory | Trade journal, broker integration                        |
| 5     | AI Assistant       | Conversational AI grounded in chart + journal            |
| 6     | Production         | Release hardening, distribution                          |

## What We Are NOT Building (for now)

- A standalone trading platform or charting app — we live inside TradingView.
- A signal-selling social network — social features are lowest priority.
- Advice; the tool is an assistant, not a replacement for judgment.

## Success Looks Like

- A trader installs the extension, opens a TradingView chart, and sees their strategies evaluated automatically.
- The floating assistant answers "what's the current regime for BTCUSDT on the 1H?" from real context.
- A signal with a clear reason and confidence is one click away from a broker order.
- The journal shows which strategies work, per market and per timeframe.
