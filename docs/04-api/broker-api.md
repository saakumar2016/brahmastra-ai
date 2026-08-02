# Broker API (Planned)

> **Purpose:** Defines the broker-agnostic contract implemented per broker.
> **Last Updated:** 2026-08-02
> **Related Documents:** [Master Spec](../MASTER_SPEC.md) · [Broker Integration](../03-features/broker-integration.md) · [Milestone 10](../milestones/milestone-10-broker-integration.md) · [Security](../SECURITY.md)

> **Status: Planned.** Defines the broker-agnostic contract implemented per broker (first target: **Zerodha Kite**).

## Principle

The extension defines a broker **interface**; each broker is a driver implementing it. No broker-specific logic leaks into the engines.

## Interface

```ts
interface Broker {
  name: string;
  connect(session: BrokerSession): Promise<BrokerConnection>;
  getAccount(): Promise<BrokerAccount>;
  getPositions(): Promise<BrokerPosition[]>;
  getOrders(): Promise<BrokerOrder[]>;
  placeOrder(order: BrokerOrderRequest): Promise<BrokerOrderAck>;
  modifyOrder(orderId: string, changes: Partial<BrokerOrderRequest>): Promise<BrokerOrderAck>;
  cancelOrder(orderId: string): Promise<void>;
  mapInstrument(symbol: string, exchange: string, timeframe: string): Promise<InstrumentToken>;
}
```

## Domain Types

| Type                 | Fields                                                                                             |
| -------------------- | -------------------------------------------------------------------------------------------------- |
| `BrokerAccount`      | id, equity, available margin, currency.                                                            |
| `BrokerPosition`     | instrument token, symbol, exchange, qty, avg price, pnl.                                           |
| `BrokerOrderRequest` | instrument token, side (`buy`/`sell`), qty, order type (market/limit), price?, trigger?, validity. |
| `BrokerOrderAck`     | order id, status, timestamp.                                                                       |
| `InstrumentToken`    | broker instrument id, symbol, exchange, lot size.                                                  |

## Safety Rules

- **Explicit user confirmation** before every order placement.
- **Dry-run mode** — validates mapping and request without execution.
- Risk guardrails (per-trade max risk, daily loss limit) checked before execution.
- Credentials encrypted; scoped OAuth.

## Zerodha Kite (first driver)

- Auth: OAuth / API key via `chrome.identity` (planned).
- Instrument mapping from the Kite instrument list.
- Order routing via the Kite API; status via polling/webhook.

## Non-Goals

- Unattended trading.
- Market-making or high-frequency execution.
