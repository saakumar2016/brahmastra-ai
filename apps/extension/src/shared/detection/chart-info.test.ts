import { describe, expect, it } from "vitest";
import { parseSymbol, parseTimeframe } from "./chart-info";

describe("parseSymbol", () => {
  it("returns empty fields for an empty string", () => {
    expect(parseSymbol("")).toEqual({ exchange: "", symbol: "" });
  });

  it("returns empty fields for whitespace-only input", () => {
    expect(parseSymbol("   ")).toEqual({ exchange: "", symbol: "" });
  });

  it("parses a bare symbol", () => {
    expect(parseSymbol("BTCUSDT")).toEqual({ exchange: "", symbol: "BTCUSDT" });
  });

  it("parses an exchange: symbol pair", () => {
    expect(parseSymbol("BINANCE:BTCUSDT")).toEqual({
      exchange: "BINANCE",
      symbol: "BTCUSDT",
    });
  });

  it("trims surrounding whitespace", () => {
    expect(parseSymbol("  BINANCE:BTCUSDT  ")).toEqual({
      exchange: "BINANCE",
      symbol: "BTCUSDT",
    });
  });

  it("keeps the whole value as a symbol when the colon is first", () => {
    expect(parseSymbol(":BTCUSDT")).toEqual({ exchange: "", symbol: ":BTCUSDT" });
  });

  it("returns an empty symbol for a trailing colon", () => {
    expect(parseSymbol("BINANCE:")).toEqual({ exchange: "BINANCE", symbol: "" });
  });

  it("keeps the remainder for multiple colons", () => {
    expect(parseSymbol("A:B:C")).toEqual({ exchange: "A", symbol: "B:C" });
  });
});

describe("parseTimeframe", () => {
  it("returns an empty string for null", () => {
    expect(parseTimeframe(null)).toBe("");
  });

  it("maps minute intervals to labels", () => {
    expect(parseTimeframe("1")).toBe("1m");
    expect(parseTimeframe("5")).toBe("5m");
    expect(parseTimeframe("15")).toBe("15m");
    expect(parseTimeframe("30")).toBe("30m");
  });

  it("maps hour intervals to labels", () => {
    expect(parseTimeframe("60")).toBe("1h");
    expect(parseTimeframe("120")).toBe("2h");
    expect(parseTimeframe("240")).toBe("4h");
  });

  it("maps daily, weekly and monthly to labels", () => {
    expect(parseTimeframe("D")).toBe("1D");
    expect(parseTimeframe("W")).toBe("1W");
    expect(parseTimeframe("M")).toBe("1M");
  });

  it("passes through unknown intervals", () => {
    expect(parseTimeframe("X")).toBe("X");
    expect(parseTimeframe("42")).toBe("42");
  });
});
