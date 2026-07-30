import { MessageBus } from "../shared/messaging/message-bus";
import { MSG } from "../shared/messaging/constants";

async function main(): Promise<void> {
  const bus = new MessageBus();

  try {
    await bus.request({ type: MSG.PING });
    console.log("Communication established");
  } catch {
    console.log("Brahmastra content script loaded");
  }
}

main();
