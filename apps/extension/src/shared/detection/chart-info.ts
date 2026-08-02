interface ChartInfo {
  symbol: string;
  exchange: string;
  timeframe: string;
}

const TIMEFRAME_LABELS: Record<string, string> = {
  "1": "1m",
  "3": "3m",
  "5": "5m",
  "15": "15m",
  "30": "30m",
  "60": "1h",
  "120": "2h",
  "180": "3h",
  "240": "4h",
  "360": "6h",
  "480": "8h",
  "720": "12h",
  D: "1D",
  W: "1W",
  M: "1M",
};

function parseSymbol(raw: string): { exchange: string; symbol: string } {
  const trimmed = raw.trim();
  if (trimmed === "") {
    return { exchange: "", symbol: "" };
  }
  const separatorIndex = trimmed.indexOf(":");
  if (separatorIndex > 0) {
    return {
      exchange: trimmed.slice(0, separatorIndex),
      symbol: trimmed.slice(separatorIndex + 1),
    };
  }
  return { exchange: "", symbol: trimmed };
}

function symbolFromTitle(title: string): string {
  const match = title.match(/([A-Z0-9.]+)(?:\s*\/\s*[A-Z0-9.]+)?\s+Chart/i);
  return match?.[1] ?? "";
}

function parseTimeframe(interval: string | null): string {
  if (interval === null) {
    return "";
  }
  return TIMEFRAME_LABELS[interval] ?? interval;
}

export function extractChartInfo(doc: Document, url: URL): ChartInfo {
  const { exchange, symbol } = parseSymbol(url.searchParams.get("symbol") ?? "");
  return {
    symbol: symbol !== "" ? symbol : symbolFromTitle(doc.title),
    exchange,
    timeframe: parseTimeframe(url.searchParams.get("interval")),
  };
}
