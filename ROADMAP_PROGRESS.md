# Roadmap Progress

> **Purpose:** High-level delivery dashboard — overall and per-milestone progress at a glance.
> **Last Updated:** 2026-08-02
> **Related Documents:** [Roadmap](docs/00-project/roadmap.md) · [Project State](PROJECT_STATE.md) · [Task Queue](TASK_QUEUE.md) · [Milestones](docs/milestones/) · [Change Log](docs/CHANGELOG.md)

## Overall Progress

| Metric                   | Value                                           |
| ------------------------ | ----------------------------------------------- |
| **Milestones done**      | 3 / 12                                          |
| **Overall progress**     | **25%**                                         |
| **Current**              | 04 — Market Data Engine (In Progress, 33% done) |
| **Remaining**            | 9 milestones (05–12)                            |
| **Estimated completion** | ≈ 35 focused sessions (see below)               |

> Overall % is milestone-count-weighted (each milestone = 1/12). Milestone % reflects completed tasks within that milestone from [TASK_QUEUE.md](TASK_QUEUE.md).

## Milestone Dashboard

| #   | Milestone                     | Status         | Progress | Estimated effort |
| --- | ----------------------------- | -------------- | -------- | ---------------- |
| 01  | Foundation                    | ✅ Completed   | 100%     | —                |
| 02  | Chrome Extension Core         | ✅ Completed   | 100%     | —                |
| 03  | TradingView Context Engine    | ✅ Completed   | 100%     | —                |
| 04  | Market Data Engine            | 🚧 In Progress | 33%      | ≈ 4 sessions     |
| 05  | Strategy Engine               | ⏳ Not Started | 0%       | ≈ 4 sessions     |
| 06  | Signal Engine                 | ⏳ Not Started | 0%       | ≈ 4 sessions     |
| 07  | Floating Assistant            | ⏳ Not Started | 0%       | ≈ 3 sessions     |
| 08  | Notifications                 | ⏳ Not Started | 0%       | ≈ 3 sessions     |
| 09  | Trade Journal                 | ⏳ Not Started | 0%       | ≈ 4 sessions     |
| 10  | Broker Integration            | ⏳ Not Started | 0%       | ≈ 5 sessions     |
| 11  | AI Assistant                  | ⏳ Not Started | 0%       | ≈ 5 sessions     |
| 12  | Production Release            | ⏳ Not Started | 0%       | ≈ 4 sessions     |
| —   | Cross-cutting (INFRA-T01..04) | ⏳ Ready       | 0%       | ≈ 1–2 sessions   |

## How Progress Is Computed

- **Milestone %** = completed tasks ÷ total tasks for that milestone (from the task table in [TASK_QUEUE.md](TASK_QUEUE.md)).
- **Overall %** = completed milestones ÷ 12 (milestone-count weighted). When a milestone is mid-flight, its tasks contribute once a runbook updates them to `Completed` here and in `TASK_QUEUE.md`.
- **Estimated effort** is directional (session ≈ one M-size task). Recalibrate after each milestone completes.

## Status History

See [`docs/00-project/milestones.md`](docs/00-project/milestones.md) for the dependency graph and [`docs/CHANGELOG.md`](docs/CHANGELOG.md) for release history.
