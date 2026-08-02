import { describe, expect, it } from "vitest";
import { parseIndicatorTitle } from "./indicator-detector";
import { lookupIndicatorName } from "./indicator-registry";

describe("parseIndicatorTitle", () => {
  it("returns null for an empty title", () => {
    expect(parseIndicatorTitle("")).toBeNull();
  });

  it("returns null for whitespace-only input", () => {
    expect(parseIndicatorTitle("   ")).toBeNull();
  });

  it("parses an indicator with no parameters", () => {
    expect(parseIndicatorTitle("RSI")).toEqual({ name: "RSI", parameters: [] });
  });

  it("parses a spaced parameter list", () => {
    expect(parseIndicatorTitle("EMA (12, 26)")).toEqual({
      name: "EMA",
      parameters: ["12", "26"],
    });
  });

  it("parses a compact parameter list", () => {
    expect(parseIndicatorTitle("EMA(12,26)")).toEqual({
      name: "EMA",
      parameters: ["12", "26"],
    });
  });

  it("parses a trailing numeric parameter", () => {
    expect(parseIndicatorTitle("SMA 20")).toEqual({
      name: "SMA",
      parameters: ["20"],
    });
  });

  it("resolves aliases to canonical names", () => {
    expect(parseIndicatorTitle("volume")).toEqual({
      name: "Volume",
      parameters: [],
    });
    expect(parseIndicatorTitle("BB (20, 2)")).toEqual({
      name: "Bollinger Bands",
      parameters: ["20", "2"],
    });
  });

  it("filters out empty parameters", () => {
    expect(parseIndicatorTitle("EMA (12,)")).toEqual({
      name: "EMA",
      parameters: ["12"],
    });
  });

  it("keeps non-numeric parameters as-is", () => {
    expect(parseIndicatorTitle("EMA (a, b)")).toEqual({
      name: "EMA",
      parameters: ["a", "b"],
    });
  });

  it("returns null for an unknown indicator", () => {
    expect(parseIndicatorTitle("MAGIC")).toBeNull();
  });

  it("returns null for an unknown indicator with parameters", () => {
    expect(parseIndicatorTitle("MAGIC (1, 2)")).toBeNull();
    expect(parseIndicatorTitle("MAGIC 20")).toBeNull();
  });
});

describe("lookupIndicatorName", () => {
  it("resolves a lowercase alias", () => {
    expect(lookupIndicatorName("ema")).toBe("EMA");
  });

  it("resolves an exact alias", () => {
    expect(lookupIndicatorName("VWAP")).toBe("VWAP");
  });

  it("trims and resolves", () => {
    expect(lookupIndicatorName("  bollinger bands  ")).toBe("Bollinger Bands");
  });

  it("resolves multi-key aliases to the same canonical name", () => {
    expect(lookupIndicatorName("BB")).toBe("Bollinger Bands");
    expect(lookupIndicatorName("STOCH")).toBe("Stochastic");
    expect(lookupIndicatorName("VOLUME")).toBe("Volume");
  });

  it("returns null for unknown input", () => {
    expect(lookupIndicatorName("UNKNOWN")).toBeNull();
  });

  it("returns null for an empty string", () => {
    expect(lookupIndicatorName("")).toBeNull();
  });

  it("returns null for whitespace-only input", () => {
    expect(lookupIndicatorName("   ")).toBeNull();
  });
});
