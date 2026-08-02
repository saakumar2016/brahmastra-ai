import type { DomReader } from "./dom-reader";
import { CONTEXT_SELECTORS } from "./selectors";

function parsePrice(value: string): number | undefined {
  const cleaned = value.replace(/[\s,]/g, "").replace(/\u00A0/g, "");
  const match = cleaned.match(/-?\d+(?:\.\d+)?/);
  if (match === null) {
    return undefined;
  }
  const parsed = Number(match[0]);
  return Number.isFinite(parsed) ? parsed : undefined;
}

export class PriceDetector {
  constructor(private readonly dom: DomReader) {}

  extract(legendItems: Element[]): number | undefined {
    const mainItem = legendItems[0];
    if (mainItem === undefined) {
      return undefined;
    }

    const values = this.dom.queryAllIn(mainItem, CONTEXT_SELECTORS.legendSeriesValue);
    for (let i = values.length - 1; i >= 0; i -= 1) {
      const price = parsePrice(values[i].textContent ?? "");
      if (price !== undefined) {
        return price;
      }
    }

    return undefined;
  }
}
