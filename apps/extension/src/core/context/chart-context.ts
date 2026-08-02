export type MarketStatus = "open" | "closed";

export interface IndicatorInfo {
  name: string;
  parameters: string[];
}

export interface ChartContext {
  symbol: string;
  exchange: string;
  timeframe: string;
  chartType: string;
  url: string;

  indicators: IndicatorInfo[];

  visiblePrice?: number;

  marketStatus?: MarketStatus;

  timestamp: number;
}
