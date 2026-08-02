import { describe, expect, it } from "vitest";
import type { Candle } from "./candle";
import {
  normalizeCandle,
  normalizeCandleSeries,
  parseCandleTime,
  parseNumber,
  type RawCandle,
} from "./normalize";

const VALID_RAW: RawCandle = {
  time: 1698768000000,
  open: "100.5",
  high: "105.0",
  low: "99.0",
  close: "104.2",
  volume: "12345",
};

const VALID_CANDLE: Candle = {
  time: 1698768000000,
  open: 100.5,
  high: 105,
  low: 99,
  close: 104.2,
  volume: 12345,
};

describe("parseNumber", () => {
  it("parses an integer string", () => {
    expect(parseNumber("100")).toBe(100);
  });

  it("parses a float string", () => {
    expect(parseNumber("12.5")).toBe(12.5);
  });

  it("parses a negative string", () => {
    expect(parseNumber("-12.5")).toBe(-12.5);
  });

  it("parses scientific notation", () => {
    expect(parseNumber("1e3")).toBe(1000);
  });

  it("passes numeric values through", () => {
    expect(parseNumber(42)).toBe(42);
  });

  it("trims surrounding whitespace", () => {
    expect(parseNumber("  12.5  ")).toBe(12.5);
  });

  it("returns null for an empty string", () => {
    expect(parseNumber("")).toBeNull();
  });

  it("returns null for whitespace-only input", () => {
    expect(parseNumber("   ")).toBeNull();
  });

  it("returns null for non-numeric strings", () => {
    expect(parseNumber("abc")).toBeNull();
    expect(parseNumber("--")).toBeNull();
  });

  it("returns null for NaN and Infinity strings", () => {
    expect(parseNumber("NaN")).toBeNull();
    expect(parseNumber("Infinity")).toBeNull();
  });

  it("returns null for non-finite numbers", () => {
    expect(parseNumber(Number.NaN)).toBeNull();
    expect(parseNumber(Number.POSITIVE_INFINITY)).toBeNull();
  });
});

describe("parseCandleTime", () => {
  it("passes millisecond timestamps through", () => {
    expect(parseCandleTime(1698768000000)).toBe(1698768000000);
  });

  it("converts second timestamps to milliseconds", () => {
    expect(parseCandleTime(1698768000)).toBe(1698768000000);
  });

  it("parses a millisecond numeric string", () => {
    expect(parseCandleTime("1698768000000")).toBe(1698768000000);
  });

  it("parses a second numeric string", () => {
    expect(parseCandleTime("1698768000")).toBe(1698768000000);
  });

  it("parses an ISO 8601 datetime string", () => {
    expect(parseCandleTime("2023-10-31T16:00:00.000Z")).toBe(1698768000000);
  });

  it("returns null for an empty string", () => {
    expect(parseCandleTime("")).toBeNull();
  });

  it("returns null for whitespace-only input", () => {
    expect(parseCandleTime("   ")).toBeNull();
  });

  it("returns null for non-timestamp strings", () => {
    expect(parseCandleTime("not-a-time")).toBeNull();
  });

  it("returns null for non-integer timestamps", () => {
    expect(parseCandleTime(12.5)).toBeNull();
  });

  it("returns null for zero and negative timestamps", () => {
    expect(parseCandleTime(0)).toBeNull();
    expect(parseCandleTime(-1000)).toBeNull();
  });

  it("returns null for NaN timestamps", () => {
    expect(parseCandleTime(Number.NaN)).toBeNull();
  });
});

describe("normalizeCandle", () => {
  it("normalizes a valid raw candle with string values", () => {
    expect(normalizeCandle(VALID_RAW)).toEqual(VALID_CANDLE);
  });

  it("normalizes a valid raw candle with numeric values", () => {
    const raw: RawCandle = {
      time: 1698768000000,
      open: 100.5,
      high: 105,
      low: 99,
      close: 104.2,
      volume: 12345,
    };
    expect(normalizeCandle(raw)).toEqual(VALID_CANDLE);
  });

  it("accepts a zero volume", () => {
    const raw: RawCandle = { ...VALID_RAW, volume: "0" };
    expect(normalizeCandle(raw)?.volume).toBe(0);
  });

  it("rejects a high below close", () => {
    const raw: RawCandle = { ...VALID_RAW, high: "95" };
    expect(normalizeCandle(raw)).toBeNull();
  });

  it("rejects a low above open", () => {
    const raw: RawCandle = { ...VALID_RAW, low: "110" };
    expect(normalizeCandle(raw)).toBeNull();
  });

  it("rejects a low above high", () => {
    const raw: RawCandle = { ...VALID_RAW, low: "200", high: "100" };
    expect(normalizeCandle(raw)).toBeNull();
  });

  it("rejects zero and negative prices", () => {
    expect(normalizeCandle({ ...VALID_RAW, open: "0" })).toBeNull();
    expect(normalizeCandle({ ...VALID_RAW, close: "-5" })).toBeNull();
  });

  it("rejects a negative volume", () => {
    expect(normalizeCandle({ ...VALID_RAW, volume: "-1" })).toBeNull();
  });

  it("rejects an unparseable field", () => {
    expect(normalizeCandle({ ...VALID_RAW, open: "abc" })).toBeNull();
  });

  it("rejects an invalid timestamp", () => {
    expect(normalizeCandle({ ...VALID_RAW, time: "whenever" })).toBeNull();
  });
});

describe("normalizeCandleSeries", () => {
  it("returns an empty array for an empty input", () => {
    expect(normalizeCandleSeries([])).toEqual([]);
  });

  it("returns a single valid candle", () => {
    expect(normalizeCandleSeries([VALID_RAW])).toEqual([VALID_CANDLE]);
  });

  it("drops invalid candles and keeps valid ones", () => {
    const invalid: RawCandle = { ...VALID_RAW, high: "1" };
    expect(normalizeCandleSeries([VALID_RAW, invalid])).toEqual([VALID_CANDLE]);
  });

  it("sorts candles ascending by time", () => {
    const first: RawCandle = { ...VALID_RAW, time: 1698768000000 };
    const second: RawCandle = { ...VALID_RAW, time: 1698771600000 };
    const third: RawCandle = { ...VALID_RAW, time: 1698775200000 };
    expect(normalizeCandleSeries([third, first, second])).toEqual([
      VALID_CANDLE,
      { ...VALID_CANDLE, time: 1698771600000 },
      { ...VALID_CANDLE, time: 1698775200000 },
    ]);
  });

  it("deduplicates candles sharing a timestamp, keeping the first", () => {
    const duplicate: RawCandle = { ...VALID_RAW, close: "999" };
    expect(normalizeCandleSeries([VALID_RAW, duplicate])).toEqual([VALID_CANDLE]);
  });

  it("returns an empty array when every candle is invalid", () => {
    const invalid: RawCandle = { ...VALID_RAW, high: "1" };
    expect(normalizeCandleSeries([invalid, invalid])).toEqual([]);
  });
});
