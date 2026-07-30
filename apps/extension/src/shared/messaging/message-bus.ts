import type { Request, Response } from "./message-types";

export class MessageBus {
  async request<T extends Response = Response>(message: Request): Promise<T> {
    return chrome.runtime.sendMessage(message);
  }

  send(message: Request): void {
    chrome.runtime.sendMessage(message).catch(() => {});
  }

  onMessage(handler: (message: Request) => Promise<Response | void>): void {
    chrome.runtime.onMessage.addListener((message) => {
      return handler(message as Request);
    });
  }
}
