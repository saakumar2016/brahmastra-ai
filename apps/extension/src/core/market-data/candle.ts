export type NumericValue = number | string;

export interface Candle {
  readonly time: number;
  readonly open: number;
  readonly high: number;
  readonly low: number;
  readonly close: number;
  readonly volume: number;
}

export interface RawCandle {
  readonly time: NumericValue;
  readonly open: NumericValue;
  readonly high: NumericValue;
  readonly low: NumericValue;
  readonly close: NumericValue;
  readonly volume: NumericValue;
}
