import { describe, expect, it, vi } from "vitest";
import { InMemoryCandleCache } from "./cache";
import type { Candle } from "./candle";
import {
  InvalidCandleRequestError,
  type CandleRequest,
  type MarketDataSource,
} from "./data-source";
import { MarketDataService } from "./market-data-service";
import type { RawCandle } from "./normalize";

const REQUEST: CandleRequest = {
  instrument: { symbol: "BTCUSDT", exchange: "BINANCE" },
  timeframe: "1H",
  range: { from: 1698768000000, to: 1698771600000 },
};

const RAW: RawCandle = {
  time: "1698768000000",
  open: "100.5",
  high: "105.0",
  low: "99.0",
  close: "104.2",
  volume: "12345",
};

const NORMALIZED: Candle = {
  time: 1698768000000,
  open: 100.5,
  high: 105,
  low: 99,
  close: 104.2,
  volume: 12345,
};

function createSource(raw: RawCandle[] = [RAW]) {
  const getCandles = vi.fn(async () => raw);
  const source: MarketDataSource = { getCandles };
  return { source, getCandles };
}

function createService(raw: RawCandle[] = [RAW]) {
  const { source, getCandles } = createSource(raw);
  const cache = new InMemoryCandleCache();
  const service = new MarketDataService({ source, cache });
  return { service, source, getCandles, cache };
}

describe("MarketDataService", () => {
  it("fetches, normalizes, and caches candles on a miss", async () => {
    const { service, getCandles, cache } = createService();
    const result = await service.getCandles(REQUEST);
    expect(getCandles).toHaveBeenCalledTimes(1);
    expect(getCandles).toHaveBeenCalledWith(REQUEST);
    expect(result).toEqual([NORMALIZED]);
    expect(cache.get("BTCUSDT|BINANCE|1H|1698768000000|1698771600000")).toEqual([NORMALIZED]);
  });

  it("returns the cached series without calling the source on a hit", async () => {
    const { service, getCandles } = createService();
    await service.getCandles(REQUEST);
    const second = await service.getCandles(REQUEST);
    expect(getCandles).toHaveBeenCalledTimes(1);
    expect(second).toEqual([NORMALIZED]);
  });

  it("serves differently-keyed requests independently", async () => {
    const { service, getCandles } = createService();
    const other: CandleRequest = { ...REQUEST, timeframe: "1D" };
    await service.getCandles(REQUEST);
    await service.getCandles(other);
    expect(getCandles).toHaveBeenCalledTimes(2);
  });

  it("returns a defensive copy so callers cannot mutate the cache", async () => {
    const { service, getCandles } = createService();
    const result = await service.getCandles(REQUEST);
    (result as Candle[])[0] = { ...result[0], open: 0 };
    const again = await service.getCandles(REQUEST);
    expect(getCandles).toHaveBeenCalledTimes(1);
    expect(again[0].open).toBe(100.5);
  });

  it("throws a typed error for an invalid request without touching the source", async () => {
    const { service, getCandles } = createService();
    const invalid: CandleRequest = {
      ...REQUEST,
      range: { from: 1698771600000, to: 1698768000000 },
    };
    let error: unknown;
    try {
      await service.getCandles(invalid);
    } catch (caught) {
      error = caught;
    }
    expect(error).toBeInstanceOf(InvalidCandleRequestError);
    expect((error as InvalidCandleRequestError).message).toBe("Invalid candle request");
    expect((error as InvalidCandleRequestError).request).toEqual(invalid);
    expect(getCandles).not.toHaveBeenCalled();
  });

  it("drops invalid candles returned by the source", async () => {
    const invalid: RawCandle = { ...RAW, high: "1" };
    const { service, getCandles } = createService([RAW, invalid]);
    const result = await service.getCandles(REQUEST);
    expect(getCandles).toHaveBeenCalledTimes(1);
    expect(result).toEqual([NORMALIZED]);
  });
});
