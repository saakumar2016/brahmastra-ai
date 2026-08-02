import { parseSymbol, parseTimeframe } from "../../shared/detection/chart-info";
import { normalizeText } from "../text-utils";
import type { DomReader } from "./dom-reader";
import { CONTEXT_SELECTORS } from "./selectors";

export interface SymbolInfo {
  symbol: string;
  exchange: string;
  timeframe: string;
  chartType: string;
}

function normalizeTimeframe(value: string): string {
  const match = value.match(/^(\d+)([a-z])$/i);
  if (match) {
    return `${match[1]}${match[2].toUpperCase()}`;
  }
  return value;
}

export class SymbolDetector {
  constructor(private readonly dom: DomReader) {}

  extract(url: URL): SymbolInfo {
    const fromUrl = this.extractFromUrl(url);
    const fromDom = this.extractFromDom();

    return {
      symbol: fromUrl.symbol || fromDom.symbol || this.extractFromTitle(),
      exchange: fromUrl.exchange || fromDom.exchange,
      timeframe: normalizeTimeframe(fromUrl.timeframe || fromDom.timeframe),
      chartType: fromDom.chartType || fromUrl.chartType,
    };
  }

  private extractFromUrl(url: URL): SymbolInfo {
    const { exchange, symbol } = parseSymbol(url.searchParams.get("symbol") ?? "");
    return {
      symbol,
      exchange,
      timeframe: parseTimeframe(url.searchParams.get("interval")),
      chartType: url.searchParams.get("chartType") ?? "",
    };
  }

  private extractFromDom(): SymbolInfo {
    const breadcrumbs = this.dom.queryAll(CONTEXT_SELECTORS.symbolBreadcrumb);

    let symbol = "";
    let exchange = "";
    if (breadcrumbs.length >= 2) {
      exchange = normalizeText(breadcrumbs[0].textContent);
      symbol = normalizeText(breadcrumbs[breadcrumbs.length - 1].textContent);
    } else if (breadcrumbs.length === 1) {
      symbol = normalizeText(breadcrumbs[0].textContent);
    }

    if (symbol === "") {
      symbol = normalizeText(this.dom.text(CONTEXT_SELECTORS.symbolTitle));
    }

    return {
      symbol,
      exchange,
      timeframe: normalizeText(this.dom.text(CONTEXT_SELECTORS.timeframeActiveButton)),
      chartType: this.extractActiveChartType(),
    };
  }

  private extractActiveChartType(): string {
    const element = this.dom.query(CONTEXT_SELECTORS.chartTypeActiveButton);
    const ariaLabel = element?.getAttribute("aria-label");
    return normalizeText(ariaLabel ?? element?.textContent);
  }

  private extractFromTitle(): string {
    const match = document.title.match(/([A-Z0-9.]+)(?:\s*\/\s*[A-Z0-9.]+)?\s+Chart/i);
    return match?.[1] ?? "";
  }
}
