import { DetectionService } from "../shared/detection/detection-service";
import { TradingViewDetector } from "../shared/detection/tradingview-detector";
import type { PageDetection } from "../shared/detection/types";
import { MessageBus } from "../shared/messaging/message-bus";
import { MSG } from "../shared/messaging/constants";
import { watchPageChanges } from "./page-watcher";

const bus = new MessageBus();
const detectionService = new DetectionService([new TradingViewDetector()]);

let lastDetection: PageDetection | null = null;

function sendDetection(): void {
  const detection = detectionService.detect(document, new URL(window.location.href));
  if (JSON.stringify(detection) === JSON.stringify(lastDetection)) {
    return;
  }
  lastDetection = detection;
  bus.send({ type: MSG.PAGE_DETECTED, payload: detection });
}

async function main(): Promise<void> {
  try {
    await bus.request({ type: MSG.PING });
    console.log("Communication established");
  } catch {
    console.log("Brahmastra content script loaded");
  }

  sendDetection();
  watchPageChanges(sendDetection);
}

main();
