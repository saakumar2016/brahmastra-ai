import { normalizeText } from "../text-utils";
import type { IndicatorInfo } from "./chart-context";
import type { DomReader } from "./dom-reader";
import { lookupIndicatorName } from "./indicator-registry";
import { CONTEXT_SELECTORS } from "./selectors";

export function parseIndicatorTitle(title: string): IndicatorInfo | null {
  const cleaned = normalizeText(title);
  if (cleaned === "") {
    return null;
  }

  // "Name (p1, p2)" or "Name(p1)"
  const parenMatch = cleaned.match(/^(.+?)\s*\(([^)]*)\)\s*$/);
  if (parenMatch !== null) {
    const name = lookupIndicatorName(parenMatch[1].trim());
    if (name === null) {
      return null;
    }
    const parameters = parenMatch[2]
      .split(",")
      .map((parameter) => parameter.trim())
      .filter((parameter) => parameter !== "");
    return { name, parameters };
  }

  // "Name 20"
  const spaceMatch = cleaned.match(/^(.+?)\s+(\d+)$/);
  if (spaceMatch !== null) {
    const name = lookupIndicatorName(spaceMatch[1].trim());
    if (name === null) {
      return null;
    }
    return { name, parameters: [spaceMatch[2]] };
  }

  const name = lookupIndicatorName(cleaned);
  if (name === null) {
    return null;
  }
  return { name, parameters: [] };
}

export class IndicatorDetector {
  constructor(private readonly dom: DomReader) {}

  extract(mainSymbol: string, legendItems: Element[]): IndicatorInfo[] {
    const indicators: IndicatorInfo[] = [];

    for (const item of legendItems) {
      const title = normalizeText(
        this.dom.textIn(item, CONTEXT_SELECTORS.legendSourceTitle) ?? item.textContent,
      );
      if (title === "") {
        continue;
      }
      if (title.toUpperCase() === mainSymbol.toUpperCase()) {
        continue;
      }
      const parsed = parseIndicatorTitle(title);
      if (parsed !== null) {
        indicators.push(parsed);
      }
    }

    return indicators;
  }
}
