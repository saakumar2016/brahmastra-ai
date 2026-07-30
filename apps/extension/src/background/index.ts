import { MessageBus } from "../shared/messaging/message-bus";
import { MessageHandler } from "../shared/messaging/message-handler";
import { MSG } from "../shared/messaging/constants";
import type { ExtensionStatus } from "../shared/messaging/types";

const bus = new MessageBus();
const handler = new MessageHandler(bus);

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

handler.listen();

console.log("Background worker started");
