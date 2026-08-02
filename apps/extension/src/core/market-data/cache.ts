import type { Candle } from "./candle";
import type { CandleRequest } from "./data-source";

/**
 * Cache contract for candle series. Keys are opaque — build them with
 * {@link buildCandleCacheKey}. Implementations must never mutate the arrays
 * they receive via {@link CandleCache.set}, and callers must treat arrays
 * returned by {@link CandleCache.get} as readonly.
 */
export interface CandleCache {
  /** Returns the stored series for `key`, or `undefined` when absent. */
  get(key: string): readonly Candle[] | undefined;
  /** Reports whether a series for `key` is present. */
  has(key: string): boolean;
  /** Stores a series for `key`, replacing any previous value. */
  set(key: string, candles: readonly Candle[]): void;
}

/**
 * Builds a stable, case-insensitive cache key for a request from
 * `SYMBOL|EXCHANGE|timeframe|from|to`.
 */
export function buildCandleCacheKey(request: CandleRequest): string {
  return [
    request.instrument.symbol.toUpperCase(),
    request.instrument.exchange.toUpperCase(),
    request.timeframe,
    request.range.from,
    request.range.to,
  ].join("|");
}

/** A synchronous in-memory cache keyed by {@link buildCandleCacheKey}. */
export class InMemoryCandleCache implements CandleCache {
  private readonly store = new Map<string, readonly Candle[]>();

  get(key: string): readonly Candle[] | undefined {
    return this.store.get(key);
  }

  has(key: string): boolean {
    return this.store.has(key);
  }

  set(key: string, candles: readonly Candle[]): void {
    this.store.set(key, candles);
  }
}
