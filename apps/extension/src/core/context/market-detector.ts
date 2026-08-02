import type { MarketStatus } from "./chart-context";
import type { DomReader } from "./dom-reader";
import { CONTEXT_SELECTORS } from "./selectors";

export class MarketDetector {
  constructor(private readonly dom: DomReader) {}

  extract(): MarketStatus | undefined {
    for (const selector of CONTEXT_SELECTORS.marketStatusCandidates) {
      const text = this.dom.text(selector);
      if (text === null) {
        continue;
      }
      const normalized = text.toLowerCase();
      if (normalized.includes("closed")) {
        return "closed";
      }
      if (normalized.includes("open")) {
        return "open";
      }
    }
    return undefined;
  }
}
