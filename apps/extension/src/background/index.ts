import { DetectionStore } from "../shared/detection/detection-store";
import { MessageBus } from "../shared/messaging/message-bus";
import { MessageHandler } from "../shared/messaging/message-handler";
import { MSG } from "../shared/messaging/constants";
import type { ExtensionStatus } from "../shared/messaging/types";

const bus = new MessageBus();
const handler = new MessageHandler(bus);
const detectionStore = new DetectionStore();

handler.handle(MSG.PING, async () => {
  return { type: MSG.PONG };
});

handler.handle(MSG.GET_EXTENSION_STATUS, async () => {
  const manifest = chrome.runtime.getManifest();
  const status: ExtensionStatus = {
    loaded: true,
    version: manifest.version,
    timestamp: Date.now(),
  };
  return { type: MSG.EXTENSION_STATUS, payload: status };
});

handler.handle(MSG.PAGE_DETECTED, async (message, sender) => {
  if (message.type !== MSG.PAGE_DETECTED) {
    return;
  }
  const tabId = sender.tab?.id;
  if (tabId === undefined) {
    return;
  }
  detectionStore.set(tabId, message.payload);
});

handler.handle(MSG.GET_PAGE_DETECTION, async (_message, sender) => {
  const tabId = sender.tab?.id;
  const detection = tabId !== undefined ? detectionStore.get(tabId) : detectionStore.getLatest();
  return { type: MSG.PAGE_DETECTION, payload: detection };
});

handler.listen();

console.log("Background worker started");
