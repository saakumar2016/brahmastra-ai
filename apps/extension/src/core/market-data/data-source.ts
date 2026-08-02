import type { Candle } from "./candle";

/** A chart timeframe identifier such as "1m", "5m", "1H", "1D". */
export type Timeframe = string;

/** An exchange-identified tradable instrument. */
export interface Instrument {
  readonly symbol: string;
  readonly exchange: string;
}

/** A candle window in Unix milliseconds; requires `from <= to`. */
export interface CandleRange {
  readonly from: number;
  readonly to: number;
}

/** A normalized request for a candle series. */
export interface CandleRequest {
  readonly instrument: Instrument;
  readonly timeframe: Timeframe;
  readonly range: CandleRange;
}

/** A swappable provider of candle series (page read, backend API, fixture). */
export interface MarketDataSource {
  getCandles(request: CandleRequest): Promise<readonly Candle[]>;
}

/**
 * Thrown when a {@link CandleRequest} fails {@link isValidCandleRequest}.
 * Carries the offending request for diagnostics.
 */
export class InvalidCandleRequestError extends Error {
  readonly request: CandleRequest;

  constructor(request: CandleRequest) {
    super("Invalid candle request");
    this.name = "InvalidCandleRequestError";
    this.request = request;
  }
}

/** Boundary guard: true when every field is non-empty and the range is sane. */
export function isValidCandleRequest(request: CandleRequest): boolean {
  const { instrument, timeframe, range } = request;
  const hasInstrument = instrument.symbol.trim() !== "" && instrument.exchange.trim() !== "";
  const hasTimeframe = timeframe.trim() !== "";
  const hasValidRange =
    Number.isInteger(range.from) &&
    Number.isInteger(range.to) &&
    range.from > 0 &&
    range.from <= range.to;
  return hasInstrument && hasTimeframe && hasValidRange;
}
