# Database Schema (Planned)

> **Purpose:** Documents local extension storage and the intended backend schema.
> **Last Updated:** 2026-08-02
> **Related Documents:** [Master Spec](../MASTER_SPEC.md) · [Entities](entities.md) · [Backend Architecture](../01-architecture/backend-architecture.md)

> **Status: Planned.** Covers local extension storage (`chrome.storage.local`/`chrome.storage.session`) and the backend database. The extension is local-first; the backend syncs.

## Storage Layers

| Layer             | Tech                     | Data                                                    |
| ----------------- | ------------------------ | ------------------------------------------------------- |
| Extension local   | `chrome.storage.local`   | Settings, strategies, watchlist, journal, cached state. |
| Extension session | `chrome.storage.session` | Per-tab runtime state (detection, signals).             |
| Backend (planned) | Postgres                 | Accounts, strategies, watchlist, journal, settings.     |

## Tables (backend)

### users

| Column     | Type        | Notes  |
| ---------- | ----------- | ------ |
| id         | uuid        | PK     |
| email      | text        | unique |
| created_at | timestamptz |        |

### strategies

| Column   | Type    | Notes                          |
| -------- | ------- | ------------------------------ |
| id       | uuid    | PK                             |
| user_id  | uuid    | FK → users                     |
| name     | text    |                                |
| category | text    | e.g. `trend`, `mean_reversion` |
| config   | jsonb   | typed `StrategyConfiguration`  |
| enabled  | boolean |                                |

### watchlist_items

| Column   | Type | Notes      |
| -------- | ---- | ---------- |
| id       | uuid | PK         |
| user_id  | uuid | FK → users |
| symbol   | text |            |
| exchange | text |            |

### journal_trades

| Column          | Type        | Notes                          |
| --------------- | ----------- | ------------------------------ |
| id              | uuid        | PK                             |
| user_id         | uuid        | FK → users                     |
| symbol          | text        |                                |
| exchange        | text        |                                |
| side            | text        | `buy` / `sell`                 |
| qty             | numeric     |                                |
| entry_price     | numeric     |                                |
| exit_price      | numeric     | nullable                       |
| pnl             | numeric     | nullable                       |
| strategy_id     | uuid        | FK → strategies, nullable      |
| signal_snapshot | jsonb       | signal that produced the trade |
| opened_at       | timestamptz |                                |
| closed_at       | timestamptz | nullable                       |

### notifications

| Column      | Type        | Notes      |
| ----------- | ----------- | ---------- |
| id          | uuid        | PK         |
| user_id     | uuid        | FK → users |
| strategy_id | uuid        | nullable   |
| symbol      | text        |            |
| message     | text        |            |
| read        | boolean     |            |
| created_at  | timestamptz |            |

## Local Keys (extension)

| Key             | Type   | Purpose                                     |
| --------------- | ------ | ------------------------------------------- |
| `settings`      | object | Preferences (risk limits, theme, debounce). |
| `strategies`    | array  | Saved strategies (mirror of table).         |
| `watchlist`     | array  | Symbols.                                    |
| `journal`       | array  | Trade records.                              |
| `state:{tabId}` | object | Per-tab runtime state (session).            |
