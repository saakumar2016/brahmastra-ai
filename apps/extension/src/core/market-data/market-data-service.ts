import { buildCandleCacheKey, type CandleCache } from "./cache";
import type { Candle } from "./candle";
import { isValidCandleRequest, type CandleRequest, type MarketDataSource } from "./data-source";
import { normalizeCandleSeries } from "./normalize";

export interface MarketDataServiceDependencies {
  source: MarketDataSource;
  cache: CandleCache;
}

export class MarketDataService {
  private readonly source: MarketDataSource;
  private readonly cache: CandleCache;

  constructor(dependencies: MarketDataServiceDependencies) {
    this.source = dependencies.source;
    this.cache = dependencies.cache;
  }

  async getCandles(request: CandleRequest): Promise<Candle[]> {
    if (!isValidCandleRequest(request)) {
      throw new Error("Invalid candle request");
    }
    const key = buildCandleCacheKey(request);
    const cached = this.cache.get(key);
    if (cached !== undefined) {
      // Return a copy so callers cannot mutate what the cache holds.
      return [...cached];
    }
    const candles = normalizeCandleSeries(await this.source.getCandles(request));
    this.cache.set(key, candles);
    return [...candles];
  }
}
