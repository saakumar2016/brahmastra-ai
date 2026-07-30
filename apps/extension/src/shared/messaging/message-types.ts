import { MSG } from "./constants";
import type { ExtensionStatus } from "./types";

export interface PingMessage {
  type: typeof MSG.PING;
}

export interface PongMessage {
  type: typeof MSG.PONG;
}

export interface GetExtensionStatusMessage {
  type: typeof MSG.GET_EXTENSION_STATUS;
}

export interface ExtensionStatusMessage {
  type: typeof MSG.EXTENSION_STATUS;
  payload: ExtensionStatus;
}

export interface OpenSidePanelMessage {
  type: typeof MSG.OPEN_SIDE_PANEL;
}

export interface SidePanelOpenedMessage {
  type: typeof MSG.SIDE_PANEL_OPENED;
}

export interface HeartbeatMessage {
  type: typeof MSG.HEARTBEAT;
  payload: {
    timestamp: number;
  };
}

export type Request =
  PingMessage | GetExtensionStatusMessage | OpenSidePanelMessage | HeartbeatMessage;

export type Response = PongMessage | ExtensionStatusMessage | SidePanelOpenedMessage;

export type Message = Request | Response;
