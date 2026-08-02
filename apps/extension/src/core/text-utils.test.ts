import { describe, expect, it } from "vitest";
import { normalizeText } from "./text-utils";

describe("normalizeText", () => {
  it("returns an empty string for null", () => {
    expect(normalizeText(null)).toBe("");
  });

  it("returns an empty string for undefined", () => {
    expect(normalizeText(undefined)).toBe("");
  });

  it("returns an empty string for an empty string", () => {
    expect(normalizeText("")).toBe("");
  });

  it("returns an empty string for whitespace-only input", () => {
    expect(normalizeText("   ")).toBe("");
  });

  it("trims surrounding whitespace", () => {
    expect(normalizeText("  BTCUSDT  ")).toBe("BTCUSDT");
  });

  it("collapses consecutive spaces into one", () => {
    expect(normalizeText("Bollinger   Bands")).toBe("Bollinger Bands");
  });

  it("collapses newlines and tabs", () => {
    expect(normalizeText("EMA\n\t20")).toBe("EMA 20");
  });

  it("replaces non-breaking spaces with regular spaces", () => {
    expect(normalizeText("1\u00A0234.56")).toBe("1 234.56");
  });

  it("handles non-breaking spaces around text", () => {
    expect(normalizeText("\u00A0BTC\u00A0USDT\u00A0")).toBe("BTC USDT");
  });

  it("preserves single spaces in the middle", () => {
    expect(normalizeText("Parabolic SAR")).toBe("Parabolic SAR");
  });
});
