import type { MessageListener } from "./message-bus";
import { MessageBus } from "./message-bus";
import type { Request } from "./message-types";

type Handler = MessageListener;

export class MessageHandler {
  private handlers = new Map<string, Handler>();

  constructor(private bus: MessageBus) {}

  handle(type: Request["type"], handler: Handler): void {
    this.handlers.set(type, handler);
  }

  listen(): void {
    this.bus.onMessage(async (message, sender) => {
      const handler = this.handlers.get(message.type);
      if (handler) {
        return handler(message, sender);
      }
    });
  }
}
