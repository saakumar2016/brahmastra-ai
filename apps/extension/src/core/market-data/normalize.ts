import type { Candle, NumericValue, RawCandle } from "./candle";

/** Parses a numeric value to a finite number, or `null` when unparseable. */
export function parseNumber(value: NumericValue): number | null {
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
const UNIX_MS_THRESHOLD = 1e12;

const ISO_8601_DATETIME_PATTERN =
  /^\d{4}-\d{2}-\d{2}[Tt]\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:[Zz]|[+-]\d{2}:\d{2})$/;

function isValidTimestamp(value: number): boolean {
  return Number.isInteger(value) && value > 0;
}

// Sources disagree on units: treat sub-threshold values (Unix seconds) as needing
// conversion, >= threshold as milliseconds.
function toMilliseconds(value: number): number | null {
  if (!isValidTimestamp(value)) {
    return null;
  }
  return value < UNIX_MS_THRESHOLD ? value * MILLISECONDS_PER_SECOND : value;
}

/**
 * Parses a candle timestamp to Unix milliseconds, accepting ISO-8601 datetimes
 * (with timezone), numeric strings, and Unix seconds/milliseconds. Returns
 * `null` when the input is not a valid timestamp.
 */
export function parseCandleTime(value: NumericValue): number | null {
  if (typeof value === "number") {
    return toMilliseconds(value);
  }
  const trimmed = value.trim();
  if (trimmed === "") {
    return null;
  }
  if (ISO_8601_DATETIME_PATTERN.test(trimmed)) {
    const isoMillis = Date.parse(trimmed);
    if (Number.isFinite(isoMillis)) {
      return isoMillis;
    }
  }
  return toMilliseconds(Number(trimmed));
}

/**
 * Validates and normalizes a raw candle into a {@link Candle}, or returns
 * `null` when any field is missing, non-finite, or structurally inconsistent.
 */
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

/**
 * Normalizes a series, dropping invalid candles and duplicate timestamps
 * (keeping the first occurrence), sorted ascending by time.
 */
export function normalizeCandleSeries(input: readonly RawCandle[]): readonly Candle[] {
  const seen = new Set<number>();
  const candles: Candle[] = [];

  for (const raw of input) {
    const candle = normalizeCandle(raw);
    // Fail partial: drop invalid candles; keep the first valid candle per timestamp.
    if (candle === null || seen.has(candle.time)) {
      continue;
    }
    seen.add(candle.time);
    candles.push(candle);
  }

  return candles.sort((a, b) => a.time - b.time);
}
