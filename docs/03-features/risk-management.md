# Risk Management (Feature)

> **Purpose:** Feature spec for configurable risk guardrails before execution.
> **Last Updated:** 2026-08-02
> **Related Documents:** [Master Spec](../MASTER_SPEC.md) · [Milestone 10](../milestones/milestone-10-broker-integration.md) · [Broker Integration](broker-integration.md) · [Security](../SECURITY.md)

## Summary

Configurable **risk guardrails** applied before execution and reflected in signals — position sizing guidance, max risk per trade, and per-symbol limits.

## Why

Consistent risk discipline is what separates a system from a gamble. Risk management is a layer over the signal/broker path, never a separate magic engine.

## Key Capabilities

- Max risk per trade (percentage or fixed amount).
- Position-size suggestion from stop distance and account equity.
- Per-symbol and daily loss limits (block/confirm overrides).
- Risk summary shown on the order ticket and journal entries.

## Design Points

- Lives within `src/core/strategy/`/`src/core/broker/` boundaries as a shared service.
- Deterministic and configurable per user.

## Non-Goals

- Automatic execution; risk rules gate and inform, they never trade alone.

## Dependencies

- Strategy (05), Signal (06), Broker (10), Journal (09).

## Milestone

- Hardened in [Milestone 10](../milestones/milestone-10-broker-integration.md) and [Milestone 12](../milestones/milestone-12-production-release.md).
