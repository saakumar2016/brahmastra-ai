import { buildCandleCacheKey, type CandleCache } from "./cache";
import type { Candle } from "./candle";
import {
  InvalidCandleRequestError,
  isValidCandleRequest,
  type CandleRequest,
  type MarketDataSource,
} from "./data-source";
import { ConsoleLogger, type Logger } from "../logger";
import { normalizeCandleSeries } from "./normalize";

const fallbackLogger = new ConsoleLogger("[MarketData]");

/** Constructor dependencies for {@link MarketDataService}. */
export interface MarketDataServiceDependencies {
  source: MarketDataSource;
  cache: CandleCache;
  /** Receives source failures; defaults to console output. */
  logger?: Logger;
}

/**
 * Offline-first facade that serves candle requests through a cache, only
 * consulting the {@link MarketDataSource} on a cache miss. When the source is
 * unavailable it falls back to an empty series instead of throwing.
 */
export class MarketDataService {
  private readonly source: MarketDataSource;
  private readonly cache: CandleCache;
  private readonly logger: Logger;

  constructor(dependencies: MarketDataServiceDependencies) {
    this.source = dependencies.source;
    this.cache = dependencies.cache;
    this.logger = dependencies.logger ?? fallbackLogger;
  }

  /**
   * Returns the candle series for `request`.
   *
   * Throws {@link InvalidCandleRequestError} for invalid requests. When the
   * source fails, logs the failure and returns an empty series; the failed
   * fetch is not cached, so a later call retries. The returned series is
   * always a fresh copy, so mutating it never affects the cache.
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
    try {
      const candles = normalizeCandleSeries(await this.source.getCandles(request));
      this.cache.set(key, candles);
      return [...candles];
    } catch (error) {
      this.logger.warn(`getCandles fallback (empty): ${String(error)}`);
      return [];
    }
  }
}
