export const PAGE_TYPE = {
  CHART: "chart",
} as const;

export type PageType = (typeof PAGE_TYPE)[keyof typeof PAGE_TYPE];

export const PAGE_TYPE_LABELS: Record<PageType, string> = {
  [PAGE_TYPE.CHART]: "Chart",
};

export interface UnsupportedPageDetection {
  supported: false;
  reason: string;
}

export interface ChartPageDetection {
  supported: true;
  pageType: typeof PAGE_TYPE.CHART;
  symbol: string;
  exchange: string;
  timeframe: string;
  url: string;
  title: string;
}

export type PageDetection = UnsupportedPageDetection | ChartPageDetection;
