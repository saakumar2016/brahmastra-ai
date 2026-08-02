import { buildCandleCacheKey, type CandleCache } from "./cache";
import type { Candle } from "./candle";
import {
  InvalidCandleRequestError,
  isValidCandleRequest,
  type CandleRequest,
  type MarketDataSource,
} from "./data-source";
import { normalizeCandleSeries } from "./normalize";

/** Constructor dependencies for {@link MarketDataService}. */
export interface MarketDataServiceDependencies {
  source: MarketDataSource;
  cache: CandleCache;
}

/**
 * Offline-first facade that serves candle requests through a cache, only
 * consulting the {@link MarketDataSource} on a cache miss.
 */
export class MarketDataService {
  private readonly source: MarketDataSource;
  private readonly cache: CandleCache;

  constructor(dependencies: MarketDataServiceDependencies) {
    this.source = dependencies.source;
    this.cache = dependencies.cache;
  }

  /**
   * Returns the candle series for `request`.
   *
   * Throws {@link InvalidCandleRequestError} for invalid requests. The returned
   * series is always a fresh copy, so mutating it never affects the cache.
   */
  async getCandles(request: CandleRequest): Promise<readonly Candle[]> {
    if (!isValidCandleRequest(request)) {
      throw new InvalidCandleRequestError(request);
    }
    const key = buildCandleCacheKey(request);
    const cached = this.cache.get(key);
    if (cached !== undefined) {
      return [...cached];
    }
    const candles = normalizeCandleSeries(await this.source.getCandles(request));
    this.cache.set(key, candles);
    return [...candles];
  }
}
