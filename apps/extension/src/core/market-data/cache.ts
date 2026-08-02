import type { Candle } from "./candle";
import type { CandleRequest } from "./data-source";

export interface CandleCache {
  get(key: string): readonly Candle[] | undefined;
  set(key: string, candles: readonly Candle[]): void;
}

export function buildCandleCacheKey(request: CandleRequest): string {
  return [
    request.instrument.symbol.toUpperCase(),
    request.instrument.exchange.toUpperCase(),
    request.timeframe,
    request.range.from,
    request.range.to,
  ].join("|");
}

export class InMemoryCandleCache implements CandleCache {
  private readonly store = new Map<string, readonly Candle[]>();

  get(key: string): readonly Candle[] | undefined {
    return this.store.get(key);
  }

  set(key: string, candles: readonly Candle[]): void {
    this.store.set(key, candles);
  }
}
