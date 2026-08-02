import type { ChartContext, IndicatorInfo, MarketStatus } from "./chart-context";
import { DomReader } from "./dom-reader";
import { IndicatorDetector } from "./indicator-detector";
import { contextLogger } from "./logging";
import { MarketDetector } from "./market-detector";
import { PriceDetector } from "./price-detector";
import { CONTEXT_SELECTORS } from "./selectors";
import { SymbolDetector } from "./symbol-detector";

export interface SymbolDetectorLike {
  extract(url: URL): SymbolInfoLike;
}

export interface SymbolInfoLike {
  symbol: string;
  exchange: string;
  timeframe: string;
  chartType: string;
}

export interface IndicatorDetectorLike {
  extract(mainSymbol: string, legendItems: Element[]): IndicatorInfo[];
}

export interface PriceDetectorLike {
  extract(mainSymbol: string, legendItems: Element[]): number | undefined;
}

export interface MarketDetectorLike {
  extract(): MarketStatus | undefined;
}

export interface ChartContextExtractorDependencies {
  symbolDetector: SymbolDetectorLike;
  indicatorDetector: IndicatorDetectorLike;
  priceDetector: PriceDetectorLike;
  marketDetector: MarketDetectorLike;
}

export class ChartContextExtractor {
  private readonly dom: DomReader;
  private readonly symbolDetector: SymbolDetectorLike;
  private readonly indicatorDetector: IndicatorDetectorLike;
  private readonly priceDetector: PriceDetectorLike;
  private readonly marketDetector: MarketDetectorLike;

  constructor(
    dependencies: Partial<ChartContextExtractorDependencies> = {},
    root: ParentNode = document,
  ) {
    this.dom = new DomReader(root);
    this.symbolDetector = dependencies.symbolDetector ?? new SymbolDetector(this.dom);
    this.indicatorDetector = dependencies.indicatorDetector ?? new IndicatorDetector(this.dom);
    this.priceDetector = dependencies.priceDetector ?? new PriceDetector(this.dom);
    this.marketDetector = dependencies.marketDetector ?? new MarketDetector(this.dom);
  }

  async getChartContext(): Promise<ChartContext> {
    const startedAt = performance.now();
    const url = new URL(window.location.href);

    const symbolResult = this.tryDetector("SymbolDetector", () => this.symbolDetector.extract(url));

    // Legend items are queried once and shared across detectors.
    const legendItems = this.dom.queryAll(CONTEXT_SELECTORS.legendItems);

    const indicators =
      this.tryDetector("IndicatorDetector", () =>
        this.indicatorDetector.extract(symbolResult?.symbol ?? "", legendItems),
      ) ?? [];

    const visiblePrice = this.tryDetector("PriceDetector", () =>
      this.priceDetector.extract(symbolResult?.symbol ?? "", legendItems),
    );

    const marketStatus = this.tryDetector("MarketDetector", () => this.marketDetector.extract());

    const context: ChartContext = {
      symbol: symbolResult?.symbol ?? "",
      exchange: symbolResult?.exchange ?? "",
      timeframe: symbolResult?.timeframe ?? "",
      chartType: symbolResult?.chartType ?? "",
      url: url.href,
      indicators,
      visiblePrice,
      marketStatus,
      timestamp: Date.now(),
    };

    this.logExtraction(context, startedAt);
    return context;
  }

  private tryDetector<T>(label: string, run: () => T): T | undefined {
    try {
      return run();
    } catch (error) {
      contextLogger.warn(`${label} failed`);
      contextLogger.error(`${label} error: ${String(error)}`);
      return undefined;
    }
  }

  private logExtraction(context: ChartContext, startedAt: number): void {
    contextLogger.debug(`Extracted Symbol: ${context.symbol}`);
    contextLogger.debug(`Extracted Timeframe: ${context.timeframe}`);
    contextLogger.debug(`Extracted Indicators: ${context.indicators.length}`);
    contextLogger.debug(`Extraction Time: ${(performance.now() - startedAt).toFixed(2)}ms`);
  }
}
