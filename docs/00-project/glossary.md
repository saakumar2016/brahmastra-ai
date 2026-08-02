# Glossary

> **Purpose:** Defines key terms used across the project documentation.
> **Last Updated:** 2026-08-02
> **Related Documents:** [Master Spec](../MASTER_SPEC.md) · [Project Overview](project-overview.md) · [Folder Structure](../01-architecture/folder-structure.md)

| Term                            | Definition                                                                                                                                                |
| ------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **ADR**                         | Architecture Decision Record — a note capturing a decision and its rationale.                                                                             |
| **Background (service worker)** | The MV3 extension script that owns cross-tab state and listens for runtime messages.                                                                      |
| **Broker**                      | A service that executes trades (e.g. Zerodha Kite).                                                                                                       |
| **Candle**                      | A single OHLCV (open, high, low, close, volume) data point.                                                                                               |
| **Chart Context**               | The extracted, structured description of what is currently on a chart: symbol, exchange, timeframe, chart type, indicators, visible price, market status. |
| **Content Script**              | A script injected into TradingView pages that reads the DOM and talks to the background.                                                                  |
| **Exchange**                    | The venue a symbol trades on (e.g. BINANCE, NSE).                                                                                                         |
| **Floating Assistant**          | An always-available, draggable assistant panel overlaid on the chart.                                                                                     |
| **Indicator**                   | A derived series (EMA, RSI, MACD, etc.) applied to the chart.                                                                                             |
| **Manifest V3 (MV3)**           | The current Chrome extension manifest format. Selected for Brahmastra AI (ADR-001).                                                                       |
| **Market Status**               | Whether the market for a symbol is currently `open` or `closed`.                                                                                          |
| **Message Bus**                 | The shared messaging abstraction used to send typed messages between extension contexts.                                                                  |
| **OHLCV**                       | Open, High, Low, Close, Volume — the fields of a candle.                                                                                                  |
| **Popup**                       | The small browser-action window of the extension.                                                                                                         |
| **Scanner**                     | A feature that watches a watchlist of symbols for signals.                                                                                                |
| **Side Panel**                  | The Chrome side panel that hosts the main extension UI.                                                                                                   |
| **Signal**                      | A unified, confidence-scored conclusion produced from strategy results (buy / sell / neutral).                                                            |
| **Strategy**                    | A set of rules that produces a signal for a given chart context.                                                                                          |
| **Strategy Engine**             | The module that evaluates pluggable strategies.                                                                                                           |
| **Symbol**                      | The instrument identifier (e.g. BTCUSDT, RELIANCE).                                                                                                       |
| **Timeframe**                   | The chart interval (e.g. 15m, 1H, 1D).                                                                                                                    |
| **Trade Journal**               | The record of trades and strategy performance analytics.                                                                                                  |
| **Watchlist**                   | A user-defined list of symbols to monitor.                                                                                                                |
