# Entities

> **Purpose:** Canonical domain entity shapes shared across the extension, messaging, and backend.
> **Last Updated:** 2026-08-02
> **Related Documents:** [Master Spec](../MASTER_SPEC.md) · [Database Schema](schema.md) · [Messaging API](../04-api/messaging.md)

Domain entities shared across the extension, the messaging layer, and the backend. These are the canonical shapes.

## Instrument

```ts
interface Instrument {
  symbol: string; // e.g. "BTCUSDT"
  exchange: string; // e.g. "BINANCE"
}
```

## Candle (OHLCV)

```ts
interface Candle {
  time: number; // epoch ms
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}
```

## IndicatorInfo

```ts
interface IndicatorInfo {
  name: string; // canonical, e.g. "EMA"
  parameters: string[]; // e.g. ["20"]
}
```

## ChartContext

```ts
interface ChartContext {
  symbol: string;
  exchange: string;
  timeframe: string; // e.g. "15m", "1H", "1D"
  chartType: string; // e.g. "Candles"
  url: string;
  indicators: IndicatorInfo[];
  visiblePrice?: number;
  marketStatus?: "open" | "closed";
  timestamp: number;
}
```

## StrategyConfiguration

```ts
interface StrategyConfiguration {
  id: string;
  name: string;
  category: string; // "trend" | "mean_reversion" | ...
  conditions: RuleExpression[]; // composable rule blocks
  parameters: Record<string, number | string | boolean>;
  enabled: boolean;
}
```

## StrategyResult

```ts
interface StrategyResult {
  strategyId: string;
  symbol: string;
  timeframe: string;
  direction: "buy" | "sell" | "neutral";
  confidence: number; // 0..1
  reasons: string[];
  conditions: { rule: string; passed: boolean; value?: number }[];
  evaluatedAt: number;
}
```

## Signal

```ts
interface Signal {
  symbol: string;
  timeframe: string;
  direction: "buy" | "sell" | "neutral";
  confidence: number; // 0..1
  contributions: { strategyId: string; direction: string; confidence: number }[];
  summary: string;
  generatedAt: number;
}
```

## JournalTrade

```ts
interface JournalTrade {
  id: string;
  instrument: Instrument;
  side: "buy" | "sell";
  qty: number;
  entryPrice: number;
  exitPrice?: number;
  pnl?: number;
  strategyId?: string;
  signalSnapshot?: Signal;
  openedAt: number;
  closedAt?: number;
}
```

## PageDetection

```ts
type PageDetection =
  | {
      supported: true;
      pageType: "chart";
      symbol?: string;
      exchange?: string;
      timeframe?: string;
      url: string;
    }
  | { supported: false; reason: string };
```
