export const INDICATOR_ALIASES: Readonly<Record<string, string>> = {
  EMA: "EMA",
  SMA: "SMA",
  WMA: "WMA",
  VWAP: "VWAP",
  RSI: "RSI",
  MACD: "MACD",
  VOL: "Volume",
  VOLUME: "Volume",
  SUPERTREND: "SuperTrend",
  "BOLLINGER BANDS": "Bollinger Bands",
  BB: "Bollinger Bands",
  STOCHASTIC: "Stochastic",
  STOCH: "Stochastic",
  ATR: "ATR",
  OBV: "OBV",
  CCI: "CCI",
  ADX: "ADX",
  ICHIMOKU: "Ichimoku",
  "PARABOLIC SAR": "Parabolic SAR",
  MOMENTUM: "Momentum",
  ROC: "ROC",
  "WILLIAMS %R": "Williams %R",
} as const;

export function lookupIndicatorName(raw: string): string | null {
  return INDICATOR_ALIASES[raw.trim().toUpperCase()] ?? null;
}
