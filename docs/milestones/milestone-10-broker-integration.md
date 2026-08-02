# Milestone 10 — Broker Integration

> **Purpose:** Connect to trading brokers (first: Zerodha Kite) for accounts, positions, and confirmed order execution.
> **Last Updated:** 2026-08-02
> **Related Documents:** [Master Spec](../MASTER_SPEC.md) · [Broker API](../04-api/broker-api.md) · [Security](../SECURITY.md) · [Trade Journal](milestone-09-trade-journal.md)

## Status

⏳ **Not Started**

## Objective

Connect Brahmastra AI to trading brokers (first: **Zerodha Kite**) for accounts, positions, and one-click order execution from the chart.

## Background

Analysis without execution leaves the loop open. Broker integration completes the workflow: context → strategy → signal → order — with strong safety guardrails.

## Deliverables

- Broker interface (broker-agnostic)
- Zerodha Kite driver (session, account, positions, orders)
- Symbol/timeframe → instrument-token mapping
- Order ticket UI with **explicit confirmation**
- Risk guardrails (max risk/trade, daily limits) checked pre-execution
- Dry-run mode

## Out of Scope

- Unattended/auto trading
- Non-confirmed execution

## Dependencies

- Milestones 05 (strategy) and 06 (signal) for signal-backed orders; 09 (journal) for trade linkage.

## Folder Changes

`src/core/broker/`, `src/ui/` (order ticket)

## Architecture Impact

- Defines a broker-agnostic interface with pluggable drivers (Kite first).
- All broker traffic originates in the background worker; credentials encrypted and OAuth-scoped (see [SECURITY.md](../SECURITY.md)).
- Dry-run mode shares the same code path as live orders — only the dispatch step differs.

## Acceptance Criteria

- Orders never execute without explicit user confirmation
- Instrument mapping is verified before orders
- Credentials encrypted; scoped OAuth
- Dry-run validated against real mapping

## Testing

- Manual: connect Kite, view account/positions; place a dry-run order → verify mapping + request payload; place a real order with confirmation → verify ack + journal linkage.
- Unit tests for mapping, risk-guardrail evaluation, and request building (no live network).

## Definition of Done

- All acceptance criteria met; tests green; build/typecheck/lint/format pass.
- Broker API documented in [`04-api/broker-api.md`](../04-api/broker-api.md); security notes updated.
- Changelog updated.

## Future Improvements

- Additional brokers
- Advanced order types (brackets, covers)
- Execution stats in the journal

## Risks

- **Unintended execution** — the highest-stakes risk; mitigated by mandatory explicit confirmation, dry-run mode, and pre-execution risk guardrails.
- **Credential leakage** — mitigated by encrypted storage, scoped OAuth, and the no-logs rule in [SECURITY.md](../SECURITY.md).
- **API changes** — broker APIs drift; mitigated by the driver abstraction and verified mapping.
