import { describe, expect, it } from "vitest";
import { buildCandleCacheKey, InMemoryCandleCache } from "./cache";
import type { Candle } from "./candle";
import type { CandleRequest } from "./data-source";

const REQUEST: CandleRequest = {
  instrument: { symbol: "BTCUSDT", exchange: "BINANCE" },
  timeframe: "1H",
  range: { from: 1698768000000, to: 1698771600000 },
};

function candle(time: number): Candle {
  return { time, open: 10, high: 11, low: 9, close: 10.5, volume: 100 };
}

describe("buildCandleCacheKey", () => {
  it("produces the same key for identical requests", () => {
    expect(buildCandleCacheKey(REQUEST)).toBe(buildCandleCacheKey(REQUEST));
  });

  it("is case-insensitive for symbol and exchange", () => {
    const lower: CandleRequest = {
      ...REQUEST,
      instrument: { symbol: "btcusdt", exchange: "binance" },
    };
    expect(buildCandleCacheKey(lower)).toBe(buildCandleCacheKey(REQUEST));
  });

  it("produces distinct keys for different timeframes", () => {
    const other: CandleRequest = { ...REQUEST, timeframe: "1D" };
    expect(buildCandleCacheKey(other)).not.toBe(buildCandleCacheKey(REQUEST));
  });

  it("produces distinct keys for different ranges", () => {
    const other: CandleRequest = {
      ...REQUEST,
      range: { from: 1698771600000, to: 1698775200000 },
    };
    expect(buildCandleCacheKey(other)).not.toBe(buildCandleCacheKey(REQUEST));
  });
});

describe("InMemoryCandleCache", () => {
  it("returns undefined for a missing key", () => {
    const cache = new InMemoryCandleCache();
    expect(cache.get("missing")).toBeUndefined();
    expect(cache.has("missing")).toBe(false);
  });

  it("returns the stored candles for a present key", () => {
    const cache = new InMemoryCandleCache();
    const candles = [candle(1)];
    cache.set("key", candles);
    expect(cache.has("key")).toBe(true);
    expect(cache.get("key")).toEqual(candles);
  });

  it("overwrites a stored value for the same key", () => {
    const cache = new InMemoryCandleCache();
    cache.set("key", [candle(1)]);
    cache.set("key", [candle(2)]);
    expect(cache.get("key")).toEqual([candle(2)]);
  });
});
