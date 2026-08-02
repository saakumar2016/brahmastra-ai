# Project Overview

> **Purpose:** High-level introduction to Brahmastra AI — what it is and what it does.
> **Last Updated:** 2026-08-02
> **Related Documents:** [Master Spec](../MASTER_SPEC.md) · [Product Vision](product-vision.md) · [Roadmap](roadmap.md) · [Glossary](glossary.md)

## What is Brahmastra AI?

Brahmastra AI is an AI-powered trading assistant that runs as a **Chrome Extension** (Manifest V3) and works directly on **TradingView** charts (with later support for brokers such as Zerodha Kite). It observes the chart the trader is looking at, understands the technical context, evaluates trading strategies, and surfaces actionable signals — without the trader leaving the page.

## The Problem

- Trading on TradingView means juggling multiple tools: manual chart reading, spreadsheets, screeners, and broker terminals.
- Strategy evaluation is repetitive, error-prone, and hard to keep consistent.
- Acting on a signal is slow: analyze → decide → switch to broker → execute.
- No single tool combines chart context, strategy evaluation, and execution in one flow.

## The Solution

A single extension that provides:

1. **Context** — knows exactly what chart you are viewing (symbol, exchange, timeframe, indicators, price, market status).
2. **Strategy Engine** — evaluates multiple, user-defined strategies on that context.
3. **Signals** — combines strategy results into a unified, confidence-scored signal.
4. **Assistant** — a floating, chat-driven AI assistant grounded in the current chart.
5. **Broker integration** — one-click execution from the chart.
6. **Journaling** — keeps a trade journal and per-strategy analytics.
7. **Notifications** — alerts you when a watched instrument hits a condition.

## Key Modules

| Module               | Description                                                                                               |
| -------------------- | --------------------------------------------------------------------------------------------------------- |
| Chart Context Engine | Reads symbol, exchange, timeframe, chart type, indicators, price, market status from the TradingView DOM. |
| Market Data Engine   | Provides candle/series data to strategies and the AI.                                                     |
| Strategy Engine      | Evaluates pluggable trading strategies against the context.                                               |
| Signal Engine        | Combines strategy results into a unified signal.                                                          |
| Floating Assistant   | Chat-based AI assistant overlaid on the chart.                                                            |
| Broker Integration   | Connects to brokers (e.g. Zerodha Kite) for account, positions, orders.                                   |
| Trade Journal        | Records trades and strategy performance.                                                                  |
| Scanner              | Watches a watchlist for signals.                                                                          |

## Target Users

- Technical traders who live in TradingView.
- Traders who want consistent, automated strategy evaluation.
- Traders who want AI assistance grounded in their actual charts.

## Design Principles

- **Chart-first** — everything hangs off the chart context.
- **Pluggable** — strategies are modules, not hardcoded conditions.
- **Non-intrusive** — the extension enhances TradingView without fighting it.
- **Extensible** — every future feature is a new module with a stable interface.
