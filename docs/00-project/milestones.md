# Milestones

> **Purpose:** The 12 delivery milestones, their template, dependencies, and status.
> **Last Updated:** 2026-08-02
> **Related Documents:** [Roadmap](roadmap.md) · [Master Spec](../MASTER_SPEC.md) · [Milestones detail](../milestones/) · [Product Backlog](../PRODUCT_BACKLOG.md)

## What Is a Milestone?

A milestone is a delivery unit with a clear objective, acceptance criteria, and a folder change target. Each milestone is documented in [`../milestones/`](../milestones/) using the same template:

- **Status** — ✅ Completed / 🚧 In Progress / ⏳ Not Started.
- **Objective** — one sentence about the goal.
- **Background** — why this milestone exists and what preceded it.
- **Deliverables** — concrete artifacts.
- **Out of Scope** — explicit exclusions.
- **Dependencies** — milestones and modules it relies on.
- **Folder Changes** — where the code lands.
- **Architecture Impact** — how it affects the system.
- **Acceptance Criteria** — how we know it is done.
- **Testing** — how it is verified.
- **Definition of Done** — the final checks before closing.
- **Future Improvements** — follow-ups.
- **Risks** — known risks and mitigations.

## Milestone List

| #   | Name                       | Status         | Folder                       | Theme                                |
| --- | -------------------------- | -------------- | ---------------------------- | ------------------------------------ |
| 01  | Foundation                 | ✅ Completed   | `./` (repo)                  | Workspace, tooling, CI-ready repo    |
| 02  | Chrome Extension Core      | ✅ Completed   | `apps/extension/src/`        | MV3 shell, UI, messaging, detection  |
| 03  | TradingView Context Engine | ✅ Completed   | `src/core/context/`          | Chart context extraction             |
| 04  | Market Data Engine         | 🚧 In Progress | `src/core/market-data/`      | Candles + series data for strategies |
| 05  | Strategy Engine            | ⏳ Not Started | `src/core/strategy/`         | Pluggable strategy evaluation        |
| 06  | Signal Engine              | ⏳ Not Started | `src/core/signal/`           | Unified signals from strategies      |
| 07  | Floating Assistant         | ⏳ Not Started | `src/ui/floating-assistant/` | Always-on chart overlay assistant    |
| 08  | Notifications              | ⏳ Not Started | `src/core/notifications/`    | Alerting on conditions               |
| 09  | Trade Journal              | ⏳ Not Started | `src/core/journal/`          | Trades + strategy analytics          |
| 10  | Broker Integration         | ⏳ Not Started | `src/core/broker/`           | Broker accounts, positions, orders   |
| 11  | AI Assistant               | ⏳ Not Started | `src/core/ai/`               | Conversational AI on chart context   |
| 12  | Production Release         | ⏳ Not Started | `./`                         | Hardening, distribution              |

## Dependencies

```
01 ─ 02 ─ 03 ─ 04 ─ 05 ─ 06 ─ 07
                    │      └──── 08
                    └────────── 09 ─ 10
11 (needs 03, 06, 09)
12 (needs everything)
```

Every future feature (AI, notifications, broker execution, scanner) depends on the **Strategy Engine** (05), which itself depends on the **TradingView Context Engine** (03) and **Market Data Engine** (04).

## ADRs

Architecture Decision Records capture decisions with rationale. See [`../08-adr/`](../08-adr/) for all ADRs.

## Status History

Milestone completion is recorded in [`CHANGELOG.md`](../CHANGELOG.md). The prioritization of work within and across milestones is tracked in [`PRODUCT_BACKLOG.md`](../PRODUCT_BACKLOG.md).
