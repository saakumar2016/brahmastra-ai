import type { PageDetector } from "./detector";
import type { PageDetection } from "./types";

export class DetectionService {
  constructor(private readonly detectors: PageDetector[]) {}

  detect(doc: Document, url: URL): PageDetection {
    for (const detector of this.detectors) {
      if (detector.matches(url)) {
        return detector.detect(doc, url);
      }
    }
    return { supported: false, reason: "Not a TradingView page" };
  }
}
