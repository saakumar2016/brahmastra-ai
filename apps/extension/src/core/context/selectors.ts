// Centralized TradingView DOM selectors.
// TradingView's DOM structure changes frequently; update selectors here only.

export const CONTEXT_SELECTORS = {
  symbolBreadcrumb: 'a[data-role="breadcrumb-link"]',
  symbolTitle: '[data-name="header-symbol-search"]',

  timeframeActiveButton: '[data-name="timeframe-toolbar"] [aria-pressed="true"]',

  chartTypeActiveButton: '[data-name="chart-type-toolbar"] [aria-pressed="true"]',

  legendItems: '[data-name="legend-series-item"]',
  legendSourceTitle: '[data-name="legend-source-title"]',
  legendSeriesValue: '[data-name="legend-series-value"]',

  marketStatusCandidates: [
    '[data-name="header-market-status"]',
    '[data-name="market-status"]',
    '[data-name="header-symbol-search"] [class*="status"]',
  ],
} as const;
