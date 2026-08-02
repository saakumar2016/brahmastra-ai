/** A price or volume field that may arrive as a number or numeric string. */
export type NumericValue = number | string;

/** A normalized OHLCV candle with millisecond `time` and numeric fields. */
export interface Candle {
  readonly time: number;
  readonly open: number;
  readonly high: number;
  readonly low: number;
  readonly close: number;
  readonly volume: number;
}

/** An unvalidated candle as read from a source; see {@link normalizeCandle}. */
export interface RawCandle {
  readonly time: NumericValue;
  readonly open: NumericValue;
  readonly high: NumericValue;
  readonly low: NumericValue;
  readonly close: NumericValue;
  readonly volume: NumericValue;
}
