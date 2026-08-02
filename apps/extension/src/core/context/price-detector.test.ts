import { describe, expect, it } from "vitest";
import { parsePrice } from "./price-detector";

describe("parsePrice", () => {
  it("parses a simple number", () => {
    expect(parsePrice("12345.67")).toBe(12345.67);
  });

  it("parses an integer", () => {
    expect(parsePrice("100")).toBe(100);
  });

  it("parses a negative number", () => {
    expect(parsePrice("-12.5")).toBe(-12.5);
  });

  it("strips thousand separators", () => {
    expect(parsePrice("1,234.56")).toBe(1234.56);
  });

  it("strips internal spaces", () => {
    expect(parsePrice("1 234")).toBe(1234);
  });

  it("strips non-breaking spaces", () => {
    expect(parsePrice("1\u00A0234.56")).toBe(1234.56);
  });

  it("extracts a number from a prefixed string", () => {
    expect(parsePrice("$100")).toBe(100);
  });

  it("extracts a number from a suffixed string", () => {
    expect(parsePrice("12.5%")).toBe(12.5);
  });

  it("uses the first number when multiple are present", () => {
    expect(parsePrice("12.34.56")).toBe(12.34);
  });

  it("returns undefined for an empty string", () => {
    expect(parsePrice("")).toBeUndefined();
  });

  it("returns undefined for whitespace-only input", () => {
    expect(parsePrice("   ")).toBeUndefined();
  });

  it("returns undefined when no number is present", () => {
    expect(parsePrice("abc")).toBeUndefined();
    expect(parsePrice("--")).toBeUndefined();
  });

  it("returns undefined for non-finite matches", () => {
    expect(parsePrice("NaN")).toBeUndefined();
    expect(parsePrice("Infinity")).toBeUndefined();
  });
});
