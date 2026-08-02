# Broker Integration (Feature)

> **Purpose:** Feature spec for broker connectivity and confirmed order execution.
> **Last Updated:** 2026-08-02
> **Related Documents:** [Master Spec](../MASTER_SPEC.md) · [Milestone 10](../milestones/milestone-10-broker-integration.md) · [Broker API](../04-api/broker-api.md) · [Security](../SECURITY.md) · [Risk Management](risk-management.md)

## Summary

Connects Brahmastra AI to trading brokers (starting with **Zerodha Kite**) for **accounts, positions, and order execution** — turning signals into one-click orders from the chart.

## Why

Analysis without execution leaves the loop open. Broker integration completes the workflow: context → strategy → signal → order.

## Key Capabilities

- Broker connection + session management (OAuth where supported).
- Read account, balances, positions, open orders.
- Place/modify/cancel orders.
- Map symbol/timeframe context to broker instrument tokens.
- **Explicit confirmation before any order** — never auto-execute.

## Design Points

- Lives in `src/core/broker/` (planned).
- Broker-agnostic interface; broker implementations plug in.
- Credentials encrypted and scoped (least privilege).
- Dry-run mode for testing without real orders.

## Non-Goals

- Unattended/auto trading.
- Non-user-confirmed execution.

## Dependencies

- Signal Engine (06), Trade Journal (09).

## Milestone

[`milestone-10-broker-integration.md`](../milestones/milestone-10-broker-integration.md)
