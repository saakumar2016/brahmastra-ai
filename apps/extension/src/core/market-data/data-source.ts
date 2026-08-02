import type { Candle } from "./candle";

export interface Instrument {
  readonly symbol: string;
  readonly exchange: string;
}

export interface CandleRange {
  readonly from: number;
  readonly to: number;
}

export interface CandleRequest {
  readonly instrument: Instrument;
  readonly timeframe: string;
  readonly range: CandleRange;
}

export interface MarketDataSource {
  getCandles(request: CandleRequest): Promise<Candle[]>;
}

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
