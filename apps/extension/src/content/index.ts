import { ContextExtractor } from "../core/context/context-extractor";
import { contextLog } from "../core/context/logging";
import { DetectionService } from "../shared/detection/detection-service";
import { TradingViewDetector } from "../shared/detection/tradingview-detector";
import type { PageDetection } from "../shared/detection/types";
import { MessageBus } from "../shared/messaging/message-bus";
import { MSG } from "../shared/messaging/constants";
import { watchPageChanges } from "./page-watcher";

const bus = new MessageBus();
const detectionService = new DetectionService([new TradingViewDetector()]);
const contextExtractor = new ContextExtractor();

let lastDetection: PageDetection | null = null;
let isExtracting = false;

function runDetection(): void {
  const detection = detectionService.detect(document, new URL(window.location.href));
  if (JSON.stringify(detection) !== JSON.stringify(lastDetection)) {
    lastDetection = detection;
    bus.send({ type: MSG.PAGE_DETECTED, payload: detection });
  }

  if (detection.supported) {
    void extractContext();
  }
}

async function extractContext(): Promise<void> {
  if (isExtracting) {
    return;
  }
  isExtracting = true;
  try {
    const context = await contextExtractor.getChartContext();
    contextLog(`Chart context: ${JSON.stringify(context)}`);
  } finally {
    isExtracting = false;
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
