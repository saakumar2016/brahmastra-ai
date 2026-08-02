# Backend Architecture (Planned)

> **Purpose:** Captures the intended backend design so the extension stays compatible with it.
> **Last Updated:** 2026-08-02
> **Related Documents:** [Master Spec](../MASTER_SPEC.md) · [Architecture](architecture.md) · [Backend API](../04-api/backend-api.md) · [Database Schema](../05-database/schema.md)

> **Status: Planned.** The extension is currently fully client-side. This document captures the intended backend design so the extension stays compatible with it.

## Purpose

The backend exists to accelerate and extend what the extension cannot do alone:

1. **AI analysis** — LLM-assisted analysis grounded in chart context and journal data.
2. **Durable storage** — strategies, watchlists, journal, user settings across devices.
3. **Market data** — historical candle series and multi-instrument data without scraping TradingView.
4. **Notifications** — push alerts when watched conditions fire.
5. **Auth + sync** — user accounts, API keys (broker, AI provider).

## High-Level Design

```
Extension (client)                  Backend
─────────────────                   ───────────────────────────
Chart Context ──── HTTPS ─────────► REST API (auth, CRUD)
Market Data   ◄── WebSocket/HTTPS ─ Market Data Service
AI Assistant  ◄── HTTPS ─────────── AI Service (LLM provider)
Journal/Strategy ─ HTTPS ─────────► Storage (DB)
Notifications ◄── Push ──────────── Notification Service
```

## Components

| Component            | Responsibility                                                                  |
| -------------------- | ------------------------------------------------------------------------------- |
| REST API             | Auth, strategies CRUD, watchlist, journal, settings.                            |
| Market Data Service  | Candle/OHLCV delivery (cached, multi-source).                                   |
| AI Service           | Wraps LLM providers; keeps prompts grounded in context payloads.                |
| Notification Service | Evaluates watched conditions and sends push.                                    |
| Storage              | Postgres (relational) for accounts, strategies, journal; cache for market data. |

## Extension Compatibility Rules

- Extension must work **fully offline** without the backend.
- All backend calls are **opt-in per feature** and fail gracefully.
- Market data and strategy evaluation run in the extension; the backend is an accelerator.

## Auth & Security

- OAuth for accounts and broker connections.
- Broker and AI credentials never leave the user's machine without encryption at rest.
- API scopes follow least privilege (e.g. read market data vs. place orders).

## API Contract

See [`../04-api/backend-api.md`](../04-api/backend-api.md) for the proposed endpoint surface.
