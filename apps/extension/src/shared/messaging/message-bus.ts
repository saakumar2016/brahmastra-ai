import type { Request, Response } from "./message-types";

export type MessageListener = (
  message: Request,
  sender: chrome.runtime.MessageSender,
) => Promise<Response | void>;

export class MessageBus {
  async request<T extends Response = Response>(message: Request): Promise<T> {
    return chrome.runtime.sendMessage(message);
  }

  send(message: Request): void {
    chrome.runtime.sendMessage(message).catch(() => {});
  }

  onMessage(handler: MessageListener): void {
    chrome.runtime.onMessage.addListener((message, sender) => {
      return handler(message as Request, sender);
    });
  }
}
