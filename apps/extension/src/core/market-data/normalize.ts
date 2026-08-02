import type { Candle } from "./candle";

export interface RawCandle {
  time: number | string;
  open: number | string;
  high: number | string;
  low: number | string;
  close: number | string;
  volume: number | string;
}

export function parseNumber(value: number | string): number | null {
  if (typeof value === "number") {
    return Number.isFinite(value) ? value : null;
  }
  const trimmed = value.trim();
  if (trimmed === "") {
    return null;
  }
  const parsed = Number(trimmed);
  return Number.isFinite(parsed) ? parsed : null;
}

const MILLISECONDS_PER_SECOND = 1000;

function isValidTimestamp(value: number): boolean {
  return Number.isInteger(value) && value > 0;
}

// Sources disagree on units: treat sub-1e12 (seconds) as needing conversion, >= 1e12 as millis.
function toMilliseconds(value: number): number | null {
  if (!isValidTimestamp(value)) {
    return null;
  }
  return value < 1e12 ? value * MILLISECONDS_PER_SECOND : value;
}

export function parseCandleTime(value: number | string): number | null {
  if (typeof value === "number") {
    return toMilliseconds(value);
  }
  const trimmed = value.trim();
  if (trimmed === "") {
    return null;
  }
  const isoMillis = Date.parse(trimmed);
  if (Number.isFinite(isoMillis)) {
    return isoMillis;
  }
  return toMilliseconds(Number(trimmed));
}

export function normalizeCandle(input: RawCandle): Candle | null {
  const time = parseCandleTime(input.time);
  const open = parseNumber(input.open);
  const high = parseNumber(input.high);
  const low = parseNumber(input.low);
  const close = parseNumber(input.close);
  const volume = parseNumber(input.volume);

  if (
    time === null ||
    open === null ||
    high === null ||
    low === null ||
    close === null ||
    volume === null
  ) {
    return null;
  }

  if (open <= 0 || high <= 0 || low <= 0 || close <= 0 || volume < 0) {
    return null;
  }

  if (high < open || high < close || high < low) {
    return null;
  }
  if (low > open || low > close || low > high) {
    return null;
  }

  return { time, open, high, low, close, volume };
}

export function normalizeCandleSeries(input: readonly RawCandle[]): Candle[] {
  const seen = new Set<number>();
  const candles: Candle[] = [];

  for (const raw of input) {
    const candle = normalizeCandle(raw);
    if (candle === null || seen.has(candle.time)) {
      continue;
    }
    seen.add(candle.time);
    candles.push(candle);
  }

  return candles.sort((a, b) => a.time - b.time);
}
