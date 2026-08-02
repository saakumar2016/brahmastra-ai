import { describe, expect, it } from "vitest";
import { isValidCandleRequest, type CandleRequest } from "./data-source";

const VALID_REQUEST: CandleRequest = {
  instrument: { symbol: "BTCUSDT", exchange: "BINANCE" },
  timeframe: "1H",
  range: { from: 1698768000000, to: 1698771600000 },
};

describe("isValidCandleRequest", () => {
  it("accepts a valid request", () => {
    expect(isValidCandleRequest(VALID_REQUEST)).toBe(true);
  });

  it("accepts a zero-width range", () => {
    const request: CandleRequest = {
      ...VALID_REQUEST,
      range: { from: 1698768000000, to: 1698768000000 },
    };
    expect(isValidCandleRequest(request)).toBe(true);
  });

  it("accepts surrounding whitespace in symbol and exchange", () => {
    const request: CandleRequest = {
      ...VALID_REQUEST,
      instrument: { symbol: "  BTCUSDT  ", exchange: " BINANCE " },
    };
    expect(isValidCandleRequest(request)).toBe(true);
  });

  it("rejects an empty symbol", () => {
    const request: CandleRequest = {
      ...VALID_REQUEST,
      instrument: { ...VALID_REQUEST.instrument, symbol: "" },
    };
    expect(isValidCandleRequest(request)).toBe(false);
  });

  it("rejects an empty exchange", () => {
    const request: CandleRequest = {
      ...VALID_REQUEST,
      instrument: { ...VALID_REQUEST.instrument, exchange: "   " },
    };
    expect(isValidCandleRequest(request)).toBe(false);
  });

  it("rejects an empty timeframe", () => {
    const request: CandleRequest = { ...VALID_REQUEST, timeframe: "" };
    expect(isValidCandleRequest(request)).toBe(false);
  });

  it("rejects a whitespace-only timeframe", () => {
    const request: CandleRequest = { ...VALID_REQUEST, timeframe: "   " };
    expect(isValidCandleRequest(request)).toBe(false);
  });

  it("rejects a non-integer range boundary", () => {
    const request: CandleRequest = {
      ...VALID_REQUEST,
      range: { from: 1698768000.5, to: 1698771600000 },
    };
    expect(isValidCandleRequest(request)).toBe(false);
  });

  it("rejects a zero or negative range start", () => {
    expect(
      isValidCandleRequest({
        ...VALID_REQUEST,
        range: { from: 0, to: 1698771600000 },
      }),
    ).toBe(false);
    expect(
      isValidCandleRequest({
        ...VALID_REQUEST,
        range: { from: -1000, to: 1698771600000 },
      }),
    ).toBe(false);
  });

  it("rejects a range where from exceeds to", () => {
    const request: CandleRequest = {
      ...VALID_REQUEST,
      range: { from: 1698771600000, to: 1698768000000 },
    };
    expect(isValidCandleRequest(request)).toBe(false);
  });
});
