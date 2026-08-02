import type { ChartContext } from "./chart-context";
import { DomReader } from "./dom-reader";
import { IndicatorDetector } from "./indicator-detector";
import { contextLog } from "./logging";
import { MarketDetector } from "./market-detector";
import { PriceDetector } from "./price-detector";
import { CONTEXT_SELECTORS } from "./selectors";
import { SymbolDetector } from "./symbol-detector";

export class ContextExtractor {
  private readonly dom: DomReader;
  private readonly symbolDetector: SymbolDetector;
  private readonly indicatorDetector: IndicatorDetector;
  private readonly priceDetector: PriceDetector;
  private readonly marketDetector: MarketDetector;

  constructor(root: ParentNode = document) {
    this.dom = new DomReader(root);
    this.symbolDetector = new SymbolDetector(this.dom);
    this.indicatorDetector = new IndicatorDetector(this.dom);
    this.priceDetector = new PriceDetector(this.dom);
    this.marketDetector = new MarketDetector(this.dom);
  }

  async getChartContext(): Promise<ChartContext> {
    const startedAt = performance.now();
    try {
      const url = new URL(window.location.href);
      const symbolInfo = this.symbolDetector.extract(url);

      // Legend items are queried once and shared across detectors.
      const legendItems = this.dom.queryAll(CONTEXT_SELECTORS.legendItems);
      const indicators = this.indicatorDetector.extract(symbolInfo.symbol, legendItems);
      const visiblePrice = this.priceDetector.extract(legendItems);
      const marketStatus = this.marketDetector.extract();

      const context: ChartContext = {
        symbol: symbolInfo.symbol,
        exchange: symbolInfo.exchange,
        timeframe: symbolInfo.timeframe,
        chartType: symbolInfo.chartType,
        url: url.href,
        indicators,
        visiblePrice,
        marketStatus,
        timestamp: Date.now(),
      };

      this.logExtraction(context, startedAt);
      return context;
    } catch {
      contextLog("Extraction failed; returning partial context");
      return this.buildFallbackContext();
    }
  }

  private logExtraction(context: ChartContext, startedAt: number): void {
    contextLog(`Extracted Symbol: ${context.symbol}`);
    contextLog(`Extracted Timeframe: ${context.timeframe}`);
    contextLog(`Extracted Indicators: ${context.indicators.length}`);
    contextLog(`Extraction Time: ${(performance.now() - startedAt).toFixed(2)}ms`);
  }

  private buildFallbackContext(): ChartContext {
    return {
      symbol: "",
      exchange: "",
      timeframe: "",
      chartType: "",
      url: window.location.href,
      indicators: [],
      timestamp: Date.now(),
    };
  }
}
