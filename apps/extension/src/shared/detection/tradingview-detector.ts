import { extractChartInfo } from "./chart-info";
import type { PageDetector } from "./detector";
import { PAGE_TYPE } from "./types";
import type { PageDetection } from "./types";

const TRADINGVIEW_HOST = "tradingview.com";

function isTradingViewHost(hostname: string): boolean {
  return hostname === TRADINGVIEW_HOST || hostname.endsWith(`.${TRADINGVIEW_HOST}`);
}

function isChartPath(pathname: string): boolean {
  return pathname.startsWith("/chart");
}

export class TradingViewDetector implements PageDetector {
  matches(url: URL): boolean {
    return isTradingViewHost(url.hostname);
  }

  detect(doc: Document, url: URL): PageDetection {
    if (isChartPath(url.pathname)) {
      return {
        supported: true,
        pageType: PAGE_TYPE.CHART,
        ...extractChartInfo(doc, url),
        url: url.href,
        title: doc.title,
      };
    }
    return {
      supported: false,
      reason: "Unsupported TradingView page",
    };
  }
}
