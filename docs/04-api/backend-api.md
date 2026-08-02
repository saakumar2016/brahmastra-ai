# Backend API (Planned)

> **Purpose:** Defines the intended REST/WebSocket surface of the backend.
> **Last Updated:** 2026-08-02
> **Related Documents:** [Master Spec](../MASTER_SPEC.md) · [Backend Architecture](../01-architecture/backend-architecture.md) · [Database Schema](../05-database/schema.md) · [AI Assistant](../03-features/ai-assistant.md)

> **Status: Planned.** Defines the intended REST/WebSocket surface for the backend described in [`01-architecture/backend-architecture.md`](../01-architecture/backend-architecture.md).

## Base

- `https://api.brahmastra.example/v1`
- Auth via bearer tokens (OAuth / API key).
- JSON over HTTPS; WebSocket for streaming market data.

## REST Endpoints

### Auth

| Method | Path             | Purpose                         |
| ------ | ---------------- | ------------------------------- |
| `POST` | `/auth/register` | Create account.                 |
| `POST` | `/auth/login`    | Exchange credentials for token. |
| `POST` | `/auth/refresh`  | Rotate access token.            |

### Strategies

| Method   | Path               | Purpose                |
| -------- | ------------------ | ---------------------- |
| `GET`    | `/strategies`      | List user strategies.  |
| `POST`   | `/strategies`      | Create strategy.       |
| `GET`    | `/strategies/{id}` | Fetch strategy config. |
| `PUT`    | `/strategies/{id}` | Update config.         |
| `DELETE` | `/strategies/{id}` | Delete strategy.       |

### Watchlist

| Method   | Path              | Purpose        |
| -------- | ----------------- | -------------- |
| `GET`    | `/watchlist`      | List symbols.  |
| `POST`   | `/watchlist`      | Add symbol.    |
| `DELETE` | `/watchlist/{id}` | Remove symbol. |

### Journal

| Method | Path             | Purpose                    |
| ------ | ---------------- | -------------------------- |
| `GET`  | `/journal`       | List trades (filters).     |
| `POST` | `/journal`       | Add trade.                 |
| `GET`  | `/journal/stats` | Aggregated strategy stats. |

### AI

| Method | Path          | Purpose                             |
| ------ | ------------- | ----------------------------------- |
| `POST` | `/ai/analyze` | Analyze a context payload.          |
| `POST` | `/ai/chat`    | Chat grounded in context + journal. |

## WebSocket

| Channel               | Purpose                              |
| --------------------- | ------------------------------------ |
| `/ws/market/{symbol}` | Candle/quote streaming.              |
| `/ws/alerts`          | Push when a watched condition fires. |

## Market Data

| Method | Path                                                          | Purpose        |
| ------ | ------------------------------------------------------------- | -------------- |
| `GET`  | `/market/candles?symbol=..&exchange=..&timeframe=..&range=..` | OHLCV history. |
| `GET`  | `/market/quote?symbol=..`                                     | Latest quote.  |

## Extension Compatibility

- All endpoints are **optional** for the extension; offline operation must never break.
- Payloads are typed and versioned (`Accept: application/json`).
