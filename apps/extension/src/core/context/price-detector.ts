import { normalizeText } from "../text-utils";
import type { DomReader } from "./dom-reader";
import { CONTEXT_SELECTORS } from "./selectors";

export function parsePrice(value: string): number | undefined {
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

  extract(mainSymbol: string, legendItems: Element[]): number | undefined {
    const primary = this.findPrimaryLegendItem(mainSymbol, legendItems);
    if (primary === null) {
      return undefined;
    }

    const values = this.dom.queryAllIn(primary, CONTEXT_SELECTORS.legendSeriesValue);
    for (let i = values.length - 1; i >= 0; i -= 1) {
      const price = parsePrice(values[i].textContent ?? "");
      if (price !== undefined) {
        return price;
      }
    }

    return undefined;
  }

  private findPrimaryLegendItem(mainSymbol: string, legendItems: Element[]): Element | null {
    const normalizedSymbol = normalizeText(mainSymbol);
    if (normalizedSymbol !== "") {
      const byAriaLabel = legendItems.find((item) =>
        this.matchesSymbol(item.getAttribute("aria-label"), normalizedSymbol),
      );
      if (byAriaLabel !== undefined) {
        return byAriaLabel;
      }

      const byTitle = legendItems.find((item) => {
        const title = normalizeText(
          this.dom.textIn(item, CONTEXT_SELECTORS.legendSourceTitle) ?? item.textContent,
        );
        return this.matchesSymbol(title, normalizedSymbol);
      });
      if (byTitle !== undefined) {
        return byTitle;
      }
    }

    return legendItems[0] ?? null;
  }

  private matchesSymbol(candidate: string | null, symbol: string): boolean {
    const normalized = normalizeText(candidate).toUpperCase();
    const upper = symbol.toUpperCase();
    return normalized === upper || normalized.endsWith(`:${upper}`);
  }
}
