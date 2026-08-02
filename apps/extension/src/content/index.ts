import { ChartContextExtractor } from "../core/context/chart-context-extractor";
import { contextLogger } from "../core/context/logging";
import { DetectionService } from "../shared/detection/detection-service";
import { TradingViewDetector } from "../shared/detection/tradingview-detector";
import type { PageDetection } from "../shared/detection/types";
import { MessageBus } from "../shared/messaging/message-bus";
import { MSG } from "../shared/messaging/constants";
import { CONTEXT_EXTRACTION_DEBOUNCE_MS, ExtractionScheduler } from "./extraction-scheduler";
import { watchPageChanges } from "./page-watcher";

const bus = new MessageBus();
const detectionService = new DetectionService([new TradingViewDetector()]);
const contextExtractor = new ChartContextExtractor();

let lastDetection: PageDetection | null = null;
let isExtracting = false;
let rerunAfterExtraction = false;
let lastExtractedUrl: string | null = null;

const scheduler = new ExtractionScheduler(() => {
  void runExtraction();
}, CONTEXT_EXTRACTION_DEBOUNCE_MS);

async function runExtraction(): Promise<void> {
  if (isExtracting) {
    rerunAfterExtraction = true;
    return;
  }
  isExtracting = true;
  try {
    const context = await contextExtractor.getChartContext();
    contextLogger.debug(`Chart context: ${JSON.stringify(context)}`);
  } finally {
    isExtracting = false;
    if (rerunAfterExtraction) {
      rerunAfterExtraction = false;
      void runExtraction();
    }
  }
}

function sendDetection(detection: PageDetection): void {
  if (JSON.stringify(detection) !== JSON.stringify(lastDetection)) {
    lastDetection = detection;
    bus.send({ type: MSG.PAGE_DETECTED, payload: detection });
  }
}

function runDetection(): void {
  const detection = detectionService.detect(document, new URL(window.location.href));
  sendDetection(detection);

  if (!detection.supported) {
    return;
  }

  const currentUrl = window.location.href;
  if (currentUrl !== lastExtractedUrl) {
    // A new chart page was loaded: extract immediately.
    lastExtractedUrl = currentUrl;
    scheduler.scheduleImmediate();
  } else {
    // Same page mutations: batch DOM changes into a single extraction.
    scheduler.schedule();
  }
}

async function main(): Promise<void> {
  try {
    await bus.request({ type: MSG.PING });
    console.log("Communication established");
  } catch {
    console.log("Brahmastra content script loaded");
  }

  runDetection();
  watchPageChanges(runDetection);
}

main();
